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
        <!-- <h1>
          <ul class="border list-group bg-success p-2 border-dark" style="list-style: none;">
            <li class="list-group-item d-flex border-dark justify-content-between">
              <span>
                <b>Title</b>
              </span>
              <span>Priority</span>
              <span>Last Updated</span>
              <span class="selectable" @click.prevent="sortBugs()">Sort</span>
            </li>
            <TrackedBugList v-for="b in trackedBugs" :key="b.id" :bug="b.bug" />
          </ul>
        </h1> -->
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
