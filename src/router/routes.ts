import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('pages/Home.vue'),
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('pages/LogIn.vue'),
      },
      {
        path: 'transactions',
        name: 'transactions',
        component: () => import('pages/Transactions.vue'),
      },
      // {
      //   path: 'about',
      //   name: 'About',
      //   component: () => import('pages/AboutPage.vue'),
      // },
      // Add other routes here
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
