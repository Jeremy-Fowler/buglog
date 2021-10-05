<template>
  <div v-if="bug" class="container-fluid">
    <div class="row">
      <div class="col">
        <h1>
          <span>
            {{ bug?.title }}
          </span>
          <span>
            <button v-if="bug?.creatorId === account.id && bug?.closed === false" class="btn m-3 fs-3 btn-warning mdi mdi-pencil" data-bs-toggle="modal" data-bs-target="#edit-form"></button>
          </span>
        </h1>
        <div class="row">
          <div class="card border-dark">
            <h2 class="col justify-content-around d-flex my-3">
              <span><img :src="bug?.creator.picture" alt=""></span>
              <span>
                <div>Reported By</div>
                <div>{{ bug?.creator.name }}</div>
              </span>
              <span>
                <div>Priority</div>
                <div>{{ bug?.priority }}</div>
              </span>
              <span v-if="bug.closedDate === null">
                <div>Last Updated</div>
                <div>{{ new Date(bug?.updatedAt).toLocaleDateString('en-US') }}</div>
              </span>
              <span v-else>
                <div>Closed At</div>
                <div>{{ new Date(bug?.closedDate).toLocaleDateString('en-US') }}</div>
              </span>
              <span>
                <div>Bug Status</div>
                <div v-if="bug?.closed === true"><i class="mdi text-success mdi-checkbox-blank-circle-outline"></i>Closed</div>
                <div v-else><i class="mdi text-danger mdi-checkbox-blank-circle-outline"></i>Open</div>
                <button @click.prevent="closeBug()" v-if="bug?.creatorId === account.id && bug?.closed === false" class="btn btn-success">Close Bug</button>
                <button @click.prevent="closeBug()" v-if="bug?.creatorId === account.id && bug?.closed === true" class="btn btn-success">Open Bug</button>
              </span>
            </h2>
            <div class="col">
              <h3 class="m-5">
                {{ bug?.description }}
              </h3>
            </div>
            <div class="col d-flex mx-5 mb-1">
              <User v-for="u in users" :key="u.id" :user="u" />
              <span>
                <button @click.prevent="trackBug()" title="Track This Bug" class="btn m-3 fs-3 mdi mdi-magnify-plus btn-success"></button>
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
              <button data-bs-toggle="modal" data-bs-target="#note-form" title="Post A New Note" class="btn fs-3 btn-success mx-3 mdi mdi-comment-plus"></button>
            </span>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div v-if="notes.length > 0" class="card border-dark p-3">
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
  <Modal id="edit-form">
    <template #modal-title>
      <h4>Edit Bug</h4>
    </template>
    <template #modal-body>
      <EditForm :bug="bug" />
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
