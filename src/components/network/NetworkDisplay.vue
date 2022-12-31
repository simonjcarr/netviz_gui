<template>
  <div id="mynetwork" style="height: 100%"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
let rawData = ref([])
let dataSet = ref([])
let edgesData = ref([])
let nodes = ref(new vis.DataSet(dataSet.value))

const optionsData = ref({
  nodes: {
    shape: "dot",
    size: 16,
    font: {
      size: 12,
      color: "#ffffff",
    },
    borderWidth: 2,
  },
  edges: {
    width: 2,
  },
  physics: {
    enabled: true,
  },
})


const getRawData = async () => {
  return new Promise(async (resolve, reject) => {
    fetch('http://localhost:3333/api/v1/nodes')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        rawData.value = data
        resolve()
      })
  })
}

const getDataSet = async () => {
  return new Promise(async (resolve, reject) => {
    rawData.value.forEach((node) => {
        dataSet.value.push({
          id: node.id,
          label: node.label,
          size: node.type.size,
          color: node.type.color,
        })
    })
    // dataSet.value = rawData.value
    resolve()
  })
}

const getEdges = async () => {
  return new Promise(async (resolve, reject) => {
    rawData.value.forEach((node) => {
      node.connectedFrom.forEach((connectedFrom) => {
        edgesData.value.push({
          from: node.id,
          to: connectedFrom.connectedToId,
          color: "blue",
        })
      })
    })
    resolve()
  })
}

onMounted(async () => {

  await getRawData()
  await getDataSet()
  await getEdges()
  nodes = new vis.DataSet(dataSet.value);
  // create an array with edges
  var edges = new vis.DataSet(edgesData.value);

  // create a network
  var container = document.getElementById("mynetwork");
  var data = {
    nodes: nodes,
    edges: edges,
  };
  var options = optionsData.value;
  var network = new vis.Network(container, data, options);
});
</script>

<style>
#mynetwork {
  width: 100%;
  height: 100%;
  border: 1px solid lightgray;
  background-color: darkgray;
}
</style>
