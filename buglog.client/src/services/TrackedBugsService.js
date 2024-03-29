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

  async getTrackedBugs() {
    const res = await api.get('/account/trackedbugs')
    logger.log('getTrackedBugs res', res.data)
    AppState.trackedBugs = res.data
  }

  async untrackBug(trackedBugId) {
    const res = await api.delete('/api/trackedbugs/' + trackedBugId)
    logger.log(res.data)
    AppState.users = AppState.users.filter(u => u.id !== trackedBugId)
  }
}
export const trackedBugsService = new TrackedBugsService()
