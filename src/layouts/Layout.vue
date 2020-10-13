<template>
<el-container id="layout">
  <el-header class="nav-bar-header">
    <NavBar/>
  </el-header>
  <el-main >
  <div >
    <router-view/>
  </div>
  </el-main>
</el-container>
</template>

<script>
import NavBar from '@/components/NavBar'

export default {
  components : {
    NavBar
  }
}
</script>

<style>
body{
  margin: 0px!important;
}
.el-header.nav-bar-header{
  padding: 0px 0px;
}
</style>
