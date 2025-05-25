import { defineStore } from 'pinia'
import {
  requestListOfServices,
  requestOperationByServiceId,
  requestServiceInfoById } from '../utils/requests'
import { useUserStore } from './userStore'

export interface ServiceOverview {
  id: string,
  name?: string,
  description?: string,
}

export interface ServiceParameter {
  name: string,
  expects: string,
}

export interface Service {
  id: string,
  name?: string,
  description?: string,
  parameters?: ServiceParameter[],
}

export const useServiceStore = defineStore('service', {
  state: () => ({
    services: [] as ServiceOverview[],
    selectedService: null as Service | null,
    loading: false,
    errorMessageList: [] as Array<string>,
    lastResponse: null as JSON | null,
  }),
  getters: {
    getList: (state) => state.services,
    isListEmpty: (state) => state.services.length < 1,
    getSelected: (state) => state.selectedService,
    hasErrors: (state) => state.errorMessageList.length > 0,
  },
  actions: {
    clearState() {
      this.loading = false
      this.errorMessageList = []
      this.lastResponse = null
      this.services = []
      this.selectedService = null
      console.log("cleared service state")
    },
    initUtils() {
      this.loading = true
      this.errorMessageList = []
      console.log("initialized service utils")
    },
    
    async fetchServices (
      userStore: ReturnType<typeof useUserStore>,
    ) {
      //skip if list is not empty
      if (!this.isListEmpty) {
        console.info("service list not empty")
        return;
      }
      console.info("fetching services...")
      this.initUtils()
      try {
        this.services = await requestListOfServices(userStore)
      } catch (err) {
        this.errorMessageList.push('Failed to fetch services: ' + err)
      } finally {
        this.loading = false
      }
    },
    async fetchServiceById (
      serviceId: string,
      userStore: ReturnType<typeof useUserStore>,
    ) {

      this.initUtils()
      console.log(`fetching service ${serviceId}`)
      try {
        this.selectedService = await requestServiceInfoById(serviceId, userStore)
      } catch (err) {
        this.errorMessageList.push(`${err}`)
      } finally {
        this.loading = false
      }
    },
    async makeServiceRequest(
      serviceId: string,
      payload: JSON,
      userStore: ReturnType<typeof useUserStore>,
    ) {

      this.initUtils()
      try {
        this.lastResponse = await requestOperationByServiceId(serviceId, payload, userStore)
      } catch (err) {
        this.errorMessageList.push(`Problem while making request to service '${serviceId}' :${err}`)
      } finally {
        this.loading = false
      }
    },
  },
})
