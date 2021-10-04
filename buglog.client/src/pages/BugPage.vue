<template>
  <div v-if="bug" class="container-fluid">
    <div class="row">
      <div class="col">
        <h1>
          {{ bug?.title }}
        </h1>
        <div class="row">
          <div class="card border-dark">
            <div class="col justify-content-around d-flex">
              <span><img :src="bug?.creator.picture" alt=""></span>
              <span>
                <div>Reported By</div>
                <div>{{ bug?.creator.name }}</div>
              </span>
              <span>
                <div>Priority</div>
                <div>{{ bug?.priority }}</div>
              </span>
              <span>
                <div>Last Updated</div>
                <div>{{ bug?.updatedAt }}</div>
              </span>
              <span>
                <div>Bug Status</div>
                <div v-if="bug?.closed === true">Closed</div>
                <div v-else>Open</div>
                <button @click.prevent="closeBug()" v-if="bug?.creatorId === account.id && bug?.closed === false" class="btn btn-success">Close Bug</button>
                <button @click.prevent="closeBug()" v-if="bug?.creatorId === account.id && bug?.closed === true" class="btn btn-success">Open Bug</button>
              </span>
            </div>
            <div class="col">
              <p>{{ bug?.description }}</p>
            </div>
            <div class="col">
              <span>
                <User v-for="u in users" :key="u.id" :user="u" />
              </span>
              <span>
                <button @click.prevent="trackBug()" title="Track This Bug" class="btn mx-3 fs-3 mdi mdi-magnify-plus btn-success"></button>
              </span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col d-flex">
            <span class="m-3">
              <h1>Notes</h1>
            </span>
            <span class="m-3">
              <button data-bs-toggle="modal" data-bs-target="#note-form" title="Post A New Note" class="btn fs-3 btn-success mx-3 mdi mdi-pencil-plus"></button>
            </span>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="card border-dark p-3">
              <Note v-for="n in notes" :key="n.id" :note="n" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="container-fluid">
    <div class="row my-5">
      <div class="col d-flex justify-content-center">
        <h1>
          <i class="mdi mdi-spin mdi-ladybug"></i>
          <i class="mdi mdi-spin mdi-ladybug"></i>
          <i class="mdi mdi-spin mdi-ladybug"></i>
        </h1>
      </div>
    </div>
  </div>

  <Modal id="note-form">
    <template #modal-title>
      <h4>New Note</h4>
    </template>
    <template #modal-body>
      <NoteForm />
    </template>
  </Modal>
</template>

<script>
import { computed, watchEffect } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
import { bugsService } from '../services/BugsService'
import { notesService } from '../services/NotesService'
import { trackedBugsService } from '../services/TrackedBugsService'
export default {
  name: 'Bug',
  setup() {
    const route = useRoute()
    watchEffect(async() => {
      if (route.params.bugId) {
        AppState.bug = null
        AppState.notes = []
        AppState.users = []
        try {
          await bugsService.getBugById(route.params.bugId)
          await notesService.getNotes(route.params.bugId)
          await trackedBugsService.getUsers(route.params.bugId)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    })
    const account = computed(() => AppState.account)
    return {
      account,
      async trackBug() {
        try {
          await trackedBugsService.trackBug(route.params.bugId)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async closeBug() {
        try {
          await bugsService.closeBug(route.params.bugId)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      bug: computed(() => AppState.bug),
      notes: computed(() => AppState.notes),
      users: computed(() => AppState.users)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
