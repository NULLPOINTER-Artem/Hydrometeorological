import { createRouter, createWebHistory } from 'vue-router';
import PostsView from '../views/PostsView.vue';
import MapView from '../views/MapView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/posts',
      name: 'posts-view',
      component: PostsView,
      meta: {
        title: 'Posts Page'
      }
    },
    {
      path: '/map',
      name: 'map-view',
      component: MapView,
      meta: {
        title: 'Map Page'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'posts-view' }
    }
  ]
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;
  next();
});

export default router;
