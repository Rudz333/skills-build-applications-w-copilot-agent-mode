import mongoose from 'mongoose'

const workoutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
    durationMinutes: { type: Number, required: true, min: 1 },
    exercises: [{ type: String, required: true, trim: true }],
    target: { type: String, required: true, trim: true },
  },
  { timestamps: true },
)

export const Workout = mongoose.models.Workout ?? mongoose.model('Workout', workoutSchema, 'workouts')