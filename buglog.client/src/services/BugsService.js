import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BugsService {
  async getBugs() {
    const res = await api.get('api/bugs')
    logger.log('getBugs res', res.data)
    AppState.bugs = res.data
  }
}
export const bugsService = new BugsService()
