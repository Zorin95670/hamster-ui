<template>
  <q-table
    :columns="columns"
    :rows="activities"
  >
    <template #body-cell-tags="props">
      <q-td key="tags" :props="props">
        <tag-chip
          v-for="tag in props.row.tags"
          :key="`${props.row.id}_${tag.id}`"
          :tag="tag"
        />
      </q-td>
    </template>
    <template #body-cell-startDate="props">
      <q-td key="startDate" :props="props">
        <date-time-input
          v-model="startDates[props.row.id]"
          v-if="startDates[props.row.id]"
          @update:model-value="(value) => updateDate(props.row.id, 'startDate', value)"
        />
        <span v-else>-</span>
      </q-td>
    </template>
    <template #body-cell-endDate="props">
      <q-td key="endDate" :props="props">
        <date-time-input
          v-model="endDates[props.row.id]"
          v-if="endDates[props.row.id]"
          @update:model-value="(value) => updateDate(props.row.id, 'endDate', value)"
        />
        <span v-else>-</span>
      </q-td>
    </template>
    <template #body-cell-duration="props">
      <q-td key="endDate" :props="props" class="text-right">
        {{ durations[props.row.id] }}
      </q-td>
    </template>
    <template #body-cell-actions="props">
      <q-td key="actions" :props="props">
        <q-btn
          dense
          flat
          rounded
          color="warning"
          icon="edit"
          class="q-mr-sm"
          @click="$emit('edit', props.row.id)"
        />
        <q-btn
          dense
          flat
          rounded
          color="positive"
          icon="save"
          class="q-mr-sm"
          @click="$emit('save', props.row.id)"
        />
        <q-btn
          dense
          flat
          rounded
          color="negative"
          icon="stop"
          @click="$emit('stop', props.row.id)"
          v-if="!props.row.endDate"
        />
        <q-btn
          dense
          flat
          rounded
          color="positive"
          icon="play_arrow"
          @click="$emit('restart', props.row.id)"
          v-else
        />
        <q-btn
          dense
          flat
          rounded
          color="black"
          icon="delete"
          @click="$emit('remove', props.row.id)"
        />
      </q-td>
    </template>
  </q-table>
</template>

<script setup>
import {
  onUnmounted,
  onMounted,
  ref,
  watch,
} from 'vue';
import TagChip from 'components/chip/TagChip.vue';
import DateTimeInput from 'components/input/DateTimeInput.vue';
import moment from 'moment';

const props = defineProps({
  activities: {
    type: Array,
    required: true,
  },
});

defineEmits(['edit', 'save', 'stop', 'remove', 'restart']);

let intervalRef;
const durations = ref([]);
const startDates = ref({});
const endDates = ref({});
const columns = ref([{
  name: 'name',
  field: 'name',
  label: 'Activity name',
  align: 'left',
}, {
  name: 'tags',
  field: 'tags',
  label: 'Tags',
  align: 'left',
}, {
  name: 'startDate',
  field: 'startDate',
  label: 'Start date',
  align: 'left',
}, {
  name: 'endDate',
  field: 'endDate',
  label: 'End date',
  align: 'left',
}, {
}, {
  name: 'duration',
  field: 'duration',
  label: 'Duration',
  align: 'right',
}, {
  name: 'actions',
  field: 'id',
  label: 'Actions',
  align: 'left',
}]);

function setDuration() {
  durations.value = props.activities
    .reduce((acc, { id, startDate, endDate }) => {
      acc[id] = moment((endDate || Date.now()) - startDate)
        .utc()
        .format('H[h] m[min]').replaceAll(/^0h/g, '');
      return acc;
    }, {});
}

function updateDates() {
  startDates.value = {};
  props.activities.forEach(({ id, startDate, endDate }) => {
    startDates.value[id] = startDate;
    endDates.value[id] = endDate;
  });
  setDuration();
}

function updateDate(activityId, field, value) {
  const activity = props.activities.find(({ id }) => id === activityId);
  activity[field] = value;
}

watch(() => props.activities, updateDates);
onMounted(() => {
  intervalRef = setInterval(setDuration, 1000);
  updateDates();
});
onUnmounted(() => {
  clearInterval(intervalRef);
});
</script>
