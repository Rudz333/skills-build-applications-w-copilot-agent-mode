import { Router } from 'express'
import { Activity } from '../models/activity.js'
import { Leaderboard } from '../models/leaderboard.js'
import { Team } from '../models/team.js'
import { User } from '../models/user.js'
import { Workout } from '../models/workout.js'

const models = { activities: Activity, leaderboard: Leaderboard, teams: Team, users: User, workouts: Workout }

type ResourceName = keyof typeof models

export function createResourceRouter(collectionName: ResourceName) {
  const router = Router()
  const model = models[collectionName]

  router.get('/', async (_request, response) => {
    try {
      response.json(await model.find().lean())
    } catch (error) {
      response.status(503).json({ error: 'Database unavailable', details: String(error) })
    }
  })

  router.post('/', async (request, response) => {
    try {
      const resource = await model.create(request.body)
      response.status(201).json(resource)
    } catch (error) {
      response.status(400).json({ error: 'Invalid resource', details: String(error) })
    }
  })

  return router
}