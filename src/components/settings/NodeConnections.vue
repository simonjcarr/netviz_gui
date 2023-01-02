<template>
  <q-card class="my-card" v-if="props.nodeId">
    <q-card-section>
      <div class="text-h6">
        <q-icon name="hub" color="primary" />
        Node Connections</div>
    </q-card-section>

    <q-card-section>
      <NodeConnectionsList :nodeId="props.nodeId" />
    </q-card-section>
    <q-card-section>
      <div>Add new connection</div>
      <NodeConnectionsCreateForm :nodeId="nodeId" />
    </q-card-section>
  </q-card>
</template>

<script setup>
import NodeConnectionsCreateForm from './NodeConnectionsCreateForm.vue';
import NodeConnectionsList from 'components/settings/NodeConnectionsList.vue'
import { ref, defineEmits, defineProps, onMounted, watch } from 'vue'


const props = defineProps({
  nodeId: {
    default: null
  }
})





</script>

<style>

</style>
