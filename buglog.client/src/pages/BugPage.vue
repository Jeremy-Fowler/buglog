<template>
  <div v-if="bug" class="container-fluid">
    <div class="row">
      <div class="col">
        <h1>
          {{ bug?.title }}
        </h1>
        <div class="row">
          <div class="card border-dark">
            <div class="col justify-content-around d-flex">
              <span><img :src="bug?.creator.picture" alt=""></span>
              <span>
                <div>Reported By</div>
                <div>{{ bug?.creator.name }}</div>
              </span>
              <span>
                <div>Priority</div>
                <div>{{ bug?.priority }}</div>
              </span>
              <span>
                <div>Last Updated</div>
                <div>{{ bug?.updatedAt }}</div>
              </span>
              <span>
                <div>Bug Status</div>
                <div v-if="bug?.closed === true">Open</div>
                <div v-else>Closed</div>
              </span>
            </div>
            <div class="col">
              <p>{{ bug.description }}</p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <h1>Notes</h1>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <Note v-for="n in notes" :key="n.id" :note="n" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="container-fluid">
    <div class="row my-5">
      <div class="col d-flex justify-content-center">
        <h1>
          <i class="mdi mdi-spin mdi-ladybug"></i>
          <i class="mdi mdi-spin mdi-ladybug"></i>
          <i class="mdi mdi-spin mdi-ladybug"></i>
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, watchEffect } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
import { bugsService } from '../services/BugsService'
import { notesService } from '../services/NotesService'
export default {
  setup() {
    const route = useRoute()
    watchEffect(async() => {
      if (route.params.bugId) {
        AppState.bug = null
        try {
          await bugsService.getBugById(route.params.bugId)
          await notesService.getNotes(route.params.bugId)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    })
    return {
      bug: computed(() => AppState.bug),
      notes: computed(() => AppState.notes)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
