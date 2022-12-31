
<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn label="Create Node Type" color="primary" @click="showForm = true" />

    <q-dialog v-model="showForm" >
      <q-card style="width: 100%">
        <q-card-section>
          <div class="text-h6">Create Node Type</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form @submit="onSubmit" class="q-gutter-md" @reset="onReset" ref="typeForm">
            <div>
              <q-input v-model="name" label="Name" filled lazy-rules
                :rules="[val => val.length > 0 || 'Name is required']" />
              <q-input filled v-model="color" class="my-input">
                <template v-slot:append>
                  <q-icon name="colorize" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-color v-model="color" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <q-input class="q-mt-md" v-model="size" type="number" label="Size" filled lazy-rules
                :rules="[val => val > 0 || 'Size must be greater than zero']" />
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
let color = ref('#00ff00')
let size = ref(10)
const typeForm = ref(null)
const emit = defineEmits(['created'])


let onSubmit = () => {
  console.log(color.value)
  console.log(name.value)
  console.log(size.value)
  fetch('http://localhost:3333/api/v1/node-types', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name.value,
      color: color.value,
      size: parseInt(size.value)
    })
  })
    .then(response => response.json())
    .then(data => {
      emit('created', data)
      Notify.create({
        message: 'Type created successfully',
        color: 'positive',
        position: 'top-right'
      })
      color.value = '#00ff00'
      name.value = ''
      size.value = 10
      typeForm.value.resetValidation()
    })
    .catch(error => console.error("Error: ", error))
}
let onReset = () => {
  color.value = '#00ff00'
  name.value = ''
  size.value = 10

}
</script>

<style>

</style>
