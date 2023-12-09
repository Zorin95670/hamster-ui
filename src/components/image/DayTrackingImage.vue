<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1460 120"
  >
    <rect
      :id="`time-${activity.id}`"
      v-for="activity in activities"
      :key="activity.id"
      :x="getX(activity.startDate, activity.id) + 10"
      y="0"
      :width="getX(activity.endDate || current) - getX(activity.startDate)"
      height="100"
      fill="teal"
    >
      <title>{{ activity.name }}</title>
    </rect>
    <rect
      :x="getX(current) + 9"
      y="0"
      :width="3"
      height="100"
      fill="red"
    ></rect>
    <line
      v-for="hour in hours"
      :key="`h${hour}-line`"
      :x1="(hour) * 60 + 10"
      y1="0"
      :x2="hour * 60 + 10"
      y2="100"
      stroke="black"
      stroke-width="1"
      stroke-dasharray="5,5"
    ></line>
    <text
      v-for="hour in hours"
      :key="`h${hour}-text`"
      :x="hour * 60 + 10"
      y="115"
      text-anchor="middle"
      font-size="10"
      fill="black">
      {{ hour }}h
    </text>
  </svg>
</template>

<script setup>
import moment from 'moment';
import { onMounted, ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
});

const activities = ref([]);
const hours = ref(Array(25).fill(0).map((_, v) => v));

function getX(d) {
  const date = moment(d || Date.now());
  return date.hours() * 60 + date.minutes();
}
const current = ref(Date.now());
const currentX = ref(getX(new Date()));
const currentMinutes = ref(new Date().getMinutes());

function initActivities() {
  const today = moment().startOf('day');

  activities.value = JSON.parse(JSON.stringify(props.modelValue))
    .filter(({ endDate }) => !endDate || moment(endDate).isSame(today, 'd'))
    .map((activity) => {
      if (!moment(activity.startDate).isSame(today, 'd')) {
        activity.startDate = today.valueOf();
      }
      return activity;
    });
}

watch(() => props.modelValue, initActivities);

onMounted(() => {
  initActivities();
  setInterval(() => {
    const date = new Date();
    current.value = Date.now();
    const x = getX(date);
    if (x !== currentX.value) {
      currentX.value = x;
      currentMinutes.value = date.getMinutes();
    }
  }, 1000);
});
</script>
