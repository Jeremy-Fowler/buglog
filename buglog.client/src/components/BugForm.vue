<template>
  <form @submit.prevent="createBug()">
    <div class="form-group">
      <label for="title">
        <input type="text"
               for="title"
               class="form-control bg-light"
               placeholder="Bug Title"
               v-model="editable.title"
               required
        >
      </label>
    </div>
    <div class="input-group">
      <label for="description">
        <textarea type="text"
                  for="description"
                  v-model="editable.description"
                  class="form-control mt-2 bg-light"
                  placeholder="Bug Description"
                  aria-label="With textarea"
                  required
        ></textarea>
      </label>
    </div>
    <div class="form-group">
      <label for="priority">
        Priority
        <input type="number"
               for="priority"
               class="form-control bg-light"
               placeholder="0"
               v-model="editable.priority"
               min="1"
               max="5"
               required
        >
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
import { bugsService } from '../services/BugsService'
import { Modal } from 'bootstrap'
export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      async createBug() {
        await bugsService.createBug(editable.value)
        const modal = Modal.getInstance(document.getElementById('bug-form'))
        modal.hide()
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
