import mongoose, { type Document, type Model } from 'mongoose'

export interface ResourceDocument extends Document {
  [key: string]: unknown
}

const resourceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    username: { type: String, trim: true },
    points: { type: Number, min: 0 },
    score: { type: Number, min: 0 },
    type: { type: String, trim: true },
  },
  { timestamps: true, strict: false },
)

export function resourceModel(collectionName: string): Model<ResourceDocument> {
  const modelName = `${collectionName[0].toUpperCase()}${collectionName.slice(1)}Resource`
  return mongoose.models[modelName] ?? mongoose.model<ResourceDocument>(modelName, resourceSchema, collectionName)
}