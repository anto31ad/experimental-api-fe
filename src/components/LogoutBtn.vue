<template>
  <button @click="submit">
    Log out
  </button>
</template>
  
<script setup>
import { useRouter } from 'vue-router'
import { useServiceStore } from '../stores/serviceStore';
import { useUserStore } from '../stores/userStore';

const serviceStore = useServiceStore()
const userStore = useUserStore()

const router = useRouter()

async function submit() {
  await userStore.logout()
  await router.push('/login');
  serviceStore.clearState();
}
</script>
