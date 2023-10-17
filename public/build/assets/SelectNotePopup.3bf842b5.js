import{d as h,m as $,I as E,N as P,e as j,r as v,o,c as n,a,b as s,i as c,g as e,Q as b,k as A,z as L,t as d,n as O,aK as T,h as g,O as F,aL as D,F as x,j as U,aM as G}from"./main.2cb7c090.js";import{u as K,_ as Q}from"./NoteModal.1d9703f9.js";const W={class:"w-full"},q={class:"overflow-hidden rounded-md shadow-lg ring-1 ring-black ring-opacity-5"},H={class:"relative grid bg-white"},J={class:"relative p-4"},R={key:0,class:"relative flex flex-col overflow-auto list max-h-36"},X=["onClick"],Y={class:"flex justify-between px-2"},Z={class:"m-0 text-base font-semibold leading-tight text-gray-700 cursor-pointer"},ee={key:1,class:"flex justify-center p-5 text-gray-400"},te={class:"text-base text-gray-500"},se={class:"m-0 ml-3 text-sm leading-none cursor-pointer font-base text-primary-400"},le={props:{type:{type:String,default:null}},emits:["select"],setup(k,{emit:w}){const u=k;h(null);const{t:N}=$(),l=h(null),C=E(),r=K(),m=P(),f=j(()=>l.value?r.notes.filter(function(t){return t.name.toLowerCase().indexOf(l.value.toLowerCase())!==-1}):r.notes);async function B(){await r.fetchNotes({filter:{},orderByField:"",orderBy:"",type:u.type?u.type:""})}function I(t,i){w("select",{...r.notes[t]}),l.value=null,i()}function S(){C.openModal({title:N("settings.customization.notes.add_note"),componentName:"NoteModal",size:"lg",data:u.type})}return(t,i)=>{const y=v("BaseIcon"),V=v("BaseInput");return o(),n(x,null,[a(Q),s("div",W,[a(e(G),null,{default:c(({isOpen:z})=>[e(m).hasAbilities(e(b).VIEW_NOTE)?(o(),A(e(T),{key:0,class:O([z?"":"text-opacity-90","flex items-center z-10 font-medium text-primary-400 focus:outline-none focus:border-none"]),onClick:B},{default:c(()=>[a(y,{name:"PlusIcon",class:"w-4 h-4 font-medium text-primary-400"}),L(" "+d(t.$t("general.insert_note")),1)]),_:2},1032,["class"])):g("",!0),a(F,{"enter-active-class":"transition duration-200 ease-out","enter-from-class":"translate-y-1 opacity-0","enter-to-class":"translate-y-0 opacity-100","leave-active-class":"transition duration-150 ease-in","leave-from-class":"translate-y-0 opacity-100","leave-to-class":"translate-y-1 opacity-0"},{default:c(()=>[a(e(D),{class:"absolute z-20 px-4 mt-3 sm:px-0 w-screen max-w-full left-0 top-3"},{default:c(({close:M})=>[s("div",q,[s("div",H,[s("div",J,[a(V,{modelValue:l.value,"onUpdate:modelValue":i[0]||(i[0]=p=>l.value=p),placeholder:t.$t("general.search"),type:"text",class:"text-black"},null,8,["modelValue","placeholder"])]),e(f).length>0?(o(),n("div",R,[(o(!0),n(x,null,U(e(f),(p,_)=>(o(),n("div",{key:_,tabindex:"2",class:"px-6 py-4 border-b border-gray-200 border-solid cursor-pointer hover:bg-gray-100 hover:cursor-pointer last:border-b-0",onClick:oe=>I(_,M)},[s("div",Y,[s("label",Z,d(p.name),1)])],8,X))),128))])):(o(),n("div",ee,[s("label",te,d(t.$t("general.no_note_found")),1)]))]),e(m).hasAbilities(e(b).MANAGE_NOTE)?(o(),n("button",{key:0,type:"button",class:"h-10 flex items-center justify-center w-full px-2 py-3 bg-gray-200 border-none outline-none",onClick:S},[a(y,{name:"CheckCircleIcon",class:"text-primary-400"}),s("label",se,d(t.$t("settings.customization.notes.add_new_note")),1)])):g("",!0)])]),_:1})]),_:1})]),_:1})])],64)}}};export{le as _};