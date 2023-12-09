import { route } from 'quasar/wrappers';
import {
  createRouter, createMemoryHistory, createWebHistory, createWebHashHistory,
} from 'vue-router';
import { initUser } from 'src/services/UserService';
import { useTokenStore } from 'stores/token-store';
import { useUserStore } from 'stores/user-store';
import routes from './routes';

export default route((/* { store, ssrContext } */) => {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);
  const tokenStore = useTokenStore();
  const userStore = useUserStore();

  tokenStore.initToken();

  if (tokenStore.exists) {
    initUser(tokenStore.value)
      .then((user) => {
        userStore.lastName = user.lastName;
        userStore.firstName = user.firstName;
        userStore.email = user.email;
      }).catch(() => tokenStore.deleteToken());
  }

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach((to, from, next) => {
    if (to.path !== '/' && !tokenStore.exists) {
      next('/');
    } else {
      next();
    }
  });

  return Router;
});
