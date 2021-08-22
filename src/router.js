import {createRouter, createWebHistory} from 'vue-router';
import Landing from './components/Landing';
import About from './components/About';

const routes = [
    { path: '/', component: Landing },
    { path: '/about-us', component: About },
  ];

const router = createRouter({
    history: createWebHistory(),
    routes, // short for `routes: routes`
  });

export default router;