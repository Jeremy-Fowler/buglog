import { Auth0Provider } from '@bcwdev/auth0provider'
import { trackedBugsService } from '../services/TrackedBugsService'
import BaseController from '../utils/BaseController'

export class TrackedBugsController extends BaseController {
  constructor() {
    super('')
    this.router
      .get('/api/bugs/:bugId/trackedbugs', this.getUsersTrackingBug)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('/api/trackedbugs', this.createTrackedBug)
      .get('/account/trackedbugs', this.getTrackedBugsByUser)
      .delete('/api/trackedbugs/:trackedBugId', this.removeTrackedBug)
  }

  async removeTrackedBug(req, res, next) {
    try {
      const trackedBug = await trackedBugsService.removeTrackedBug(req.userInfo.id, req.params.trackedBugId)
      res.send(trackedBug)
    } catch (error) {
      next(error)
    }
  }

  async getTrackedBugsByUser(req, res, next) {
    try {
      const trackedBugs = await trackedBugsService.getTrackedBugsByUser(req.userInfo.id)
      res.send(trackedBugs)
    } catch (error) {
      next(error)
    }
  }

  async getUsersTrackingBug(req, res, next) {
    try {
      const users = await trackedBugsService.getUsersTrackingBug(req.params.bugId)
      res.send(users)
    } catch (error) {
      next(error)
    }
  }

  async createTrackedBug(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const trackedBug = await trackedBugsService.createTrackedBug(req.userInfo.id, req.body)
      res.send(trackedBug)
    } catch (error) {
      next(error)
    }
  }
}
