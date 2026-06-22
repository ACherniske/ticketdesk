const TOKEN = process.env.GITHUB_TOKEN
const GRAPHQL_URL = process.env.GITHUB_GRAPHQL_URL ?? 'https://api.github.com/graphql'

export async function gql<T>(query: string, variables: Record<string, unknown>): Promise<T> {
  if (!TOKEN) throw new Error('GITHUB_TOKEN is not set')

  const res = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  })

  if (!res.ok) throw new Error(`GraphQL request failed: ${res.status}`)

  const json = await res.json() as { data?: T; errors?: { message: string }[] }
  if (json.errors?.length) throw new Error(json.errors[0].message)
  return json.data as T
}
