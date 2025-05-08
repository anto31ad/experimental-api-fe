<template>
  <div v-if="curService">
    <h1>{{ curService.name }}</h1>
    <p> {{ curService.description }}</p>
    <hr>
    <div v-if="curService">
      <div v-if="curService.parameters">
        <h2>Parameters</h2>
        <Table
          :data="curService.parameters"
          :columns="['name', 'description', 'data_type']"
          filterKey="">
        </Table>
      </div>
      <hr>
      <component v-if="customComponent" :is="customComponent"/>
    </div>
    <div v-else>
      Loading...
    </div>
  </div>
</template>
<script setup>
import { ref, computed, watchEffect, markRaw } from 'vue';
import { useRoute } from 'vue-router';

import Table from '@/components/Table.vue';
import { useServiceStore } from '@/stores/serviceStore';
import DigitsCanvas from '@/components/digits-predictor/Canvas.vue';
import IrisForm from '@/components/iris-predictor/IrisForm.vue';
import { useUserStore } from '@/stores/userStore';

const route = useRoute()
const serviceStore = useServiceStore()
const userStore = useUserStore()

//const serviceId = ref(null)
const curService = computed( () => serviceStore.getSelected)

const customComponents = {
  // <service id>: <Raw Component>
  1: markRaw(IrisForm),
  2: markRaw(DigitsCanvas),
}
const customComponent = ref(null)

watchEffect(async () => {
  const serviceId = route.params.id
  serviceStore.fetchServiceById(serviceId, userStore)
  customComponent.value = customComponents[serviceId]
})

</script>