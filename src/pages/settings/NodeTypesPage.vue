<template>
  <NodeTypesCreateForm />
  <NodeTypesTable />
</template>

<script>
import NodeTypesTable from 'components/settings/NodeTypesTable.vue'
import NodeTypesCreateForm from 'src/components/settings/NodeTypesCreateForm.vue';
export default {
  components: {
    NodeTypesTable,
    NodeTypesCreateForm
  }
}
</script>

<style>

</style>
