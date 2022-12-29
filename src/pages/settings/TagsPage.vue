<template>
  <q-page>
    <div>
      <div class="col-6">
        <TagCreateForm @created="handleCreated" />
      </div>
      <div class="col-6">
        <TagList :newTagId="newTagId" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import TagCreateForm from 'components/settings/TagCreateForm.vue'
import TagList from 'components/settings/TagList.vue'
let newTagId = ref('')
const handleCreated = (tag) => {
  newTagId.value = tag.id
}
</script>

<style>

</style>
