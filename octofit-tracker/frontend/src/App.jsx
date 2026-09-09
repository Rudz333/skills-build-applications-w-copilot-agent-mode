import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import { apiBaseUrl, isCodespacesConfigured } from './api.js'

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink className="brand" to="/">
          <span className="brand-mark">O</span>
          <span>OctoFit</span>
        </NavLink>
        <span className={`api-badge ${isCodespacesConfigured ? 'is-live' : 'is-local'}`}>
          <span className="status-dot" />
          {isCodespacesConfigured ? 'Codespaces API' : 'Local API'}
        </span>
      </header>

      <main className="main-content">
        <div className="intro-row">
          <div>
            <p className="eyebrow">Team fitness command center</p>
            <h1>Move together.<br /><em>Go further.</em></h1>
          </div>
          <p className="api-url">{apiBaseUrl}</p>
        </div>

        <nav className="primary-nav" aria-label="Primary navigation">
          <NavLink end to="/">Overview</NavLink>
          <NavLink to="/activities">Activities</NavLink>
          <NavLink to="/leaderboard">Leaderboard</NavLink>
          <NavLink to="/teams">Teams</NavLink>
          <NavLink to="/users">Members</NavLink>
          <NavLink to="/workouts">Workouts</NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

function Overview() {
  return (
    <section className="overview-grid">
      <NavLink className="overview-card overview-card-wide" to="/activities">
        <span className="card-kicker">This week</span>
        <strong>Keep the streak alive</strong>
        <span>Review team movement and log your next session.</span>
        <span className="card-arrow">-&gt;</span>
      </NavLink>
      <NavLink className="overview-card" to="/leaderboard">
        <span className="card-number">01</span>
        <strong>Leaderboard</strong>
        <span>See who is setting the pace.</span>
      </NavLink>
      <NavLink className="overview-card" to="/workouts">
        <span className="card-number">02</span>
        <strong>Workout library</strong>
        <span>Find a focused session.</span>
      </NavLink>
    </section>
  )
}

export default App
