import{I,m as S,d as V,e as p,q as P,s as C,L as k,x as q,r as u,o as x,k as N,i as r,b as c,z as y,t as v,g as t,a as s,n as z,w as D}from"./main.2cb7c090.js";import{u as L}from"./payment.718c87ce.js";const j={class:"flex justify-between w-full"},G=["onSubmit"],T={class:"p-4 sm:p-6"},A={class:"z-0 flex justify-end p-4 border-t border-gray-200 border-solid"},F={setup(U){const o=I(),e=L(),{t:M}=S(),l=V(!1),g=p(()=>({currentPaymentMode:{name:{required:P.withMessage(M("validation.required"),C),minLength:P.withMessage(M("validation.name_min_length",{count:3}),k(3))}}})),a=q(g,p(()=>e)),h=p(()=>o.active&&o.componentName==="PaymentModeModal");async function B(){if(a.value.currentPaymentMode.$touch(),a.value.currentPaymentMode.$invalid)return!0;try{const n=e.currentPaymentMode.id?e.updatePaymentMode:e.addPaymentMode;l.value=!0,await n(e.currentPaymentMode),l.value=!1,o.refreshData&&o.refreshData(),d()}catch{return l.value=!1,!0}}function d(){o.closeModal(),setTimeout(()=>{a.value.$reset(),e.currentPaymentMode={id:"",name:null}})}return(n,i)=>{const _=u("BaseIcon"),b=u("BaseInput"),$=u("BaseInputGroup"),f=u("BaseButton"),w=u("BaseModal");return x(),N(w,{show:t(h),onClose:d},{header:r(()=>[c("div",j,[y(v(t(o).title)+" ",1),s(_,{name:"XIcon",class:"w-6 h-6 text-gray-500 cursor-pointer",onClick:d})])]),default:r(()=>[c("form",{action:"",onSubmit:D(B,["prevent"])},[c("div",T,[s($,{label:n.$t("settings.payment_modes.mode_name"),error:t(a).currentPaymentMode.name.$error&&t(a).currentPaymentMode.name.$errors[0].$message,required:""},{default:r(()=>[s(b,{modelValue:t(e).currentPaymentMode.name,"onUpdate:modelValue":i[0]||(i[0]=m=>t(e).currentPaymentMode.name=m),invalid:t(a).currentPaymentMode.name.$error,onInput:i[1]||(i[1]=m=>t(a).currentPaymentMode.name.$touch())},null,8,["modelValue","invalid"])]),_:1},8,["label","error"])]),c("div",A,[s(f,{variant:"primary-outline",class:"mr-3",type:"button",onClick:d},{default:r(()=>[y(v(n.$t("general.cancel")),1)]),_:1}),s(f,{loading:l.value,disabled:l.value,variant:"primary",type:"submit"},{left:r(m=>[s(_,{name:"SaveIcon",class:z(m.class)},null,8,["class"])]),default:r(()=>[y(" "+v(t(e).currentPaymentMode.id?n.$t("general.update"):n.$t("general.save")),1)]),_:1},8,["loading","disabled"])])],40,G)]),_:1},8,["show"])}}};export{F as _};
