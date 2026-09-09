import { useEffect, useState } from 'react'
import { codespaceName, fetchResource } from '../api.js'
import { EmptyState, ResourceState } from './ResourceState.jsx'

const teamsEndpoint = typeof window !== 'undefined'
  ? '/api/teams/'
  : codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

function Teams() {
  const [teams, setTeams] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })
  useEffect(() => { fetchResource('teams', teamsEndpoint).then((data) => { setTeams(data); setState({ loading: false, error: '' }) }).catch((error) => setState({ loading: false, error: error.message })) }, [])
  return <section className="resource-page"><div className="section-heading"><div><p className="eyebrow">Find your people</p><h2>Teams</h2></div><span className="count-chip">{teams.length} teams</span></div><ResourceState {...state}>{teams.length === 0 ? <EmptyState label="teams" /> : <div className="team-grid">{teams.map((team) => <article className="team-card" key={team._id || team.name}><span className="team-icon">{team.name.charAt(0)}</span><h3>{team.name}</h3><p>{team.description}</p><footer><span>{team.memberUsernames?.length || 0} members</span><strong>{team.totalPoints} pts</strong></footer></article>)}</div>}</ResourceState></section>
}

export default Teams