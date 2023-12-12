<template>
  <div class="flex row justify-center items-center">
    <q-card class="q-mr-md">
      <q-card-section>
        <h6 class="q-ma-none">{{ $t('TodayChart.nameTitle' )}}</h6>
      </q-card-section>
      <q-card-section>
        <div
          v-for="data in names"
          :key="data.label"
        >
          <label>{{data.label}} ({{ moment(data.duration).utc().format('H[h] m[min]')}})</label>
          <div
            style="width: 200px; height: 25px; border: 1px solid black"
          >
            <div
              :style="`height: 100%; background-color: grey; width: ${data.width}px;`"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-card>
      <q-card-section>
        <h6 class="q-ma-none">{{ $t('TodayChart.tagTitle' )}}</h6>
      </q-card-section>
      <q-card-section>
        <div
          v-for="data in tags"
          :key="data.label"
        >
          <label>{{data.label}} ({{ moment(data.duration).utc().format('H[h] m[min]')}})</label>
          <div
            style="width: 200px; height: 25px; border: 1px solid black"
          >
            <div
              :style="`height: 100%; background-color: grey; width: ${data.width}px;`"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import moment from 'moment';

const props = defineProps({
  activities: {
    type: Array,
    default: () => [],
  },
});
const names = ref([]);
const tags = ref([]);

function initData() {
  const dataNames = [];
  const dataTags = [];
  let namesTotal = 0;
  let tagsTotal = 0;

  props.activities.forEach((activity) => {
    let index = dataNames.findIndex(({ label }) => label === activity.name);
    const time = (activity.endDate || Date.now()) - activity.startDate;

    if (index < 0) {
      dataNames.push({ label: activity.name, duration: 0 });
      index = dataNames.length - 1;
    }
    namesTotal += time;
    dataNames[index].duration += time;

    activity.tags.forEach((tag) => {
      index = dataTags.findIndex(({ label }) => label === tag.name);

      if (index < 0) {
        dataTags.push({ label: tag.name, duration: 0 });
        index = dataTags.length - 1;
      }
      tagsTotal += time;
      dataTags[index].duration += time;
    });
  });

  names.value = dataNames.map(({ label, duration }) => ({
    label,
    duration,
    width: (duration / namesTotal) * 200,
  })).sort((a, b) => b.duration - a.duration);
  tags.value = dataTags.map(({ label, duration }) => ({
    label,
    duration,
    width: (duration / tagsTotal) * 200,
  })).sort((a, b) => b.duration - a.duration);

  console.log(namesTotal, names.value);
  console.log(tagsTotal, tags.value);
}
watch(() => props.activities, initData);
</script>

<style scoped>

</style>
