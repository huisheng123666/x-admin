import{_ as m}from"./index.353e151f.js";import{d as v,l as s,b as k,q as b,p as h,r as i,o as _,c as V,w as y,j as f,S as g}from"./vendor.76307f7a.js";const C=v({name:"mySelect",props:{modelValue:{type:Array,default:()=>[]},disabled:{type:Boolean,default:!1},nodeKey:{type:String},parentKey:{type:String},treeProps:{type:Object,default(){return{}}},defaultExpandedKeys:{type:Array,default(){return[]}},lazy:{type:Boolean,default:!1},load:{type:Function},options:{type:Array,default:()=>[{label:"\u9009\u98791",value:"1",children:[{label:"\u9009\u98791-1",value:"1-1"}]},{label:"\u9009\u98792",value:"2"}]}},emits:["nodeClick","update:modelValue"],setup(e,t){const o=s({});function n(l){if(!l||!l.length)return{};for(let a=0;a<l.length;a++){if(l[a][e.nodeKey]===e.modelValue[e.modelValue.length-1]){o.value=l[a];break}n(l[a].children)}}function c(){t.emit("update:modelValue",[])}const p=k(()=>e.modelValue[e.modelValue.length-1]);b(e,()=>{!e.modelValue.length||n(e.options)}),h(()=>{n(e.options)});const d=s(),r=s("");function u(l){o.value=l,d.value.blur(),t.emit("nodeClick",l);const a=e.parentKey?l[e.parentKey]:[];t.emit("update:modelValue",[...a,l[e.nodeKey]])}return{mySelect:d,handleNodeClick:u,optionValue:r,selectedNode:o,selectModelVal:p,clear:c}}});function K(e,t,o,n,c,p){const d=i("el-tree"),r=i("el-option"),u=i("el-select");return _(),V(u,g({ref:"mySelect"},e.$attrs,{"model-value":e.selectModelVal,multiple:!1,disabled:e.disabled,clearable:"",onClear:e.clear}),{default:y(()=>[f(r,{value:e.selectedNode[e.nodeKey]||"",label:e.selectedNode[e.treeProps.label]||"",class:"options"},{default:y(()=>[f(d,{id:"tree-option",ref:"selectTree",data:e.options,lazy:e.lazy,load:e.load,"highlight-current":"","expand-on-click-node":!1,onNodeClick:e.handleNodeClick,props:e.treeProps,"default-expanded-keys":e.defaultExpandedKeys,"node-key":e.nodeKey,"current-node-key":e.selectModelVal},null,8,["data","lazy","load","onNodeClick","props","default-expanded-keys","node-key","current-node-key"])]),_:1},8,["value","label"])]),_:1},16,["model-value","disabled","onClear"])}var $=m(C,[["render",K],["__scopeId","data-v-f1739dd8"]]);export{$ as T};