<template>
<div id="Login" v-if="window.screen != 'mobile'">
  <el-col :md="12" :sm="24" :xs="24" class="banner__desc">
    <div class="login-box">
      <div class="banner__desc__app-name">
        <img src="@/assets/help-desk-icon.png" alt="Logo" width="60px">
        <div style="margin-top: 12px;margin-left: 12px;">Helpdesk Liff</div>
      </div>
      <div style="margin-top:20px">
        <el-button type="success" class="login-with-line" round  @click="login"><i class="fab fa-line" style="font-size:24px;margin-right: 12px;"></i> Log in with LINE</el-button>
      </div>
    </div>
  </el-col>
  <el-col :md="12" :sm="24" :xs="24" >
    <img class="banner" src="@/assets/images/cus-support2.jpg" alt="">
  </el-col>
</div>

<div id="Login" v-else>
  <el-col :span="24" class="banner__desc">
    <img class="banner is-mobile" src="@/assets/images/cus-support2.jpg" alt="">
  </el-col>
  <el-col :span="24" class="banner__desc">
  <div class="login-box is-mobile">
    <div class="banner__desc__app-name">
      <img src="@/assets/help-desk-icon.png" alt="Logo" width="60px">
      <div style="margin-top: 12px;margin-left: 12px;">Helpdesk Liff</div>
    </div>
    <div style="margin-top:20px">
      <el-button type="success" class="login-with-line" round  @click="login"><i class="fab fa-line" style="font-size:24px;margin-right: 12px;"></i> Log in with LINE</el-button>
    </div>
  </div>
</el-col>
</div>
</template>
<script>
import liffMixin from '@/mixins/liff-mixin.js'
import resizeMixin from '@/mixins/resize-mixin.js'

export default {
  mixins : [
    liffMixin,
    resizeMixin
  ],
  methods: {
    login(){
      this.$liff.login()
    },
  },
  async mounted() {
    await this.initLiff()
  }
}
</script>

<style scoped>
#Login .login-box{
  width: 100%;
  max-width: 400px;
  height: 150px;
  position: relative;
  background-color: #fff;
  top: 40vh;
  padding: 30px 30px;
  margin: auto;
}
#Login .login-box.is-mobile{
  top: 58vh;
  width: -webkit-fill-available;
}
#Login .login-with-line{
  font-weight: 700;
  color: #fff;
}
#Login .app-name{
  margin-top: 15px;
  margin-bottom: 15px;
  font-size: 24px;
  font-weight: 700;
}
#Login .container{
  width: 100%;
  max-width: 1024px;
  text-align: center;
}
#Login {
  width: -webkit-fill-available;
  height: 100vh;
}
.banner{
  width: 100%;
  position: fixed;
  max-width: 800px;
  top: 20%;
}
.banner.is-mobile{
  top: 0;
  position: absolute;
}
.banner__desc__app-name{
  font-size: 36px;
  display: flex;
}
</style>
