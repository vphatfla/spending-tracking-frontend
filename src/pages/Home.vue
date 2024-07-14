<template>
  <q-page class="row items-center justify-evenly">
    <div class="q-pa-md">
      <!-- Your page content goes here -->
      <h1>Welcome to Spending Tracking</h1>
      <q-btn
        style="background: rgb(20, 196, 209); color: rgb(0, 0, 0)"
        label="Log in"
        to="/login"
      />
      <q-btn
        style="background: rgb(20, 196, 209); color: rgb(0, 0, 0)"
        label="Sign up"
        to="/signup"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
export default {
  name: 'HomePage',
  components: {},
};
</script>
