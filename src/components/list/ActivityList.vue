<template>
  <q-card class="full-width">
    <q-list bordered class="rounded-borders">
      <template
        v-for="(day, index) in days"
        :key="day.date"
      >
        <q-expansion-item
          :default-opened="index === 0"
        >
          <template v-slot:header>
            <q-item-label
              :class="['full-width', 'flex', 'row', 'justify-between', 'text-bold',
                index === 0
                  ? 'text-primary'
                  : 'text-grey']"
              header
            >
              <span>{{ day.dateFormated }}</span>
              <span>{{ dayDurations[index] }}</span>
            </q-item-label>
          </template>
          <q-card>
            <q-card-section>
              <q-list bordered v-if="day.activities.length > 0">
                <template
                  v-for="(activity, i) in day.activities"
                  :key="activity.id">
                  <q-item
                    class="flex row"
                  >
                    <div class="flex row items-center" style="width: 100px">
                      {{activity.startDateFormated}} - {{activity.endDateFormated}}
                    </div>
                    <div class="flex column" style="flex-grow: 1;">
                      <div>{{ activity.name }}</div>
                      <div class="flex row">
                        <tag-chip
                          v-for="tag in activity.tags"
                          :key="`${activity.id}_${tag.id}`"
                          :tag="tag"
                        />
                      </div>
                    </div>
                    <div class="flex row items-center">
                      {{ durations[activity.id]}}
                    </div>
                    <div class="flex row items-center q-ml-md">
                      <q-btn
                        dense
                        flat
                        rounded
                        color="warning"
                        icon="edit"
                        @click="$emit('edit', activity.id)"
                      />
                      <q-btn
                        dense
                        flat
                        rounded
                        color="negative"
                        icon="stop"
                        @click="$emit('stop', activity.id)"
                        v-if="!activity.endDate"
                      />
                      <q-btn
                        dense
                        flat
                        rounded
                        size="md"
                        color="positive"
                        icon="play_arrow"
                        @click="$emit('restart', activity.id)"
                        v-else
                      />
                      <q-btn
                        dense
                        flat
                        rounded
                        color="black"
                        icon="delete"
                        @click="$emit('remove', activity.id)"
                      />
                    </div>
                  </q-item>
                  <q-separator v-if="i != day.activities.length -1"/>
                </template>
              </q-list>
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-separator v-if="index != days.length -1"/>
      </template>
    </q-list>
  </q-card>
</template>

<script setup>
import {
  onMounted,
  onUnmounted,
  ref,
  watch,
} from 'vue';
import moment from 'moment';
import TagChip from 'components/chip/TagChip.vue';

defineEmits(['edit', 'stop', 'remove', 'restart']);

const props = defineProps({
  activities: {
    type: Array,
    default: () => [],
  },
});

const days = ref([]);
const durations = ref({});
const dayDurations = ref([]);

let intervalRef;

function getDuration(activities) {
  const time = activities.reduce(
    (acc, { startDate, endDate }) => acc + (endDate || Date.now()) - startDate,
    0,
  );

  return moment(time).utc().format('H[h] m[min]').replaceAll(/^0h /g, '');
}

function initDays() {
  const currentDate = moment();
  let currentDay = currentDate.get('day');
  const array = [];

  if (currentDay === 0) {
    currentDay = 7;
  }

  for (let i = 0; i < currentDay; i += 1) {
    const date = currentDate.clone().startOf('day').subtract(i, 'day');
    const activities = props.activities
      .filter(({ startDate }) => moment(startDate).startOf('day').unix() === date.unix())
      .map((activity) => ({
        ...activity,
        startDateFormated: moment(activity.startDate).format('HH:mm'),
        endDateFormated: activity.endDate ? moment(activity.endDate).format('HH:mm') : '',
      }));
    array.push({
      date: date.unix(),
      dateFormated: date.format('dddd, MMM D'),
      activities,
    });
  }

  days.value = array;
}

function setDuration() {
  dayDurations.value = days.value.map(({ activities }) => getDuration(activities));
  durations.value = props.activities.reduce((acc, { id, startDate, endDate }) => {
    acc[id] = moment((endDate || Date.now()) - startDate)
      .utc()
      .format('H[h] m[min]').replaceAll(/^0h/g, '');

    return acc;
  }, {});
}

watch(() => props.activities, initDays);
onMounted(() => {
  initDays();
  setDuration();
  intervalRef = setInterval(setDuration, 1000);
});
onUnmounted(() => {
  clearInterval(intervalRef);
});
</script>

<style scoped>

</style>
