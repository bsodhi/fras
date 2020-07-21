<!--
Component for uploading users for bulk add.

@author Balwinder Sodhi
-->
<template>
  <div class="container">
    <p class="h6">Add Users</p>
    <p>Please upload a CSV format file only.</p>
    <div>
      <div class="row">
        <div class="col-md-4">
          <form @submit.prevent="save">
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label for="uploadFile">Users CSV File:</label>
                  <input id="uploadFile" class="form-control" type="file" @change="handleFile" />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="form-group mt-4">
                  <button class="btn btn-outline-success mr-2" type="button" 
                    @click="save" :disabled="!result.length">
                    Upload
                    <font-awesome-icon icon="save" />
                  </button>
                  <button class="btn btn-outline-danger" @click="reset" type="reset">
                    Clear
                    <font-awesome-icon icon="eraser" />
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="col">
          <div class="card">
            <div class="card-header">Confirm Users To Add</div>
            <div class="card-body">
              <div class="row hdr-row">
                <div class="col-md-2">S#</div>
                <div class="col">Login ID</div>
                <div class="col">First Name</div>
                <div class="col">Last Name</div>
                <div class="col">Email</div>
              </div>
              <p v-if="result.length == 0">Nothing to show yet!</p>
              <div class="row row-striped" v-for="(r, idx) in result" :key="idx">
                <div class="col-md-2">{{idx+1}}</div>
                <div class="col">{{r.login_id}}</div>
                <div class="col">{{r.first_name}}</div>
                <div class="col">{{r.last_name}}</div>
                <div class="col">{{r.email}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "AddUsers",
  data: function() {
    return {
      users: { users_file: "", file_name: "" },
      result: []
    };
  },
  methods: {
    save() {
      let vm = this;
      if (!confirm("Confirm action?")) {
        vm.setStatusMessage("User canceled action!");
        return;
      }
      let formData = new FormData();
      formData.append("course_offering", vm.users.course_offering);
      formData.append(
        "users_file",
        vm.users.users_file,
        vm.users.users_file.name
      );

      console.log("Uploading group photo.");
      vm.$http
        .post("users_upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(function(res) {
          vm.setStatusMessage(res.data.body);
        })
        .catch(function(error) {
          console.log(error);
          vm.setStatusMessage("Error occurred when contacting the server.");
        });
    },
    reset() {
      this.users = { course_offering: "", users_file: "", file_name: "" };
      this.result = [];
      console.log("Clearing upload.");
    },
    handleFile(e) {
      let vm = this;
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        console.log("No CSV file selected.");
        return;
      }
      vm.users.users_file = files[0];
      vm.users.file_name = files[0].name;
      const reader = new FileReader();
      reader.onload = function(evt) {
        let data = [];
        let rr = evt.target.result.split("\n");
        rr.forEach(row => {
          let cols = row.split(",");
          data.push({ login_id: cols[0], first_name: cols[1], last_name: cols[2], email: cols[3] });
        });
        /** Remove the header row */
        data.splice(0, 1);
        vm.result = data;
      };
      reader.readAsText(files[0]);
    }
  }
};
</script>
