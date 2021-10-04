<template>
  <div class="container-fluid">
    <div class="row my-3">
      <div class="col-6 justify-content-around d-flex">
        <h1 class="">
          <span>Bugs You Are Tracking</span>
        </h1>
      </div>
    </div>
    <div class="row">
      <div v-if="trackedBugs" class="col d-flex justify-content-center" style="">
        <h2>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">
                  Priority
                </th>
                <th scope="col">
                  Title
                </th>
                <th scope="col">
                  Last Updated
                </th>
                <th scope="col">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <TrackedBugList v-for="b in trackedBugs" :key="b.id" :bug="b.bug" />
            </tbody>
          </table>
        </h2>
      </div>
      <div v-else class="col d-flex justify-content-center">
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
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
import { trackedBugsService } from '../services/TrackedBugsService'
export default {
  name: 'Account',
  setup() {
    onMounted(async() => {
      try {
        await trackedBugsService.getTrackedBugs()
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })

    return {
      account: computed(() => AppState.account),
      trackedBugs: computed(() => AppState.trackedBugs)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
