<!--
View for searching attendance details.

@author Balwinder Sodhi
-->
<template>
  <div class="container">
    <p class="h6">Find Courses</p>
    <form @submit.prevent="find">
      <div class="form-row">
        <div class="col">
          <div class="form-group">
            <label for="cr_code">Code</label>
            <input type="email" class="form-control" id="cr_code" v-model="course.code"/>
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <label for="cr_title">Title</label>
            <input type="text" class="form-control" id="cr_title" v-model="course.title"/>
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <label for="cr_typ">Type</label>
            <input type="text" class="form-control" id="cr_typ" v-model="course.type"/>
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <label for="cr_ltp">L-T-P</label>
            <input type="text" class="form-control" id="cr_ltp" v-model="course.ltp"/>
          </div>
        </div>
        <div class="col-md-2">
          <div class="form-group mt-4">
            <button class="btn btn-outline-success mr-2" type="submit"><font-awesome-icon icon="search"/></button>
            <button class="btn btn-outline-danger" @click="reset" type="reset"><font-awesome-icon icon="eraser"/></button>
          </div>
        </div>
      </div>
    </form>
    
    <div class="card">
      <div class="card-header">Results</div>
      <div class="card-body">
        <div class="row hdr-row border-bottom border-info">
          <div class="col-md-1">S#</div>
          <div class="col">Code</div>
          <div class="col">Title</div>
          <div class="col">L-T-P</div>
          <div class="col">Type</div>
        </div>
        <p v-if="results.length == 0">Nothing to show yet!</p>
        <div class="row row-striped" v-for="(r, i) in results" :key="r.id">
          <div class="col-md-1">{{i+1}}</div>
          <div class="col"><a :href="'#/cour.detail/'+r.id">{{r.code}}</a></div>
          <div class="col">{{r.title}}</div>
          <div class="col">{{r.ltp}}</div>
          <div class="col">{{r.type}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "CourseSearch",

  data: function() {
    return { results: [], course: {} };
  },
  beforeRouteUpdate(to, from, next) {
    console.log("CourseSearch.beforeRouteUpdate");
    // just use `this`
    // this.name = to.params.name;
    next();
  },
  created: function() {
    console.log("Creating CourseSearch");
    // Alias 'this' for accessing in promises
    // var vm = this;
  },
  methods: {
    find() {
      // TODO: Fetch from API
      this.results = [
        {id:1, code:"CS202", title:"Programming Paradigms", ltp:"3-0-2", type: "PC"},
        {id:2, code:"CS305", title:"Software Engineering", ltp:"3-0-2", type: "PC"},
      ]
    },
    reset() {
      this.results = []
      this.course = {}
    }
  }
};
</script>
