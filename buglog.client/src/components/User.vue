<template>
  <div class="card">
    <div class="on-hover position-absolute" style="left: 0rem; top: 0rem" v-if="account.id == user.tracker.id">
      <i class="mdi mdi-close text-danger fs-1 selectable" @click="untrackBug()"></i>
    </div>
    <img class="" :src="user.tracker.picture" style="width: 6vh" alt="">
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { trackedBugsService } from '../services/TrackedBugsService'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      async untrackBug() {
        try {
          await trackedBugsService.untrackBug(props.user.id)
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
