<template>
  <q-dialog v-model="show">
    <q-card>
      <q-card-section class="flex row">
        <span class="text-h6">
          {{ $t('RemoveActivityDialog.title') }}
        </span>
      </q-card-section>
      <q-form @submit="onSubmit">
        <q-card-section class="flex column flex-center">
          {{ $t('RemoveActivityDialog.content', { name: activity.name }) }}
        </q-card-section>
        <q-card-actions align="between">
          <q-btn
            flat
            :label="$t('RemoveActivityDialog.cancel')"
            color="negative"
            v-close-popup
          />
          <q-btn
            :label="$t('RemoveActivityDialog.confirm')"
            :loading="submitting"
            type="submit"
            color="positive"
          >
            <template #loading>
              <q-spinner-hourglass />
            </template>
          </q-btn>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialog } from 'src/composables/Dialog';
import { ref } from 'vue';
import * as ActivityService from 'src/services/ActivityService';
import Events from 'src/composables/Events';

const submitting = ref(false);
const activity = ref(null);
const { show } = useDialog('remove-activity', (event) => {
  submitting.value = false;
  activity.value = event.activity;
});

async function onSubmit() {
  submitting.value = true;

  await ActivityService.remove(activity.value.id);

  Events.ReloadActivitiesEvent.next();

  submitting.value = false;
  show.value = false;
}
</script>
