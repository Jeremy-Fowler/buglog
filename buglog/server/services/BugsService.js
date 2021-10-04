import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class BugsService {
  async closeBug(bugId, userId) {
    const bug = await this.getBugById(bugId)
    if (userId !== bug.creatorId.toString()) {
      throw new Forbidden("You can't close that bug, big guy. He's not your bug. He's someone else's bug, okay?")
    }
    // REVIEW Check Booleans on last project if this isn't working
    if (bug.closed === false) {
      bug.closed = true
      bug.closedDate = new Date()
    } else {
      bug.closed = false
      bug.closedDate = null
    }
    await bug.save()
    return bug
  }

  async editBug(bugId, userId, bugData) {
    const bug = await this.getBugById(bugId)
    if (userId !== bug.creatorId.toString()) {
      throw new Forbidden('You are not allowed to edit this bug, yo')
    } else if (bug.closed === true) {
      throw new BadRequest("That bug is closed, buddy. You can't edit him")
    }
    bug.title = bugData.title || bug.title
    bug.description = bugData.description || bug.description
    bug.priority = bugData.priority || bug.priority
    await bug.save()
    return bug
  }

  async createBug(bugData) {
    const bug = await dbContext.Bugs.create(bugData)
    await bug.populate('creator', 'name picture')
    return bug
  }

  async getBugById(bugId) {
    const bug = await dbContext.Bugs.findById(bugId).populate('creator', 'name picture')
    if (!bug) {
      throw new BadRequest('Invalid Bug ID')
    }
    return bug
  }

  async getBugs(query) {
    const bugs = await dbContext.Bugs.find(query).sort('-updatedAt').populate('creator', 'name picture')
    return bugs
  }
}
export const bugsService = new BugsService()
