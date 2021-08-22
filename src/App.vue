<template>
  <Landing/>
  <About/>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import Landing from './components/Landing.vue';
import About from './components/About.vue';

export default {
  name: 'App',
  components: {
    Landing,
    About
  }
}
</script>