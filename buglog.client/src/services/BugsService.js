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
    const res = await api.post('api/bugs', bugdata)
    logger.log('createBug res', res.data)
    AppState.bugs.unshift(res.data)
    return res.data.id
  }

  async sortBugs() {
    await AppState.bugs.sort('-priority')
  }

  async closeBug(bugId) {
    const res = await api.delete('api/bugs/' + bugId)
    logger.log('closeBug res', res.data.closed)
    AppState.bug = res.data
  }

  async editBug(bugId, bugData) {
    const res = await api.put('api/bugs/' + bugId, bugData)
    logger.log('editBug res', res.data)
    AppState.bug = res.data
  }
}
export const bugsService = new BugsService()
