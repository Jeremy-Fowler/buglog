import { dbContext } from '../db/DbContext'

class TrackedBugsService {
  async getTrackedBugsByUser(userId) {
    const trackedBug = await dbContext.TrackedBugs.find({ accountId: userId }).populate('bug').populate('tracker')
    return trackedBug
  }

  async createTrackedBug(trackedBugData) {
    const trackedBug = await dbContext.TrackedBugs.create(trackedBugData)
    await trackedBug.populate('tracker').populate('bug')
    return trackedBug
  }

  async getUsersTrackingBug(bugId) {
    const users = await dbContext.TrackedBugs.find({ bugId: bugId }).populate('bug').populate('tracker')
    return users
  }
}
export const trackedBugsService = new TrackedBugsService()
