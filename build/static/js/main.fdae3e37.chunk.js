(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(14),c=t.n(u),l=t(4),o=t(2),i=function(e){var n=e.name,t=e.handler;return r.a.createElement("form",null,r.a.createElement("div",null,"filter shown with",r.a.createElement("input",{value:n,onChange:t})))},m=function(e){return r.a.createElement("form",{onSubmit:e.addContact},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:e.newName,onChange:e.handleNameChange})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:e.newNumber,onChange:e.handleNumberChange})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},d=function(e){var n=e.arr,t=e.filteredName,a=e.deleteContact;return r.a.createElement("div",null,n.filter((function(e){return e.name.includes(t)})).map((function(e){return r.a.createElement("p",null,e.name,": ",e.number,r.a.createElement("button",{onClick:function(){return a(e.id)}},"delete"))})))},f=t(3),s=t.n(f),h="/api/persons",b=function(){return s.a.get(h).then((function(e){return e.data}))},E=function(e){return s.a.post(h,e).then((function(e){return e.data}))},p=function(e,n){return s.a.put("".concat(h,"/").concat(e),n).then((function(e){return e.data}))},v=function(e){return s.a.delete("".concat(h,"/").concat(e)).then((function(e){return e.data}))},g=function(e){var n=e.message;return null===n?null:r.a.createElement("div",{className:"message"},n)},w=function(e){var n=e.message;return null===n?null:r.a.createElement("div",{className:"error"},n)},j=function(){var e=Object(a.useState)([]),n=Object(o.a)(e,2),t=n[0],u=n[1],c=Object(a.useState)(""),f=Object(o.a)(c,2),s=f[0],h=f[1],j=Object(a.useState)(""),O=Object(o.a)(j,2),C=O[0],N=O[1],k=Object(a.useState)(""),S=Object(o.a)(k,2),y=S[0],T=S[1],D=Object(a.useState)(null),J=Object(o.a)(D,2),P=J[0],x=J[1],A=Object(a.useState)(null),B=Object(o.a)(A,2),I=B[0],q=B[1],z=t;return Object(a.useEffect)((function(){b().then((function(e){u(e)}))}),[]),r.a.createElement("div",null,r.a.createElement(g,{message:P}),r.a.createElement(w,{message:I}),r.a.createElement("h2",null,"Phonebook"),r.a.createElement(i,{name:y,handler:function(e){T(e.target.value)}}),r.a.createElement("h2",null," add a new"),r.a.createElement(m,{addContact:function(e){if(e.preventDefault(),t.filter((function(e){return s===e.name})).length>0){if(window.confirm("".concat(s," is already added to phonebook, replace the old number with a new one?"))){var n=t.find((function(e){return e.name===s})),a=Object(l.a)(Object(l.a)({},n),{},{number:C});p(n.id,a).then((function(e){u(t.map((function(t){return t.id!==n.id?t:e}))),h(""),N("")})).catch((function(e){q(e.response.data.error),N(""),h(""),setTimeout((function(){q(null)}),3e3)}))}}else if(""===C||""===s)window.alert("Please fill in all fields");else{E({name:s,number:C}).then((function(e){u(t.concat(e)),h(""),N(""),x("Added ".concat(e.name,"!")),setTimeout((function(){x(null)}),3e3)})).catch((function(e){q(e.response.data.error),setTimeout((function(){q(null)}),3e3)}))}},newName:s,handleNameChange:function(e){h(e.target.value)},newNumber:C,handleNumberChange:function(e){N(e.target.value)}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(d,{arr:z,filteredName:y,deleteContact:function(e){window.confirm("Do you really want to delete the contact?")&&v(e).then((function(){u(t.filter((function(n){return n.id!==e})))})).catch((function(n){q("Contact has already been deleted"),u(t.filter((function(n){return n.id!==e})))}))}}))};t(37);c.a.render(r.a.createElement(j,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.fdae3e37.chunk.js.map