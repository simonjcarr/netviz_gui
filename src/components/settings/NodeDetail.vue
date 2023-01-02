<template>

  <q-card class="my-card" v-if="node">
    <q-card-section>
      <div class="text-h6">
        <q-icon name="settings" color="primary" />
        Node Detail
      </div>
    </q-card-section>
    <q-card-section>
      <div class="row">
        <div class="text-weight-bold col-12 col-lg-6">Label</div>
        <div class="col-12 col-lg-6">{{ node.label }}</div>
      </div>
      <div class="row q-mt-sm">
        <div class="text-weight-bold col-12 col-lg-6">Hostname</div>
        <div class="col-12 col-lg-6">{{ node.hostname }}</div>
      </div>
      <div class="row q-mt-sm">
        <div class="text-weight-bold col-12 col-lg-6">IPV4</div>
        <div class="col-12 col-lg-6">{{ node.ipv4 }}</div>
      </div>
      <div class="row q-mt-sm">
        <div class="text-weight-bold col-12 col-lg-6">Project</div>
        <div class="col-12 col-lg-6">{{ node.project }}</div>
      </div>
      <div class="row q-mt-sm">
        <div class="text-weight-bold col-12 col-lg-6">Node Type</div>
        <div class="col-12 col-lg-6">{{ node.type.name }}</div>
      </div>
      <div class="row q-mt-sm">
        <div class="text-weight-bold col-12 col-lg-6">Group</div>
        <div class="col-12 col-lg-6">{{ node.group.name || ''}}</div>
      </div>
      <div class="row q-mt-sm">
        <div class="text-weight-bold col-12 col-lg-6">Tags</div>
        <div class="col-12 col-lg-6">
          <span v-for="t in node.tags">
        <q-chip color="primary" text-color="white"  :label="t.tag.name" size="sm" />
      </span>
        </div>
      </div>
    </q-card-section>
  </q-card>
  <div v-else>
    Select a node to display data
  </div>
</template>

<script setup>

import { ref, defineProps, watch } from 'vue'
const props = defineProps({
  nodeId: {
    default: null
  }
})
let node = ref(null)
watch(() => props.nodeId, (nodeId) => {
  if(nodeId === null) return
  fetch(`http://localhost:3333/api/v1/nodes/${nodeId}`)
    .then(response => response.json())
    .then(data => {
      node.value = data
    })
    .catch(error => console.error("Error: ", error))
})
</script>

<style>

</style>
