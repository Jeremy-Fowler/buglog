<template>
  <form @submit.prevent="editBug()">
    <div class="form-group">
      <label for="title">
        <input type="text"
               for="title"
               class="form-control bg-light"
               :placeholder="bug?.title"
               v-model="editable.title"
        >
      </label>
    </div>
    <div class="input-group">
      <label for="description">
        <textarea type="text"
                  for="description"
                  v-model="editable.description"
                  class="form-control mt-2 bg-light"
                  :placeholder="bug?.description"
                  aria-label="With textarea"
        ></textarea>
      </label>
    </div>
    <div class="form-group">
      <label for="priority">
        Priority
        <input type="number"
               for="priority"
               class="form-control bg-light"
               :placeholder="bug?.priority"
               v-model="editable.priority"
               min="1"
               max="5"
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
import { useRoute } from 'vue-router'
import { bugsService } from '../services/BugsService'
import Pop from '../utils/Pop'
import { Modal } from 'bootstrap'
export default {
  props: {
    bug: {
      type: Object,
      required: true
    }
  },
  setup() {
    const route = useRoute()
    const editable = ref({})
    return {
      editable,
      async editBug() {
        try {
          await bugsService.editBug(route.params.bugId, editable.value)
          const modal = Modal.getInstance(document.getElementById('edit-form'))
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
