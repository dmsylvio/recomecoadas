import{ax as z,I as C,u as N,ac as L,m as D,d as G,e as $,q as p,s as b,L as U,az as E,ak as j,x as X,r as i,o as g,k as h,i as l,b as y,z as x,t as v,g as e,a as o,n as A,h as F,w as H}from"./main.2cb7c090.js";const J={class:"flex justify-between w-full"},K=["onSubmit"],O={class:"p-4 sm:p-6"},P={class:"z-0 flex justify-end p-4 border-t border-solid border--200 border-modal-bg"},Y={setup(Q){const t=z(),u=C();N(),L();const{t:c,tm:R}=D();let d=G(!1);const B=$(()=>({currentTaxType:{name:{required:p.withMessage(c("validation.required"),b),minLength:p.withMessage(c("validation.name_min_length",{count:3}),U(3))},percent:{required:p.withMessage(c("validation.required"),b),between:p.withMessage(c("validation.enter_valid_tax_rate"),E(0,100))},description:{maxLength:p.withMessage(c("validation.description_maxlength",{count:255}),j(255))}}})),r=X(B,$(()=>t));async function w(){if(r.value.currentTaxType.$touch(),r.value.currentTaxType.$invalid)return!0;try{const s=t.isEdit?t.updateTaxType:t.addTaxType;d.value=!0;let a=await s(t.currentTaxType);d.value=!1,u.refreshData&&u.refreshData(a.data.data),m()}catch{return d.value=!1,!0}}function m(){u.closeModal(),setTimeout(()=>{t.resetCurrentTaxType(),r.value.$reset()},300)}return(s,a)=>{const f=i("BaseIcon"),V=i("BaseInput"),T=i("BaseInputGroup"),I=i("BaseMoney"),M=i("BaseTextarea"),S=i("BaseSwitch"),k=i("BaseInputGrid"),_=i("BaseButton"),q=i("BaseModal");return g(),h(q,{show:e(u).active&&e(u).componentName==="TaxTypeModal",onClose:m},{header:l(()=>[y("div",J,[x(v(e(u).title)+" ",1),o(f,{name:"XIcon",class:"h-6 w-6 text-gray-500 cursor-pointer",onClick:m})])]),default:l(()=>[y("form",{action:"",onSubmit:H(w,["prevent"])},[y("div",O,[o(k,{layout:"one-column"},{default:l(()=>[o(T,{label:s.$t("tax_types.name"),variant:"horizontal",error:e(r).currentTaxType.name.$error&&e(r).currentTaxType.name.$errors[0].$message,required:""},{default:l(()=>[o(V,{modelValue:e(t).currentTaxType.name,"onUpdate:modelValue":a[0]||(a[0]=n=>e(t).currentTaxType.name=n),invalid:e(r).currentTaxType.name.$error,type:"text",onInput:a[1]||(a[1]=n=>e(r).currentTaxType.name.$touch())},null,8,["modelValue","invalid"])]),_:1},8,["label","error"]),o(T,{label:s.$t("tax_types.percent"),variant:"horizontal",error:e(r).currentTaxType.percent.$error&&e(r).currentTaxType.percent.$errors[0].$message,required:""},{default:l(()=>[o(I,{modelValue:e(t).currentTaxType.percent,"onUpdate:modelValue":a[2]||(a[2]=n=>e(t).currentTaxType.percent=n),currency:{decimal:".",thousands:",",symbol:"% ",precision:2,masked:!1},invalid:e(r).currentTaxType.percent.$error,class:"relative w-full focus:border focus:border-solid focus:border-primary",onInput:a[3]||(a[3]=n=>e(r).currentTaxType.percent.$touch())},null,8,["modelValue","currency","invalid"])]),_:1},8,["label","error"]),o(T,{label:s.$t("tax_types.description"),error:e(r).currentTaxType.description.$error&&e(r).currentTaxType.description.$errors[0].$message,variant:"horizontal"},{default:l(()=>[o(M,{modelValue:e(t).currentTaxType.description,"onUpdate:modelValue":a[4]||(a[4]=n=>e(t).currentTaxType.description=n),invalid:e(r).currentTaxType.description.$error,rows:"4",cols:"50",onInput:a[5]||(a[5]=n=>e(r).currentTaxType.description.$touch())},null,8,["modelValue","invalid"])]),_:1},8,["label","error"]),o(T,{label:s.$t("tax_types.compound_tax"),variant:"horizontal",class:"flex flex-row-reverse"},{default:l(()=>[o(S,{modelValue:e(t).currentTaxType.compound_tax,"onUpdate:modelValue":a[6]||(a[6]=n=>e(t).currentTaxType.compound_tax=n),class:"flex items-center"},null,8,["modelValue"])]),_:1},8,["label"])]),_:1})]),y("div",P,[o(_,{class:"mr-3 text-sm",variant:"primary-outline",type:"button",onClick:m},{default:l(()=>[x(v(s.$t("general.cancel")),1)]),_:1}),o(_,{loading:e(d),disabled:e(d),variant:"primary",type:"submit"},{left:l(n=>[e(d)?F("",!0):(g(),h(f,{key:0,name:"SaveIcon",class:A(n.class)},null,8,["class"]))]),default:l(()=>[x(" "+v(e(t).isEdit?s.$t("general.update"):s.$t("general.save")),1)]),_:1},8,["loading","disabled"])])],40,K)]),_:1},8,["show"])}}};export{Y as _};