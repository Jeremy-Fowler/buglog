<template>
  <router-link :to="{name: 'Bug', params:{bugId: bug.id}}">
    <li class="list-group-item selectable">
      <span> <i class="mdi mdi-ladybug"></i>{{ bug.title }}</span>
      <span>{{ bug.priority }}</span>
      <span>{{ bug.creator.name }}</span>
      <span>{{ bug.udpatedAt }}</span>
      <span v-if="bug.closed === false"> <i class="mdi text-danger mdi-checkbox-blank-circle-outline"></i> Open </span>
      <span v-else> <i class="mdi text-success mdi-checkbox-blank-circle-outline"></i> Closed </span>
    </li>
  </router-link>
</template>

<script>
export default {
  props: {
    bug: {
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
