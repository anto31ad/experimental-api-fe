<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <NavBar/>
    <!-- Main content area -->
    <div class="flex-1 flex flex-col">
      <!-- Top bar -->
      
      <!-- Main canvas for routed views -->
      <div class="flex-1 overflow-auto p-4">
        <router-view /> <!-- This is where children components will sit -->
      </div>
    </div>
  </div>
</template>

<script setup>
import NavBar from './NavBar.vue';
</script>
