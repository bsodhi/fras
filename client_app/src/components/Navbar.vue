<!--
Component for the application's navigation bar.

@author Balwinder Sodhi
-->
<template>
  <div class="container-fluid">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark" v-bind:class=" { 'navbarOpen': show }">
      <a class="navbar-brand" href="#/">FRAS</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click.stop="toggleNavbar()"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <ul class="collapse navbar-collapse nav mr-auto" id="navbarCollapse"
        v-bind:class="{ 'show': show }">
        <li class="nav-item dropdown" v-for="[m, items] in Object.entries(navItems.menus)" :key="m">
          <a
            class="nav-link dropdown-toggle"
            data-toggle="dropdown"
            href="#"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
          >{{m}}</a>
          <div class="dropdown-menu">
            <a
              class="dropdown-item"
              v-for="mi in items"
              :key="mi.label"
              :href="mi.href"
            >{{mi.label}}</a>
          </div>
        </li>
        <li class="nav-item" v-for="l in navItems.links" :key="l.label">
          <a class="nav-link" :href="l.href">{{l.label}}</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#/help">Help</a>
        </li>
      </ul>
      <span v-if="user.login_id != undefined">
        <span class="navbar-text mr-2" style="font-size: small">{{user.login_id}} ({{user.role_name}})</span>
        <button class="btn btn-outline-danger" type="button" @click="logout">
          <font-awesome-icon icon="sign-out-alt" size="lg" />
        </button>
      </span>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: ["navItems", "user"],
  data() {
    return {
      show: true
    };
  },
  methods: {
    logout() {
      console.log("Clicked logged out.");
      this.$emit("logout-user");
    },
    toggleNavbar() {
      this.show = !this.show;
    }
  }
};
</script>

