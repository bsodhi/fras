(function(t){function e(e){for(var a,i,r=e[0],l=e[1],c=e[2],d=0,f=[];d<r.length;d++)i=r[d],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&f.push(o[i][0]),o[i]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(t[a]=l[a]);u&&u(e);while(f.length)f.shift()();return n.push.apply(n,c||[]),s()}function s(){for(var t,e=0;e<n.length;e++){for(var s=n[e],a=!0,r=1;r<s.length;r++){var l=s[r];0!==o[l]&&(a=!1)}a&&(n.splice(e--,1),t=i(i.s=s[0]))}return t}var a={},o={app:0},n=[];function i(e){if(a[e])return a[e].exports;var s=a[e]={i:e,l:!1,exports:{}};return t[e].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=t,i.c=a,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)i.d(s,a,function(e){return t[e]}.bind(null,a));return s},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/fras/app/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],l=r.push.bind(r);r.push=e,r=r.slice();for(var c=0;c<r.length;c++)e(r[c]);var u=l;n.push([0,"chunk-vendors"]),s()})({0:function(t,e,s){t.exports=s("56d7")},"56d7":function(t,e,s){"use strict";s.r(e);s("d3b7"),s("e260"),s("e6cf"),s("cca6"),s("a79d");var a=s("2b0e"),o=s("8c4f"),n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container",attrs:{id:"appMain"}},[s("Navbar",{attrs:{navItems:t.navData,user:t.currentUser},on:{"logout-user":t.onLogout}}),s("br"),s("div",{staticClass:"position-fixed center-h"},[""!=t.statusMsg?s("div",{staticClass:"alert alert-dismissible alert-warning",attrs:{role:"alert"}},[t._v(" "+t._s(t.statusMsg)+" "),s("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"alert","aria-label":"Close"},on:{click:function(e){return t.setStatusMessage("")}}},[s("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])]):t._e()]),s("router-view",{on:{"user-logged-in":t.onLogin}})],1)},i=[],r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container-fluid"},[s("nav",{staticClass:"navbar navbar-expand-lg navbar-dark bg-dark",class:{navbarOpen:t.show}},[s("a",{staticClass:"navbar-brand",attrs:{href:"#/"}},[t._v("FRAS")]),s("button",{staticClass:"navbar-toggler",attrs:{type:"button","data-toggle":"collapse","data-target":"#navbarCollapse","aria-controls":"navbarCollapse","aria-expanded":"false","aria-label":"Toggle navigation"},on:{click:function(e){return e.stopPropagation(),t.toggleNavbar()}}},[s("span",{staticClass:"navbar-toggler-icon"})]),s("ul",{staticClass:"collapse navbar-collapse nav mr-auto",class:{show:t.show},attrs:{id:"navbarCollapse"}},[t._l(Object.entries(t.navItems.menus),(function(e){var a=e[0],o=e[1];return s("li",{key:a,staticClass:"nav-item dropdown"},[s("a",{staticClass:"nav-link dropdown-toggle",attrs:{"data-toggle":"dropdown",href:"#",role:"button","aria-haspopup":"true","aria-expanded":"false"}},[t._v(t._s(a))]),s("div",{staticClass:"dropdown-menu"},t._l(o,(function(e){return s("a",{key:e.label,staticClass:"dropdown-item",attrs:{href:e.href}},[t._v(t._s(e.label))])})),0)])})),t._l(t.navItems.links,(function(e){return s("li",{key:e.label,staticClass:"nav-item"},[s("a",{staticClass:"nav-link",attrs:{href:e.href}},[t._v(t._s(e.label))])])})),t._m(0)],2),void 0!=t.user.login_id?s("span",[s("span",{staticClass:"navbar-text mr-2",staticStyle:{"font-size":"small"}},[t._v(t._s(t.user.login_id)+" ("+t._s(t.user.role_name)+")")]),s("button",{staticClass:"btn btn-outline-danger",attrs:{type:"button"},on:{click:t.logout}},[s("font-awesome-icon",{attrs:{icon:"sign-out-alt",size:"lg"}})],1)]):t._e()])])},l=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("li",{staticClass:"nav-item"},[s("a",{staticClass:"nav-link",attrs:{href:"#/help"}},[t._v("Help")])])}],c={name:"Navbar",props:["navItems","user"],data:function(){return{show:!0}},methods:{logout:function(){console.log("Clicked logged out."),this.$emit("logout-user")},toggleNavbar:function(){this.show=!this.show}}},u=c,d=s("2877"),f=Object(d["a"])(u,r,l,!1,null,null,null),m=f.exports,v={name:"App",components:{Navbar:m},data:function(){return{navData:{menus:{},links:[]}}},created:function(){var t=this;t.initSession()},methods:{initSession:function(){var t=this;console.log("Loading logged in user if any."),t.$http.get("./current_user").then((function(e){"OK"==e.data.status?t.onLogin(e.data.body):(console.log("No logged in user found."),t.onLogout(),t.setStatusMessage("No logged in user found."))})).catch((function(e){console.log(e),t.setStatusMessage("Error occurred when getting current user.")}))},onLogin:function(t){console.log("User logged IN."),this.setCurrentUser(t.user),void 0!==t.nav&&(this.navData=t.nav),this.$router.push("/")},onLogout:function(){console.log("User logged OUT."),this.setCurrentUser({}),this.navData={menus:{},links:[]},this.$router.push("/login"),this.$http.get("logout").then((function(t){"OK"==t.data.status?console.log("User logged out."):console.log("Logout failed: "+t.data.body)})).catch((function(t){console.log(t),this.setStatusMessage("Error occurred when logging out.")}))}}},p=v,g=Object(d["a"])(p,n,i,!1,null,null,null),h=g.exports,_=s("bc3a"),C=s.n(_),b=s("ecee"),k=s("c074"),w=s("ad3d"),y=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container"},[s("div",{staticClass:"card w-25"},[s("div",{staticClass:"card-header"},[t._v("Login")]),s("div",{staticClass:"card-body"},[s("form",{on:{submit:function(e){return e.preventDefault(),t.authenticate(e)}}},[s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"login"}},[t._v("Login ID:")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.user.login_id,expression:"user.login_id"}],staticClass:"form-control",attrs:{type:"text",id:"login",placeholder:"Your login ID"},domProps:{value:t.user.login_id},on:{input:function(e){e.target.composing||t.$set(t.user,"login_id",e.target.value)}}})]),s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"passwd"}},[t._v("Password:")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.user.password,expression:"user.password"}],staticClass:"form-control",attrs:{type:"password",id:"passwd",placeholder:"Your password"},domProps:{value:t.user.password},on:{input:function(e){e.target.composing||t.$set(t.user,"password",e.target.value)}}})]),s("button",{staticClass:"btn btn-outline-primary mr-4",attrs:{type:"submit"}},[t._v("Submit")]),s("button",{staticClass:"btn btn-outline-danger",attrs:{type:"reset"}},[t._v("Cancel")])])])])])},$=[],x={name:"Login",data:function(){return{user:{}}},methods:{authenticate:function(){var t=this;console.log("Authenticating user."),t.$http.post("login",t.user).then((function(e){console.log(e),"OK"==e.data.status?t.$emit("user-logged-in",e.data.body):(console.log("Emitting status-message event: "+e.data.body),t.setStatusMessage(e.data.body))})).catch((function(e){console.log(e),t.setStatusMessage("Error occurred when contacting the server.")}))},reset:function(){this.user={},console.log("Clearing user details.")}}},S=x,M=Object(d["a"])(S,y,$,!1,null,null,null),E=M.exports,F=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},N=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container"},[s("h6",[t._v("Help")]),t._v(" For help, please call +91 nnn.NNN.nnnn or email at some @ email . com ")])}],P={name:"Help"},I=P,O=Object(d["a"])(I,F,N,!1,null,null,null),D=O.exports,U=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},j=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container"},[s("p",{staticClass:"lead"},[t._v(" This is a prototype for Academic Data Management system ")]),t._v(" Please proceed by choosing a menu item from the top bar. ")])}],A={name:"Home"},L=A,K=Object(d["a"])(L,U,j,!1,null,null,null),T=K.exports,z=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container"},[s("p",{staticClass:"h6"},[t._v("Upload KnownFaces")]),s("p",[t._v("Please ensure the following before uploading:")]),t._m(0),s("form",{on:{submit:function(e){return e.preventDefault(),t.save(e)}}},[s("div",{staticClass:"form-row"},[s("div",{staticClass:"col"},[s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"uploadFile"}},[t._v("ZIP file:")]),s("input",{staticClass:"form-control",attrs:{id:"uploadFile",type:"file"},on:{change:t.handleFile}})])])]),s("div",{staticClass:"form-row"},[s("div",{staticClass:"col"},[s("div",{staticClass:"form-group mt-4"},[s("button",{staticClass:"btn btn-outline-success mr-2",attrs:{type:"submit"}},[t._v(" Save "),s("font-awesome-icon",{attrs:{icon:"save"}})],1),s("button",{staticClass:"btn btn-outline-danger",attrs:{type:"reset"},on:{click:t.reset}},[t._v(" Clear "),s("font-awesome-icon",{attrs:{icon:"eraser"}})],1)])])])])])},R=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ol",[s("li",[t._v("The ZIP file should contain only the .jpg files.")]),s("li",[t._v("Each .jpg file should contain only ONE face.")]),s("li",[t._v("Name of the .jpg file must be of the following format: LoginId.jpg Example: 2018CSB1234.jpg")])])}],Z=(s("b0c0"),{name:"KnownFaceZipUpload",data:function(){return{kface:{zip_file:"",file_name:""}}},methods:{save:function(){var t=this;if(confirm("Confirm save?")){var e=new FormData;e.append("zip_file",t.kface.zip_file,t.kface.zip_file.name),console.log("Uploading kface ZIP file."),t.$http.post("kface_bulk_add",e,{headers:{"Content-Type":"multipart/form-data"}}).then((function(e){t.setStatusMessage(e.data.body)})).catch((function(e){console.log(e),t.setStatusMessage("Error occurred when contacting the server.")}))}else t.setStatusMessage("User canceled save!")},reset:function(){this.kface={zip_file:"",file_name:""},console.log("Clearing upload.")},handleFile:function(t){var e=t.target.files||t.dataTransfer.files;e.length?(this.kface.zip_file=e[0],this.kface.file_name=e[0].name):console.log("No ZIP file selected.")}}}),H=Z,J=Object(d["a"])(H,z,R,!1,null,null,null),V=J.exports,G=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container"},[s("p",{staticClass:"h6"},[t._v("KnownFace Details")]),s("form",{on:{submit:function(e){return e.preventDefault(),t.save(e)}}},[s("div",{staticClass:"form-row"},[s("div",{staticClass:"col"},[s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"st_email"}},[t._v("Email")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.kface.user.email,expression:"kface.user.email"}],staticClass:"form-control",attrs:{type:"email",id:"st_email"},domProps:{value:t.kface.user.email},on:{input:function(e){e.target.composing||t.$set(t.kface.user,"email",e.target.value)}}})])]),s("div",{staticClass:"col"},[s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"st_rollno"}},[t._v("Login ID")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.kface.user.login_id,expression:"kface.user.login_id"}],staticClass:"form-control",attrs:{type:"text",id:"st_rollno"},domProps:{value:t.kface.user.login_id},on:{input:function(e){e.target.composing||t.$set(t.kface.user,"login_id",e.target.value)}}})])])]),s("div",{staticClass:"form-row"},[s("div",{staticClass:"col"},[s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"st_firstnm"}},[t._v("First Name")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.kface.user.first_name,expression:"kface.user.first_name"}],staticClass:"form-control",attrs:{type:"text",id:"st_firstnm"},domProps:{value:t.kface.user.first_name},on:{input:function(e){e.target.composing||t.$set(t.kface.user,"first_name",e.target.value)}}})])]),s("div",{staticClass:"col"},[s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"st_lastnm"}},[t._v("Last Name")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.kface.user.last_name,expression:"kface.user.last_name"}],staticClass:"form-control",attrs:{type:"text",id:"st_lastnm"},domProps:{value:t.kface.user.last_name},on:{input:function(e){e.target.composing||t.$set(t.kface.user,"last_name",e.target.value)}}})])])]),s("div",{staticClass:"form-row"},[s("div",{staticClass:"col-md-6"},[t.kface.photo?s("div",[s("img",{staticClass:"img-thumbnail",staticStyle:{width:"250px"},attrs:{src:t.kface.photo,alt:"Face photo"}}),s("button",{staticClass:"btn btn-outline-danger",attrs:{type:"button"},on:{click:t.removeImage}},[t._v("Remove image")])]):s("div",[s("font-awesome-icon",{attrs:{icon:"user-alt",size:"6x"}})],1)]),s("div",{staticClass:"col-md-6"},[s("div",{staticClass:"form-group"},[s("input",{staticClass:"form-control",attrs:{type:"file"},on:{change:t.onFileChange}})])])]),s("div",{staticClass:"form-row"},[s("div",{staticClass:"col"},[s("div",{staticClass:"form-group mt-4"},[s("button",{staticClass:"btn btn-outline-success mr-2",attrs:{type:"submit"}},[t._v("Save "),s("font-awesome-icon",{attrs:{icon:"save"}})],1),s("button",{staticClass:"btn btn-outline-danger",attrs:{type:"reset"},on:{click:t.reset}},[t._v("Clear "),s("font-awesome-icon",{attrs:{icon:"eraser"}})],1)])])])])])},Y=[],q=(s("2ca0"),{name:"KnownFaceDetails",data:function(){return{kface:{photo:"",user:{}}}},computed:{isEdit:function(){return console.log("isEdit() called"),this.$route.params.id>0}},beforeRouteUpdate:function(t,e,s){console.log("KnownFaceDetails.beforeRouteUpdate"),e.path.startsWith(t.path)?this.reset():t.params.id&&this.load(),s()},created:function(){console.log("Creating KnownFace Details");var t=this;t.isEdit?t.load():t.reset()},methods:{load:function(){var t=this,e=t.$route.params.id;console.log("Loading kface details. id="+e),this.$http.get("kface/"+e).then((function(e){"OK"==e.data.status?t.kface=e.data.body:t.setStatusMessage(e.data.body)})).catch((function(e){console.log(e),t.setStatusMessage("Error: "+e)}))},save:function(){var t=this;confirm("Confirm save?")?(console.log("Saving kface details."),t.$http.post("kface_save",t.kface).then((function(e){"OK"==e.data.status?(t.kface=e.data.body,t.setStatusMessage("Saved successfully!")):t.setStatusMessage(e.data.body)})).catch((function(e){console.log(e),t.setStatusMessage("Error occurred when contacting the server.")}))):t.setStatusMessage("User canceled save!")},reset:function(){this.kface={photo:"",user:{}},console.log("Clearing kface details.")},onFileChange:function(t){var e=t.target.files||t.dataTransfer.files;e.length?this.createImage(e[0]):console.log("No image selected.")},createImage:function(t){console.log("Adding image.");var e=new FileReader,s=this;e.onload=function(t){s.kface.photo=t.target.result,console.log("Image loaded")},e.readAsDataURL(t)},removeImage:function(t){console.log("Removing image: "+t),this.kface.photo=""}}}),B=q,W=Object(d["a"])(B,G,Y,!1,null,null,null),Q=W.exports,X=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container"},[t._m(0),s("form",{on:{submit:function(e){return e.preventDefault(),t.find(e)}}},[s("div",{staticClass:"form-row"},[s("div",{staticClass:"col"},[s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"st_email"}},[t._v("Email")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.kface.user.email,expression:"kface.user.email"}],staticClass:"form-control",attrs:{type:"email",id:"st_email"},domProps:{value:t.kface.user.email},on:{input:function(e){e.target.composing||t.$set(t.kface.user,"email",e.target.value)}}})])]),s("div",{staticClass:"col"},[s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"st_rollno"}},[t._v("Login ID")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.kface.user.login_id,expression:"kface.user.login_id"}],staticClass:"form-control",attrs:{type:"text",id:"st_rollno"},domProps:{value:t.kface.user.login_id},on:{input:function(e){e.target.composing||t.$set(t.kface.user,"login_id",e.target.value)}}})])]),s("div",{staticClass:"col"},[s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"st_firstnm"}},[t._v("First Name")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.kface.user.first_name,expression:"kface.user.first_name"}],staticClass:"form-control",attrs:{type:"text",id:"st_firstnm"},domProps:{value:t.kface.user.first_name},on:{input:function(e){e.target.composing||t.$set(t.kface.user,"first_name",e.target.value)}}})])]),s("div",{staticClass:"col"},[s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"st_lastnm"}},[t._v("Last Name")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.kface.user.last_name,expression:"kface.user.last_name"}],staticClass:"form-control",attrs:{type:"text",id:"st_lastnm"},domProps:{value:t.kface.user.last_name},on:{input:function(e){e.target.composing||t.$set(t.kface.user,"last_name",e.target.value)}}})])]),s("div",{staticClass:"col-md-2"},[s("div",{staticClass:"form-group mt-4"},[s("button",{staticClass:"btn btn-outline-success mr-2",attrs:{type:"submit"}},[s("font-awesome-icon",{attrs:{icon:"search"}})],1),s("button",{staticClass:"btn btn-outline-danger",attrs:{type:"reset"},on:{click:t.reset}},[s("font-awesome-icon",{attrs:{icon:"eraser"}})],1)])])])]),s("div",{staticClass:"card"},[s("div",{staticClass:"card-header"},[t._v(" Results "),s("span",{staticClass:"float-right"},[t.kface.pg_no>1?s("button",{staticClass:"btn btn-outline-info btn-sm mr-4",on:{click:t.prev_pg}},[t._v("Prev")]):t._e(),t.results.has_next?s("button",{staticClass:"btn btn-outline-info btn-sm mr-4",on:{click:t.next_pg}},[t._v("Next")]):t._e()])]),s("div",{staticClass:"card-body"},[s("div",{staticClass:"row hdr-row border-bottom border-info"},[s("div",{staticClass:"col-md-1"},[t._v("S#")]),s("div",{staticClass:"col"},[t._v("Name")]),s("div",{staticClass:"col"},[t._v("Org. ID")]),s("div",{staticClass:"col"},[t._v("Photo")]),s("div",{staticClass:"col-md-1"},[s("button",{staticClass:"btn btn-outline-danger btn-sm",attrs:{disabled:0==t.markedItems.length},on:{click:t.deleteMarked}},[t._v("Delete")])])]),0==t.results.faces.length?s("p",[t._v("Nothing to show yet!")]):t._e(),t._l(t.results.faces,(function(e,a){return s("div",{key:e.id,staticClass:"row mt-4"},[s("div",{staticClass:"col-md-1"},[t._v(t._s((t.results.pg_no-1)*t.results.pg_size+a+1))]),s("div",{staticClass:"col"},[s("a",{attrs:{href:"#/kf.detail/"+e.id}},[t._v(t._s(e.user.first_name+" "+e.user.last_name))])]),s("div",{staticClass:"col"},[t._v(t._s(e.user.login_id))]),s("div",{staticClass:"col"},[e.photo?s("img",{staticClass:"img-thumbnail",staticStyle:{width:"250px"},attrs:{src:e.photo,alt:"Face photo"}}):s("font-awesome-icon",{attrs:{icon:"user-alt",size:"6x"}})],1),s("div",{staticClass:"col-md-1"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.markedItems,expression:"markedItems"}],staticClass:"form-control",attrs:{type:"checkbox"},domProps:{value:e.id,checked:Array.isArray(t.markedItems)?t._i(t.markedItems,e.id)>-1:t.markedItems},on:{change:function(s){var a=t.markedItems,o=s.target,n=!!o.checked;if(Array.isArray(a)){var i=e.id,r=t._i(a,i);o.checked?r<0&&(t.markedItems=a.concat([i])):r>-1&&(t.markedItems=a.slice(0,r).concat(a.slice(r+1)))}else t.markedItems=n}}})])])}))],2)])])},tt=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"row"},[s("div",{staticClass:"col"},[s("h6",[t._v("Find Existing Faces")])]),s("div",{staticClass:"col"},[s("div",{staticClass:"float-right"},[s("a",{staticClass:"btn btn-outline-primary mr-4",attrs:{href:"#/kf.detail"}},[t._v("Add Face")]),s("a",{staticClass:"btn btn-outline-primary",attrs:{href:"#/kf.zip.upload"}},[t._v("Upload ZIP")])])])])}],et=(s("7db0"),{name:"KnownFace",data:function(){return{kface:{user:{},pg_no:1},results:{faces:[],has_next:!1},markedItems:[]}},beforeRouteUpdate:function(t,e,s){console.log("KnownFace.beforeRouteUpdate"),s()},created:function(){console.log("Creating KnownFace")},methods:{deleteMarked:function(){var t=this;if(confirm("Deleted all selected "+t.markedItems.length+" items?")){var e=this;e.$http.post("kface_delete",{ids:e.markedItems}).then((function(t){"OK"==t.data.status?(e.markedItems=[],e.find()):e.setStatusMessage(t.data.body)})).catch((function(t){console.log(t),e.setStatusMessage("Error occurred when contacting the server.")}))}else t.markedItems=[]},next_pg:function(){this.kface.pg_no+=1,this.find()},prev_pg:function(){this.kface.pg_no-=1,this.find()},find:function(){var t=this;t.$http.post("kface",t.kface).then((function(e){"OK"==e.data.status?t.results=e.data.body:t.setStatusMessage(e.data.body)})).catch((function(e){console.log(e),t.setStatusMessage("Error occurred when contacting the server.")}))},reset:function(){this.results={faces:[],has_next:!1},this.kface={pg_no:1}}}}),st=et,at=Object(d["a"])(st,X,tt,!1,null,null,null),ot=at.exports,nt=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container"},[s("p",{staticClass:"h6"},[t._v("Attendance Details")]),s("form",[s("div",{staticClass:"card"},[t._m(0),s("div",{staticClass:"card-body"},[0==t.attend.length?s("p",[t._v("Nothing to show yet!")]):t._e(),t._l(t.attend,(function(e,a){return s("div",{key:e.id,staticClass:"row"},[s("div",{staticClass:"col-md-1"},[t._v(t._s(a+1))]),s("div",{staticClass:"col"},[t._v(t._s(e.first_name))]),s("div",{staticClass:"col"},[t._v(t._s(e.last_name))]),s("div",{staticClass:"col"},[t._v(t._s(e.marked_on))])])}))],2)])])])},it=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"card-header"},[s("div",{staticClass:"row hdr-row"},[s("div",{staticClass:"col-md-1"},[t._v("S#")]),s("div",{staticClass:"col"},[t._v("First Name")]),s("div",{staticClass:"col"},[t._v("Last Name")]),s("div",{staticClass:"col"},[t._v("Attended Date")])])])}],rt={name:"AttendanceDetails",data:function(){return{attend:[]}},created:function(){console.log("Creating AttendanceDetails");var t=this;t.load()},methods:{load:function(){var t=this;console.log("Loading Attendance details."),t.$http.get("all_attendance").then((function(e){"OK"==e.data.status?t.attend=e.data.body:t.setStatusMessage(e.data.body)})).catch((function(e){console.log(e),t.setStatusMessage("Error occurred when getting attendance records.")}))}}},lt=rt,ct=Object(d["a"])(lt,nt,it,!1,null,null,null),ut=ct.exports,dt=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container"},[s("p",{staticClass:"h6"},[t._v("Upload Group Photo")]),s("p",[t._v("Please upload a photo in JPG format only.")]),s("form",{on:{submit:function(e){return e.preventDefault(),t.save(e)}}},[s("div",{staticClass:"form-row"},[s("div",{staticClass:"col"},[s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"uploadFile"}},[t._v("Photo:")]),s("input",{staticClass:"form-control",attrs:{id:"uploadFile",type:"file"},on:{change:t.handleFile}})])])]),s("div",{staticClass:"form-row"},[s("div",{staticClass:"col"},[s("div",{staticClass:"form-group mt-4"},[s("button",{staticClass:"btn btn-outline-success mr-2",attrs:{type:"submit"}},[t._v(" Check "),s("font-awesome-icon",{attrs:{icon:"save"}})],1),s("button",{staticClass:"btn btn-outline-danger",attrs:{type:"reset"},on:{click:t.reset}},[t._v(" Clear "),s("font-awesome-icon",{attrs:{icon:"eraser"}})],1)])])])]),""!=t.result?s("div",{staticClass:"card w-100"},[s("img",{staticClass:"card-img-top",attrs:{src:t.result.im_b64}}),s("div",{staticClass:"card-body"},[s("a",{staticClass:"btn btn-sm btn-info",attrs:{href:t.result.im_b64,target:"_blank"}},[t._v("Enlarg Photo")]),s("p",[t._v("Out of about "+t._s(t.result.fcount)+" clearly visible faces in the photo, following were identified:")]),s("ul",t._l(t.result.names_found,(function(e,a){return s("li",{key:e},[t._v(" "+t._s(a+1)+": "+t._s(e.first_name)+", "+t._s(e.last_name)+" ")])})),0)])]):t._e()])},ft=[],mt={name:"MarkAttendance",data:function(){return{kface:{group_photo:"",file_name:""},result:""}},methods:{save:function(){var t=this;if(confirm("Confirm action?")){var e=new FormData;e.append("group_photo",t.kface.group_photo,t.kface.group_photo.name),console.log("Uploading group photo."),t.$http.post("mark_attendance",e,{headers:{"Content-Type":"multipart/form-data"}}).then((function(e){"OK"==e.data.status?t.result=e.data.body:t.setStatusMessage(e.data.body)})).catch((function(e){console.log(e),t.setStatusMessage("Error occurred when contacting the server.")}))}else t.setStatusMessage("User canceled action!")},reset:function(){this.kface={group_photo:"",file_name:""},this.result="",console.log("Clearing upload.")},handleFile:function(t){var e=t.target.files||t.dataTransfer.files;e.length?(this.kface.group_photo=e[0],this.kface.file_name=e[0].name):console.log("No photo selected.")}}},vt=mt,pt=Object(d["a"])(vt,dt,ft,!1,null,null,null),gt=pt.exports,ht=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container"},[s("p",{staticClass:"h6"},[t._v("Add Users")]),s("p",[t._v("Please upload a CSV format file only.")]),s("div",[s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-4"},[s("form",{on:{submit:function(e){return e.preventDefault(),t.save(e)}}},[s("div",{staticClass:"row"},[s("div",{staticClass:"col"},[s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"uploadFile"}},[t._v("Users CSV File:")]),s("input",{staticClass:"form-control",attrs:{id:"uploadFile",type:"file"},on:{change:t.handleFile}})])])]),s("div",{staticClass:"row"},[s("div",{staticClass:"col"},[s("div",{staticClass:"form-group mt-4"},[s("button",{staticClass:"btn btn-outline-success mr-2",attrs:{type:"button",disabled:!t.result.length},on:{click:t.save}},[t._v(" Upload "),s("font-awesome-icon",{attrs:{icon:"save"}})],1),s("button",{staticClass:"btn btn-outline-danger",attrs:{type:"reset"},on:{click:t.reset}},[t._v(" Clear "),s("font-awesome-icon",{attrs:{icon:"eraser"}})],1)])])])])]),s("div",{staticClass:"col"},[s("div",{staticClass:"card"},[s("div",{staticClass:"card-header"},[t._v("Confirm Users To Add")]),s("div",{staticClass:"card-body"},[t._m(0),0==t.result.length?s("p",[t._v("Nothing to show yet!")]):t._e(),t._l(t.result,(function(e,a){return s("div",{key:a,staticClass:"row row-striped"},[s("div",{staticClass:"col-md-2"},[t._v(t._s(a+1))]),s("div",{staticClass:"col"},[t._v(t._s(e.login_id))]),s("div",{staticClass:"col"},[t._v(t._s(e.first_name))]),s("div",{staticClass:"col"},[t._v(t._s(e.last_name))]),s("div",{staticClass:"col"},[t._v(t._s(e.email))])])}))],2)])])])])])},_t=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"row hdr-row"},[s("div",{staticClass:"col-md-2"},[t._v("S#")]),s("div",{staticClass:"col"},[t._v("Login ID")]),s("div",{staticClass:"col"},[t._v("First Name")]),s("div",{staticClass:"col"},[t._v("Last Name")]),s("div",{staticClass:"col"},[t._v("Email")])])}],Ct=(s("4160"),s("a434"),s("ac1f"),s("1276"),s("159b"),{name:"AddUsers",data:function(){return{users:{users_file:"",file_name:""},result:[]}},methods:{save:function(){var t=this;if(confirm("Confirm action?")){var e=new FormData;e.append("course_offering",t.users.course_offering),e.append("users_file",t.users.users_file,t.users.users_file.name),console.log("Uploading group photo."),t.$http.post("users_upload",e,{headers:{"Content-Type":"multipart/form-data"}}).then((function(e){t.setStatusMessage(e.data.body)})).catch((function(e){console.log(e),t.setStatusMessage("Error occurred when contacting the server.")}))}else t.setStatusMessage("User canceled action!")},reset:function(){this.users={course_offering:"",users_file:"",file_name:""},this.result=[],console.log("Clearing upload.")},handleFile:function(t){var e=this,s=t.target.files||t.dataTransfer.files;if(s.length){e.users.users_file=s[0],e.users.file_name=s[0].name;var a=new FileReader;a.onload=function(t){var s=[],a=t.target.result.split("\n");a.forEach((function(t){var e=t.split(",");s.push({login_id:e[0],first_name:e[1],last_name:e[2],email:e[3]})})),s.splice(0,1),e.result=s},a.readAsText(s[0])}else console.log("No CSV file selected.")}}}),bt=Ct,kt=Object(d["a"])(bt,ht,_t,!1,null,null,null),wt=kt.exports;b["c"].add(k["e"],k["d"],k["g"],k["b"],k["c"],k["f"],k["a"],k["h"]),a["a"].component("font-awesome-icon",w["a"]),a["a"].prototype.$http=C.a,a["a"].mixin({mounted:function(){var t=this;this.$root.$on("status-message",(function(e){console.log("Status message event: "+e),t.$root.statusMessage=e}))},methods:{setStatusMessage:function(t){this.$root.$emit("status-message",t)},setCurrentUser:function(t){this.$root.user=t}},computed:{currentUser:function(){return this.$root.user},statusMsg:function(){return this.$root.statusMessage},authenticated:function(){return void 0!==this.$root.user.login_id},userRole:function(){return this.$root.user.role},loginId:function(){return this.$root.user.login_id},isStudent:function(){return"student"===this.$root.user.role},isAdmin:function(){return"admin"===this.$root.user.role},isFaculty:function(){return"faculty"===this.$root.user.role}}}),a["a"].config.productionTip=!1,a["a"].use(o["a"]);var yt=[{name:"login",path:"/login",component:E},{name:"help",path:"/help",component:D},{name:"home",path:"/",component:T},{name:"kf.find",path:"/kf.find",component:ot},{name:"kf.detail",path:"/kf.detail/:id?",component:Q},{name:"kf.zip.upload",path:"/kf.zip.upload",component:V},{name:"att.detail",path:"/att.detail",component:ut},{name:"att.mark",path:"/att.mark",component:gt},{name:"add.users",path:"/add.users",component:wt}],$t=new o["a"]({base:"/app/",routes:yt}),xt=new a["a"]({data:{user:{},statusMessage:""},mounted:function(){var t=this;t.$http.interceptors.request.use((function(e){return t.statusMessage="Please wait...",e}),(function(t){return Promise.reject(t)})),t.$http.interceptors.response.use((function(e){return t.statusMessage="",e}),(function(e){return t.statusMessage="Error occurred: "+e,Promise.reject(e)}))},router:$t,render:function(t){return t(h)}});$t.beforeEach((function(t,e,s){try{console.log("Path="+t.path+". authenticated="+xt.authenticated),"/login"===t.path||"/help"===t.path||xt.authenticated?s():s("/login")}catch(a){console.log("Error: "+a)}})),xt.$mount("#app")}});
//# sourceMappingURL=app.63e12eb4.js.map