<template>
  <NodeTypesCreateForm @created="handleCreated" />
  <NodeTypesTable :newTypeId="newTypeId" />
</template>

<script setup>
import NodeTypesTable from 'components/settings/NodeTypesTable.vue'
import NodeTypesCreateForm from 'src/components/settings/NodeTypesCreateForm.vue';
import { ref } from 'vue'
let newTypeId = ref('')
components: {
  NodeTypesTable,
  NodeTypesCreateForm
}

const handleCreated = (newNodeType) => {
  newTypeId.value = newNodeType.id
}

</script>

<style>

</style>
