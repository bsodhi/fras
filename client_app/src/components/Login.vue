<!--
Login view.

@author Balwinder Sodhi
-->

<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <div class="card">
          <div class="card-header">Login</div>
          <div class="card-body">
            <form @submit.prevent="authenticate">
              <div class="form-group">
                <label for="login">Login ID:</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="user.login_id"
                  id="login"
                  placeholder="Your login ID"
                />
              </div>
              <div class="form-group">
                <label for="passwd">Password:</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="user.password"
                  id="passwd"
                  placeholder="Your password"
                />
              </div>
              <button type="submit" class="btn btn-outline-primary mr-4">Submit</button>
              <button type="reset" class="btn btn-outline-danger">Cancel</button>
            </form>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <p class="lead">
          Face Recognition Based Attendance System.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data: function () {
    return { user: {} };
  },
  methods: {
    authenticate() {
      let vm = this;
      console.log("Authenticating user.");
      vm.$http
        .post("login", vm.user)
        .then(function (res) {
          console.log(res);
          if (res.data.status == "OK") {
            vm.$emit("user-logged-in", res.data.body);
          } else {
            console.log("Emitting status-message event: " + res.data.body);
            vm.setStatusMessage(res.data.body);
          }
        })
        .catch(function (error) {
          console.log(error);
          vm.setStatusMessage("Error occurred when contacting the server.");
        });
    },
    reset() {
      this.user = {};
      console.log("Clearing user details.");
    },
  },
};
</script>
