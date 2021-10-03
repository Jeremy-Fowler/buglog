import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class NotesService {
  async getNotes(bugId) {
    const res = await api.get('api/bugs/' + bugId + '/notes')
    logger.log('getNotes res', res.data)
    AppState.notes = res.data
  }
}
export const notesService = new NotesService()
