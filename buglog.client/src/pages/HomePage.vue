<template>
  <div class="container-fluid">
    <div class="row my-3">
      <div class="col-6 justify-content-around d-flex">
        <h1 class="">
          <span>Bugs</span>
        </h1>
      </div>
      <div class="col-6 justify-content-around d-flex">
        <h1 v-if="user.isAuthenticated" class="">
          <span><button class="btn border border-dark btn-warning" data-bs-toggle="modal" data-bs-target="#bug-form"> <b>Report Bug</b></button></span>
        </h1>
      </div>
    </div>
    <div class="row">
      <div v-if="bugs" class="col d-flex justify-content-center" style="">
        <h2>
          <table class="table">
            <thead>
              <tr>
                <th scope="col" class="selectable" @click="toggleAscending">
                  Priority
                </th>
                <th scope="col">
                  Title
                </th>
                <th scope="col">
                  Reported By
                </th>
                <th scope="col">
                  Last Updated
                </th>
                <th scope="col" class="selectable" @click="statusFilter = !statusFilter" title="Show only closed">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <BugList v-for="b in bugs" :key="b.id" :bug="b" />
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

  <Modal id="bug-form">
    <template #modal-title>
      <h4>Report New Bug</h4>
    </template>
    <template #modal-body>
      <BugForm />
    </template>
  </Modal>
</template>

<script>
import { computed, onMounted, ref } from '@vue/runtime-core'
import Pop from '../utils/Pop'
import { bugsService } from '../services/BugsService'
import { AppState } from '../AppState'

export default {
  name: 'Home',
  setup() {
    const statusFilter = ref(false)
    const ascending = ref(true)

    onMounted(async() => {
      try {
        await bugsService.getBugs()
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })

    function prioritySorter(x, y) {
      if (ascending.value) {
        return x.priority - y.priority
      }
      return y.priority - x.priority
    }

    function filterByStatus(b) {
      if (statusFilter.value) {
        return !b.closed
      }
      return true
    }
    return {
      statusFilter,
      ascending,
      bugs: computed(() => AppState.bugs.filter(filterByStatus).sort(prioritySorter)),
      user: computed(() => AppState.user),
      toggleAscending() {
        ascending.value = !ascending.value
      }
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card{
    width: 50vw;
    > img{
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
