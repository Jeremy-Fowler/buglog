import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class NotesService {
  async getNotes(bugId) {
    const res = await api.get('api/bugs/' + bugId + '/notes')
    logger.log('getNotes res', res.data)
    AppState.notes = res.data
  }

  async createNote(noteData) {
    const res = await api.post('api/notes', noteData)
    logger.log('createNote res', res)
    AppState.notes.push(res.data)
  }

  async removeNote(noteId) {
    const res = await api.delete('api/notes/' + noteId)
    logger.log(res.data)
    AppState.notes = AppState.notes.filter(n => n.id !== noteId)
  }
}
export const notesService = new NotesService()
