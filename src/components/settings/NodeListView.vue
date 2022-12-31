<template>
  <div style="height: 100%">
    <q-splitter v-model="splitter" class="gt-sm" style="height: 100%">
      <template v-slot:before>
        <div>
          <NodeCreateForm @created="handleCreated" />
        </div>
        <div>
          <NodeListTable @nodeSelected="handleNodeSelected" />
        </div>
      </template>

      <template v-slot:separator>
        <q-avatar color="primary" text-color="white" size="40px" icon="drag_indicator" />
      </template>

      <template v-slot:after>
        <div>
          <NodeDetail :nodeId="selectedNode" />
        </div>
        <div class="q-mt-sm">
          <NodeConnections :nodeId="selectedNode" />
        </div>
      </template>
    </q-splitter>
    <div class="lt-md">
      <div>
        <NodeCreateForm @created="handleCreated" />
      </div>
      <div>
        <NodeListTable @nodeSelected="handleNodeSelected" />
      </div>
      <div class="q-mt-sm">
        <NodeDetail :nodeId="selectedNode" style="width: 100%" />
      </div>
      <div class="q-mt-sm">
        <NodeConnections :nodeId="selectedNode" />
      </div>
    </div>
  </div>
</template>

<script setup>
import NodeCreateForm from 'components/settings/NodeCreateForm.vue'
import NodeDetail from 'components/settings/NodeDetail.vue'
import NodeListTable from 'components/settings/NodeListTable.vue'
import NodeConnections from 'src/components/settings/NodeConnections.vue'
import { ref, onMounted } from 'vue'
let splitter = ref(70)
let nodes = ref([])
let selectedNode = ref(null)
const fetchNodes = async () => {
  const res = await fetch('http://localhost:3333/api/v1/nodes')
  const data = await res.json()
  nodes.value = data
}
const handleNodeSelected = (nodeId) => {
  selectedNode.value = nodeId
}
const handleCreated = (node) => {
  fetchNodes()
  selectedNode.value = node.id
}
onMounted(() => {
  fetchNodes()
})
</script>

<style>

</style>
