<template>
  <div class="q-mt-md">
    <q-table
      title="Node Types"
      :rows="rows"
      :columns="columns"
      row-key="name"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

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

onMounted(() => {
  fetch("http://localhost:3333/api/v1/node-types")
    .then(response => response.json())
    .then(data => {
      rows.value = data
    })
    .catch(error => console.error("Error: ", error))
})
</script>
