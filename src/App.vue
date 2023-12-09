<template>
  <router-view />
</template>

<script setup>
import { useTokenStore } from 'stores/token-store';
import { onMounted } from 'vue';

const tokenStore = useTokenStore();

onMounted(() => {
  tokenStore.initToken();
});

</script>
