import { createRouter, createWebHistory } from 'vue-router';

import { useUserStore } from '@/stores/userStore';

import BasePage from '@/components/BasePage.vue';

import HomeView from '@/views/Home.vue';
import LoginPage from '@/components/LoginPage.vue';
import ServiceView from '@/views/Service.vue';

const routes = [
  {
    path: '/',
    component: BasePage,
    children: [
      {
        path: '',
        name: 'Home',
        component: HomeView,
      },
      {
        path: '/services/:id',
        name: 'Service',
        component: ServiceView,
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  //called here to avoid calling it before pinia is active
  const userStore = useUserStore();

  const isAuth = userStore.isAuth;
  if (isAuth && to.name === 'Login') {
    // user is already authenticated but tries to access the login page;
    // so, redirect user to home page
    next({ name: 'Home' });
    return;
  }

  if (!isAuth && to.name !== 'Login') {
    // if user is not authenticated and tries to access any page other than login page,
    // then redirect user to login page
    // NOTE: Login page check is necessary to prevent infinite loop
    next({ name: 'Login' });
    return;
  }

  next();
})

export default router;