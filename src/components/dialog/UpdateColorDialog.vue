<template>
  <q-dialog v-model="show">
    <q-card>
      <q-card-section class="flex row">
        <span class="text-h6">
          {{ $t('UpdateColorDialog.title') }}
        </span>
      </q-card-section>
      <q-card-section class="flex column flex-center">
        <color-input
          v-model="color"
          @update:model-value="update"
        />
      </q-card-section>
      <q-card-actions align="center">
        <q-btn
          flat
          :label="$t('UpdateColorDialog.cancel')"
          color="negative"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialog } from 'src/composables/Dialog';
import { ref } from 'vue';
import ColorInput from 'components/input/ColorInput.vue';
import Events from 'src/composables/Events';

const color = ref(null);
let field;
let id;

const { show } = useDialog('update-color', (event) => {
  color.value = event.color;
  field = event.field;
  id = event.id;
});

function update() {
  Events.UpdateColorEvent.next({
    id,
    field,
    color: color.value,
  });
  show.value = false;
}
</script>
