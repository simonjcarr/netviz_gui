<template>
  <div>

    <div class="q-mt-md">
    <q-table
      title="Node Types"
      :rows="rows"
      :columns="columns"
      row-key="id"
      selection="multiple"
      v-model:selected="selected"
      @row-click="handleRowClick"
    >
    <template #top-right>
        <q-toolbar v-if="selected.length > 0">
          <q-toolbar-title>
            <q-btn
              color="negative"
              label="Delete Selected"
              icon="delete"
              @click="handleDelete"
              class="q-ml-md"
            />
          </q-toolbar-title>
        </q-toolbar>
      </template>
    </q-table>
  </div>
  </div>
</template>

<script setup>

import { onMounted, ref, defineProps, watch, defineEmits } from 'vue';
import { Notify } from 'quasar'


const emit = defineEmits(['nodeSelected'])

const props = defineProps({
  newNodeId: {
    default: ''
  }
})
let selected = ref([])
const columns = [
  {
    name: 'label',
    label: 'Label',
    align: 'left',
    field: 'label',
    sortable: true,
  },
  { name: 'ipv4', align: 'center', label: 'ipv4', field: 'ipv4', sortable: true },
  { name: 'hostname', label: 'hostname', field: 'hostname', sortable: true },
  { name: 'project', label: 'Project', field: 'project', sortable: true}
]

let rows = ref([])

const getNodes = () => {
  fetch("http://localhost:3333/api/v1/nodes")
    .then(response => response.json())
    .then(data => {
      rows.value = data
    })
    .catch(error => console.error("Error: ", error))
}

onMounted(() => {
  getNodes()
})
watch(() => props.newNodeId, (newTypeId) => {
  getNodes()
})


const handleRowClick = async (evt, row) => {
  emit('nodeSelected', row.id)
}

const handleDelete = () => {
  // Delete selected items by an api delete call to node-types
  selected.value.forEach((item) => {
    fetch(`http://localhost:3333/api/v1/nodes/${item.id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        selected.value.splice(0,1)
        if(selected.value.length === 0) {
          getNodes()
          Notify.create({
            message: 'Node type deleted',
            color: 'positive',
            position: 'top-right',
            timeout: 2000
          })
        }
      })
      .catch(error => console.error("Error: ", error))
  })
  console.log(selected.value)
}

</script>

<style>

</style>
