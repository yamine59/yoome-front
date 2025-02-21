<template>

  <navbar />
  <router-view />
  <Footer></Footer>

</template>
<script setup>
import Navbar from './components/NavbarComp.vue';
import Footer from './components/FooterComp.vue';

import { useStore } from 'vuex';
import { onMounted } from 'vue';

const store = useStore();
onMounted(() => {
  store.dispatch('checkAuth');
});

//test


</script>
<style lang="scss">
$primary: #f97068;
$second: rgba(219, 228, 245, 1);
$black: rgba(34, 35, 38, 1);
$white: #ffecec;

*,
::before,
::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color:$white;
  box-sizing: content-box;
  overflow: hidden;
  padding: 70px 0;

}



button {
  padding: 20px;
  margin: 20px;
  width: 50vw;
  background-color: $primary;
  border: 0;
  color: white;
  border-radius: 20px;

}


nav {
  padding: 50px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
