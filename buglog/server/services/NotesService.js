import { dbContext } from '../db/DbContext'
import { Forbidden } from '../utils/Errors'

class NotesService {
  async removeNote(userId, noteId) {
    const note = await dbContext.Notes.findById(noteId)
    if (note.creatorId.toString() !== userId) {
      throw new Forbidden("okay bud, this isn't your note. Why are you even trying to delete this note? It doesn't belong to you")
    }
    await note.delete()
    return note
  }

  async createNote(noteData) {
    const note = await dbContext.Notes.create(noteData)
    await note.populate('creator', 'name picture')
    return note
  }

  async getAllNotesByBugId(bugId) {
    const notes = await dbContext.Notes.find({ bugId }).populate('creator', 'name picture')
    return notes
  }
}
export const notesService = new NotesService()
