import{I as L,H as R,m as F,M as j,p as A,N as J,d as I,e as B,q as m,s as g,ak as K,x as O,r as s,o as f,k as b,i as u,a as l,g as e,b as y,h as q,n as Q,z as W,t as X,w as Y}from"./main.2cb7c090.js";import{u as Z}from"./plain.df9c44e6.js";const x=["onSubmit"],ee={class:"relative mt-6"},le={setup(ne){const t=Z();L(),R();const{t:d}=F(),$=j(),w=A();J();const p=I(!1);let i=I(!1);t.$reset(),h();const v=B(()=>$.name==="plain-protections.edit"),V=B(()=>v.value?d("plains.edit_plain"):d("plains.new_plain")),k=B(()=>({currentPlain:{customer_id:{required:m.withMessage(d("validation.required"),g)},employee_id:{required:m.withMessage(d("validation.required"),g)},vin:{required:m.withMessage(d("validation.required"),g)},make:{required:m.withMessage(d("validation.required"),g)},model:{required:m.withMessage(d("validation.required"),g)},notes:{maxLength:m.withMessage(d("validation.description_maxlength"),K(65e3))}}})),n=O(k,t);async function h(){if(i.value=!0,await t.fecthEmployees({}),v.value){let r=$.params.id;await t.fetchPlain(r)}i.value=!1}async function S(){if(n.value.currentPlain.$touch(),n.value.currentPlain.$invalid)return!1;p.value=!0;try{let r={id:$.params.id,...t.currentPlain};await(v.value?t.updatePlain:t.addPlain)(r),p.value=!1,w.push("/admin/plains")}catch{p.value=!1;return}}return(r,a)=>{const P=s("BaseBreadcrumbItem"),M=s("BaseBreadcrumb"),C=s("BasePageHeader"),U=s("BaseCustomerSelectInput"),c=s("BaseInputGroup"),_=s("BaseInput"),N=s("BaseMultiselect"),G=s("BaseInputGrid"),T=s("BaseTextarea"),D=s("BaseIcon"),E=s("BaseButton"),H=s("BaseCard"),z=s("BasePage");return f(),b(z,null,{default:u(()=>[l(C,{title:e(V)},{default:u(()=>[l(M,null,{default:u(()=>[l(P,{title:r.$t("general.home"),to:"dashboard"},null,8,["title"]),l(P,{title:r.$tc("plains.plain",2),to:"/admin/plains"},null,8,["title"]),l(P,{title:e(V),to:"#",active:""},null,8,["title"])]),_:1})]),_:1},8,["title"]),y("form",{action:"submit",onSubmit:Y(S,["prevent"])},[l(H,{class:"w-full"},{default:u(()=>[l(G,null,{default:u(()=>[l(c,{label:r.$t("plains.customer"),error:e(n).currentPlain.customer_id.$error&&e(n).currentPlain.customer_id.$errors[0].$message,"content-loading":e(i),required:""},{default:u(()=>[e(i)?q("",!0):(f(),b(U,{key:0,modelValue:e(t).currentPlain.customer_id,"onUpdate:modelValue":a[0]||(a[0]=o=>e(t).currentPlain.customer_id=o),"content-loading":e(i),invalid:e(n).currentPlain.customer_id.$error,placeholder:r.$t("customers.select_a_customer")},null,8,["modelValue","content-loading","invalid","placeholder"]))]),_:1},8,["label","error","content-loading"]),l(c,{label:r.$t("plains.vin"),"content-loading":e(i),required:"",error:e(n).currentPlain.vin.$error&&e(n).currentPlain.vin.$errors[0].$message},{default:u(()=>[l(_,{modelValue:e(t).currentPlain.vin,"onUpdate:modelValue":a[1]||(a[1]=o=>e(t).currentPlain.vin=o),"content-loading":e(i),invalid:e(n).currentPlain.vin.$error,onInput:a[2]||(a[2]=o=>e(n).currentPlain.vin.$touch())},null,8,["modelValue","content-loading","invalid"])]),_:1},8,["label","content-loading","error"]),l(c,{label:r.$t("plains.make"),"content-loading":e(i),required:"",error:e(n).currentPlain.make.$error&&e(n).currentPlain.make.$errors[0].$message},{default:u(()=>[l(_,{modelValue:e(t).currentPlain.make,"onUpdate:modelValue":a[3]||(a[3]=o=>e(t).currentPlain.make=o),"content-loading":e(i),invalid:e(n).currentPlain.make.$error,onInput:a[4]||(a[4]=o=>e(n).currentPlain.make.$touch())},null,8,["modelValue","content-loading","invalid"])]),_:1},8,["label","content-loading","error"]),l(c,{label:r.$t("plains.model"),"content-loading":e(i),required:"",error:e(n).currentPlain.model.$error&&e(n).currentPlain.model.$errors[0].$message},{default:u(()=>[l(_,{modelValue:e(t).currentPlain.model,"onUpdate:modelValue":a[5]||(a[5]=o=>e(t).currentPlain.model=o),"content-loading":e(i),invalid:e(n).currentPlain.model.$error,onInput:a[6]||(a[6]=o=>e(n).currentPlain.model.$touch())},null,8,["modelValue","content-loading","invalid"])]),_:1},8,["label","content-loading","error"]),l(c,{"content-loading":e(i),label:r.$t("plains.employee"),required:"",error:e(n).currentPlain.employee_id.$error&&e(n).currentPlain.employee_id.$errors[0].$message},{default:u(()=>[l(N,{modelValue:e(t).currentPlain.employee_id,"onUpdate:modelValue":a[7]||(a[7]=o=>e(t).currentPlain.employee_id=o),"content-loading":e(i),label:"name",options:e(t).plainEmployees,"value-prop":"id",placeholder:r.$t("plains.select_an_employee"),searchable:"","track-by":"name"},null,8,["modelValue","content-loading","options","placeholder"])]),_:1},8,["content-loading","label","error"])]),_:1}),y("div",ee,[l(c,{label:r.$t("plains.notes"),"content-loading":e(i),error:e(n).currentPlain.notes.$error&&e(n).currentPlain.notes.$errors[0].$message},{default:u(()=>[l(T,{modelValue:e(t).currentPlain.notes,"onUpdate:modelValue":a[8]||(a[8]=o=>e(t).currentPlain.notes=o),"content-loading":e(i),name:"notes",row:5,rows:"5",onInput:a[9]||(a[9]=o=>e(n).currentPlain.notes.$touch())},null,8,["modelValue","content-loading"])]),_:1},8,["label","content-loading","error"])]),l(E,{"content-loading":e(i),type:"submit",loading:p.value,class:"mt-4"},{left:u(o=>[p.value?q("",!0):(f(),b(D,{key:0,name:"SaveIcon",class:Q(o.class)},null,8,["class"]))]),default:u(()=>[W(" "+X(e(v)?r.$t("plains.update_plain"):r.$t("plains.save_plain")),1)]),_:1},8,["content-loading","loading"])]),_:1})],40,x)]),_:1})}}};export{le as default};