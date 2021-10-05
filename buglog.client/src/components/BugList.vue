<template>
  <tr>
    <th scope="row" v-if="bug?.priority === 5" class="mdi text-danger mdi-ladybug">
      {{ bug?.priority }}
    </th>
    <th scope="row" v-else class="mdi mdi-ladybug">
      {{ bug?.priority }}
    </th>
    <router-link :to="{name: 'Bug', params:{bugId: bug.id}}">
      <th>{{ bug?.title }}</th>
    </router-link>
    <td id="disappear">
      {{ bug.creator.name }}
    </td>
    <td>{{ new Date(bug?.updatedAt).toLocaleDateString('en-US') }}</td>
    <td v-if="bug.closed === false">
      <i class="mdi text-danger mdi-checkbox-blank-circle-outline"></i> Open
    </td>
    <td v-else>
      <i class="mdi text-success mdi-checkbox-blank-circle-outline"></i> Closed
    </td>
  </tr>
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
@media(max-width: 767px){
    #disappear{
        display: none;
    }
}
</style>
