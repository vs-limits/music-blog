import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PostDetailView from '../views/PostDetailView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'Musicplate - 专辑画廊与深度乐评' },
    },
    {
      path: '/post/:slug',
      name: 'post-detail',
      component: PostDetailView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
      meta: { title: '404 - 页面未找到 | Musicplate' },
    },
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

router.beforeEach((to, _from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
  next()
})

export default router
