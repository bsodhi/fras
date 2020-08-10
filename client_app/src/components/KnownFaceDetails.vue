<!--
View for holding details of known faces.

@author Balwinder Sodhi
-->
<template>
  <div class="container">
    <p class="h6">KnownFace Details</p>
    <form @submit.prevent="save">
      <div class="form-row">
        <div class="col">
          <div class="form-group">
            <label for="st_email">Email</label>
            <input type="email" class="form-control" id="st_email" v-model="kface.user.email"/>
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <label for="st_rollno">Login ID</label>
            <input type="text" class="form-control" id="st_rollno" v-model="kface.user.login_id"/>
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="col">
          <div class="form-group">
            <label for="st_firstnm">First Name</label>
            <input type="text" class="form-control" id="st_firstnm" v-model="kface.user.first_name"/>
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <label for="st_lastnm">Last Name</label>
            <input type="text" class="form-control" id="st_lastnm" v-model="kface.user.last_name"/>
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="col-md-6">
          <div v-if="kface.photo">
            <img :src="kface.photo" alt="Face photo" class="img-thumbnail" style="width: 250px;">
            <button type="button" class="btn btn-outline-danger" @click="removeImage">Remove image</button>
          </div>
          <div v-else><font-awesome-icon icon="user-alt" size="6x"/></div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <input class="form-control" type="file" @change="onFileChange">
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="col">
          <div class="form-group mt-4">
            <button class="btn btn-outline-success mr-2" type="submit">Save 
              <font-awesome-icon icon="save"/></button>
            <button class="btn btn-outline-danger" @click="reset" type="reset">Clear 
              <font-awesome-icon icon="eraser"/></button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "KnownFaceDetails",

  data: function() {
    return { kface: {photo:'', user:{}} };
  },
  computed: {
    isEdit() {
      console.log("isEdit() called")
      return this.$route.params.id > 0;
    }
  },
  beforeRouteUpdate(to, from, next) {
    console.log("KnownFaceDetails.beforeRouteUpdate");
    if (from.path.startsWith(to.path)) {
      this.reset();
    } else if (to.params.id) {
      this.load();
    }
    next();
  },
  created: function() {
    console.log("Creating KnownFace Details");
    let vm = this;
    if (vm.isEdit) {
      vm.load();
    } else {
      vm.reset();
    }
  },
  methods: {
    load() {
      // Alias 'this' for accessing in promises
      let vm = this;
      let kfid = vm.$route.params.id
      console.log("Loading kface details. id="+kfid);
      // Fetch data from an API
      this.$http.get('kface/'+kfid)
      .then(function (res) {
        if (res.data.status == "OK") {
          vm.kface = res.data.body;
        } else {
          vm.setStatusMessage(res.data.body);
        }
      })
      .catch(function (error) {
        console.log(error);
        vm.setStatusMessage("Error: "+error);
      });
    },
    save() {
      let vm = this;
      if (!confirm("Confirm save?")) {
        vm.setStatusMessage("User canceled save!");
        return;
      }
      console.log("Saving kface details.");
      vm.$http.post('kface_save', vm.kface)
      .then(function (res) {
        if (res.data.status == "OK") {
          vm.kface = res.data.body;
          vm.setStatusMessage("Saved successfully!");
        } else {
          vm.setStatusMessage(res.data.body);
        }
      })
      .catch(function (error) {
        console.log(error);
        vm.setStatusMessage("Error occurred when contacting the server.");
      });
    },
    reset() {
      this.kface = {photo:'', user:{}};
      console.log("Clearing kface details.");
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        console.log("No image selected.");
        return;
      }
      this.createImage(files[0]);
    },
    createImage(file) {
      console.log("Adding image.");
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.kface.photo = e.target.result;
        console.log("Image loaded");
      };
      reader.readAsDataURL(file);
    },
    removeImage: function (e) {
      console.log("Removing image: "+e);
      this.kface.photo = '';
    }
  }
};
</script>
