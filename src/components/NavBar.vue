<template>
    <nav class="navbar is-transparent">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item">
            <img src="@/assets/help-desk-icon.png" alt="Logo"> <span style="margin-left:10px;font-weight:500">Helpdesk Liff</span>
          </a>
          <span class="navbar-burger burger" data-target="navbarMenuHeroA">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div id="navbarMenuHeroA" class="navbar-menu">
          <div class="navbar-end">
            <!-- <a class="navbar-item ">
              My ticket
            </a> -->
            <a class="navbar-item " v-if="() => $liff.isInClient()" @click="logout">
              Log out
            </a>
          </div>
        </div>
      </div>
    </nav>
</template>

<script>
import $ from 'jquery'
import liffMixin from '@/mixins/liff-mixin.js'
export default {
  mixins : [
    liffMixin
  ],
  mounted () {
    $('.navbar-burger').click(function() {
      $('#navbarMenuHeroA, .navbar-burger').toggleClass('is-active');
    });
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

  beforeCreate () {

  }
}
</script>
