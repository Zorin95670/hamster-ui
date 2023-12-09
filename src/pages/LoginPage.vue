<template>
  <q-page class="flex flex-center">
    <q-btn
      :href="url"
      label="Login with google"
      v-if="!loading"
    />
    <q-circular-progress indeterminate v-else/>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { api } from 'boot/axios';
import { useUserStore } from 'src/stores/user-store';
import { useTokenStore } from 'src/stores/token-store';
import { useRouter } from 'vue-router';

const url = ref(process.env.OAUTH_URL);
const userStore = useUserStore();
const tokenStore = useTokenStore();
const router = useRouter();
const loading = ref(false);

onMounted(async () => {
  const code = new URL(window.location.href).searchParams.get('code');

  if (tokenStore.exists) {
    await router.push('/activities');
    return;
  }

  if (!code) {
    return;
  }

  loading.value = true;

  api.post('/oauth', { code })
    .then((response) => {
      userStore.updateUser(response.data.user);
      tokenStore.updateToken(response.data.token);
      window.location.href = /^[^?]+/.exec(window.location.href);
    })
    .finally(() => {
      loading.value = false;
    });
});
</script>
