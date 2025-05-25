<template>
  <div>Authenticating...</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const router = useRouter()

onMounted(async () => {
  try {
    await userStore.fetchUserData()
    localStorage.setItem("expAPI_isLoggedIn", "true")
    router.replace({ path: '/' })
  } catch (e) {
    console.error(e)
    router.replace({ path: '/login' })
  }
})
</script>