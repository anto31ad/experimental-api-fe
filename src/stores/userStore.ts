import { defineStore } from 'pinia'
import { DEV_OPTIONS } from '../constants'
import { requestLogin } from '@/utils/requests'

export interface LoginCredentials {
  username: string,
  password: string,
}

export interface LoginResponse {
  access_token: string
}

export const useUserStore = defineStore('user', {
  state: () => ({
    username: '',
    token: '',
    lastResponse: null,
    errorMessage: '',
  }),
  getters: {
    getToken: (state) => state.token,
    isAuth: (state) =>  {
      if (DEV_OPTIONS.stubModeOn) {
        return true
      }
      return !!state.token
    },
  },
  actions: {
    async clearState() {
      this.username = ''
      this.token = ''
    },
    async logIn(payload: LoginCredentials) {
      try {
        this.token = await requestLogin(payload)
        } catch (err) {
          this.errorMessage = `Something went wrong during login: ${err}`;
        }
    },
    async logout() {
      this.clearState();
    }
  },
})
