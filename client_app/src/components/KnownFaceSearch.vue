<!--
View for searching known faces.

@author Balwinder Sodhi
-->
<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h6>Find Existing Faces</h6>
      </div>
      <div class="col">
        <div class="float-right">
          <a href="#/kf.detail" class="btn btn-outline-primary mr-4">Add Face</a>
          <a href="#/kf.zip.upload" class="btn btn-outline-primary">Upload ZIP</a>
        </div>
      </div>
    </div>
    <form @submit.prevent="find">
      <div class="form-row">
        <div class="col">
          <div class="form-group">
            <label for="st_email">Email</label>
            <input type="email" class="form-control" id="st_email" v-model="kface.user.email" />
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <label for="st_rollno">Login ID</label>
            <input type="text" class="form-control" id="st_rollno" v-model="kface.user.login_id" />
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <label for="st_firstnm">First Name</label>
            <input type="text" class="form-control" id="st_firstnm" v-model="kface.user.first_name" />
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <label for="st_lastnm">Last Name</label>
            <input type="text" class="form-control" id="st_lastnm" v-model="kface.user.last_name" />
          </div>
        </div>
        <div class="col-md-2">
          <div class="form-group mt-4">
            <button class="btn btn-outline-success mr-2" type="submit">
              <font-awesome-icon icon="search" />
            </button>
            <button class="btn btn-outline-danger" @click="reset" type="reset">
              <font-awesome-icon icon="eraser" />
            </button>
          </div>
        </div>
      </div>
    </form>

    <div class="card">
      <div class="card-header">
        Results
        <span class="float-right">
          <button
            class="btn btn-outline-info btn-sm mr-4"
            v-if="kface.pg_no > 1"
            @click="prev_pg"
          >Prev</button>
          <button
            class="btn btn-outline-info btn-sm mr-4"
            v-if="results.has_next"
            @click="next_pg"
          >Next</button>
        </span>
      </div>
      <div class="card-body">
        <div class="row hdr-row border-bottom border-info">
          <div class="col-md-1">S#</div>
          <div class="col">Name</div>
          <div class="col">Org. ID</div>
          <div class="col">Photo</div>
          <div class="col-md-1">
            <button :disabled="markedItems.length == 0" class="btn btn-outline-danger btn-sm" @click="deleteMarked">Delete</button>
          </div>
        </div>
        <p v-if="results.faces.length == 0">Nothing to show yet!</p>
        <div class="row mt-4 row-striped" v-for="(r, i) in results.faces" :key="r.id">
          <div class="col-md-1">{{(results.pg_no - 1) * results.pg_size + i + 1}}</div>
          <div class="col">
            <a :href="'#/kf.detail/'+r.id">{{r.user.first_name + " " + r.user.last_name}}</a>
          </div>
          <div class="col">{{r.user.login_id}}</div>
          <div class="col">
            <img
              v-if="r.photo"
              :src="r.photo"
              alt="Face photo"
              class="img-thumbnail"
              style="width: 250px;"
            />
            <font-awesome-icon icon="user-alt" size="6x" v-else />
          </div>
          <div class="col-md-1">
            <input class="form-control" :value="r.id" type="checkbox" v-model="markedItems" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "KnownFace",

  data: function() {
    return {
      kface: { user: {}, pg_no: 1 },
      results: { faces: [], has_next: false },
      markedItems: []
    };
  },
  beforeRouteUpdate(to, from, next) {
    console.log("KnownFace.beforeRouteUpdate");
    // just use `this`
    // this.name = to.params.name;
    next();
  },
  created: function() {
    console.log("Creating KnownFace");
    // Alias 'this' for accessing in promises
    // var vm = this;
  },
  mounted: function() {
    if (sessionStorage.mykey) {
      this.results = JSON.parse(sessionStorage.mykey);
    } else {
      this.results = { faces: [], has_next: false };
    }
  },
  methods: {
    deleteMarked() {
      let vm = this;
      if (
        confirm("Deleted all selected " + vm.markedItems.length + " items?")
      ) {
        let vm = this;
        vm.$http
          .post("kface_delete", {ids: vm.markedItems})
          .then(function(res) {
            if (res.data.status == "OK") {
              vm.markedItems = [];
              vm.find(); // Refresh results from server
            } else {
              vm.setStatusMessage(res.data.body);
            }
          })
          .catch(function(error) {
            console.log(error);
            vm.setStatusMessage("Error occurred when contacting the server.");
          });
      } else {
        vm.markedItems = [];
      }
    },
    next_pg() {
      this.kface.pg_no += 1;
      this.find();
    },
    prev_pg() {
      this.kface.pg_no -= 1;
      this.find();
    },
    find() {
      let vm = this;
      vm.$http
        .post("kface", vm.kface)
        .then(function(res) {
          if (res.data.status == "OK") {
            vm.results = res.data.body;
            sessionStorage.mykey = JSON.stringify(vm.results);
          } else {
            vm.setStatusMessage(res.data.body);
          }
        })
        .catch(function(error) {
          console.log(error);
          vm.setStatusMessage("Error occurred when contacting the server.");
        });
    },
    reset() {
      this.results = { faces: [], has_next: false };
      this.kface = { user: {}, pg_no: 1 };
      sessionStorage.mykey = undefined;
    }
  }
};
</script>
