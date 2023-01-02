<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn label="Create Group" color="primary" @click="showForm = true" />

    <q-dialog v-model="showForm">
      <q-card style="width: 100%">
        <q-card-section>
          <div class="text-h6">Create Group</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form @submit="onSubmit" class="q-gutter-md" @reset="onReset" ref="tagsForm">
            <div>
              <q-input v-model="name" label="Group Name" filled lazy-rules
                :rules="[val => val.length > 0 || 'Group Name is required']" />
            </div>

            <div>
              <q-btn label="Submit" type="submit" color="primary" />
              <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
          </q-form>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Close" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { Notify } from 'quasar'
let showForm = ref(false)
let name = ref('')
const tagsForm = ref(null)
const emit = defineEmits(['created'])


let onSubmit = () => {
  fetch('http://localhost:3333/api/v1/groups', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name.value,
    })
  })
    .then(response => response.json())
    .then(data => {
      emit('created', data)
      name.value = ''
      tagsForm.value.resetValidation()
      Notify.create({
        message: 'Group created successfully',
        color: 'positive',
        position: 'top-right'
      })
    })
    .catch(error => console.error("Error: ", error))
}
let onReset = () => {
  name.value = ''
}
</script>

<style>

</style>
