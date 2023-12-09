<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">
        {{ $t('TagsPieChart.title') }}
      </div>
    </q-card-section>

    <q-card-section>
      <Pie
        :data="data"
        :options="options"
      />
    </q-card-section>
    <q-inner-loading :showing="loading">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
  </q-card>
</template>

<script setup>
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'vue-chartjs';
import { onMounted, ref } from 'vue';
import * as TagService from 'src/services/TagService';
import * as StatisticService from 'src/services/StatisticService';

ChartJS.register(ArcElement, Tooltip, Legend);

const loading = ref(true);
const data = ref({
  labels: [],
  datasets: [
    {
      backgroundColor: [],
      data: [],
    },
  ],
});
const options = ref({
  responsive: true,
  maintainAspectRatio: false,
});

function search() {
  let stats = [];
  const tempData = {
    labels: [],
    datasets: [
      {
        backgroundColor: [],
        data: [],
      },
    ],
  };

  StatisticService.getTagDistribution().then((response) => {
    stats = response.data;
    return TagService.find({
      id: Object.keys(stats).join(''),
    });
  }).then((response) => {
    response.data.content.forEach((tag) => {
      tempData.labels.push(tag.name);
      tempData.datasets[0].backgroundColor.push(tag.backgroundColor);
      tempData.datasets[0].data.push(stats[tag.id]);
    });
  }).finally(() => {
    data.value = tempData;
    loading.value = false;
  });
}

onMounted(() => search());
</script>

<style scoped>

</style>
