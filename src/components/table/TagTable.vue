<template>
  <q-table
    :columns="columns"
    :rows="tags"
  >
    <template #body-cell-name="props">
      <q-td key="name" :props="props">
        <tag-chip
          :tag="props.row"
        />
      </q-td>
    </template>
    <template #body-cell-backgroundColor="props">
      <q-td key="backgroundColor" :props="props">
        <div
          :class="['cube', `bg-${props.row.backgroundColor}`]"
          @click="$emit('update:backgroundColor', props.row)"
        />
      </q-td>
    </template>
    <template #body-cell-textColor="props">
      <q-td key="textColor" :props="props">
        <div
          :class="['cube', `bg-${props.row.textColor}`]"
          @click="$emit('update:textColor', props.row)"
        />
      </q-td>
    </template>
    <template #body-cell-actions="props">
      <q-td key="actions" :props="props">
        <q-btn
          dense
          flat
          rounded
          color="positive"
          icon="save"
          class="q-mr-sm"
          @click="$emit('save', props.row.id)"
        />
      </q-td>
    </template>
  </q-table>
</template>

<script setup>
import { ref } from 'vue';
import TagChip from 'components/chip/TagChip.vue';

defineProps({
  tags: {
    type: Array,
    required: true,
  },
});
defineEmits(['save', 'update:backgroundColor', 'update:textColor']);

const columns = ref([{
  name: 'name',
  field: 'name',
  label: 'Tag name',
  align: 'left',
}, {
  name: 'backgroundColor',
  field: 'backgroundColor',
  label: 'Background color',
  align: 'center',
}, {
  name: 'textColor',
  field: 'textColor',
  label: 'Text color',
  align: 'center',
}, {
  name: 'linkedActivity',
  field: 'linkedActivity',
  label: 'Linked activity',
  align: 'right',
}, {
  name: 'actions',
  field: 'id',
  label: 'Actions',
  align: 'left',
}]);
</script>

<style lang="scss" scoped>
.cube {
  width: 25px;
  height: 25px;
  border: 1px solid black;
  cursor: pointer;
}
</style>
