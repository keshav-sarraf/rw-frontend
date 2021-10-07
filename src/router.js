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
const RegexGameL8 = () => import('./components/posts/regex/level_8/RegexGameL8.vue');
const RegexGameL9 = () => import('./components/posts/regex/level_9/RegexGameL9.vue');
const RegexGameL10 = () => import('./components/posts/regex/level_10/RegexGameL10.vue');
const RegexGameL11 = () => import('./components/posts/regex/level_11/RegexGameL11.vue');
const RegexGameL12 = () => import('./components/posts/regex/level_12/RegexGameL12.vue');
const RegexGameL13 = () => import('./components/posts/regex/level_13/RegexGameL13.vue');
const RegexGameL14 = () => import('./components/posts/regex/level_14/RegexGameL14.vue');
// const RegexGameL15 = () => import('./components/posts/regex/level_15/RegexGameL15.vue');
// const RegexGameL16 = () => import('./components/posts/regex/level_16/RegexGameL16.vue');

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
    { path: '/regex-game-l8', component: RegexGameL8},
    { path: '/regex-game-l9', component: RegexGameL9},
    { path: '/regex-game-l10', component: RegexGameL10},
     { path: '/regex-game-l11', component: RegexGameL11},
    { path: '/regex-game-l12', component: RegexGameL12},
    { path: '/regex-game-l13', component: RegexGameL13},
    { path: '/regex-game-l14', component: RegexGameL14},
    // { path: '/regex-game-l15', component: RegexGameL15},
    // { path: '/regex-game-l16', component: RegexGameL16},
  ];

const router = createRouter({
    history: createWebHistory(),
    routes, // short for `routes: routes`
  });

export default router;