import{u as G}from"./disk.cccc23fa.js";import{_ as j,I as O,m as A,d as p,e as S,q as g,s as D,x as Y,aF as z,K as N,r as f,o as y,c as E,b,a,i as n,t as V,h,a2 as K,w as P,aj as oe,a7 as ae,k as L,z as U,a3 as te,a4 as re,H as se,a9 as le,n as ne,y as X,g as R,F as de}from"./main.2cb7c090.js";const ue={props:{isEdit:{type:Boolean,require:!0,default:!1},loading:{type:Boolean,require:!0,default:!1},disks:{type:Array,require:!0,default:Array}},emits:["submit","onChangeDisk"],setup(r,{emit:i}){const t=G(),e=O(),{t:u}=A();let k=p(!1),s=p(!1),l=p(null),d=p(null);const c=S({get:()=>t.selected_driver,set:v=>{t.selected_driver=v,t.dropBoxDiskConfig.selected_driver=v}}),m=S(()=>({dropBoxDiskConfig:{root:{required:g.withMessage(u("validation.required"),D)},key:{required:g.withMessage(u("validation.required"),D)},secret:{required:g.withMessage(u("validation.required"),D)},token:{required:g.withMessage(u("validation.required"),D)},app:{required:g.withMessage(u("validation.required"),D)},selected_driver:{required:g.withMessage(u("validation.required"),D)},name:{required:g.withMessage(u("validation.required"),D)}}})),o=Y(m,S(()=>t));z(()=>{t.dropBoxDiskConfig={name:null,selected_driver:"dropbox",token:null,key:null,secret:null,app:null}}),B();async function B(){s.value=!0;let v=N({disk:"dropbox"});if(r.isEdit)Object.assign(t.dropBoxDiskConfig,e.data),k.value=e.data.set_as_default,k.value&&(l.value=!0);else{let $=await t.fetchDiskEnv(v);Object.assign(t.dropBoxDiskConfig,$.data)}d.value=r.disks.find($=>$.value=="dropbox"),s.value=!1}const M=S(()=>!!(r.isEdit&&k.value&&l.value));async function w(){if(o.value.dropBoxDiskConfig.$touch(),o.value.dropBoxDiskConfig.$invalid)return!0;let v={credentials:t.dropBoxDiskConfig,name:t.dropBoxDiskConfig.name,driver:d.value.value,set_as_default:k.value};return i("submit",v),!1}function I(){i("onChangeDisk",t.dropBoxDiskConfig.selected_driver)}return{v$:o,diskStore:t,selected_driver:c,set_as_default:k,isLoading:s,is_current_disk:l,selected_disk:d,isDisabled:M,loadData:B,submitData:w,onChangeDriver:I}}},fe={class:"px-8 py-6"},ke={key:0,class:"flex items-center mt-6"},me={class:"relative flex items-center w-12"},ve={class:"ml-4 right"},ge={class:"p-0 mb-1 text-base leading-snug text-black box-title"};function ce(r,i,t,e,u,k){const s=f("BaseInput"),l=f("BaseInputGroup"),d=f("BaseMultiselect"),c=f("BaseInputGrid"),m=f("BaseSwitch");return y(),E("form",{onSubmit:i[15]||(i[15]=P((...o)=>e.submitData&&e.submitData(...o),["prevent"]))},[b("div",fe,[a(c,null,{default:n(()=>[a(l,{label:r.$t("settings.disk.name"),error:e.v$.dropBoxDiskConfig.name.$error&&e.v$.dropBoxDiskConfig.name.$errors[0].$message,required:""},{default:n(()=>[a(s,{modelValue:e.diskStore.dropBoxDiskConfig.name,"onUpdate:modelValue":i[0]||(i[0]=o=>e.diskStore.dropBoxDiskConfig.name=o),type:"text",name:"name",invalid:e.v$.dropBoxDiskConfig.name.$error,onInput:i[1]||(i[1]=o=>e.v$.dropBoxDiskConfig.name.$touch())},null,8,["modelValue","invalid"])]),_:1},8,["label","error"]),a(l,{label:r.$t("settings.disk.driver"),error:e.v$.dropBoxDiskConfig.selected_driver.$error&&e.v$.dropBoxDiskConfig.selected_driver.$errors[0].$message,required:""},{default:n(()=>[a(d,{modelValue:e.selected_driver,"onUpdate:modelValue":[i[2]||(i[2]=o=>e.selected_driver=o),i[3]||(i[3]=o=>e.onChangeDriver(r.data))],invalid:e.v$.dropBoxDiskConfig.selected_driver.$error,"value-prop":"value",options:t.disks,searchable:"",label:"name","can-deselect":!1},null,8,["modelValue","invalid","options"])]),_:1},8,["label","error"]),a(l,{label:r.$t("settings.disk.dropbox_root"),error:e.v$.dropBoxDiskConfig.root.$error&&e.v$.dropBoxDiskConfig.root.$errors[0].$message,required:""},{default:n(()=>[a(s,{modelValue:e.diskStore.dropBoxDiskConfig.root,"onUpdate:modelValue":i[4]||(i[4]=o=>e.diskStore.dropBoxDiskConfig.root=o),modelModifiers:{trim:!0},type:"text",name:"name",placeholder:"Ex. /user/root/",invalid:e.v$.dropBoxDiskConfig.root.$error,onInput:i[5]||(i[5]=o=>e.v$.dropBoxDiskConfig.root.$touch())},null,8,["modelValue","invalid"])]),_:1},8,["label","error"]),a(l,{label:r.$t("settings.disk.dropbox_token"),error:e.v$.dropBoxDiskConfig.token.$error&&e.v$.dropBoxDiskConfig.token.$errors[0].$message,required:""},{default:n(()=>[a(s,{modelValue:e.diskStore.dropBoxDiskConfig.token,"onUpdate:modelValue":i[6]||(i[6]=o=>e.diskStore.dropBoxDiskConfig.token=o),modelModifiers:{trim:!0},type:"text",name:"name",invalid:e.v$.dropBoxDiskConfig.token.$error,onInput:i[7]||(i[7]=o=>e.v$.dropBoxDiskConfig.token.$touch())},null,8,["modelValue","invalid"])]),_:1},8,["label","error"]),a(l,{label:r.$t("settings.disk.dropbox_key"),error:e.v$.dropBoxDiskConfig.key.$error&&e.v$.dropBoxDiskConfig.key.$errors[0].$message,required:""},{default:n(()=>[a(s,{modelValue:e.diskStore.dropBoxDiskConfig.key,"onUpdate:modelValue":i[8]||(i[8]=o=>e.diskStore.dropBoxDiskConfig.key=o),modelModifiers:{trim:!0},type:"text",name:"name",placeholder:"Ex. KEIS4S39SERSDS",invalid:e.v$.dropBoxDiskConfig.key.$error,onInput:i[9]||(i[9]=o=>e.v$.dropBoxDiskConfig.key.$touch())},null,8,["modelValue","invalid"])]),_:1},8,["label","error"]),a(l,{label:r.$t("settings.disk.dropbox_secret"),error:e.v$.dropBoxDiskConfig.secret.$error&&e.v$.dropBoxDiskConfig.secret.$errors[0].$message,required:""},{default:n(()=>[a(s,{modelValue:e.diskStore.dropBoxDiskConfig.secret,"onUpdate:modelValue":i[10]||(i[10]=o=>e.diskStore.dropBoxDiskConfig.secret=o),modelModifiers:{trim:!0},type:"text",name:"name",placeholder:"Ex. ********",invalid:e.v$.dropBoxDiskConfig.secret.$error,onInput:i[11]||(i[11]=o=>e.v$.dropBoxDiskConfig.secret.$touch())},null,8,["modelValue","invalid"])]),_:1},8,["label","error"]),a(l,{label:r.$t("settings.disk.dropbox_app"),error:e.v$.dropBoxDiskConfig.app.$error&&e.v$.dropBoxDiskConfig.app.$errors[0].$message,required:""},{default:n(()=>[a(s,{modelValue:e.diskStore.dropBoxDiskConfig.app,"onUpdate:modelValue":i[12]||(i[12]=o=>e.diskStore.dropBoxDiskConfig.app=o),modelModifiers:{trim:!0},type:"text",name:"name",invalid:e.v$.dropBoxDiskConfig.app.$error,onInput:i[13]||(i[13]=o=>e.v$.dropBoxDiskConfig.app.$touch())},null,8,["modelValue","invalid"])]),_:1},8,["label","error"])]),_:1}),e.isDisabled?h("",!0):(y(),E("div",ke,[b("div",me,[a(m,{modelValue:e.set_as_default,"onUpdate:modelValue":i[14]||(i[14]=o=>e.set_as_default=o),class:"flex"},null,8,["modelValue"])]),b("div",ve,[b("p",ge,V(r.$t("settings.disk.is_default")),1)])]))]),K(r.$slots,"default",{diskData:{isLoading:e.isLoading,submitData:e.submitData}})],32)}var De=j(ue,[["render",ce]]);const Ce={props:{isEdit:{type:Boolean,require:!0,default:!1},loading:{type:Boolean,require:!0,default:!1},disks:{type:Array,require:!0,default:Array}},emits:["submit","onChangeDisk"],setup(r,{emit:i}){const t=G(),e=O(),{t:u}=A();let k=p(!1),s=p(!1),l=p(""),d=p(null);const c=S({get:()=>t.selected_driver,set:v=>{t.selected_driver=v,t.localDiskConfig.selected_driver=v}}),m=S(()=>({localDiskConfig:{name:{required:g.withMessage(u("validation.required"),D)},selected_driver:{required:g.withMessage(u("validation.required"),D)},root:{required:g.withMessage(u("validation.required"),D)}}})),o=Y(m,S(()=>t));z(()=>{t.localDiskConfig={name:null,selected_driver:"local",root:null}}),B();async function B(){k.value=!0;let v=N({disk:"local"});if(r.isEdit)Object.assign(t.localDiskConfig,e.data),t.localDiskConfig.root=e.data.credentials,s.value=e.data.set_as_default,s.value&&(d.value=!0);else{let $=await t.fetchDiskEnv(v);Object.assign(t.localDiskConfig,$.data)}l.value=r.disks.find($=>$.value=="local"),k.value=!1}const M=S(()=>!!(r.isEdit&&s.value&&d.value));async function w(){if(o.value.localDiskConfig.$touch(),o.value.localDiskConfig.$invalid)return!0;let v=N({credentials:t.localDiskConfig.root,name:t.localDiskConfig.name,driver:t.localDiskConfig.selected_driver,set_as_default:s.value});return i("submit",v),!1}function I(){i("onChangeDisk",t.localDiskConfig.selected_driver)}return{v$:o,diskStore:t,modalStore:e,selected_driver:c,selected_disk:l,isLoading:k,set_as_default:s,is_current_disk:d,submitData:w,onChangeDriver:I,isDisabled:M}}},pe={class:"px-4 sm:px-8 py-6"},_e={key:0,class:"flex items-center mt-6"},be={class:"relative flex items-center w-12"},Se={class:"ml-4 right"},$e={class:"p-0 mb-1 text-base leading-snug text-black box-title"};function ye(r,i,t,e,u,k){const s=f("BaseInput"),l=f("BaseInputGroup"),d=f("BaseMultiselect"),c=f("BaseInputGrid"),m=f("BaseSwitch");return y(),E("form",{action:"",onSubmit:i[7]||(i[7]=P((...o)=>e.submitData&&e.submitData(...o),["prevent"]))},[b("div",pe,[a(c,null,{default:n(()=>[a(l,{label:r.$t("settings.disk.name"),error:e.v$.localDiskConfig.name.$error&&e.v$.localDiskConfig.name.$errors[0].$message,required:""},{default:n(()=>[a(s,{modelValue:e.diskStore.localDiskConfig.name,"onUpdate:modelValue":i[0]||(i[0]=o=>e.diskStore.localDiskConfig.name=o),type:"text",name:"name",invalid:e.v$.localDiskConfig.name.$error,onInput:i[1]||(i[1]=o=>e.v$.localDiskConfig.name.$touch())},null,8,["modelValue","invalid"])]),_:1},8,["label","error"]),a(l,{label:r.$tc("settings.disk.driver"),error:e.v$.localDiskConfig.selected_driver.$error&&e.v$.localDiskConfig.selected_driver.$errors[0].$message,required:""},{default:n(()=>[a(d,{modelValue:e.selected_driver,"onUpdate:modelValue":[i[2]||(i[2]=o=>e.selected_driver=o),i[3]||(i[3]=o=>e.onChangeDriver(r.data))],"value-prop":"value",invalid:e.v$.localDiskConfig.selected_driver.$error,options:t.disks,searchable:"",label:"name","can-deselect":!1},null,8,["modelValue","invalid","options"])]),_:1},8,["label","error"]),a(l,{label:r.$t("settings.disk.local_root"),error:e.v$.localDiskConfig.root.$error&&e.v$.localDiskConfig.root.$errors[0].$message,required:""},{default:n(()=>[a(s,{modelValue:e.diskStore.localDiskConfig.root,"onUpdate:modelValue":i[4]||(i[4]=o=>e.diskStore.localDiskConfig.root=o),modelModifiers:{trim:!0},type:"text",name:"name",invalid:e.v$.localDiskConfig.root.$error,placeholder:"Ex./user/root/",onInput:i[5]||(i[5]=o=>e.v$.localDiskConfig.root.$touch())},null,8,["modelValue","invalid"])]),_:1},8,["label","error"])]),_:1}),e.isDisabled?h("",!0):(y(),E("div",_e,[b("div",be,[a(m,{modelValue:e.set_as_default,"onUpdate:modelValue":i[6]||(i[6]=o=>e.set_as_default=o),class:"flex"},null,8,["modelValue"])]),b("div",Se,[b("p",$e,V(r.$t("settings.disk.is_default")),1)])]))]),K(r.$slots,"default",{diskData:{isLoading:e.isLoading,submitData:e.submitData}})],32)}var Be=j(Ce,[["render",ye]]);const xe={props:{isEdit:{type:Boolean,require:!0,default:!1},loading:{type:Boolean,require:!0,default:!1},disks:{type:Array,require:!0,default:Array}},emits:["submit","onChangeDisk"],setup(r,{emit:i}){const t=G(),e=O(),{t:u}=A();let k=p(!1),s=p(!1),l=p(null),d=p(null);const c=S({get:()=>t.selected_driver,set:v=>{t.selected_driver=v,t.s3DiskConfigData.selected_driver=v}}),m=S(()=>({s3DiskConfigData:{name:{required:g.withMessage(u("validation.required"),D)},root:{required:g.withMessage(u("validation.required"),D)},key:{required:g.withMessage(u("validation.required"),D)},secret:{required:g.withMessage(u("validation.required"),D)},region:{required:g.withMessage(u("validation.required"),D)},bucket:{required:g.withMessage(u("validation.required"),D)},selected_driver:{required:g.withMessage(u("validation.required"),D)}}})),o=Y(m,S(()=>t));z(()=>{t.s3DiskConfigData={name:null,selected_driver:"s3",key:null,secret:null,region:null,bucket:null,root:null}}),B();async function B(){s.value=!0;let v=N({disk:"s3"});if(r.isEdit)Object.assign(t.s3DiskConfigData,e.data),k.value=e.data.set_as_default,k.value&&(d.value=!0);else{let $=await t.fetchDiskEnv(v);Object.assign(t.s3DiskConfigData,$.data)}l.value=r.disks.find($=>$.value=="s3"),s.value=!1}const M=S(()=>!!(r.isEdit&&k.value&&d.value));async function w(){if(o.value.s3DiskConfigData.$touch(),o.value.s3DiskConfigData.$invalid)return!0;let v={credentials:t.s3DiskConfigData,name:t.s3DiskConfigData.name,driver:l.value.value,set_as_default:k.value};return i("submit",v),!1}function I(){i("onChangeDisk",t.s3DiskConfigData.selected_driver)}return{v$:o,diskStore:t,modalStore:e,set_as_default:k,isLoading:s,selected_disk:l,selected_driver:c,is_current_disk:d,loadData:B,submitData:w,onChangeDriver:I,isDisabled:M}}},Ve={class:"px-8 py-6"},qe={key:0,class:"flex items-center mt-6"},Me={class:"relative flex items-center w-12"},we={class:"ml-4 right"},Ie={class:"p-0 mb-1 text-base leading-snug text-black box-title"};function he(r,i,t,e,u,k){const s=f("BaseInput"),l=f("BaseInputGroup"),d=f("BaseMultiselect"),c=f("BaseInputGrid"),m=f("BaseSwitch");return y(),E("form",{onSubmit:i[15]||(i[15]=P((...o)=>e.submitData&&e.submitData(...o),["prevent"]))},[b("div",Ve,[a(c,null,{default:n(()=>[a(l,{label:r.$t("settings.disk.name"),error:e.v$.s3DiskConfigData.name.$error&&e.v$.s3DiskConfigData.name.$errors[0].$message,required:""},{default:n(()=>[a(s,{modelValue:e.diskStore.s3DiskConfigData.name,"onUpdate:modelValue":i[0]||(i[0]=o=>e.diskStore.s3DiskConfigData.name=o),type:"text",name:"name",invalid:e.v$.s3DiskConfigData.name.$error,onInput:i[1]||(i[1]=o=>e.v$.s3DiskConfigData.name.$touch())},null,8,["modelValue","invalid"])]),_:1},8,["label","error"]),a(l,{label:r.$tc("settings.disk.driver"),error:e.v$.s3DiskConfigData.selected_driver.$error&&e.v$.s3DiskConfigData.selected_driver.$errors[0].$message,required:""},{default:n(()=>[a(d,{modelValue:e.selected_driver,"onUpdate:modelValue":[i[2]||(i[2]=o=>e.selected_driver=o),i[3]||(i[3]=o=>e.onChangeDriver(r.data))],invalid:e.v$.s3DiskConfigData.selected_driver.$error,"value-prop":"value",options:t.disks,searchable:"",label:"name","can-deselect":!1},null,8,["modelValue","invalid","options"])]),_:1},8,["label","error"]),a(l,{label:r.$t("settings.disk.aws_root"),error:e.v$.s3DiskConfigData.root.$error&&e.v$.s3DiskConfigData.root.$errors[0].$message,required:""},{default:n(()=>[a(s,{modelValue:e.diskStore.s3DiskConfigData.root,"onUpdate:modelValue":i[4]||(i[4]=o=>e.diskStore.s3DiskConfigData.root=o),modelModifiers:{trim:!0},type:"text",name:"name",placeholder:"Ex. /user/root/",invalid:e.v$.s3DiskConfigData.root.$error,onInput:i[5]||(i[5]=o=>e.v$.s3DiskConfigData.root.$touch())},null,8,["modelValue","invalid"])]),_:1},8,["label","error"]),a(l,{label:r.$t("settings.disk.aws_key"),error:e.v$.s3DiskConfigData.key.$error&&e.v$.s3DiskConfigData.key.$errors[0].$message,required:""},{default:n(()=>[a(s,{modelValue:e.diskStore.s3DiskConfigData.key,"onUpdate:modelValue":i[6]||(i[6]=o=>e.diskStore.s3DiskConfigData.key=o),modelModifiers:{trim:!0},type:"text",name:"name",placeholder:"Ex. KEIS4S39SERSDS",invalid:e.v$.s3DiskConfigData.key.$error,onInput:i[7]||(i[7]=o=>e.v$.s3DiskConfigData.key.$touch())},null,8,["modelValue","invalid"])]),_:1},8,["label","error"]),a(l,{label:r.$t("settings.disk.aws_secret"),error:e.v$.s3DiskConfigData.secret.$error&&e.v$.s3DiskConfigData.secret.$errors[0].$message,required:""},{default:n(()=>[a(s,{modelValue:e.diskStore.s3DiskConfigData.secret,"onUpdate:modelValue":i[8]||(i[8]=o=>e.diskStore.s3DiskConfigData.secret=o),modelModifiers:{trim:!0},type:"text",name:"name",placeholder:"Ex. ********",invalid:e.v$.s3DiskConfigData.secret.$error,onInput:i[9]||(i[9]=o=>e.v$.s3DiskConfigData.secret.$touch())},null,8,["modelValue","invalid"])]),_:1},8,["label","error"]),a(l,{label:r.$t("settings.disk.aws_region"),error:e.v$.s3DiskConfigData.region.$error&&e.v$.s3DiskConfigData.region.$errors[0].$message,required:""},{default:n(()=>[a(s,{modelValue:e.diskStore.s3DiskConfigData.region,"onUpdate:modelValue":i[10]||(i[10]=o=>e.diskStore.s3DiskConfigData.region=o),modelModifiers:{trim:!0},type:"text",name:"name",placeholder:"Ex. us-west",invalid:e.v$.s3DiskConfigData.region.$error,onInput:i[11]||(i[11]=o=>e.v$.s3DiskConfigData.region.$touch())},null,8,["modelValue","invalid"])]),_:1},8,["label","error"]),a(l,{label:r.$t("settings.disk.aws_bucket"),error:e.v$.s3DiskConfigData.bucket.$error&&e.v$.s3DiskConfigData.bucket.$errors[0].$message,required:""},{default:n(()=>[a(s,{modelValue:e.diskStore.s3DiskConfigData.bucket,"onUpdate:modelValue":i[12]||(i[12]=o=>e.diskStore.s3DiskConfigData.bucket=o),modelModifiers:{trim:!0},type:"text",name:"name",placeholder:"Ex. AppName",invalid:e.v$.s3DiskConfigData.bucket.$error,onInput:i[13]||(i[13]=o=>e.v$.s3DiskConfigData.bucket.$touch())},null,8,["modelValue","invalid"])]),_:1},8,["label","error"])]),_:1}),e.isDisabled?h("",!0):(y(),E("div",qe,[b("div",Me,[a(m,{modelValue:e.set_as_default,"onUpdate:modelValue":i[14]||(i[14]=o=>e.set_as_default=o),class:"flex"},null,8,["modelValue"])]),b("div",we,[b("p",Ie,V(r.$t("settings.disk.is_default")),1)])]))]),K(r.$slots,"default",{diskData:{isLoading:e.isLoading,submitData:e.submitData}})],32)}var Ee=j(xe,[["render",he]]);const Ue={props:{isEdit:{type:Boolean,require:!0,default:!1},loading:{type:Boolean,require:!0,default:!1},disks:{type:Array,require:!0,default:Array}},emits:["submit","onChangeDisk"],setup(r,{emit:i}){const t=G(),e=O(),{t:u}=A();let k=p(!1),s=p(!1),l=p(""),d=p(null);const c=S({get:()=>t.selected_driver,set:v=>{t.selected_driver=v,t.doSpaceDiskConfig.selected_driver=v}}),m=S(()=>({doSpaceDiskConfig:{root:{required:g.withMessage(u("validation.required"),D)},key:{required:g.withMessage(u("validation.required"),D)},secret:{required:g.withMessage(u("validation.required"),D)},region:{required:g.withMessage(u("validation.required"),D)},endpoint:{required:g.withMessage(u("validation.required"),D),url:g.withMessage(u("validation.invalid_url"),oe)},bucket:{required:g.withMessage(u("validation.required"),D)},selected_driver:{required:g.withMessage(u("validation.required"),D)},name:{required:g.withMessage(u("validation.required"),D)}}})),o=Y(m,S(()=>t));z(()=>{t.doSpaceDiskConfig={name:null,selected_driver:"doSpaces",key:null,secret:null,region:null,bucket:null,endpoint:null,root:null}}),B();async function B(){k.value=!0;let v=N({disk:"doSpaces"});if(r.isEdit)Object.assign(t.doSpaceDiskConfig,JSON.parse(e.data.credentials)),s.value=e.data.set_as_default,s.value&&(d.value=!0);else{let $=await t.fetchDiskEnv(v);Object.assign(t.doSpaceDiskConfig,$.data)}l.value=r.disks.find($=>$.value=="doSpaces"),k.value=!1}const M=S(()=>!!(r.isEdit&&s.value&&d.value));async function w(){if(o.value.doSpaceDiskConfig.$touch(),o.value.doSpaceDiskConfig.$invalid)return!0;let v={credentials:t.doSpaceDiskConfig,name:t.doSpaceDiskConfig.name,driver:l.value.value,set_as_default:s.value};return i("submit",v),!1}function I(){i("onChangeDisk",t.doSpaceDiskConfig.selected_driver)}return{v$:o,diskStore:t,selected_driver:c,isLoading:k,set_as_default:s,selected_disk:l,is_current_disk:d,loadData:B,submitData:w,onChangeDriver:I,isDisabled:M}}},Le={class:"px-8 py-6"},Ne={key:0,class:"flex items-center mt-6"},Ge={class:"relative flex items-center w-12"},Oe={class:"ml-4 right"},Fe={class:"p-0 mb-1 text-base leading-snug text-black box-title"};function je(r,i,t,e,u,k){const s=f("BaseInput"),l=f("BaseInputGroup"),d=f("BaseMultiselect"),c=f("BaseInputGrid"),m=f("BaseSwitch");return y(),E("form",{onSubmit:i[17]||(i[17]=P((...o)=>e.submitData&&e.submitData(...o),["prevent"]))},[b("div",Le,[a(c,null,{default:n(()=>[a(l,{label:r.$t("settings.disk.name"),error:e.v$.doSpaceDiskConfig.name.$error&&e.v$.doSpaceDiskConfig.name.$errors[0].$message,required:""},{default:n(()=>[a(s,{modelValue:e.diskStore.doSpaceDiskConfig.name,"onUpdate:modelValue":i[0]||(i[0]=o=>e.diskStore.doSpaceDiskConfig.name=o),type:"text",name:"name",invalid:e.v$.doSpaceDiskConfig.name.$error,onInput:i[1]||(i[1]=o=>e.v$.doSpaceDiskConfig.name.$touch())},null,8,["modelValue","invalid"])]),_:1},8,["label","error"]),a(l,{label:r.$tc("settings.disk.driver"),error:e.v$.doSpaceDiskConfig.selected_driver.$error&&e.v$.doSpaceDiskConfig.selected_driver.$errors[0].$message,required:""},{default:n(()=>[a(d,{modelValue:e.selected_driver,"onUpdate:modelValue":[i[2]||(i[2]=o=>e.selected_driver=o),i[3]||(i[3]=o=>e.onChangeDriver(r.data))],invalid:e.v$.doSpaceDiskConfig.selected_driver.$error,"value-prop":"value",options:t.disks,searchable:"",label:"name","can-deselect":!1,"track-by":"name"},null,8,["modelValue","invalid","options"])]),_:1},8,["label","error"]),a(l,{label:r.$t("settings.disk.do_spaces_root"),error:e.v$.doSpaceDiskConfig.root.$error&&e.v$.doSpaceDiskConfig.root.$errors[0].$message,required:""},{default:n(()=>[a(s,{modelValue:e.diskStore.doSpaceDiskConfig.root,"onUpdate:modelValue":i[4]||(i[4]=o=>e.diskStore.doSpaceDiskConfig.root=o),modelModifiers:{trim:!0},type:"text",name:"name",placeholder:"Ex. /user/root/",invalid:e.v$.doSpaceDiskConfig.root.$error,onInput:i[5]||(i[5]=o=>e.v$.doSpaceDiskConfig.root.$touch())},null,8,["modelValue","invalid"])]),_:1},8,["label","error"]),a(l,{label:r.$t("settings.disk.do_spaces_key"),error:e.v$.doSpaceDiskConfig.key.$error&&e.v$.doSpaceDiskConfig.key.$errors[0].$message,required:""},{default:n(()=>[a(s,{modelValue:e.diskStore.doSpaceDiskConfig.key,"onUpdate:modelValue":i[6]||(i[6]=o=>e.diskStore.doSpaceDiskConfig.key=o),modelModifiers:{trim:!0},type:"text",name:"name",placeholder:"Ex. KEIS4S39SERSDS",invalid:e.v$.doSpaceDiskConfig.key.$error,onInput:i[7]||(i[7]=o=>e.v$.doSpaceDiskConfig.key.$touch())},null,8,["modelValue","invalid"])]),_:1},8,["label","error"]),a(l,{label:r.$t("settings.disk.do_spaces_secret"),error:e.v$.doSpaceDiskConfig.secret.$error&&e.v$.doSpaceDiskConfig.secret.$errors[0].$message,required:""},{default:n(()=>[a(s,{modelValue:e.diskStore.doSpaceDiskConfig.secret,"onUpdate:modelValue":i[8]||(i[8]=o=>e.diskStore.doSpaceDiskConfig.secret=o),modelModifiers:{trim:!0},type:"text",name:"name",placeholder:"Ex. ********",invalid:e.v$.doSpaceDiskConfig.secret.$error,onInput:i[9]||(i[9]=o=>e.v$.doSpaceDiskConfig.secret.$touch())},null,8,["modelValue","invalid"])]),_:1},8,["label","error"]),a(l,{label:r.$t("settings.disk.do_spaces_region"),error:e.v$.doSpaceDiskConfig.region.$error&&e.v$.doSpaceDiskConfig.region.$errors[0].$message,required:""},{default:n(()=>[a(s,{modelValue:e.diskStore.doSpaceDiskConfig.region,"onUpdate:modelValue":i[10]||(i[10]=o=>e.diskStore.doSpaceDiskConfig.region=o),modelModifiers:{trim:!0},type:"text",name:"name",placeholder:"Ex. nyc3",invalid:e.v$.doSpaceDiskConfig.region.$error,onInput:i[11]||(i[11]=o=>e.v$.doSpaceDiskConfig.region.$touch())},null,8,["modelValue","invalid"])]),_:1},8,["label","error"]),a(l,{label:r.$t("settings.disk.do_spaces_endpoint"),error:e.v$.doSpaceDiskConfig.endpoint.$error&&e.v$.doSpaceDiskConfig.endpoint.$errors[0].$message,required:""},{default:n(()=>[a(s,{modelValue:e.diskStore.doSpaceDiskConfig.endpoint,"onUpdate:modelValue":i[12]||(i[12]=o=>e.diskStore.doSpaceDiskConfig.endpoint=o),modelModifiers:{trim:!0},type:"text",name:"name",placeholder:"Ex. https://nyc3.digitaloceanspaces.com",invalid:e.v$.doSpaceDiskConfig.endpoint.$error,onInput:i[13]||(i[13]=o=>e.v$.doSpaceDiskConfig.endpoint.$touch())},null,8,["modelValue","invalid"])]),_:1},8,["label","error"]),a(l,{label:r.$t("settings.disk.do_spaces_bucket"),error:e.v$.doSpaceDiskConfig.bucket.$error&&e.v$.doSpaceDiskConfig.bucket.$errors[0].$message,required:""},{default:n(()=>[a(s,{modelValue:e.diskStore.doSpaceDiskConfig.bucket,"onUpdate:modelValue":i[14]||(i[14]=o=>e.diskStore.doSpaceDiskConfig.bucket=o),modelModifiers:{trim:!0},type:"text",name:"name",placeholder:"Ex. my-new-space",invalid:e.v$.doSpaceDiskConfig.bucket.$error,onInput:i[15]||(i[15]=o=>e.v$.doSpaceDiskConfig.bucket.$touch())},null,8,["modelValue","invalid"])]),_:1},8,["label","error"])]),_:1}),e.isDisabled?h("",!0):(y(),E("div",Ne,[b("div",Ge,[a(m,{modelValue:e.set_as_default,"onUpdate:modelValue":i[16]||(i[16]=o=>e.set_as_default=o),class:"flex"},null,8,["modelValue"])]),b("div",Oe,[b("p",Fe,V(r.$t("settings.disk.is_default")),1)])]))]),K(r.$slots,"default",{diskData:{isLoading:e.isLoading,submitData:e.submitData}})],32)}var Ae=j(Ue,[["render",je]]);const Te={components:{Dropbox:De,Local:Be,S3:Ee,DoSpaces:Ae},setup(){const r=G(),i=O();let t=p(!1),e=p(!1);ae(()=>{i.id&&(e.value=!0)});const u=S(()=>i.active&&i.componentName==="FileDiskModal");function k(m){return m&&(m.diskData.isLoading.value||t.value)}async function s(){t.value=!0;let m=await r.fetchDiskDrivers();e.value?r.selected_driver=i.data.driver:r.selected_driver=m.data.drivers[0].value,t.value=!1}async function l(m){Object.assign(r.diskConfigData,m),t.value=!0;let o={id:i.id,...m};await(e.value?r.updateDisk:r.createDisk)(o),t.value=!1,i.refreshData(),d()}function d(){i.closeModal()}function c(m){r.selected_driver=m,r.diskConfigData.selected_driver=m}return{isEdit:e,createNewDisk:l,isRequestFire:k,diskStore:r,closeDiskModal:d,loadData:s,diskChange:c,modalStore:i,isLoading:t,modalActive:u}}},Re={class:"flex justify-between w-full"},Ye={class:"file-disk-modal"},ze={class:"z-0 flex justify-end p-4 border-t border-solid border-gray-light"};function Ke(r,i,t,e,u,k){const s=f("BaseIcon"),l=f("BaseButton"),d=f("BaseModal");return y(),L(d,{show:e.modalActive,onClose:e.closeDiskModal,onOpen:e.loadData},{header:n(()=>[b("div",Re,[U(V(e.modalStore.title)+" ",1),a(s,{name:"XIcon",class:"h-6 w-6 text-gray-500 cursor-pointer",onClick:e.closeDiskModal},null,8,["onClick"])])]),default:n(()=>[b("div",Ye,[(y(),L(te(e.diskStore.selected_driver),{loading:e.isLoading,disks:e.diskStore.getDiskDrivers,"is-edit":e.isEdit,onOnChangeDisk:i[0]||(i[0]=c=>e.diskChange(c)),onSubmit:e.createNewDisk},{default:n(c=>[b("div",ze,[a(l,{class:"mr-3 text-sm",variant:"primary-outline",type:"button",onClick:e.closeDiskModal},{default:n(()=>[U(V(r.$t("general.cancel")),1)]),_:1},8,["onClick"]),a(l,{loading:e.isRequestFire(c),disabled:e.isRequestFire(c),variant:"primary",type:"submit"},{default:n(()=>[e.isRequestFire(c)?h("",!0):(y(),L(s,{key:0,name:"SaveIcon",class:"w-6 mr-2"})),U(" "+V(r.$t("general.save")),1)]),_:2},1032,["loading","disabled"])])]),_:1},8,["loading","disks","is-edit","onSubmit"]))])]),_:1},8,["show","onClose","onOpen"])}var Pe=j(Te,[["render",Ke]]);const He={class:"inline-block"},Qe={setup(r){const i=re("utils"),t=O(),e=G(),u=se(),k=le(),{t:s}=A();let l=p(!1),d=p("");const c=S(()=>[{key:"name",label:s("settings.disk.disk_name"),thClass:"extra",tdClass:"font-medium text-gray-900"},{key:"driver",label:s("settings.disk.filesystem_driver"),thClass:"extra",tdClass:"font-medium text-gray-900"},{key:"type",label:s("settings.disk.disk_type"),thClass:"extra",tdClass:"font-medium text-gray-900"},{key:"set_as_default",label:s("settings.disk.is_default"),thClass:"extra",tdClass:"font-medium text-gray-900"},{key:"actions",label:"",tdClass:"text-right text-sm font-medium",sortable:!1}]),m=p(u.selectedCompanySettings.save_pdf_to_disk),o=S({get:()=>m.value==="YES",set:async C=>{const q=C?"YES":"NO";let x={settings:{save_pdf_to_disk:q}};m.value=q,await u.updateCompanySettings({data:x,message:"general.setting_updated"})}});async function B({page:C,filter:q,sort:x}){let H=N({orderByField:x.fieldName||"created_at",orderBy:x.order||"desc",page:C}),F=await e.fetchDisks(H);return{data:F.data.data,pagination:{totalPages:F.data.meta.last_page,currentPage:C,totalCount:F.data.meta.total}}}function M(C){return C.set_as_default?!(C.type=="SYSTEM"&&C.set_as_default):!0}function w(){t.openModal({title:s("settings.disk.new_disk"),componentName:"FileDiskModal",variant:"lg",refreshData:d.value&&d.value.refresh})}function I(C){t.openModal({title:s("settings.disk.edit_file_disk"),componentName:"FileDiskModal",variant:"lg",id:C.id,data:C,refreshData:d.value&&d.value.refresh})}function v(C){k.openDialog({title:s("general.are_you_sure"),message:s("settings.disk.set_default_disk_confirm"),yesLabel:s("general.ok"),noLabel:s("general.cancel"),variant:"primary",hideNoButton:!1,size:"lg"}).then(async q=>{if(q){l.value=!0;let x=N({set_as_default:!0,id:C});await e.updateDisk(x).then(()=>{d.value&&d.value.refresh()})}})}function $(C){k.openDialog({title:s("general.are_you_sure"),message:s("settings.disk.confirm_delete"),yesLabel:s("general.ok"),noLabel:s("general.cancel"),variant:"danger",hideNoButton:!1,size:"lg"}).then(async q=>{if(q&&(await e.deleteFileDisk(C)).data.success)return d.value&&d.value.refresh(),!0})}return(C,q)=>{const x=f("BaseIcon"),H=f("BaseButton"),F=f("BaseBadge"),J=f("BaseDropdownItem"),Q=f("BaseDropdown"),W=f("BaseTable"),Z=f("BaseDivider"),ee=f("BaseSwitchSection"),ie=f("BaseSettingCard");return y(),E(de,null,[a(Pe),a(ie,{title:C.$tc("settings.disk.title",1),description:C.$t("settings.disk.description")},{action:n(()=>[a(H,{variant:"primary-outline",onClick:w},{left:n(_=>[a(x,{class:ne(_.class),name:"PlusIcon"},null,8,["class"])]),default:n(()=>[U(" "+V(C.$t("settings.disk.new_disk")),1)]),_:1})]),default:n(()=>[a(W,{ref:(_,T)=>{T.table=_,X(d)?d.value=_:d=_},class:"mt-16",data:B,columns:R(c)},{"cell-set_as_default":n(({row:_})=>[a(F,{"bg-color":R(i).getBadgeStatusColor(_.data.set_as_default?"YES":"NO").bgColor,color:R(i).getBadgeStatusColor(_.data.set_as_default?"YES":"NO").color},{default:n(()=>[U(V(_.data.set_as_default?"Yes":"No".replace("_"," ")),1)]),_:2},1032,["bg-color","color"])]),"cell-actions":n(({row:_})=>[M(_.data)?(y(),L(Q,{key:0},{activator:n(()=>[b("div",He,[a(x,{name:"DotsHorizontalIcon",class:"text-gray-500"})])]),default:n(()=>[_.data.set_as_default?h("",!0):(y(),L(J,{key:0,onClick:T=>v(_.data.id)},{default:n(()=>[a(x,{class:"mr-3 tetx-gray-600",name:"CheckCircleIcon"}),U(" "+V(C.$t("settings.disk.set_default_disk")),1)]),_:2},1032,["onClick"])),_.data.type!=="SYSTEM"?(y(),L(J,{key:1,onClick:T=>I(_.data)},{default:n(()=>[a(x,{name:"PencilIcon",class:"mr-3 text-gray-600"}),U(" "+V(C.$t("general.edit")),1)]),_:2},1032,["onClick"])):h("",!0),_.data.type!=="SYSTEM"&&!_.data.set_as_default?(y(),L(J,{key:2,onClick:T=>$(_.data.id)},{default:n(()=>[a(x,{name:"TrashIcon",class:"mr-3 text-gray-600"}),U(" "+V(C.$t("general.delete")),1)]),_:2},1032,["onClick"])):h("",!0)]),_:2},1024)):h("",!0)]),_:1},8,["columns"]),a(Z,{class:"mt-8 mb-2"}),a(ee,{modelValue:R(o),"onUpdate:modelValue":q[0]||(q[0]=_=>X(o)?o.value=_:null),title:C.$t("settings.disk.save_pdf_to_disk"),description:C.$t("settings.disk.disk_setting_description")},null,8,["modelValue","title","description"])]),_:1},8,["title","description"])],64)}}};export{Qe as default};
