import { dbContext } from '../db/DbContext'
import { Forbidden } from '../utils/Errors'

class TrackedBugsService {
  // REVIEW This isn't passing tests
  async removeTrackedBug(userId, trackedBugId) {
    const trackedBug = await dbContext.TrackedBugs.findById(trackedBugId)
    if (userId !== trackedBug.accountId.toString()) {
      throw new Forbidden("This ain't your bug, hombre")
    }
    await trackedBug.delete()
    return trackedBug
  }

  // REVIEW This isn't passing tests

  async getTrackedBugsByUser(userId) {
    const trackedBug = await dbContext.TrackedBugs.find({ userId }).populate('bug').populate('tracker')
    return trackedBug
  }

  async createTrackedBug(trackedBugData) {
    const trackedBug = await dbContext.TrackedBugs.create(trackedBugData)
    await trackedBug.populate('tracker')
    await trackedBug.populate('bug')
    return trackedBug
  }

  async getUsersTrackingBug(bugId) {
    const users = await dbContext.TrackedBugs.find({ bugId: bugId }).populate('tracker').populate('bug')
    return users
  }
}
export const trackedBugsService = new TrackedBugsService()
