import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class TrackedBugsService {
  async removeTrackedBug(userId, trackedBugId) {
    const trackedBug = await dbContext.TrackedBugs.findById(trackedBugId)
    if (userId !== trackedBug.accountId.toString()) {
      throw new Forbidden("This ain't your bug, hombre")
    }
    await trackedBug.delete()
    return trackedBug
  }

  async getTrackedBugsByUser(userId) {
    const trackedBugs = await dbContext.TrackedBugs.find({ accountId: userId }).populate('bug').populate('tracker')
    return trackedBugs
  }

  async createTrackedBug(userId, trackedBugData) {
    // eslint-disable-next-line prefer-const
    let users = await this.getUsersTrackingBug(trackedBugData.bugId)
    if (users.filter(u => u.accountId === userId).length > 0) {
      throw new BadRequest("you can't follow this twice")
    }
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
