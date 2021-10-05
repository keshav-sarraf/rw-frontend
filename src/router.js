import {createRouter, createWebHistory} from 'vue-router';
import Landing from './components/Landing';
const About = () => import('./components/About.vue');
const ContactUs = () => import('./components/ContactUs.vue');
const RandNumGen = () => import('./components/posts/random_number_gen/RandNumGen.vue');
const Puzzle1 = () => import('./components/posts/puzzle_1/Puzzle1.vue');
const RegexPostIntro = () => import('./components/posts/regex/RegexPostIntro.vue');
const RegexGameIntro = () => import('./components/posts/regex/RegexGameIntro.vue');
const RegexGameL1 = () => import('./components/posts/regex/level_1/RegexGameL1.vue');
const RegexGameL2 = () => import('./components/posts/regex/level_2/RegexGameL2.vue');
const RegexGameL3 = () => import('./components/posts/regex/level_3/RegexGameL3.vue');
const RegexGameL4 = () => import('./components/posts/regex/level_4/RegexGameL4.vue');
const RegexGameL5 = () => import('./components/posts/regex/level_5/RegexGameL5.vue');
const RegexGameL6 = () => import('./components/posts/regex/level_6/RegexGameL6.vue');
const RegexGameL7 = () => import('./components/posts/regex/level_7/RegexGameL7.vue');

const routes = [
    { path: '/', component: Landing },
    { path: '/about-us', component: About },
    { path: '/contact-us', component: ContactUs},

    //blog posts
    //rand num generator
    { path: '/random-number-generator', component: RandNumGen },
    //color switches
    { path: '/puzzle-1', component: Puzzle1},
    //regex
    { path: '/regex-post-intro', component: RegexPostIntro},
    { path: '/regex-game-intro', component: RegexGameIntro},
    { path: '/regex-game-l1', component: RegexGameL1},
    { path: '/regex-game-l2', component: RegexGameL2},
    { path: '/regex-game-l3', component: RegexGameL3},
    { path: '/regex-game-l4', component: RegexGameL4},
    { path: '/regex-game-l5', component: RegexGameL5},
    { path: '/regex-game-l6', component: RegexGameL6},
    { path: '/regex-game-l7', component: RegexGameL7},
  ];

const router = createRouter({
    history: createWebHistory(),
    routes, // short for `routes: routes`
  });

export default router;