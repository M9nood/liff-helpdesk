<template>
<section class="hero is-fullheight" id="Login">
  <div class="container">
    <div class="login-box">
      <div style="text-align:center;margin-top:40px" >
       <img src="@/assets/help-desk-icon.png" alt="Logo" width="60px">
       <div>
         <div class="app-name">LIFF Helpdesk</div>
       </div>
      </div>
      <div style="text-align:center;margin-top:50px">
        <button class="button login-with-line" @click="login"><i class="fab fa-line" style="font-size:24px;margin-right: 12px;"></i> Log in with LINE</button>
      </div>
    </div>
  </div>
</section>
</template>
<script>
import liffMixin from '@/mixins/liff-mixin.js'
export default {
  mixins : [
    liffMixin
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
  height: 400px;
  position: relative;
  background-color: #fff;
  top: 20vh;
  box-shadow: 0px 0px 13px rgba(0, 0, 0, 0.07);
  border-radius: 10px;
  /* border:1px solid #e0e0e0; */
  padding: 30px 30px;
  margin: auto;
}
#Login .login-with-line{
  background: #00C300;
  border-color: #00C300;
  color:#fff;
  width: 100%;
  border-radius: 8px;
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

</style>
