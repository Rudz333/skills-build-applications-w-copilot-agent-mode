import { useEffect, useState } from 'react'
import { fetchResource } from '../api.js'
import { EmptyState, ResourceState } from './ResourceState.jsx'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })
  useEffect(() => { fetchResource('workouts').then((data) => { setWorkouts(data); setState({ loading: false, error: '' }) }).catch((error) => setState({ loading: false, error: error.message })) }, [])
  return <section className="resource-page"><div className="section-heading"><div><p className="eyebrow">Train with purpose</p><h2>Workout library</h2></div><span className="count-chip">{workouts.length} sessions</span></div><ResourceState {...state}>{workouts.length === 0 ? <EmptyState label="workouts" /> : <div className="workout-grid">{workouts.map((workout) => <article className="workout-card" key={workout._id || workout.title}><div className="workout-meta"><span>{workout.difficulty}</span><span>{workout.durationMinutes} min</span></div><h3>{workout.title}</h3><p>{workout.description}</p><div className="exercise-list">{workout.exercises?.map((exercise) => <span key={exercise}>{exercise}</span>)}</div></article>)}</div>}</ResourceState></section>
}

export default Workouts