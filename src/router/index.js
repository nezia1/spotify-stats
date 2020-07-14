import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import store from '@/store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/stats',
    name: 'Stats',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "stats" */ '@/views/Stats.vue'),
    async beforeEnter(to, from, next) {
      if (!store.state.accessToken) {
        next(false);
      } else {
        store.commit('setLoadingStatus', true);
        await Promise.allSettled([
          store.dispatch('fetchUserProfile'),
          store.dispatch('fetchTop', { type: 'tracks', limit: 20, timeRange: 'short_term' }),
          store.dispatch('fetchTop', { type: 'tracks', limit: 20, timeRange: 'long_term' }),
          store.dispatch('fetchTop', { type: 'artists', limit: 20, timeRange: 'short_term' }),
          store.dispatch('fetchTop', { type: 'artists', limit: 20, timeRange: 'long_term' }),
        ]);
        next();
      }
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
