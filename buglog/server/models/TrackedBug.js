import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const TrackedBugSchema = new Schema({
  bugId: { type: Schema.Types.ObjectId, ref: 'Bug', required: true },
  accountId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
})
TrackedBugSchema.virtual('tracker', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
TrackedBugSchema.virtual('bug', {
  localField: 'bugId',
  foreignField: '_id',
  justOne: true,
  ref: 'Bug'
})
