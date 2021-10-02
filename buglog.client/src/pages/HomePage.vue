<template>
  <div class="container-fluid">
    <div class="row my-3">
      <div class="col-6 justify-content-around d-flex">
        <h1 class="">
          <span>Bugs</span>
        </h1>
      </div>
      <div class="col-6 justify-content-around d-flex">
        <h1 class="">
          <span><button class="btn border border-dark btn-warning" data-bs-toggle="modal" data-bs-target="#post-form"> <b>Report Bug</b></button></span>
        </h1>
      </div>
    </div>
    <div class="row">
      <div v-if="bugs" class="col d-flex justify-content-center">
        <h3>
          <ul class="border list-group p-2 border-dark" style="list-style: none;">
            <li class="list-group-item d-flex justify-content-between my-2">
              <span>
                <b>Title</b>
              </span>
              <span>Priority</span>
              <span>Reported By</span>
              <span>Last Updated</span>
              <span>Sort by</span>
            </li>
            <BugList v-for="b in bugs" :key="b.id" :bug="b" />
          </ul>
        </h3>
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

  <Modal id="post-form">
    <template #modal-title>
      <h4>Report New Bug</h4>
    </template>
    <template #modal-body>
      <BugForm />
    </template>
  </Modal>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import Pop from '../utils/Pop'
import { bugsService } from '../services/BugsService'
import { AppState } from '../AppState'

export default {
  name: 'Home',
  setup() {
    onMounted(async() => {
      try {
        await bugsService.getBugs()
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      bugs: computed(() => AppState.bugs)
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
