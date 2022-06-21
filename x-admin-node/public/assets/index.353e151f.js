var ie=Object.defineProperty,de=Object.defineProperties;var me=Object.getOwnPropertyDescriptors;var J=Object.getOwnPropertySymbols;var _e=Object.prototype.hasOwnProperty,pe=Object.prototype.propertyIsEnumerable;var H=(e,t,n)=>t in e?ie(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,j=(e,t)=>{for(var n in t||(t={}))_e.call(t,n)&&H(e,n,t[n]);if(J)for(var n of J(t))pe.call(t,n)&&H(e,n,t[n]);return e},G=(e,t)=>de(e,me(t));import{d as k,r as c,o as d,c as g,a as fe,E as R,b as $,u as i,w as u,e as m,n as L,t as C,f as v,g as T,F as S,h as O,i as f,j as a,k as K,l as I,m as W,p as Q,q as he,s as ge,B as ve,A as be,T as ye,v as Ee,x as we,y as X,z as ke,L as xe,C as Ae,D as $e,G as Ce,H as Ie,I as Fe,J as Ne,N as Y,K as Le,M as Se,O as Oe}from"./vendor.76307f7a.js";const Be=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerpolicy&&(r.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?r.credentials="include":s.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}};Be();const Pe=k({setup(e){return(t,n)=>{const o=c("router-view");return d(),g(o)}}}),De="modulepreload",Z={},Ve="/",y=function(t,n){return!n||n.length===0?t():Promise.all(n.map(o=>{if(o=`${Ve}${o}`,o in Z)return;Z[o]=!0;const s=o.endsWith(".css"),r=s?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${o}"]${r}`))return;const l=document.createElement("link");if(l.rel=s?"stylesheet":De,s||(l.as="script",l.crossOrigin=""),l.href=o,document.head.appendChild(l),s)return new Promise((h,_)=>{l.addEventListener("load",h),l.addEventListener("error",_)})})).then(()=>t())},je=e=>Object.prototype.toString.call(e)==="[object Object]",Re=(e,t)=>{if(je(t)||Array.isArray(t)){localStorage.setItem(e,JSON.stringify(t));return}localStorage.setItem(e,t)},ee=e=>{const t=localStorage.getItem(e);return t&&(t.indexOf("[")===0||t.indexOf("{")===0)?JSON.parse(t):t},Te=()=>{localStorage.clear()},b=fe.create({baseURL:"/api",timeout:8e3});b.interceptors.request.use(e=>{const t=ee("x_token");return e.headers=G(j({},e.headers),{Authorization:"Bearer token"}),t&&(e.headers.Authorization="Bearer "+t),e});b.interceptors.response.use(e=>{const{code:t,data:n,msg:o}=e.data;return t===200?n:t===50001?(R.error(o),oe.push("/login"),Promise.reject("token invalid")):(R.error(o||"\u7F51\u7EDC\u5F02\u5E38"),Promise.reject(o||"\u7F51\u7EDC\u5F02\u5E38"))},e=>(R.error(e.message||"\u7F51\u7EDC\u5F02\u5E38"),Promise.reject(e.message||"\u7F51\u7EDC\u5F02\u5E38")));var M=(e,t)=>{for(const[n,o]of t)e[n]=o;return e};const Me=f("\xA0 "),Ue=f("\xA0 "),ze=k({props:{menu:null},setup(e){const t=e,n=$(()=>t.menu.children?t.menu.children.filter(o=>o.menuType===1):[]);return(o,s)=>{const r=c("menu-item",!0),l=c("el-sub-menu"),h=c("el-menu-item");return i(n).length&&e.menu.menuState===1?(d(),g(l,{index:e.menu.path,key:e.menu.path},{title:u(()=>[m("i",{class:L([e.menu.icon,"menu-icon"])},null,2),Me,m("span",null,C(e.menu.menuName),1)]),default:u(()=>[(d(!0),v(S,null,T(e.menu.children,_=>(d(),g(r,{key:_.path,menu:_},null,8,["menu"]))),128))]),_:1},8,["index"])):e.menu.menuType===1&&e.menu.menuState===1?(d(),g(h,{index:e.menu.path,key:e.menu.path},{title:u(()=>[m("span",null,C(e.menu.menuName),1)]),default:u(()=>[e.menu.icon?(d(),v("i",{key:0,class:L([e.menu.icon,"menu-icon"])},null,2)):O("",!0),Ue]),_:1},8,["index"])):O("",!0)}}});var qe=M(ze,[["__scopeId","data-v-74f67502"]]);const Je=f("\u9996\u9875"),He=k({props:{list:null},setup(e){return(t,n)=>{const o=c("el-breadcrumb-item"),s=c("el-breadcrumb");return d(),g(s,{separator:"/"},{default:u(()=>[a(o,{to:{path:"/"}},{default:u(()=>[Je]),_:1}),(d(!0),v(S,null,T(e.list,r=>(d(),g(o,{key:r.name},{default:u(()=>[f(C(r.name),1)]),_:2},1024))),128))]),_:1})}}}),U={"/":[]};let B=[];const Ge=(e,t)=>{if(U[t])return U[t];B=[];for(let n=0,o=e.length;n<o;n++)te(e[n],t);return B},te=(e,t,n=[])=>{if(t===e.path)B=[...n,{name:e.menuName}],U[t]=B;else if(e.menuType===1&&(n=[...n,{name:e.menuName}],e.children&&e.children.length))for(let o=0,s=e.children.length;o<s;o++)te(e.children[o],t,n)};const Ke={class:"basic-layout"},We=f("x"),Qe=f("-admin"),Xe={class:"nav-top"},Ye={class:"bread"},Ze={class:"user"},et=f("\u9000\u51FA"),tt={class:"wrapper"},nt=k({setup(e){const t=K(),n=I(!1);t.dispatch("getMenus").then(()=>{n.value=!0}),t.dispatch("getRoles");const o=W(),s=$(()=>t.state.userinfo||{}),r=I(!1),l=I(0),h=I(location.pathname),_=()=>{r.value=!r.value},N=p=>{p==="logout"&&(Te(),window.location.replace("/login"))},x=()=>{b.get("/leave/count").then(p=>{l.value=p})},A=$(()=>t.state.menus);Q(()=>{x()});const D=$(()=>A.value.length?Ge(A.value,o.path):[]);return he(o,()=>{h.value=o.path}),(p,E)=>{const re=c("el-menu"),V=c("el-icon"),ue=c("el-badge"),q=c("el-dropdown-item"),ae=c("el-dropdown-menu"),le=c("el-dropdown"),ce=c("router-view");return d(),v("div",Ke,[m("div",{class:L(["nav-slide",r.value?"collapse":""])},[m("h1",{onClick:E[0]||(E[0]=w=>p.$router.push("/")),class:"brand"},[We,r.value?O("",!0):(d(),v(S,{key:0},[Qe],64))]),a(re,{class:"nav-menu",router:"","background-color":"#001529","text-color":"#fff",collapse:r.value,"unique-opened":"","collapse-transition":!1,"default-active":h.value},{default:u(()=>[(d(!0),v(S,null,T(i(A),w=>(d(),g(qe,{menu:w,key:w.path},null,8,["menu"]))),128))]),_:1},8,["collapse","default-active"])],2),m("div",{class:L(["content-right",r.value?"collapse":""])},[m("div",Xe,[m("div",Ye,[a(V,{onClick:_,class:"menu-icon"},{default:u(()=>[a(i(ge))]),_:1}),a(He,{list:i(D)},null,8,["list"])]),m("div",Ze,[a(ue,{class:"notice","is-dot":!!l.value,onClick:E[1]||(E[1]=w=>p.$router.push("/audit/waiting"))},{default:u(()=>[a(V,null,{default:u(()=>[a(i(ve))]),_:1})]),_:1},8,["is-dot"]),a(le,{onCommand:N,trigger:"click"},{dropdown:u(()=>[a(ae,null,{default:u(()=>[a(q,{command:"email"},{default:u(()=>[f("\u90AE\u7BB1\uFF1A"+C(i(s).userEmail),1)]),_:1}),a(q,{command:"logout"},{default:u(()=>[et]),_:1})]),_:1})]),default:u(()=>[m("span",null,[f(C(i(s).userName)+" ",1),a(V,{class:"el-icon--right"},{default:u(()=>[a(i(be))]),_:1})])]),_:1})])]),m("div",tt,[a(ce,{class:"router-content"},{default:u(({Component:w})=>[a(ye,{name:"fade-transform",mode:"out-in"},{default:u(()=>[n.value?(d(),g(Ee(w),{key:0})):O("",!0)]),_:2},1024)]),_:1})])],2)])}}});var ot=M(nt,[["__scopeId","data-v-dc8f031c"]]);const ne=e=>($e("data-v-cec2efd0"),e=e(),Ce(),e),st={class:"login-wrapper"},rt={class:"model"},ut=ne(()=>m("h4",{class:"title"},"x-admin",-1)),at=f("\u767B\u9646"),lt=ne(()=>m("div",{id:"login_bg"},null,-1)),ct=k({setup(e){const t=we(),n=K(),o=X({userName:"admin",userPwd:"123456"}),s=X({userName:[{required:!0,message:"\u8BF7\u8F93\u5165\u7528\u6237\u540D",trigger:"blur"}],userPwd:[{required:!0,message:"\u8BF7\u8F93\u5165\u5BC6\u7801",trigger:"blur"}]}),r=I(),l=()=>{r.value.validate(h=>{h&&b.post("/users/login",j({},o)).then(_=>{n.commit("saveUserinfo",_),Re("x_token",_.token),t.replace("/")})})};return Q(()=>{window.particlesJS.load("login_bg","/particles.json",()=>{})}),(h,_)=>{const N=c("el-input"),x=c("el-form-item"),A=c("el-button"),D=c("el-form");return d(),v("div",st,[m("div",rt,[a(D,{model:i(o),rules:i(s),ref:(p,E)=>{E.loginForm=p,r.value=p},onSubmit:Ae(l,["prevent"])},{default:u(()=>[ut,a(x,{prop:"userName"},{default:u(()=>[a(N,{"prefix-icon":i(ke),modelValue:i(o).userName,"onUpdate:modelValue":_[0]||(_[0]=p=>i(o).userName=p)},null,8,["prefix-icon","modelValue"])]),_:1}),a(x,{prop:"password"},{default:u(()=>[a(N,{type:"password","prefix-icon":i(xe),modelValue:i(o).userPwd,"onUpdate:modelValue":_[1]||(_[1]=p=>i(o).userPwd=p)},null,8,["prefix-icon","modelValue"])]),_:1}),a(x,null,{default:u(()=>[a(A,{"native-type":"submit",class:"btn",type:"primary"},{default:u(()=>[at]),_:1})]),_:1})]),_:1},8,["model","rules","onSubmit"])]),lt])}}});var it=M(ct,[["__scopeId","data-v-cec2efd0"]]);const dt={class:"error-page"},mt={href:"/"},_t=f("\u56DE\u5230\u9996\u9875"),pt=k({setup(e){const t=W(),n=$(()=>{const o=t.query.status;return{title:o,subTitle:o==="500"?"\u670D\u52A1\u9519\u8BEF":o==="401"?"\u60A8\u6CA1\u6709\u6743\u9650\u8BBF\u95EE":"\u9875\u9762\u672A\u627E\u5230"}});return(o,s)=>{const r=c("el-button"),l=c("el-result");return d(),v("div",dt,[a(l,{icon:"error",title:i(n).title,"sub-title":i(n).subTitle},{extra:u(()=>[m("a",mt,[a(r,{type:"primary"},{default:u(()=>[_t]),_:1})])]),_:1},8,["title","sub-title"])])}}}),P=Ie({state(){return{userinfo:null,menus:[],roles:null,btns:{}}},mutations:{saveUserinfo(e,t){e.userinfo=t},changeMenus(e,t){e.menus=t},changeRoles(e,t=[]){const n={};t.forEach(o=>{n[o._id]=o}),e.roles={originVal:t,mapVal:n}},changeBtns(e,t){e.btns=t}},actions:{getMenus({commit:e}){return b.get("/menu/user").then(t=>{e("changeMenus",t.menus);const n={};t.btns.forEach(o=>{n[o.menuCode]=o}),e("changeBtns",n)})},getRoles({commit:e}){return b.get("/roles/all").then(t=>{e("changeRoles",t)})},getUserinfo({commit:e}){return b.get("/users/userinfo").then(t=>{e("saveUserinfo",t)})}}}),ft=[{path:"/",component:ot,children:[{path:"",component:()=>y(()=>import("./welcome.189b4654.js"),["assets/welcome.189b4654.js","assets/welcome.f4279348.css","assets/vendor.76307f7a.js"])},{path:"system/user",component:()=>y(()=>import("./user.c1413198.js"),["assets/user.c1413198.js","assets/query-table.7b28e3ff.js","assets/vendor.76307f7a.js"])},{path:"system/menu",component:()=>y(()=>import("./menu.bb5a462c.js"),["assets/menu.bb5a462c.js","assets/menu.72492b1d.css","assets/tree-select.f3ab53db.js","assets/tree-select.9a2169b5.css","assets/vendor.76307f7a.js","assets/query-table.7b28e3ff.js"])},{path:"system/roles",component:()=>y(()=>import("./roles.bb503bed.js"),["assets/roles.bb503bed.js","assets/roles.e0fe9a99.css","assets/query-table.7b28e3ff.js","assets/vendor.76307f7a.js"])},{path:"system/dept",component:()=>y(()=>import("./dept.0634474c.js"),["assets/dept.0634474c.js","assets/query-table.7b28e3ff.js","assets/vendor.76307f7a.js","assets/tree-select.f3ab53db.js","assets/tree-select.9a2169b5.css"])},{path:"audit/holiday",component:()=>y(()=>import("./holiday.1dc4ec72.js"),["assets/holiday.1dc4ec72.js","assets/query-table.7b28e3ff.js","assets/vendor.76307f7a.js"])},{path:"audit/waiting",component:()=>y(()=>import("./waiting.96124ba1.js"),["assets/waiting.96124ba1.js","assets/query-table.7b28e3ff.js","assets/vendor.76307f7a.js"])}]},{path:"/login",component:it},{path:"/:pathMatch(.*)*",component:pt}],z=Fe({history:Ne("/x"),routes:ft});z.beforeEach((e,t,n)=>{if(Y.start(),e.path==="/login"){n();return}if(ee("x_token")){if(P.state.userinfo){n();return}P.dispatch("getUserinfo").then(()=>{ht(e,n)}).catch(()=>{n("/login")})}else n("/login")});z.afterEach(()=>{Y.done()});function ht(e,t){e.path!=="/"?b.post("/menu/check",{path:e.path}).then(n=>{n?t():t("/error?status=401")}).catch(n=>{t("/error?status=500")}):t()}var oe=z;const se={permission:{mounted(e,t){var o;t.value.some(s=>!!P.state.btns[s])||(o=e.parentNode)==null||o.removeChild(e)}}};const F=Le(Pe);Object.keys(se).forEach(e=>{F.directive(e,se[e])});F.use(oe);F.use(P);F.use(Se,{size:"small",locale:Oe});F.mount("#app");export{M as _,b as s};