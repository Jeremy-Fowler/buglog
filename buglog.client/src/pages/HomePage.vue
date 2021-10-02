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
          <span><button class="btn border border-dark btn-warning"> <b>Report Bug</b></button></span>
        </h1>
      </div>
    </div>
    <div class="row">
      <div class="col d-flex justify-content-center">
        <h3>
          <ul class="border list-group p-2 border-dark" style="list-style: none;">
            <BugList v-for="b in bugs" :key="b.id" :bug="b" />
          </ul>
        </h3>
      </div>
    </div>
  </div>
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
