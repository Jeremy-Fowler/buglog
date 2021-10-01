import { Auth0Provider } from '@bcwdev/auth0provider'
import { notesService } from '../services/NotesService'
import BaseController from '../utils/BaseController'

export class NotesController extends BaseController {
  constructor() {
    super('api')
    this.router
      .get('/bugs/:bugId/notes', this.getAllNotesByBugId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('/notes', this.createNote)
      .delete('/notes/:noteId', this.removeNote)
  }

  async removeNote(req, res, next) {
    try {
      const note = await notesService.removeNote(req.userInfo.id, req.params.noteId)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async createNote(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const note = await notesService.createNote(req.body)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async getAllNotesByBugId(req, res, next) {
    try {
      const notes = await notesService.getAllNotesByBugId(req.params.bugId)
      res.send(notes)
    } catch (error) {
      next(error)
    }
  }
}
