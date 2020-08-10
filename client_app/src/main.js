/**
Main initialization script for the client app.

@author Balwinder Sodhi
*/
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import axios from 'axios'

// Fontawesome imports and setup
import {
  library
} from '@fortawesome/fontawesome-svg-core'
import {
  faSearch,
  faSave,
  faTrash,
  faEdit,
  faEraser,
  faSignOutAlt,
  faCamera,
  faUserAlt
} from '@fortawesome/free-solid-svg-icons'
import {
  FontAwesomeIcon
} from '@fortawesome/vue-fontawesome'
library.add(faSearch, faSave, faTrash, faEdit, faEraser, faSignOutAlt, faCamera, faUserAlt)
Vue.component('font-awesome-icon', FontAwesomeIcon)

/* ============ AJAX stuff ============== */
Vue.prototype.$http = axios

/*===== Put in a mixin the stuff common to components ====== */
Vue.mixin({
  mounted() {
    this.$root.$on('status-message', msg => {
      console.log("Status message event: " + msg);
      this.$root.statusMessage = msg;
    });
  },
  methods: {
    setStatusMessage(msg) {
      this.$root.$emit('status-message', msg);
    },
    setCurrentUser(user) {
      this.$root.user = user;
    }
  },
  computed: {
    currentUser() {
      return this.$root.user;
    },
    statusMsg() {
      return this.$root.statusMessage;
    },
    authenticated() {
      return this.$root.user.login_id !== undefined
    },
    userRole() {
      return this.$root.user.role
    },
    loginId() {
      return this.$root.user.login_id
    },
    isStudent() {
      return this.$root.user.role === 'student'
    },
    isAdmin() {
      return this.$root.user.role === 'admin'
    },
    isFaculty() {
      return this.$root.user.role === 'faculty'
    }
  }
})

Vue.config.productionTip = false

// Routing setup
Vue.use(VueRouter)
// 1. Define/import route components.
import Login from "./components/Login.vue";
import Help from "./components/Help.vue";
import Home from "./components/Home.vue";
import KnownFaceZipUpload from "./components/KnownFaceZipUpload.vue";
import KnownFaceDetails from "./components/KnownFaceDetails.vue";
import KnownFaceSearch from "./components/KnownFaceSearch.vue";
import AttendanceDetails from "./components/AttendanceDetails.vue";
import MarkAttendance from "./components/MarkAttendance.vue";
import AddUsers from "./components/AddUsers.vue";

// 2. Define routes
const appRoutes = [{
    name: 'login',
    path: '/login',
    component: Login
  },
  {
    name: 'help',
    path: '/help',
    component: Help
  },
  {
    name: 'home',
    path: '/',
    component: Home
  },
  {
    name: 'kf.find',
    path: '/kf.find',
    component: KnownFaceSearch
  },
  {
    name: 'kf.detail',
    path: '/kf.detail/:id?',
    component: KnownFaceDetails
  },
  {
    name: 'kf.zip.upload',
    path: '/kf.zip.upload',
    component: KnownFaceZipUpload
  },
  {
    name: 'att.detail',
    path: '/att.detail',
    component: AttendanceDetails
  },
  {
    name: 'att.mark',
    path: '/att.mark',
    component: MarkAttendance
  },
  {
    name: 'add.users',
    path: '/add.users',
    component: AddUsers
  },
]

// 3. Create the router instance and pass the `routes` option
const myRouter = new VueRouter({
  base: "/app/",
  routes: appRoutes
})

// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.
const rootComp = new Vue({
  /**
   * App component will update auth status via $root
   * We use this value in the auth check navigation gaurd below.
   */
  data: {
    user: {},
    statusMessage: ''
  },
  mounted() {
    let vm = this;
    // Add AJAX interceptors
    vm.$http.interceptors.request.use(function (config) {
      // Do something before request is sent
      vm.statusMessage = "Please wait..."
      return config;
    }, function (error) {
      // Do something with request error
      return Promise.reject(error);
    });
    vm.$http.interceptors.response.use(function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      vm.statusMessage = "";
      return response;
    }, function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      vm.statusMessage = "Error occurred: "+error;
      return Promise.reject(error);
    });
  },
  router: myRouter,
  render: h => h(App)
})

// 5. Attach auth checking navigation guard
myRouter.beforeEach((to, from, next) => {
  try {
    console.log("Path=" + to.path + ". authenticated=" + rootComp.authenticated);
    if (to.path === "/login" || to.path === "/help") {
      next()
    } else if (!rootComp.authenticated) {
      next("/login")
    } else {
      next()
    }
  } catch (error) {
    console.log("Error: " + error)
  }

})

// 6. Mount the rootComp to start the app
rootComp.$mount('#app')