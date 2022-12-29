<template>
  <div class="q-mt-md">
    <q-table
      title="Tags"
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
              label="Delete Tag"
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
import { ref, onMounted, defineProps, watch } from 'vue'
import { Notify } from 'quasar'
const props = defineProps({
  newTagId: {
    default: ''
  }
})

const columns = [
  {
    name: 'name',
    label: 'Tag Name',
    align: 'left',
    field: 'name',
    sortable: true
  }
]

let rows = ref([])
const selected = ref([])
const getTags = () => {
  fetch('http://localhost:3333/api/v1/tags')
    .then(response => response.json())
    .then(data => {
      rows.value = data
    })
    .catch(error => console.error("Error: ", error))
}

watch(() => props.newTagId, (newTagId) => {
  getTags()
})

onMounted(() => {
  getTags()
})

const handleDelete = () => {
  let deleteCount = selected.value.length
  selected.value.forEach((tag, index) => {
    fetch(`http://localhost:3333/api/v1/tags/${tag.id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        selected.value.splice(0, 1)
        if(selected.value.length === 0) {
          getTags()
          Notify.create({
            message: `${deleteCount} Tags deleted successfully`,
            color: 'positive',
            position: 'top-right'
          })
        }
      })
      .catch(error => console.error("Error: ", error))
  })

}
</script>

<style>

</style>
