<template>
<Navbar />
<router-view></router-view>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Navbar from './components/Navbar.vue';

export default {
    name: 'App',
    components: {
        Navbar
    }
}
</script>
