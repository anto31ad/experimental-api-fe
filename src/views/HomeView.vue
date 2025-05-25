<template>
  <h1>Experimental API</h1>
  <div v-if="serviceStore.hasErrors">
    <div v-for="item in serviceStore.errorMessageList" :key="item">
        {{ item }}
    </div>
  </div>
  <div v-else-if="serviceStore.services.length > 0">
    <ServicePicker :itemList="serviceStore.services"/>
  </div>
</template>

<script setup>
import { watchEffect } from 'vue'
import ServicePicker from '../components/ServicePicker.vue';
import { useServiceStore } from '../stores/serviceStore';
import { useUserStore } from '@/stores/userStore';

const serviceStore = useServiceStore();
const userStore = useUserStore();

watchEffect(() => {
  serviceStore.fetchServices(userStore)
});
</script>

<style scoped>
.app {
  max-width: 600px;
  margin: 2rem auto;
  font-family: sans-serif;
}
button {
  padding: 0.5rem 1rem;
}
</style>
