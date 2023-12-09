<template>
  <div class="flex row items-center">
    <input
      ref="inputYear"
      type="number"
      class="size4"
      v-model.number="year"
      :min="1900"
      :max="2100"
      @click="$refs.inputYear.select()"
      @input="onChange"
    />
    <span class="date-text q-mx-xs">/</span>
    <input
      ref="inputMonth"
      type="number"
      class="size2"
      v-model.number="month"
      :min="1"
      :max="12"
      @click="$refs.inputMonth.select()"
      @input="onChange"
    />
    <span class="date-text q-mx-xs">/</span>
    <input
      ref="inputDay"
      type="number"
      class="size2"
      v-model.number="day"
      :min="1"
      :max="maxMonth"
      @click="$refs.inputDay.select()"
      @input="onChange"
    />
    <input
      ref="inputHour"
      type="number"
      class="size2 q-ml-md"
      v-model.number="hour"
      :min="0"
      :max="23"
      @click="$refs.inputHour.select()"
      @input="onChange"
    />
    <span class="date-text q-mx-xs">:</span>
    <input
      ref="inputMinute"
      type="number"
      class="size2"
      v-model.number="minute"
      :min="0"
      :max="59"
      @click="$refs.inputMinute.select()"
      @input="onChange"
    />
  </div>
</template>

<script setup>
import {
  computed,
  onMounted,
  ref,
  watch,
} from 'vue';
import moment from 'moment';

function maxDay(y, m) {
  return moment(`${y}-${m}-1`, 'Y-M-D').endOf('month').date();
}

const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
});
const emits = defineEmits(['update:model-value']);
const year = ref(1234);
const month = ref(12);
const day = ref(12);
const hour = ref(12);
const minute = ref(12);
const maxMonth = computed(() => maxDay(year.value, month.value));

function updateRef() {
  if (props.modelValue === 0) {
    return;
  }

  const date = moment(props.modelValue);

  year.value = date.get('year');
  const mo = date.get('month') + 1;
  const d = date.get('date');
  const h = date.get('hour');
  const mi = date.get('minute');

  month.value = mo < 10 ? `0${mo}` : mo;
  day.value = d < 10 ? `0${d}` : d;
  hour.value = h < 10 ? `0${h}` : h;
  minute.value = mi < 10 ? `0${mi}` : mi;
}

function checkDay() {
  const max = maxDay(year.value, month.value);
  if (day.value > max) {
    day.value = max;
  }
}

function onChange() {
  const date = moment()
    .set('year', year.value)
    .set('month', month.value - 1)
    .set('date', day.value)
    .set('hour', hour.value)
    .set('minute', minute.value)
    .set('second', 0);

  emits('update:model-value', date.valueOf());
}

watch(() => props.modelValue, updateRef);
watch(() => year.value, checkDay);
watch(() => month.value, checkDay);
onMounted(() => {
  updateRef();
});
</script>

<style scoped>
.date-text {
  font-size: medium;
}
.size4 {
  width: 40px;
  text-align: center;
}
.size2 {
  width: 25px;
  text-align: center;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type=number] {
  -moz-appearance: textfield;
  /* Firefox */
}
</style>
