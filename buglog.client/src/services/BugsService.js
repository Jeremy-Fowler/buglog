import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BugsService {
  async getBugs() {
    const res = await api.get('api/bugs')
    logger.log('getBugs res', res.data)
    AppState.bugs = res.data
  }

  async getBugById(bugId) {
    const res = await api.get('api/bugs/' + bugId)
    logger.log('getBugById res', res.data)
    AppState.bug = res.data
  }

  async createBug(bugdata) {

  }
}
export const bugsService = new BugsService()
