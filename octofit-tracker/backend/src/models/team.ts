import mongoose from 'mongoose'

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    memberUsernames: [{ type: String, required: true, trim: true }],
    totalPoints: { type: Number, required: true, min: 0, default: 0 },
  },
  { timestamps: true },
)

export const Team = mongoose.models.Team ?? mongoose.model('Team', teamSchema, 'teams')