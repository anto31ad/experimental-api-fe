<template>
  <h1>Experimental API</h1>
  <div class="login-page">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <button type="submit">Login with GitHub</button>
    </form>
    <div v-if="errorMessage" class="error-box">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, watchEffect } from 'vue';

import { useNavigationStore } from '@/stores/navigationStore';
import { isAuthenticated, login } from '@/utils/requests';

const navigator = useNavigationStore(useRouter());
const errorMessage = ref('');

watchEffect(async () => {

  if(isAuthenticated()) {
    navigator.goHome()
    return;
  }
});
</script>

<style scoped>
.login-page {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>