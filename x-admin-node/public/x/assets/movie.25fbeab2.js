var H=Object.defineProperty;var E=Object.getOwnPropertySymbols;var J=Object.prototype.hasOwnProperty,K=Object.prototype.propertyIsEnumerable;var A=(r,a,u)=>a in r?H(r,a,{enumerable:!0,configurable:!0,writable:!0,value:u}):r[a]=u,R=(r,a)=>{for(var u in a||(a={}))J.call(a,u)&&A(r,u,a[u]);if(E)for(var u of E(a))K.call(a,u)&&A(r,u,a[u]);return r};import{u as O}from"./query-table.9b6ad3c5.js";import{_ as W,s as z}from"./index.3b80771c.js";import{d as X,y as N,l as y,r as i,o as U,f as j,e as g,j as e,u as o,w as t,h as Y,i as v,R as Z,E as ee}from"./vendor.76307f7a.js";const le={class:"movie"},oe={class:"query-form"},te=v("\u641C\u7D22"),ae=v("\u91CD\u7F6E"),ue={class:"base-table"},ne={class:"action"},ie=v("\u5355\u6761\u83B7\u53D6"),se=v("\u5220\u9664"),re=v("\u8BD5\u64AD"),de={class:"pagination"},pe=["src"],ce=X({setup(r){const a=N({type:"",name:""}),u=y(),{tableData:q,page:b,changePage:M,filterTable:C,resetForm:P,getList:T,editRow:w}=O({url:"/movie/list",form:a,formRef:u});function $(c){Z.confirm("\u786E\u8BA4\u5220\u9664\u8BE5\u7535\u5F71\uFF1F","\u63D0\u793A").then(()=>{z.delete("/movie/"+c.id).then(()=>{T()})})}const p=N({id:"",type:""}),x=y();function I(){x.value.validate(c=>{c&&z.post("/movie/single",R({},p)).then(n=>{ee.success("\u83B7\u53D6\u6210\u529F"),C()})})}const h=y(!1);function F(c,n=null){h.value=c,w.value=n}return(c,n)=>{var D;const B=i("el-input"),_=i("el-form-item"),d=i("el-option"),V=i("el-select"),m=i("el-button"),k=i("el-form"),s=i("el-table-column"),L=i("el-image"),Q=i("el-table"),S=i("el-pagination"),G=i("el-dialog");return U(),j("div",le,[g("div",oe,[e(k,{model:o(a),ref:(l,f)=>{f.formRef=l,u.value=l},inline:"",size:"mini"},{default:t(()=>[e(_,{prop:"name"},{default:t(()=>[e(B,{placeholder:"\u8BF7\u8F93\u5165\u7535\u5F71\u540D",modelValue:o(a).name,"onUpdate:modelValue":n[0]||(n[0]=l=>o(a).name=l)},null,8,["modelValue"])]),_:1}),e(_,{prop:"type"},{default:t(()=>[e(V,{modelValue:o(a).type,"onUpdate:modelValue":n[1]||(n[1]=l=>o(a).type=l)},{default:t(()=>[e(d,{value:1,label:"\u7535\u5F71"}),e(d,{value:14,label:"\u7535\u89C6\u5267"}),e(d,{value:21,label:"\u7EFC\u827A"}),e(d,{value:26,label:"\u52A8\u6F2B"})]),_:1},8,["modelValue"])]),_:1}),e(_,null,{default:t(()=>[e(m,{type:"primary",onClick:o(C)},{default:t(()=>[te]),_:1},8,["onClick"]),e(m,{type:"warning",onClick:o(P)},{default:t(()=>[ae]),_:1},8,["onClick"])]),_:1})]),_:1},8,["model"])]),g("div",ue,[g("div",ne,[e(k,{inline:"",size:"mini",model:o(p),ref:(l,f)=>{f.singleFormRef=l,x.value=l}},{default:t(()=>[e(_,{label:"id:",prop:"id",required:""},{default:t(()=>[e(B,{modelValue:o(p).id,"onUpdate:modelValue":n[2]||(n[2]=l=>o(p).id=l)},null,8,["modelValue"])]),_:1}),e(_,{prop:"type",required:""},{default:t(()=>[e(V,{modelValue:o(p).type,"onUpdate:modelValue":n[3]||(n[3]=l=>o(p).type=l)},{default:t(()=>[e(d,{value:1,label:"\u7535\u5F71"}),e(d,{value:14,label:"\u7535\u89C6\u5267"}),e(d,{value:21,label:"\u7EFC\u827A"}),e(d,{value:26,label:"\u52A8\u6F2B"})]),_:1},8,["modelValue"])]),_:1}),e(_,null,{default:t(()=>[e(m,{type:"primary",onClick:I},{default:t(()=>[ie]),_:1})]),_:1})]),_:1},8,["model"])]),e(Q,{data:o(q)},{default:t(()=>[e(s,{label:"\u540D\u79F0",prop:"title",width:"120px","show-overflow-tooltip":""}),e(s,{label:"\u5C01\u9762",width:"180px"},{default:t(l=>[e(L,{src:l.row.cover,style:{width:"80px",height:"45px"},fit:"cover","preview-src-list":[l.row.cover]},null,8,["src","preview-src-list"])]),_:1}),e(s,{label:"\u5BFC\u6F14",prop:"director","min-width":"120px","show-overflow-tooltip":""}),e(s,{label:"\u6F14\u5458",prop:"actor","min-width":"120px","show-overflow-tooltip":""}),e(s,{label:"\u8BED\u8A00",prop:"language",width:"80px"}),e(s,{label:"\u5730\u533A",prop:"area",width:"80px"}),e(s,{label:"\u7C7B\u578B",prop:"category",width:"80px"}),e(s,{label:"\u7B80\u4ECB",prop:"intro","min-width":"200px","show-overflow-tooltip":""}),e(s,{label:"\u64CD\u4F5C",fixed:"right",width:"100px"},{default:t(l=>[e(m,{onClick:f=>$(l.row),type:"text",style:{color:"red"}},{default:t(()=>[se]),_:2},1032,["onClick"]),e(m,{onClick:f=>F(!0,l.row),type:"text"},{default:t(()=>[re]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"]),g("div",de,[e(S,{background:"",layout:"prev, pager, next",total:o(b).total,"current-page":o(b).pageNum,"page-size":o(b).pageSize,onCurrentChange:o(M)},null,8,["total","current-page","page-size","onCurrentChange"])])]),e(G,{title:(D=o(w))==null?void 0:D.title,"model-value":h.value,width:"800px",onClose:n[4]||(n[4]=l=>F(!1)),"close-on-click-modal":!1},{default:t(()=>{var l;return[h.value?(U(),j("iframe",{key:0,src:(l=o(w))==null?void 0:l.playUrls[0][0],allowfullscreen:""},null,8,pe)):Y("",!0)]}),_:1},8,["title","model-value"])])}}});var ge=W(ce,[["__scopeId","data-v-0c92f3ff"]]);export{ge as default};