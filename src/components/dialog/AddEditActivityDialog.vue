<template>
  <q-dialog v-model="show">
    <q-card>
      <q-card-section class="flex row">
        <span class="text-h6">
          {{ $t(`${edit ? 'Edit' : 'Add'}ActivityDialog.title`) }}
        </span>
      </q-card-section>
      <q-form @submit="onSubmit">
        <q-card-section class="flex column flex-start">
          <q-input
            v-model="name"
            :label="$t(`${edit ? 'Edit' : 'Add'}ActivityDialog.name`)"
            :rules="[(value) => (value && value.length > 0)
              || $t(`${edit ? 'Edit' : 'Add'}ActivityDialog.emptyName`)]"
          />
          <q-input
            v-model="link"
            :label="$t(`${edit ? 'Edit' : 'Add'}ActivityDialog.link`)"
          />
          <q-input
            v-model="description"
            :label="$t(`${edit ? 'Edit' : 'Add'}ActivityDialog.description`)"
            type="textarea"
          />
          <date-time-input
            v-model="startDate"
            class="q-my-md"
          />
          <tag-select v-model="tags"/>
        </q-card-section>
        <q-card-actions align="between">
          <q-btn
            flat
            :label="$t(`${edit ? 'Edit' : 'Add'}ActivityDialog.cancel`)"
            color="negative"
            v-close-popup
          />
          <q-btn
            :label="$t(`${edit ? 'Edit' : 'Add'}ActivityDialog.add`)"
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
import DateTimeInput from 'components/input/DateTimeInput.vue';
import TagSelect from 'components/select/TagSelect.vue';
import * as TagService from 'src/services/TagService';
import * as ActivityService from 'src/services/ActivityService';
import Events from 'src/composables/Events';

const submitting = ref(false);
const name = ref(null);
const description = ref(null);
const link = ref(null);
const startDate = ref(null);
const tags = ref([]);
const edit = ref(false);
let activity = null;
let lastActivity;
const { show } = useDialog('add-edit-activity', (event) => {
  startDate.value = Date.now();
  submitting.value = false;
  lastActivity = event.last;
  edit.value = event.edit;

  if (edit.value) {
    activity = event.activity;
    name.value = event.activity.name;
    description.value = event.activity.description;
    link.value = event.activity.link;
    startDate.value = event.activity.startDate;
    tags.value = event.activity.tags;
  }
});

async function onSubmit() {
  submitting.value = true;

  const act = {
    name: name.value,
    description: description.value,
    link: link.value,
    startDate: startDate.value,
    tags: (await Promise.allSettled(
      tags.value.map((tag) => {
        if (tag.id) {
          return Promise.resolve(tag);
        }
        return TagService.create(tag);
      }),
    )),
  };

  if (edit.value) {
    act.id = activity.id;
    act.tags = act.tags.map(({ value }) => value);
    await ActivityService.update(act);
  } else {
    act.tags = act.tags.map(({ value }) => value.id);
    await ActivityService.create(act);
  }

  if (!edit.value && lastActivity) {
    lastActivity.endDate = Date.now();
    await ActivityService.update(lastActivity);
  }

  Events.ReloadActivitiesEvent.next();

  submitting.value = false;
  show.value = false;
}
</script>

<style scoped>

</style>
