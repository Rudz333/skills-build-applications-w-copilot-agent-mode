import express from 'express'
import { connectToDatabase } from './config/database.js'
import { activityRouter } from './routes/activities.js'
import { leaderboardRouter } from './routes/leaderboard.js'
import { teamRouter } from './routes/teams.js'
import { userRouter } from './routes/users.js'
import { workoutRouter } from './routes/workouts.js'

const app = express()
const port = 8000
const codespaceName = process.env.CODESPACE_NAME
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`

app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'octofit-tracker-api', baseUrl })
})

app.get('/api/', (_request, response) => {
  response.json({
    service: 'octofit-tracker-api',
    baseUrl,
    routes: ['/api/users/', '/api/teams/', '/api/activities/', '/api/leaderboard/', '/api/workouts/'],
  })
})

app.use('/api/users', userRouter)
app.use('/api/teams', teamRouter)
app.use('/api/activities', activityRouter)
app.use('/api/leaderboard', leaderboardRouter)
app.use('/api/workouts', workoutRouter)

async function startServer() {
  try {
    await connectToDatabase()
    console.log('Connected to octofit_db')
  } catch (error) {
    console.warn('MongoDB unavailable; starting API without database connection', error)
  }

  app.listen(port, () => {
    console.log(`OctoFit Tracker API listening on ${baseUrl}`)
  })
}

startServer()