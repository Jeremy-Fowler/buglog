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
        <h1>
          <ul class="border list-group bg-success p-2 border-dark" style="list-style: none;">
            <li class="list-group-item d-flex border-dark justify-content-between">
              <span>
                <b>Title</b>
              </span>
              <span>Priority</span>
              <span>Reported By</span>
              <span>Last Updated</span>
              <span class="selectable" @click.prevent="sortBugs()">Sort</span>
            </li>
            <BugList v-for="b in trackedBugs" :key="b.accountId" :bug="b" />
          </ul>
        </h1>
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
