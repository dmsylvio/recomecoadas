import{e as p,r as m,o as r,k as d,g as c,y as V}from"./main.2cb7c090.js";const i={props:{modelValue:{type:[String,Number],default:null}},emits:["update:modelValue"],setup(o,{emit:u}){const a=o,e=p({get:()=>a.modelValue,set:t=>{u("update:modelValue",t)}});return(t,l)=>{const n=m("BaseInput");return r(),d(n,{modelValue:c(e),"onUpdate:modelValue":l[0]||(l[0]=s=>V(e)?e.value=s:null),type:"number"},null,8,["modelValue"])}}};export{i as default};
