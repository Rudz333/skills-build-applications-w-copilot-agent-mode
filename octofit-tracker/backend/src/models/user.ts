import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    displayName: { type: String, required: true, trim: true },
    avatarUrl: { type: String, trim: true },
  },
  { timestamps: true },
)

export const User = mongoose.models.User ?? mongoose.model('User', userSchema, 'users')