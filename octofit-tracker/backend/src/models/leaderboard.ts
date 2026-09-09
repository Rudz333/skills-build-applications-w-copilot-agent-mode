import mongoose from 'mongoose'

const leaderboardSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    teamName: { type: String, required: true, trim: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    period: { type: String, required: true, trim: true },
  },
  { timestamps: true },
)

export const Leaderboard = mongoose.models.Leaderboard ?? mongoose.model('Leaderboard', leaderboardSchema, 'leaderboard')