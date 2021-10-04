<template>
  <div class="col">
    <div class="border-dark border d-flex mx-3 p-3">
      <span>
        <img :src="note?.creator.picture" style="width: 3vh" alt="">
      </span>
      <span>
        {{ note?.creator.name }}
      </span>
    </div>
  </div>
  <div class="component border border-dark">
    {{ note?.body }}
  </div>
</template>

<script>
export default {
  props: {
    note: {
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
