<template>
  <div class="tmbd d-flex flex-column">
    <div class="tmbd__header tmbd-header  justify-content-center align-items-center">
      <div class="d-flex justify-content-between p-3" :style="{ backgroundColor: 'rgba(3, 37, 65)' }">
        <a class="navbar-brand tmbd-header__image p-2" href="#"><img :src="require('@/assets/cinema_logo.jpg')" alt="brandLogo" height="70"
            width="70" @click="goToHome"></a>
        <div class="tmbd__header-items d-flex justify-content-center align-items-center">
          <a class="nav-link" href="/moviespage">
            <h3 class="tmbd__header-link">Movies</h3>
          </a>
          <a class="nav-link" href="/tvshowspage">
            <h3 class="tmbd__header-link">Tv shows</h3>
          </a>
          <a class="nav-link" href="/actorspage">
            <h3 class="tmbd__header-link">Actors</h3>
          </a>
          <a class="nav-link">
            <h3 class="tmbd__header-link">More</h3>
          </a>
        </div>

        <div class="tmbd__header-search d-flex justify-content-between align-items-center">
          <input type="text" placeholder="search here" class="p-1">
          <div class="input-group-text p-2 ms-1">
            <i class="fas fa-search"></i>
          </div>
        </div>
      </div>
    </div>

    <router-view></router-view>

    <div class="tmbd__footer tmbd-footer d-flex justify-content-center align-center px-5">
      <div class="tmbd-footer__logo d-flex  align-items-center justify-content-center">
        <img :src="require('@/assets/images/imagedb.jpg')" alt="brandLogo" height="200" width="200" @click="goToHome">
      </div>
      <div class="tmbd-footer__details d-flex justify-content-between align-items-center p-3">
        <div class="d-flex flex-column align-items-center justify-content-center me-5">
          <h3>THE BASICS</h3>
          <a href="/abouttmbd">About TMBD</a>
          <a href="/contactus">Contact US</a>
          <a href="/contactus">System Status</a>
        </div>

        <div class="d-flex flex-column align-items-center justify-content-center me-5">
          <h3>COMMUNITY</h3>
          <a href="/guidlinespage">guidlines</a>
          <a href="/guidlinespage">Discussions</a>
          <a href="/guidlinespage">Discussions</a>
        </div>

        <div class="d-flex flex-column align-items-center justify-content-center">
          <h3>LEGAL</h3>
          <a href="/termspage">Terms of Use</a>
          <a href="/termspage">API Terms of Use</a>
          <a href="/termspage">Privacy Policy</a>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'App',
  components: {

  },
  methods: {
    goToHome() {
      this.$router.push({ name: "homePagee" });
    }
  }
}
</script>
