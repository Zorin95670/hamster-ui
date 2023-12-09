<template>
  <q-chip
    dense
    :label="tag.name"
    :color="tag.backgroundColor"
    :text-color="tag.textColor"
    class="q-my-none q-ml-xs q-mr-none"
  />
</template>

<script setup>
defineProps({
  tag: {
    type: Object,
    required: true,
  },
});
</script>
