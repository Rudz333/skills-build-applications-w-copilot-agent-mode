import { useEffect, useState } from 'react'
import { codespaceName, fetchResource } from '../api.js'
import { EmptyState, ResourceState } from './ResourceState.jsx'

const leaderboardEndpoint = typeof window !== 'undefined'
  ? '/api/leaderboard/'
  : codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })
  useEffect(() => { fetchResource('leaderboard', leaderboardEndpoint).then((data) => { setEntries(data.sort((a, b) => a.rank - b.rank)); setState({ loading: false, error: '' }) }).catch((error) => setState({ loading: false, error: error.message })) }, [])
  return <section className="resource-page"><div className="section-heading"><div><p className="eyebrow">September 2026</p><h2>Leaderboard</h2></div><span className="count-chip">Top performers</span></div><ResourceState {...state}>{entries.length === 0 ? <EmptyState label="leaderboard entries" /> : <div className="leaderboard-list">{entries.map((entry) => <article className={`leader-row rank-${entry.rank}`} key={entry._id || entry.username}><span className="rank">{String(entry.rank).padStart(2, '0')}</span><div><strong>{entry.username}</strong><span>{entry.teamName}</span></div><strong className="points">{entry.points} pts</strong></article>)}</div>}</ResourceState></section>
}

export default Leaderboard