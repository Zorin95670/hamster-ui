<template>
  <q-layout view="lHh Lpr lFf">
    <application-drawer/>
    <q-page-container class="q-mx-md">
      <router-view />
    </q-page-container>
    <add-activity-dialog/>
    <remove-activity-dialog/>
    <update-color-dialog/>
  </q-layout>
</template>

<script setup>
import AddActivityDialog from 'components/dialog/AddEditActivityDialog.vue';
import ApplicationDrawer from 'components/drawer/ApplicationDrawer.vue';
import UpdateColorDialog from 'components/dialog/UpdateColorDialog.vue';
import RemoveActivityDialog from 'components/dialog/RemoveActivityDialog.vue';
</script>
