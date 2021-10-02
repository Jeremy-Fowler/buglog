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
        <input type="number"
               for="priority"
               class="form-control bg-light"
               placeholder="Bug Priority"
               v-model="editable.priority"
               min="1"
               max="5"
               required
        >
      </label>
    </div>
    <div class="form-group">
      <button type="submit" class="btn btn-success mt-2">
        Create Project
      </button>
    </div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import { bugsService } from '../services/BugsService'
export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      async createBug() {
        await bugsService.createBug(editable.value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
