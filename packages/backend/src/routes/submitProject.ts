import type { TicketPayload, SubmitResponse } from '@ticketdesk/shared'
import { gql } from '../lib/github/graphql'
import { buildBody } from '../lib/github/utils'

async function createDraftIssue(
  projectId: string,
  title: string,
  body: string
): Promise<string> {
  const data = await gql<{
    addProjectV2DraftIssue: { projectItem: { id: string } }
  }>(`
    mutation($projectId: ID!, $title: String!, $body: String!) {
      addProjectV2DraftIssue(input: {
        projectId: $projectId
        title: $title
        body: $body
      }) {
        projectItem { id }
      }
    }
  `, { projectId, title, body })

  return data.addProjectV2DraftIssue.projectItem.id
}

async function setNeedsReview(
  projectId: string,
  itemId: string,
  fieldId: string,
  optionId: string
): Promise<void> {
  await gql(`
    mutation($projectId: ID!, $itemId: ID!, $fieldId: ID!, $optionId: String!) {
      updateProjectV2ItemFieldValue(input: {
        projectId: $projectId
        itemId: $itemId
        fieldId: $fieldId
        value: { singleSelectOptionId: $optionId }
      }) {
        projectV2Item { id }
      }
    }
  `, { projectId, itemId, fieldId, optionId })
}

function shortenItemId(itemId: string): string {
  // Node IDs look like PVTI_kwDOEZQHX84BbToeABC123
  // Take the last 8 characters for a short but traceable reference
  return `DRAFT-${itemId.slice(-8).toUpperCase()}`
}

export async function submitProject(payload: TicketPayload): Promise<SubmitResponse> {
  if (payload.destination.kind !== 'project') {
    throw new Error('Invalid destination kind')
  }

  const { projectId, fieldId, optionId } = payload.destination

  if (!projectId || !fieldId || !optionId) {
    throw new Error('Missing projectId, fieldId, or optionId — run validation first')
  }

  const body = buildBody(payload)
  const itemId = await createDraftIssue(projectId, payload.title, body)
  await setNeedsReview(projectId, itemId, fieldId, optionId)

  return { reference: shortenItemId(itemId) }
}
