<template>
  <q-page class="flex column items-start">
    <h3>{{ $t('TagsPage.title') }}</h3>
    <q-card class="flex row items-center">
      <q-card-section>
        <div class="text-h6">{{ $t('TagsPage.filters') }}</div>
      </q-card-section>
      <q-card-section>
        <q-input
          outlined
          :label="$t('TagsPage.filterByName')"
          v-model="filterName"
          @update:model-value="onFilter"
        />
      </q-card-section>
      <q-card-section>
        <q-checkbox
          :label="$t('TagsPage.filterByUnused')"
          v-model="filterUnused"
          @update:model-value="onFilter"
        />
      </q-card-section>
    </q-card>
    <tag-table
      class="q-mt-md"
      :tags="tags"
      @save="updateTag"
      @update:background-color="(tag) => openUpdateColorDialog('backgroundColor', tag)"
      @update:text-color="(tag) => openUpdateColorDialog('textColor', tag)"
    />
  </q-page>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import * as tagService from 'src/services/TagService';
import TagTable from 'components/table/TagTable.vue';
import Events from 'src/composables/Events';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';

const $q = useQuasar();
const { t } = useI18n();
const tags = ref([]);
const loading = ref(true);
const filterName = ref('');
const filterUnused = ref(false);
const filters = { withCount: 'true' };

let updateColorEventSubscription;
let reloadTagEventSubscription;

function search() {
  loading.value = true;

  tagService.find(filters)
    .then((response) => {
      tags.value = response.data.content;
    })
    .catch((response) => console.log('error', response))
    .finally(() => {
      loading.value = false;
    });
}

function onFilter() {
  filters.name = filterName.value.length > 0 ? `lk_*${filterName.value}*` : null;
  filters.linkedActivity = filterUnused.value ? 'gt_0' : null;

  search();
}

function openUpdateColorDialog(field, tag) {
  Events.DialogEvent.next({
    key: 'update-color',
    type: 'open',
    id: tag.id,
    field,
    color: tag[field],
  });
}

function updateColor(event) {
  tags.value
    .find(({ id }) => id === event.id)[event.field] = event.color;
}

function updateTag(tagId) {
  tagService
    .update(tags.value.find(({ id }) => id === tagId))
    .then(() => {
      $q.notify({
        message: t('TagsPage.tagUpdated'),
        color: 'positive',
      });
    });
}

onMounted(() => {
  updateColorEventSubscription = Events.UpdateColorEvent.subscribe(updateColor);
  reloadTagEventSubscription = Events.ReloadTagsEvent.subscribe(search);
  search();
});

onUnmounted(() => {
  updateColorEventSubscription.unsubscribe();
  reloadTagEventSubscription.unsubscribe();
});
</script>
