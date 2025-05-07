<template>
  <form @submit.prevent="submitForm" class="form-grid">
    <div>
      <label for="petal_width">Petal width</label>
      <input type="number" id="name" v-model="form.petal_width" required />
    </div>

    <div>
      <label for="petal_length">Petal len</label>
      <input type="number" id="email" v-model="form.petal_length" required />
    </div>

    <div>
      <label for="sepal_width">Sepal width</label>
      <input type="number" id="name" v-model="form.sepal_width" required />
    </div>

    <div>
      <label for="sepal_length">Sepal len</label>
      <input type="number" id="email" v-model="form.sepal_length" required />
    </div>

    <button type="submit" class="full-width">Submit</button>
  </form>
</template>

<script setup>
import { reactive } from 'vue'
import { useServiceStore } from '../../stores/serviceStore'

const serviceStore = useServiceStore()

const form = reactive({
  petal_width: 0,
  petal_length: 0,
  sepal_width: 0,
  sepal_length: 0,
})

function submitForm() {
  console.log('Form submitted:', form)
  serviceStore.makeServiceRequest(1, form)
}
</script>

<style scoped>
.form-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr;
  max-width: 600px;
  margin: auto;
}

.form-grid > div {
  display: flex;
  flex-direction: column;
}

.full-width {
  grid-column: span 2;
  text-align: center;
}
</style>