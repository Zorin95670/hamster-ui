<template>
  <q-page class="flex column items-start">
    <day-tracking-image
      v-model="activities"
      class="q-mt-md"
    />
    <h3>{{ $t('HomePage.title') }}</h3>
    <div class="flex q-mb-md">
      <q-btn
        outline
        :label="$t('HomePage.startActivity')"
        color="primary"
        @click="openAddActivityDialog()"
      />
    </div>
    <q-card class="flex row items-center q-mb-md">
      <q-card-section>
        <div class="text-h6">{{ $t('HomePage.filters') }}</div>
      </q-card-section>
      <q-card-section>
        <q-input
          outlined
          :label="$t('HomePage.filterByName')"
          v-model="filterName"
          @update:model-value="onFilter"
        />
      </q-card-section>
      <q-card-section>
        <tag-select
          outlined
          :label="$t('HomePage.filterByTag')"
          v-model="filterTags"
          @update:model-value="onFilter"
        />
      </q-card-section>
    </q-card>
    <activity-table
      :activities="activities"
      :loading="loading"
      @edit="openAddActivityDialog"
      @save="saveActivity"
      @stop="stopActivity"
      @remove="openRemoveActivityDialog"
    />
  </q-page>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import ActivityTable from 'components/table/ActivityTable.vue';
import TagSelect from 'components/select/TagSelect.vue';
import * as activityService from 'src/services/ActivityService.js';
import Events from 'src/composables/Events';
import DayTrackingImage from 'components/image/DayTrackingImage.vue';

const activities = ref([]);
const loading = ref(true);
const filterName = ref(null);
const filterTags = ref([]);
const filters = {};

let reloadEventSubscription;

function search() {
  loading.value = true;

  activityService.find(filters)
    .then((response) => {
      activities.value = response.data.content;
    })
    .catch((response) => console.log('error', response))
    .finally(() => {
      loading.value = false;
    });
}

function onFilter() {
  filters.name = filterName.value.length > 0 ? `lk_*${filterName.value}*` : null;
  filters.tags = filterTags.value.length > 0 ? `lk_*${filterTags.value.map(({ id }) => id).join(',')}*` : null;

  search();
}

function openAddActivityDialog(activityId) {
  Events.DialogEvent.next({
    key: 'add-edit-activity',
    type: 'open',
    last: activities.value.find(({ endDate }) => !endDate),
    edit: activityId !== undefined,
    activity: activityId !== undefined
      ? activities.value.find(({ id }) => id === activityId)
      : undefined,
  });
}

function openRemoveActivityDialog(activityId) {
  Events.DialogEvent.next({
    key: 'remove-activity',
    type: 'open',
    activity: activities.value.find(({ id }) => id === activityId),
  });
}

async function saveActivity(activityId) {
  loading.value = true;
  const activity = activities.value.find(({ id }) => id === activityId);
  await activityService.update(activity);
  search();
}

async function stopActivity(activityId) {
  const activity = activities.value.find(({ id }) => id === activityId);
  activity.endDate = Date.now();
  await activityService.update(activity);
  search();
}
onMounted(() => {
  reloadEventSubscription = Events.ReloadActivitiesEvent.subscribe(search);
  search();
});

onUnmounted(() => {
  reloadEventSubscription.unsubscribe();
});
</script>
