<template>
<Navbar />
<router-view></router-view>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from './components/Navbar.vue';

export default {
    name: 'App',
    components: {
        Navbar
    }
}
</script>
