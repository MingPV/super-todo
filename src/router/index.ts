import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAccountStore } from '@/stores/account'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import FriendView from '@/views/FriendView.vue'
import TodoListView from '@/views/TodoListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/friend',
      name: 'friend',
      component: FriendView,
    },
    {
      path: '/todos',
      name: 'todos',
      component: TodoListView,
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  // เพิ่มเรียก checkAuthState ขึ้นมาเพื่อ update store ให้ user ถูก update
  const userAccountStore = useAccountStore()
  await userAccountStore.checkAuthState()

  // ทำการแสดง route ออกไป
  next()
})

export default router
