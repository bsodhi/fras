<!--
View for bulk uploading known faces.

@author Balwinder Sodhi
-->

<template>
  <div class="container">
    <p class="h6">Upload KnownFaces</p>
    <p>Please ensure the following before uploading:</p>
    <ol>
      <li>The ZIP file should contain only the .jpg files.</li>
      <li>Each .jpg file should contain only ONE face.</li>
      <li>Name of the .jpg file must be of the following format:
      LoginId.jpg
      Example: 2018CSB1234.jpg</li>
    </ol>
    <form @submit.prevent="save">
      <div class="form-row">
        <div class="col">
          <div class="form-group">
            <label for="uploadFile">ZIP file:</label>
            <input id="uploadFile" class="form-control" type="file" @change="handleFile" />
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="col">
          <div class="form-group mt-4">
            <button class="btn btn-outline-success mr-2" type="submit">
              Save
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
</template>

<script>
export default {
  name: "KnownFaceZipUpload",

  data: function() {
    return { kface: { zip_file: "", file_name: "" } };
  },
  methods: {
    save() {
      let vm = this;
      if (!confirm("Confirm save?")) {
        vm.setStatusMessage("User canceled save!");
        return;
      }
      let formData = new FormData();
      formData.append("zip_file", vm.kface.zip_file, vm.kface.zip_file.name);

      console.log("Uploading kface ZIP file.");
      vm.$http
        .post("kface_bulk_add", formData, {
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
      this.kface = { zip_file: "", file_name: "" };
      console.log("Clearing upload.");
    },
    handleFile(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        console.log("No ZIP file selected.");
        return;
      }
      this.kface.zip_file = files[0];
      this.kface.file_name = files[0].name;
    }
  }
};
</script>
