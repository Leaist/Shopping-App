// import { from } from 'core-js/fn/array';
import Vue from 'vue';
import VueRouter from 'vue-router';
import { isLogined } from '../utils/tools';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home, //一般的引入
  },
  {
    path: '/cart',
    name: 'Cart',
    // 路由懒加载 所有组件在页面第一次加载的时候不会被引入，在页面跳转之后才会引入，在打包的时候会把这些异步加载的路由打包成单独的文件
    component: () => import('../views/Cart.vue'),
    meta: {
      needLogin: true,
    },
  },
  {
    path: '/hot',
    name: 'Hot',
    component: () => import('../views/Hot.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/reg',
    name: 'Reg',
    component: () => import('../views/Reg.vue'),
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/User.vue'),
    meta: {
      needLogin: true,
    },
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.needLogin) {
    if (isLogined()) {
      next();
    } else {
      next({
        name: 'Login',
      });
    }
  } else {
    next();
  }
});
export default router;
