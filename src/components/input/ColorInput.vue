<template>
  <div>
    <div>{{ modelValue }}</div>
    <div
      v-for="color in colors"
      :key="`cube-line-${color}`"
      class="cube-line flex row justify-center items-center"
    >
      <div
        v-for="level in levels"
        :key="`cube-${color}-${level}`"
        :class="[
          'cube',
          `bg-${color}${level}`,
          modelValue === `${color}${level}` ? 'selected' : '',
        ]"
        @click="$emit('update:modelValue', `${color}${level}`)"
      />
    </div>
    <div class="cube-line flex row justify-center items-center">
      <div
        :class="['cube', 'bg-white', modelValue === 'white' ? 'selected' : '']"
        @click="$emit('update:modelValue', 'white')"
      />
      <div
        :class="['cube', 'bg-black', modelValue === 'black' ? 'selected' : '']"
        @click="$emit('update:modelValue', 'black')"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineEmits(['update:modelValue']);
defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

const colors = ref([
  'red', 'pink', 'purple', 'deep-purple', 'indigo',
  'blue', 'light-blue', 'cyan', 'teal', 'green',
  'light-green', 'lime', 'yellow', 'amber', 'orange',
  'deep-orange', 'brown', 'grey', 'blue-grey',
]);
const levels = ref(['', ...Array(14).fill(1).map((_, v) => `-${v + 1}`)]);
</script>

<style lang="scss" scoped>
.cube {
  width: 20px;
  height: 20px;
  border: 1px solid white;

  &.selected, &:hover {
    width: 38px;
    height: 38px;
    border: 2px solid white;
  }
}
.cube.bg-white {
  width: 19px;
  height: 19px;
  margin: 1px;
  border:1px solid black;

  &.selected, &:hover {
    width: 37px;
    height: 37px;
    margin: 2px;
    border: 1px solid black;
  }
}
</style>
