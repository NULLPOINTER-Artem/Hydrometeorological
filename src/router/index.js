import { createRouter, createWebHistory } from 'vue-router';
import PostsView from '../views/PostsView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/posts',
      name: 'posts-view',
      component: PostsView
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'posts-view' }
    }
  ]
})

export default router;
