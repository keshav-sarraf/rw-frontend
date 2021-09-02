import {createRouter, createWebHistory} from 'vue-router';
import Landing from './components/Landing';
const About = () => import('./components/About.vue');
const ContactUs = () => import('./components/ContactUs.vue');
const RandNumGen = () => import('./components/posts/random_number_gen/RandNumGen.vue');
const Puzzle1 = () => import('./components/posts/puzzle_1/Puzzle1.vue');

const routes = [
    { path: '/', component: Landing },
    { path: '/about-us', component: About },
    { path: '/random-number-generator', component: RandNumGen },
    { path: '/puzzle-1', component: Puzzle1},
    { path: '/contact-us', component: ContactUs}
  ];

const router = createRouter({
    history: createWebHistory(),
    routes, // short for `routes: routes`
  });

export default router;