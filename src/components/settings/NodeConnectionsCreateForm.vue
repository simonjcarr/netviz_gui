<template>
  <div>
    <q-form
      @submit="onSubmit"
      class="q-gutter-md"
    >
    <q-select v-model="selectedNode" :options="nodes" option-value="id" option-label="label" label="Standard" filled />
      <div>
        <q-btn v-if="selectedNode" label="Save Connection" type="submit" color="primary"/>
      </div>
    </q-form>


  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, watch } from 'vue'
import { Notify } from 'quasar'
let nodes = ref([])
let selectedNode = ref(null)
let thisNode = ref(null)


const props = defineProps({
  nodeId: {
    required: true
  }
})

watch(() => props.nodeId, (value) => {
  thisNode.value = value
  getNodes()
})

const getNodes = async () => {

  try {
    const response = await fetch('http://localhost:3333/api/v1/nodes')
    const data = await response.json()
    nodes.value = data.filter(node => node.id !== thisNode.value)
  } catch (error) {
    Notify.create({
      message: 'Error getting nodes',
      color: 'negative',
      position: 'top'
    })
  }
}
onMounted(() => {
  getNodes()
  thisNode.value = props.nodeId
})

const onSubmit = () => {
  fetch('http://localhost:3333/api/v1/node-connections', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      to: selectedNode.value.id,
      from: thisNode.value
    })
  })
    .then(response => response.json())
    .then(data => {
      Notify.create({
        message: 'Node Connection created successfully',
        color: 'positive',
        position: 'top-right'
      })
    })
    .catch(error => console.error("Error: ", error))
}
</script>

<style>

</style>
