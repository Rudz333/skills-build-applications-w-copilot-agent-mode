import { useEffect, useState } from 'react'
import { fetchResource } from '../api.js'
import { EmptyState, ResourceState } from './ResourceState.jsx'

function Users() {
  const [users, setUsers] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })
  useEffect(() => { fetchResource('users').then((data) => { setUsers(data); setState({ loading: false, error: '' }) }).catch((error) => setState({ loading: false, error: error.message })) }, [])
  return <section className="resource-page"><div className="section-heading"><div><p className="eyebrow">Your crew</p><h2>Members</h2></div><span className="count-chip">{users.length} members</span></div><ResourceState {...state}>{users.length === 0 ? <EmptyState label="members" /> : <div className="member-list">{users.map((user) => <article className="member-row" key={user._id || user.username}><div className="avatar">{user.displayName?.charAt(0) || user.username?.charAt(0)}</div><div><strong>{user.displayName || user.username}</strong><span>@{user.username}</span></div><span className="member-email">{user.email}</span></article>)}</div>}</ResourceState></section>
}

export default Users