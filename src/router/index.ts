import { createWebHistory, createRouter, RouteRecordRaw, RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import Home from '../views/home.vue'
import Login from '@/views/login/login.vue'
import Error from '@/views/error/error.vue'
import store from '@/store';
import { getItem } from '@/utils/storage';
import service from '@/utils/request';
// @ts-ignore
import NProgress from 'nprogress'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '',
        component: () => import('@/views/welcome/welcome.vue')
      },
      {
        path: 'system/user',
        component: () => import('@/views/sys/user/user.vue')
      },
      {
        path: 'system/menu',
        component: () => import('@/views/sys/menu/menu.vue')
      },
      {
        path: 'system/roles',
        component: () => import('@/views/sys/roles/roles.vue')
      },
      {
        path: 'system/dept',
        component: () => import('@/views/sys/dept/dept.vue')
      },
      {
        path: 'audit/holiday',
        component: () => import('@/views/audit/holiday/holiday.vue')
      },
      {
        path: 'audit/waiting',
        component: () => import('@/views/audit/waiting/waiting.vue')
      },
      {
        path: 'movie',
        component: () => import('@/views/movie/movie.vue')
      }
    ]
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/download',
    component: () => import('@/views/download/download.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    component: Error
  }
]

const router = createRouter({
  history: createWebHistory('/x'),
  routes: routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.path === '/login' || to.path === '/download') {
    next()
    return
  }
  const token = getItem('x_token')
  if (token) {
    if (store.state.userinfo) {
      next()
      return
    }
    store.dispatch('getUserinfo')
      .then(() => {
        checkRoute(to, next)
      })
      .catch(() => {
        next('/login')
      })
  } else {
    next('/login')
  }
})

router.afterEach(() => {
  NProgress.done()
})

function checkRoute(to: RouteLocationNormalized, next: NavigationGuardNext) {
  if (to.path !== '/' && to.path !== '/download') {
    service.post('/menu/check', {
      path: to.path
    })
      .then(data => {
        if (data) {
          next()
        } else {
          next('/error?status=401')
        }
      })
      .catch(e => {
        next('/error?status=500')
      })
  } else {
    next()
  }
}
export default router
