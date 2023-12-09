<template>
  <q-page class="flex column items-start">
    <h3>{{ $t('StatisticsPage.title') }}</h3>
    <q-card class="flex row items-center q-mb-md">
      <q-card-section>
        <div class="text-h6">{{ $t('StatisticsPage.filters') }}</div>
      </q-card-section>
      <q-card-section>
        <tag-select
          outlined
          :label="$t('StatisticsPage.filterByTag')"
          v-model="filterTags"
          @update:model-value="onFilter"
        />
      </q-card-section>
      <q-card-section>
        <date-filter-select/>
      </q-card-section>
    </q-card>
    <div>
      <tags-pie-chart/>
    </div>
  </q-page>
</template>

<script setup>
import TagSelect from 'components/select/TagSelect.vue';
import { ref } from 'vue';
import DateFilterSelect from 'components/select/DateFilterSelect.vue';
import TagsPieChart from 'components/chart/TagsPieChart.vue';

const filterTags = ref([]);

function onFilter() {
  console.log('passe');
}
</script>

<style scoped>

</style>
