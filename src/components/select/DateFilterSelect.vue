<template>
  <div class="flex row flex-center">
    <q-select
      outlined
      v-model="filter"
      :label="$t('DateFilterSelect.filter')"
      :options="options"
      style="min-width: 150px"
    />
    <q-input
      outlined
      v-model="dayFilter"
      mask="date"
      :rules="['date']"
      class="q-ml-md"
      hide-bottom-space
      v-if="filter.value === 3"
    >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="dayFilter">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
    <q-select
      outlined
      class="q-ml-md"
      v-model="monthFilter"
      :label="$t('DateFilterSelect.filterMonth')"
      :options="monthOptions"
      style="min-width: 150px"
      v-if="filter.value === 4"
    />
    <q-select
      outlined
      class="q-ml-md"
      v-model="yearFilter"
      :label="$t('DateFilterSelect.filterYear')"
      :options="yearOptions"
      style="min-width: 150px"
      v-if="filter.value >= 4"
    />
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import moment from 'moment';

const { t } = useI18n();
const dayFilter = ref(moment().format('YYYY/MM/DD'));
const options = ref([{
  value: 1,
  label: t('DateFilterSelect.options.currentWeek'),
}, {
  value: 2,
  label: t('DateFilterSelect.options.lastWeek'),
}, {
  value: 3,
  label: t('DateFilterSelect.options.day'),
}, {
  value: 4,
  label: t('DateFilterSelect.options.month'),
}, {
  value: 5,
  label: t('DateFilterSelect.options.year'),
}]);
const monthOptions = ref(Array(12).fill(0).map((_, index) => ({
  value: index,
  label: t(`DateFilterSelect.options.month${index}`),
})));
const yearFilter = ref(new Date().getFullYear());
const yearOptions = ref(Array(100).fill(0).map((_, index) => yearFilter.value - index));
const filter = ref(options.value[0]);
const monthFilter = ref(monthOptions.value.find(({ value }) => value === new Date().getMonth()));
</script>

<style scoped>

</style>
