import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import FormPage from '@/views/FormPage.vue'
import NotFoundPage from '@/views/NotFoundPage.vue'
import ParentPage from '../views/ParentPage.vue'

const routes = [
  { path: '/', name: 'root', component: HomePage },
  { path: '/form', name: 'form', component: FormPage },
  { path: '/parent', name: 'parent', component: ParentPage },
  { path: '/:pathMatch(.*)*', name: 'notfound', component: NotFoundPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
