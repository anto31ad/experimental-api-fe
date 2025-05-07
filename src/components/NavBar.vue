<template>
    <nav class="navbar">
      <div class="h-full flex flex-col p-4 space-y-2">
          <router-link to="/">Home</router-link>
      </div>
      <div class="flex justify-end p-4 bg-gray-100 shadow">
          <LogoutBtn />
      </div>
    </nav>
</template>

<script setup>
import LogoutBtn from './LogoutBtn.vue';
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}

.navbar a {
  color: #ecf0f1;
  text-decoration: none;
  margin: 0 10px;
}

.navbar a:hover {
  text-decoration: underline;
}

.navbar-links {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

.navbar-links li {
  margin-left: 15px;
}
</style>