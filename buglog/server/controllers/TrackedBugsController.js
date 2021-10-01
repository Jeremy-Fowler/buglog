import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugsService } from '../services/BugsService'
import BaseController from '../utils/BaseController'

export class TrackedBugsController extends BaseController {
  constructor() {
    super('api')
    this.router
      .get('/bugs/:bugId/trackedbugs', this.getUsersTrackingBug)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('/trackedbugs', this.createTrackedBug)
  }

  async getUsersTrackingBug(req, res, next) {
    try {
      const users = await bugsService.getUsersTrackingBug()
    } catch (error) {
      next(error)
    }
  }

  async createTrackedBug(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const trackedBug = await bugsService.createTrackedBug(req.body)
      res.send(trackedBug)
    } catch (error) {
      next(error)
    }
  }
}
