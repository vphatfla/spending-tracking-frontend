<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Spanding Tracking App </q-toolbar-title>
        <!-- Add any additional header content here -->
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="text-center">
      <q-toolbar>
        <q-toolbar-title> Copyright 2024 - Van Phat Phan </q-toolbar-title>
        <!-- Add any additional footer content here -->
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
};
</script>

<style>
/* Optional: custom styles for your layout */
</style>
