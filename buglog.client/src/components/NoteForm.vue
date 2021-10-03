<template>
  <form @submit.prevent="createNote()">
    <div class="input-group">
      <label for="description">
        <textarea type="text"
                  for="description"
                  class="form-control mt-2 bg-light"
                  placeholder="Bug Description"
                  aria-label="With textarea"
                  v-model="editable.body"
                  required
        ></textarea>
      </label>
    </div>
    <div class="form-group">
      <button type="submit" class="btn btn-success mt-2">
        Submit
      </button>
    </div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import { notesService } from '../services/NotesService'
import Pop from '../utils/Pop'
import { Modal } from 'bootstrap'
export default {
  setup() {
    const route = useRoute()
    const editable = ref({ bugId: route.params.bugId })
    return {
      editable,
      async createNote() {
        try {
          await notesService.createNote(editable.value)
          const modal = Modal.getInstance(document.getElementById('note-form'))
          modal.hide()
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
