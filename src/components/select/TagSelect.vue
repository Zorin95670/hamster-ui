<template>
  <q-select
    v-bind:model-value="modelValue"
    use-input
    use-chips
    multiple
    input-debounce="0"
    :options="options"
    @filter="onFilter"
    @filter-abort="abortFilter"
    style="width: 250px"
    new-value-mode="add-unique"
    @update:model-value="(value) => $emit('update:model-value', value)"
    @new-value="onNewOption"
  >
    <template #option="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section>
          <q-item-label>{{ scope.opt.name }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
    <template #selected>
      <template v-if="modelValue.length > 0">
        <tag-chip
          v-for="tag in modelValue"
          :key="tag.id"
          :tag="tag"
        />
      </template>
    </template>
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">
          No results
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script setup>
import { ref } from 'vue';
import TagChip from 'components/chip/TagChip.vue';
import * as TagService from 'src/services/TagService';

const newOptions = ref([]);
const options = ref([]);
defineEmits(['update:model-value']);

defineProps({
  modelValue: {
    type: Array,
    required: true,
  },
});

async function onFilter(val, update) {
  const filters = !val ? {} : { name: `lk_%${val}%` };

  const response = await TagService.find(filters);// api.get(`/tags${parameters}`);

  update(() => {
    options.value = [...response.data.content, ...newOptions.value];
  });
}

function onNewOption(name, done) {
  done({
    id: null,
    name,
    backgroundColor: 'grey',
    textColor: 'black',
  });
}

function abortFilter() {

}
</script>
