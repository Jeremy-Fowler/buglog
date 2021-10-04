<template>
  <div class="col d-flex">
    <div class="card">
      <div>
        <span>
          <img :src="note?.creator.picture" style="width: 3vh" alt="">
        </span>
        <span>
          {{ note?.creator.name }}
        </span>
        <span v-if="note?.creatorId === account.id" class="mdi mdi-close text-danger selectable" @click.prevent="removeNote()"></span>
      </div>
      <h3>
        {{ note?.body }}
      </h3>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { notesService } from '../services/NotesService'
import Pop from '../utils/Pop'
export default {
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      async removeNote() {
        try {
          await notesService.removeNote(props.note.id)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
