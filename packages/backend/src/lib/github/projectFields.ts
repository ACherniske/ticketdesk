import { gql } from './graphql'

interface SelectOption {
  id: string
  name: string
  color: string
}

interface SingleSelectField {
  id: string
  name: string
  options: SelectOption[]
}

interface ProjectFieldsResult {
  projectId: string
  fieldId: string
  optionId: string
}

async function getProjectId(owner: string, projectNumber: number): Promise<string> {
  try {
    const orgData = await gql<{
      organization: { projectV2: { id: string } }
    }>(`
      query($owner: String!, $number: Int!) {
        organization(login: $owner) {
          projectV2(number: $number) { id }
        }
      }
    `, { owner, number: projectNumber })

    return orgData.organization.projectV2.id
  } catch {
    const userData = await gql<{
      user: { projectV2: { id: string } }
    }>(`
      query($owner: String!, $number: Int!) {
        user(login: $owner) {
          projectV2(number: $number) { id }
        }
      }
    `, { owner, number: projectNumber })

    return userData.user.projectV2.id
  }
}

async function getStatusField(projectId: string): Promise<SingleSelectField | null> {
  const data = await gql<{
    node: {
      fields: {
        nodes: Array<{
          id?: string
          name?: string
          options?: SelectOption[]
        }>
      }
    }
  }>(`
    query($projectId: ID!) {
      node(id: $projectId) {
        ... on ProjectV2 {
          fields(first: 20) {
            nodes {
              ... on ProjectV2SingleSelectField {
                id
                name
                options { id name color }
              }
            }
          }
        }
      }
    }
  `, { projectId })

  const statusField = data.node.fields.nodes.find(f => f.name === 'Status')
  if (!statusField?.id) return null

  return {
    id: statusField.id,
    name: statusField.name!,
    options: statusField.options ?? []
  }
}

async function addNeedsReviewOption(
  field: SingleSelectField
): Promise<string> {
  const existingOptions = field.options.map(o => ({
    name: o.name,
    color: o.color,
    description: ''
  }))

  const newOption = {
    name: 'Needs Review',
    color: 'RED',
    description: 'Submitted via TicketDesk, awaiting maintainer review.'
  }

  const data = await gql<{
    updateProjectV2Field: {
      projectV2Field: {
        options: SelectOption[]
      }
    }
  }>(`
    mutation($fieldId: ID!, $options: [ProjectV2SingleSelectFieldOptionInput!]!) {
      updateProjectV2Field(input: {
        fieldId: $fieldId
        singleSelectOptions: $options
      }) {
        projectV2Field {
          ... on ProjectV2SingleSelectField {
            options { id name color }
          }
        }
      }
    }
  `, {
    fieldId: field.id,
    options: [...existingOptions, newOption]
  })

  const updated = data.updateProjectV2Field.projectV2Field.options
  const created = updated.find(o => o.name === 'Needs Review')
  if (!created) throw new Error('Failed to create Needs Review option')

  return created.id
}

export async function validateAndProvisionProject(
  owner: string,
  projectNumber: number
): Promise<ProjectFieldsResult> {
  const projectId = await getProjectId(owner, projectNumber)

  const statusField = await getStatusField(projectId)
  if (!statusField) {
    throw new Error(
      `Project #${projectNumber} for "${owner}" has no "Status" field. ` +
      `Please add a single-select "Status" field in the GitHub Projects UI first.`
    )
  }

  const existing = statusField.options.find(o => o.name === 'Needs Review')
  if (existing) {
    return { projectId, fieldId: statusField.id, optionId: existing.id }
  }

  const optionId = await addNeedsReviewOption(statusField)
  return { projectId, fieldId: statusField.id, optionId }
}
