<template>
  <el-menu  class="el-menu-demo" mode="horizontal" >
    <el-menu-item >
      <a class="navbar-item logo">
        <img src="@/assets/help-desk-icon.png" alt="Logo"> <span style="margin-left:10px;font-weight:500">Liff Helpdesk</span>
      </a>
    </el-menu-item>

    <el-menu-item index="log-out" class="f-r">
      <a v-if="!$liff.isInClient()" @click="logout">
        <el-avatar :src="user.pictureUrl" size="small"></el-avatar>
        Log out
      </a>
    </el-menu-item>
  </el-menu>
</template>

<script>
import $ from 'jquery'
import liffMixin from '@/mixins/liff-mixin.js'
import { mapGetters } from 'vuex'

export default {
  mixins : [
    liffMixin
  ],
  mounted () {
  },
  methods : {
    logout(){
      if (this.$liff.isLoggedIn()) {
        this.$liff.logout();
        this.$router.push({
          path : '/login'
        })
      }
    }
  },
  computed : {
    ...mapGetters({
      user : 'user/getUser'
    })
  },
  beforeCreate () {

  }
}
</script>

<style >
.navbar-item.logo img{
  width : 40px;
  height: 40px;
}

</style>
