import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EditView from '../views/EditSong.vue'
import EditAllView from '../views/EditAllSongs.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/edit-song',
      name: 'edit',
      component: EditView,
    },
    {
      path: '/edit_all_songs',
      name: 'editAll',
      component: EditAllView,
    },
  ],
})

export default router
