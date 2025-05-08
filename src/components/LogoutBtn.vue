<template>
  <button @click="submit">
    Log out
  </button>
</template>
  
<script setup>
import { useRouter } from 'vue-router'
import { useServiceStore } from '../stores/serviceStore';
import { useUserStore } from '../stores/userStore';
import { useNavigationStore } from '@/stores/navigationStore';

const navigationStore = useNavigationStore(useRouter())
const serviceStore = useServiceStore()
const userStore = useUserStore()

const router = useRouter()

async function submit() {
  await userStore.logout(navigationStore, serviceStore)
}
</script>
