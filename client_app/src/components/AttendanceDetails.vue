<!--
View for holding attendance details.

@author Balwinder Sodhi
-->
<template>
  <div class="container">
    <p
      class="h6"
    >Attendance Details</p>
    <form>
      <div class="card">
        <div class="card-header">
          <div class="row hdr-row">
            <div class="col-md-1">S#</div>
            <div class="col">First Name</div>
            <div class="col">Last Name</div>
            <div class="col">Attended Date</div>
          </div>
        </div>
        <div class="card-body">
          <p v-if="attend.length == 0">Nothing to show yet!</p>
          <div class="row row-striped" v-for="(s, i) in attend" :key="s.id">
            <div class="col-md-1">{{i+1}}</div>
            <div class="col">{{s.first_name}}</div>
            <div class="col">{{s.last_name}}</div>
            <div class="col">{{s.marked_on}}</div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "AttendanceDetails",

  data: function() {
    return { attend:[] };
  },
  created: function() {
    console.log("Creating AttendanceDetails");
    // Alias 'this' for accessing in promises
    let vm = this;
    vm.load();
  },
  methods: {
    load() {
      let vm = this;
      console.log("Loading Attendance details.");
      vm.$http.get('all_attendance')
      .then(function (res) {
        if (res.data.status == "OK") {
          vm.attend = res.data.body
        } else {
          vm.setStatusMessage(res.data.body);
        }
      })
      .catch(function (error) {
        console.log(error);
        vm.setStatusMessage("Error occurred when getting attendance records.");
      });
    },
  }
};
</script>
