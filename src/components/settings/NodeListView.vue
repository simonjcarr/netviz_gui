<template>
  <div>
    <q-splitter
      v-model="splitter"
      class="gt-sm"
    >
      <template v-slot:before>
        <div class="q-pa-md">
          <div class="text-h4 q-mb-md">Before</div>
          <div v-for="n in 20" :key="n" class="q-my-md">{{ n }}. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</div>
        </div>
      </template>

      <template v-slot:after>
        <div class="q-pa-md">
          <div class="text-h4 q-mb-md">After</div>
          <div v-for="n in 20" :key="n" class="q-my-md">{{ n }}. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</div>
        </div>
      </template>
    </q-splitter>
    <div class="lt-md">
      I only show on small screens
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
let splitter = ref(50)
let nodes = ref([])
const fetchNodes = async () => {
  const res = await fetch('http://localhost:3000/api/v1/nodes')
  const data = await res.json()
  nodes.value = data
}
onMounted(() => {
  fetchNodes()
})
</script>

<style>

</style>
