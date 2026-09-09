import mongoose from 'mongoose'

const mongodbUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db'
const db = mongoose.connection

export async function connectToDatabase() {
  await mongoose.connect(mongodbUri)
}

export default db;
