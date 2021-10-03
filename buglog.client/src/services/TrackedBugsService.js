import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class TrackedBugsService {
  async getUsers(bugId) {
    const res = await api.get('/api/bugs/' + bugId + '/trackedbugs')
    logger.log('gets users', res.data)
    AppState.users = res.data
  }

  async trackBug(bugId) {
    const res = await api.post('/api/trackedbugs', { bugId: bugId })
    logger.log('trackBug res', res.data)
    AppState.users.push(res.data)
  }
}
export const trackedBugsService = new TrackedBugsService()
