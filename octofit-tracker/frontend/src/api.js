const configuredCodespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const browserHostname = typeof window === 'undefined' ? '' : window.location.hostname
const browserCodespaceName = browserHostname.endsWith('-5173.app.github.dev')
  ? browserHostname.slice(0, -'-5173.app.github.dev'.length)
  : ''
export const codespaceName = configuredCodespaceName || browserCodespaceName

export const isCodespacesConfigured = Boolean(codespaceName)
export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export function resourceUrl(resource) {
  return `${apiBaseUrl}/${resource}/`
}

export async function fetchResource(resource, endpoint = resourceUrl(resource)) {
  const response = await fetch(endpoint)
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