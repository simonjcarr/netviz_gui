<template>
  <div class="q-mt-md">
    <q-table
      title="Node Types"
      :rows="rows"
      :columns="columns"
      row-key="id"
      selection="multiple"
      v-model:selected="selected"
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
</template>

<script setup>
import { onMounted, ref, defineProps, watch } from 'vue';
import { Notify } from 'quasar'

const props = defineProps({
  newTypeId: {
    default: ''
  }
})
let selected = ref([])
const columns = [
  {
    name: 'name',
    label: 'Name',
    align: 'left',
    field: 'name',
    sortable: true
  },
  { name: 'color', align: 'center', label: 'Color', field: 'color', sortable: true },
  { name: 'size', label: 'Size', field: 'size', sortable: true },
]

let rows = ref([])

const getNodeTypes = () => {
  fetch("http://localhost:3333/api/v1/node-types")
    .then(response => response.json())
    .then(data => {
      rows.value = data
    })
    .catch(error => console.error("Error: ", error))
}

onMounted(() => {
  getNodeTypes()
})
watch(() => props.newTypeId, (newTypeId) => {
  getNodeTypes()
})
const handleDelete = () => {
  // Delete selected items by an api delete call to node-types
  selected.value.forEach((item) => {
    fetch(`http://localhost:3333/api/v1/node-types/${item.id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        selected.value.splice(0,1)
        if(selected.value.length === 0) {
          getNodeTypes()
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
