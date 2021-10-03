<template>
  <router-link :to="{name: 'Bug', params:{bugId: bug.id}}">
    <li class="list-group-item selectable border-dark d-flex justify-content-between my-2">
      <span>
        <i v-if="bug.priority === 5" class="mdi text-danger mdi-ladybug"></i>
        <i v-else class="mdi mdi-ladybug"></i>
        <b>{{ bug.title }}</b>
      </span>
      <span v-if="bug.priority === 5" class="mdi fs-2 text-danger mdi-numeric-5-circle"></span>
      <span v-else>{{ bug.priority }}</span>
      <span>{{ bug.creator.name }}</span>
      <span>{{ bug.updatedAt }}</span>
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
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
li{
  font-size: 30px;
}
</style>
