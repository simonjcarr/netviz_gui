<template>
  <div class="q-gutter-y-md">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="list" label="List View" />
          <q-tab name="network" label="Network View" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated style="height: 85vh">
          <q-tab-panel name="list">
            <NodeListView />
          </q-tab-panel>

          <q-tab-panel name="network">
            <div class="text-h6">Network View</div>
            <NodeNetworkView />
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import NodeListView from 'components/settings/NodeListView.vue'
import NodeNetworkView from 'components/settings/NodeNetworkView.vue'

let tab = ref('list')


</script>

<style>

</style>
