import store from '@/store'

const resizeMixin =  {
  data(){
    return {
      defaultScreenWidth : 1440,
      window : {
        screen :  store.state.app.window.screen || '',
        width :  store.state.app.window.width || 0,
        height : store.state.app.window.height || 0
      }
    }
  },
  methods : {
    handleResize() {
      let width = document.documentElement.clientWidth;
      let window = {}
      if(width > 1140){
        window.screen = 'desktop'
      }
      else if(width <= 1140 && width > 767){
        window.screen = 'tablet'
      }
      else if(width<=767){
        window.screen = 'mobile'
      }
      window.width =  document.documentElement.clientWidth;
      window.height =  document.documentElement.clientHeight;
      this.window = window
      store.dispatch('app/setWindowHandle',window)
    }
  },
  mounted(){
    this.handleResize();
    this.$nextTick(function() {
      window.addEventListener('resize', this.handleResize)
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  computed : {
    isLanscape () {
      return this.window.width > this.window.height
    }
  }
}

export default resizeMixin
