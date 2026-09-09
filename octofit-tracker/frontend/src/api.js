const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const isCodespacesConfigured = Boolean(codespaceName)
export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export function resourceUrl(resource) {
  return `${apiBaseUrl}/${resource}/`
}

export async function fetchResource(resource) {
  const response = await fetch(resourceUrl(resource))
  if (!response.ok) {
    throw new Error(`Could not load ${resource} (${response.status})`)
  }

  const payload = await response.json()
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload.items)) return payload.items
  if (Array.isArray(payload.results)) return payload.results
  if (Array.isArray(payload.data)) return payload.data
  return []
}