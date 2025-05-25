import { defineStore } from 'pinia'
import { DEV_OPTIONS } from '../constants'
import { requestThisUser } from '@/utils/requests'

export const useUserStore = defineStore('user', {
  state: () => ({
    username: '',
    userGitHubId: '',
  }),
  actions: {
    clearState() {
      this.username = ''
      this.userGitHubId = ''
    },
    async fetchUserData() {
      if (DEV_OPTIONS.stubModeOn) {
        this.username = 'guest'
        return;
      }
      const user = await requestThisUser()
      this.username = user.username
      this.userGitHubId = user.github_id
    },
  },
})
