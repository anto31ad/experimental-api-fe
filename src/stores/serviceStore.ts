import { defineStore } from 'pinia'
import { requestListOfServices, requestOperationByServiceId, requestServiceInfoById } from '../utils/requests'

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
    errorMessageList: [] as Array<String>,
    lastResponse: null as JSON | null,
  }),
  getters: {
    getList: (state) => state.services,
    isListEmpty: (state) => state.services.length < 1,
    getSelected: (state) => state.selectedService,
    hasErrors: (state) => state.errorMessageList.length > 0,
  },
  actions: {
    async clearState() {
      this.loading = false
      this.errorMessageList = []
      this.lastResponse = null
      this.services = []
      this.selectedService = null
    },
    async initUtils() {
      this.loading = true
      this.errorMessageList = []
    },
    
    async fetchServices () {
      this.initUtils()
      try {
        this.services = await requestListOfServices()
      } catch (err) {
        this.errorMessageList.push('Failed to fetch services: ' + err)
      } finally {
        this.loading = false
      }
    },
    async fetchServiceById (serviceId: string) {
      this.initUtils()
      try {
        this.selectedService = await requestServiceInfoById(serviceId)
      } catch (err) {
        this.errorMessageList.push(`${err}`)
      } finally {
        this.loading = false
      }
    },
    async makeServiceRequest(serviceId: string, payload: JSON) {
      this.initUtils()
      try {
        this.lastResponse = await requestOperationByServiceId(serviceId, payload)
      } catch (err) {
        this.errorMessageList.push(`Problem while making request to service '${serviceId}' :${err}`)
      } finally {
        this.loading = false
      }
    },
  },
})
