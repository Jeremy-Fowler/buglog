<template>
  <div v-if="bug" class="container-fluid">
    <div class="row">
      <div class="col">
        {{ bug?.title }}
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="card">
          {{ bug?.description }}
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
export default {
  setup() {
    const route = useRoute()
    watchEffect(async() => {
      if (route.params.bugId) {
        AppState.bug = null
        try {
          await bugsService.getBugById(route.params.bugId)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    })
    return {
      bug: computed(() => AppState.bug)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
