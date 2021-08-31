import {createRouter, createWebHistory} from 'vue-router';
import Landing from './components/Landing';
import About from './components/About';
import RandNumGen from './components/posts/random_number_gen/RandNumGen'

const routes = [
    { path: '/', component: Landing },
    { path: '/about-us', component: About },
    { path: '/random-number-generator', component: RandNumGen },
  ];

const router = createRouter({
    history: createWebHistory(),
    routes, // short for `routes: routes`
  });

export default router;