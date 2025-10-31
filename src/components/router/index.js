
import { createRouter, createWebHistory } from 'vue-router';
import GameView from '../view/GameView.vue'; 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: GameView 
    }
  ]
});

export default router;