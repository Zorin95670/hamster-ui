<template>
  <q-drawer
    v-model="drawer"
    show-if-above
    :width="200"
    :breakpoint="400"
  >
    <q-scroll-area
      style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd"
    >
      <q-list padding>
        <q-item
          clickable
          v-ripple
          :active="$route.path === '/activities'"
          @click="$router.push('/activities')"
        >
          <q-item-section avatar>
            <q-icon name="schedule" />
          </q-item-section>

          <q-item-section>
            {{ $t('ApplicationDrawer.myActivities') }}
          </q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          :active="$route.path === '/tags'"
          @click="$router.push('/tags')"
        >
          <q-item-section avatar>
            <q-icon name="sell" />
          </q-item-section>

          <q-item-section>
            {{ $t('ApplicationDrawer.allTags') }}
          </q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          :active="$route.path === '/statistics'"
          @click="$router.push('/statistics')"
        >
          <q-item-section avatar>
            <q-icon name="area_chart" />
          </q-item-section>

          <q-item-section>
            {{ $t('ApplicationDrawer.statistics') }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>

    <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
      <div class="absolute-bottom bg-transparent">
        <q-avatar size="56px" class="q-mb-sm">
          <img v-if="image" :src="image" :alt="$t('ApplicationDrawer.userImageAlt')">
        </q-avatar>
        <div class="text-weight-bold">{{ fullName }}</div>
        <div>{{ email }}</div>
      </div>
    </q-img>
  </q-drawer>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useUserStore } from 'stores/user-store';
import { getPicture } from 'src/services/UserService';
import { useTokenStore } from 'stores/token-store';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const tokenStore = useTokenStore();
const drawer = ref(true);
const image = ref(null);
const fullName = computed(() => `${userStore.firstName} ${userStore.lastName}`);
const email = computed(() => userStore.email);

const router = useRouter();
getPicture(tokenStore.value).then((data) => {
  image.value = data;
}).catch(() => {
  tokenStore.deleteToken();
  router.push('/');
});
</script>

<style scoped>

</style>
