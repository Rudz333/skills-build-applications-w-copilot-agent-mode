import { useEffect, useState } from 'react'
import { fetchResource } from '../api.js'
import { EmptyState, ResourceState } from './ResourceState.jsx'

function Activities() {
  const [activities, setActivities] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetchResource('activities').then((data) => {
      setActivities(data)
      setState({ loading: false, error: '' })
    }).catch((error) => setState({ loading: false, error: error.message }))
  }, [])

  return <PageSection eyebrow="Movement log" title="Activities" count={activities.length}>
    <ResourceState {...state}>
      {activities.length === 0 ? <EmptyState label="activities" /> : <div className="activity-list">
        {activities.map((activity) => <article className="activity-row" key={activity._id || `${activity.username}-${activity.completedAt}`}>
          <div><strong>{activity.activityType}</strong><span>{activity.username} · {activity.durationMinutes} min</span></div>
          <strong className="points">+{activity.points} pts</strong>
        </article>)}
      </div>}
    </ResourceState>
  </PageSection>
}

function PageSection({ eyebrow, title, count, children }) {
  return <section className="resource-page"><div className="section-heading"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div><span className="count-chip">{count} records</span></div>{children}</section>
}

export default Activities