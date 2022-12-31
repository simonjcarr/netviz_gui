<template>
  <q-list bordered v-if="connections.length > 0">
    <div class="q-pa-md" style="font-weight: bold">
      This node is connected to the following
    </div>
    <q-item clickable v-ripple v-for="connection in connections" :key="connection.id">
      <q-item-section avatar><q-icon name="lan" color="primary" /></q-item-section>
      <q-item-section>  {{ connection.name }} ({{ connection.nodeTypeName }})</q-item-section>
    </q-item>
  </q-list>
  <div v-else>
    <div  style="font-weight: bold">
      This node is not connected to any other nodes
    </div>
  </div>
</template>

<script setup>
  import { onMounted, ref, defineProps, watch } from 'vue'

  let id = ref(null)
  let connections = ref([])

  const props = defineProps({
    nodeId: {
      default: null
    }
  })

  const getConnections = () => {
    fetch(`http://localhost:3333/api/v1/node-connections/${id.value}`)
      .then(response => response.json())
      .then(data => {
        connections.value = data
      })
      .catch(error => console.error("Error: ", error))
  }

  watch(() => props.nodeId, (selectedNode) => {
    if(props.nodeId === null) return
    id.value = props.nodeId
    getConnections()
  })
</script>

<style>

</style>
