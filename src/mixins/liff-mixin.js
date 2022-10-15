const liffMixin  = {
  data() {
    return {

    }
  },
  methods : {
    async initLiff(){
      await this.$liff.init({ liffId: process.env.LIFF_ID, withLoginOnExternalBrowser: true })
      if (this.$liff.isInClient() && !localStorage.getItem('li_user') && this.$router.currentRoute.path != '/login') {
        // this.$router.push({
        //   path : '/login'
        // })
      }
    }
  }
}

export default liffMixin
