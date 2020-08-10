<!--
View for uploading a group photo to demonstrate attendance
marking in case of a group of people.

@author Balwinder Sodhi
-->
<template>
  <div class="container">
    <p class="h6">Upload Group Photo</p>
    <p>Please upload a photo in JPG format only.</p>
    <form @submit.prevent="save">
      <div class="form-row">
        <div class="col">
          <div class="form-group">
            <label for="uploadFile">Photo:</label>
            <input id="uploadFile" class="form-control" type="file" @change="handleFile" />
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="col">
          <div class="form-group mt-4">
            <button class="btn btn-outline-success mr-2" type="submit">
              Check
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
    <div class="card w-100" v-if="result != ''">
      <img :src="result.im_b64" class="card-img-top">
      <div class="card-body">
        <a :href="result.im_b64" class="btn btn-sm btn-info" target="_blank">Enlarg Photo</a>
        <p>Out of about {{result.fcount}} clearly visible faces in the photo, following were identified:</p>
        <ul>
          <li v-for="(nm, idx) in result.names_found" :key="nm">
            {{idx+1}}: {{nm.first_name}}, {{nm.last_name}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MarkAttendance",

  data: function() {
    return { kface: { group_photo: "", file_name: "" }, result: '' };
  },
  methods: {
    save() {
      let vm = this;
      if (!confirm("Confirm action?")) {
        vm.setStatusMessage("User canceled action!");
        return;
      }
      let formData = new FormData();
      formData.append("group_photo", vm.kface.group_photo, vm.kface.group_photo.name);

      console.log("Uploading group photo.");
      vm.$http
        .post("mark_attendance", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(function(res) {
          if (res.data.status == "OK") {
            vm.result = res.data.body;
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
      this.kface = { group_photo: "", file_name: "" };
      this.result = '';
      console.log("Clearing upload.");
    },
    handleFile(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        console.log("No photo selected.");
        return;
      }
      this.kface.group_photo = files[0];
      this.kface.file_name = files[0].name;
    }
  }
};
</script>
