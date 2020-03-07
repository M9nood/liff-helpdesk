<template>
<section class="hero is-fullheight">
<div class="hero-head">
  <NavBar/>
  <div style="padding:12px">
    <router-view/>
  </div>
</div>
</section>
</template>

<script>
import NavBar from '@/components/NavBar'

export default {
  components : {
    NavBar
  }
}
</script>
