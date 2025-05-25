import { createRouter, createWebHistory } from 'vue-router';

import BasePage from '@/components/BasePage.vue';

import HomeView from '@/views/HomeView.vue';
import LoginPage from '@/components/LoginPage.vue';
import ServiceView from '@/views/ServiceView.vue';
import AuthCallback from '@/components/AuthCallback.vue';
import { isAuthenticated } from './requests';

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
  {
    path: '/login/callback',
    name: 'Auth Callback',
    component: AuthCallback,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuth = isAuthenticated();

  if (isAuth && to.path.includes('/login')) {
    // user is already authenticated but tries to access the login page;
    // so, redirect user to home page
    next({ path: '/' });
    return;
  } else if (!isAuth && !to.path.includes('/login')) {
    // if user is not authenticated and tries to access any page other than login page,
    // then redirect user to login page
    // NOTE: Login page check is necessary to prevent infinite loop
    next({ path: '/login' });
    return;
  }

  next();
})

export default router;