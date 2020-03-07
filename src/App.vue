<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  methods : {

  },
  async beforeCreate() {
    // await this.$liff.init({ liffId: process.env.LIFF_ID })
    // if (!this.$liff.isLoggedIn() && this.$router.currentRoute.path != '/login') {
    //   this.$router.push({
    //     path : '/login'
    //   })
    // }
  }
}
</script>

<style>
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
.navbar>.container,
.container {
  max-width: 1024px;
}
</style>
