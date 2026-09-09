export function ResourceState({ loading, error, children }) {
  if (loading) return <div className="resource-state">Loading latest data...</div>
  if (error) return <div className="resource-state resource-error">{error}</div>
  return children
}

export function EmptyState({ label }) {
  return <div className="resource-state">No {label} found yet.</div>
}