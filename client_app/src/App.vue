<!--
This is the main component of the application which
holds the main nav bar and views container.

@author Balwinder Sodhi
-->
<template>
  <div id="appMain" class="container">
    <Navbar v-bind:navItems="navData" v-bind:user="currentUser" v-on:logout-user="onLogout"/>
    <br/>
    <div class="position-fixed center-h" style="z-index:99">
      <div v-if="statusMsg != ''" class="alert alert-dismissible alert-warning" role="alert">
        {{statusMsg}}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="setStatusMessage('')">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
    <router-view v-on:user-logged-in="onLogin"></router-view>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: {
    "Navbar": Navbar
  },
  data: function() {
    return {navData:{menus:{}, links:[]}};
  },
  created: function() {
    // Alias 'this' for accessing in promises
    var vm = this;
    vm.initSession();
  },
  methods: {
    initSession() {
      let vm = this;
      console.log("Loading logged in user if any.");
      vm.$http.get('./current_user')
      .then(function (res) {
        if (res.data.status == "OK") {
          vm.onLogin(res.data.body);
        } else {
          console.log("No logged in user found.");
          vm.onLogout();
          vm.setStatusMessage("No logged in user found.");
        }
      })
      .catch(function (error) {
        console.log(error);
        vm.setStatusMessage("Error occurred when getting current user.");
      });
    },
    onLogin(sessData) {
      console.log("User logged IN.");
      this.setCurrentUser(sessData.user);
      if (sessData.nav !== undefined)
        this.navData = sessData.nav;
      this.$router.push('/');
    },
    onLogout() {
      console.log("User logged OUT.");
      this.setCurrentUser({});
      this.navData = {menus:{}, links:[]};
      this.$router.push('/login');

      this.$http.get('logout')
      .then(function (res) {
        if (res.data.status == "OK") {
          console.log("User logged out.");
        } else {
          console.log("Logout failed: "+res.data.body);
        }
      })
      .catch(function (error) {
        console.log(error);
        this.setStatusMessage("Error occurred when logging out.");
      });
    },

  }
};
</script>
