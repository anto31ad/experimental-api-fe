import type { Router } from 'vue-router'

export const useNavigationStore = (router: Router) => {
  return {
    goLogin: async () => {
      await router.push('/login')
    },
    goHome: async () => {
      await router.push('/')
    },
  }
}
