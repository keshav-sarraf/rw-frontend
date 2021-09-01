import {createRouter, createWebHistory} from 'vue-router';
import Landing from './components/Landing';
import About from './components/About';
import RandNumGen from './components/posts/random_number_gen/RandNumGen'
import Puzzle1 from './components/posts/puzzle_1/Puzzle1'

const routes = [
    { path: '/', component: Landing },
    { path: '/about-us', component: About },
    { path: '/random-number-generator', component: RandNumGen },
    { path: '/puzzle-1', component: Puzzle1}
  ];

const router = createRouter({
    history: createWebHistory(),
    routes, // short for `routes: routes`
  });

export default router;