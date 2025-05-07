<template>
  <div v-if="itemList" class="card-grid">
    <router-link
      v-for="item in itemList"
      :key="item.id"
      :to="{ name: 'Service', params: { id: item.id } }"
      class="clickable-card"
    >
      <Card
        :title="item.name"
        :text="item.description"
        :image-path="item.thumbnail"
      />
    </router-link>
  </div>
  <div v-else>
    <p>No data available</p>
  </div>
</template>
<script setup>
import Card from './Card.vue'

const props = defineProps({
  itemList: Array,
})
</script>

<style scoped>
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  justify-content: center;
  gap: 20px;
  padding: 20px;
}
.clickable-card {
  text-decoration: none;
  color: inherit;
  display: block;
}
.clickable-card:hover .card {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  transform: translateY(-10px);
  transition: all 0.2s ease;
}
</style>