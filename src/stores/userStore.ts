import { defineStore } from 'pinia'
import { AUTH_TOKEN_KEY, DEV_OPTIONS } from '../constants'
import { requestLogin } from '@/utils/requests'
import { useServiceStore } from './serviceStore'
import { useNavigationStore } from './navigationStore'

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
    token: localStorage.getItem(AUTH_TOKEN_KEY) || null,
    lastResponse: null,
    errorMessage: '',
    isLoggingOut: false,
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
      this.token = null
      localStorage.removeItem(AUTH_TOKEN_KEY)
    },
    async logIn(
      navigationStore: ReturnType<typeof useNavigationStore>,
      payload: LoginCredentials
    ) {
      try {
        this.token = await requestLogin(payload);
        localStorage.setItem(AUTH_TOKEN_KEY, this.token);
        await navigationStore.goHome()
      } catch (err) {
        this.errorMessage = `Something went wrong during login: ${err}`;
      }
    },
    async logout(
      navigationStore: ReturnType<typeof useNavigationStore>,
      serviceStore: ReturnType<typeof useServiceStore>
    ) {
      // the order matters, otherwise some errors may pop up; for example:
      // say the services states are cleared before navigating to login,
      // then the current page (ex. Home) will try to fetch services again,
      // resulting in a error (and a waste of resources).
      // despite this, the Service view still reacts immediately to change
      // so isLoggingOut is necessary to prevent fetching.
      this.isLoggingOut = true;
      await this.clearState();          // 1. delete the token
      await navigationStore.goLogin();  // 2. navigate to login
      await serviceStore.clearState();  // 3. now delete the service state
      this.isLoggingOut = false;
    }
  },
})
