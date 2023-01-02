<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn label="Create Node" color="primary" @click="showForm = true" />

    <q-dialog v-model="showForm" :persistent="true" >
      <q-card style="width: 100%">
        <q-card-section>
          <div class="text-h6">Create Node</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form @submit="onSubmit" class="q-gutter-md" @reset="onReset" ref="nodeForm">
            <div>
              <q-input v-model="name" label="Node Name" filled lazy-rules
                :rules="[val => val.length > 0 || 'Node Name is required']" />
            </div>

            <div>
              <q-select v-model="typeId" label="Node Type" filled :options="nodeTypesList" option-value="id"
                option-label="name" :rules="[val => parseInt(val.id) > 0 || 'You must select a Node Type']" />
            </div>

            <div>
              <q-select filled v-model="nodeTagsSelected" multiple :options="nodeTagsList" use-chips  option-value="id" option-label="name"
                label="Select Tags" />
            </div>

            <div>
              <q-input filled v-model="ipv4" label="IPV4" type="text" />
            </div>

            <div>
              <q-input filled v-model="hostname" label="Hostname" type="text" />
            </div>

            <div>
              <q-input filled v-model="project" label="Project" type="text" />
            </div>
            <div>
              <q-select filled v-model="groupSelected" :options="groupList"  option-value="id" option-label="name"
                label="Select Group" />
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
import { ref, defineEmits, onMounted } from 'vue'
import { Notify } from 'quasar'
let showForm = ref(false)
const nodeForm = ref(null)
let name = ref('')
const nodeTypesList = ref([])
let typeId = ref('')
const nodeTagsList = ref([])
let nodeTagsSelected = ref([])
let groupList = ref([])
let groupSelected = ref(null)
let ipv4 = ref('')
let hostname = ref('')
let project = ref('')
const emit = defineEmits(['created'])


const getNodeTypes = async () => {
  const res = await fetch('http://localhost:3333/api/v1/node-types')
  const data = await res.json()
  nodeTypesList.value = data
}

const getTagList = async () => {
  const res = await fetch('http://localhost:3333/api/v1/tags')
  const data = await res.json()
  nodeTagsList.value = data
}

const getGroups = async () => {
  const res = await fetch('http://localhost:3333/api/v1/groups')
  const data = await res.json()
  groupList.value = data
}

onMounted(() => {
  getNodeTypes()
  getTagList()
  getGroups()
})

let onSubmit = () => {
  fetch('http://localhost:3333/api/v1/nodes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      label: name.value,
      typeId: typeId.value.id,
      ipv4: ipv4.value,
      hostname: hostname.value,
      project: project.value,
      tags: nodeTagsSelected.value,
      groupId: groupSelected.value.id
    })
  })
    .then(response => response.json())
    .then(data => {
      emit('created', data)
      name.value = ''
      nodeForm.value.resetValidation()
      Notify.create({
        message: 'Node created successfully',
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
