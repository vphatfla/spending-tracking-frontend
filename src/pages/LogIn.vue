<template>
  <q-page
    class="home-page window-height window-width row justify-center items-center"
  >
    <div>
      <h2>Login</h2>
      <div style="max-width: 300px">
        <form @submit.prevent="login">
          <q-input v-model="username" label="User Name" />
          <q-input v-model="password" label="Password" type="password" />
          <q-btn
            style="background: rgb(20, 196, 209); color: rgb(0, 0, 0)"
            label="Log In"
            type="submit"
          />
        </form>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { loginFunction } from '../auth/authService';
export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async login() {
      console.log('Login Handler');
      const res = await loginFunction(this.username, this.password);
      if (res === null) {
        console.log('log in successed');
        const user_id = localStorage.getItem('user_id') || '';
        console.log('user id = ', +user_id);
        this.$router.push({
          path: '/transactions',
          query: { user_id: user_id },
        });
      } else {
        console.log(res);
      }
    },
  },
};
</script>
