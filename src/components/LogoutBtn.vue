<template>
  <button @click="logout">
    Log out
  </button>
</template>
  
<script setup>
import { logout } from '@/utils/requests';
</script>
