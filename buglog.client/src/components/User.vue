<template>
  <img class="m-1" :src="user.tracker.picture" style="width: 6vh" alt="">
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>
