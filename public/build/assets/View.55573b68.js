import{M as Q,p as W,a9 as X,m as Y,K as z,d as Z,a4 as ee,u as te,e as h,E as ae,P as se,r as d,o as m,k as y,i as o,a,b as n,g as r,z as w,t as p,h as B,b6 as S,b7 as oe,c as V,j as re,n as le,F as ne}from"./main.2cb7c090.js";import{u as ie}from"./estimate.8fb66144.js";import{u as de}from"./global.5b7fa7f1.js";import"./auth.38b50123.js";const me={class:"mr-3 text-sm"},ce={class:"mr-3 text-sm"},ue={class:"fixed top-0 left-0 hidden h-full pt-16 pb-4 bg-white w-88 xl:block"},_e={class:"flex items-center justify-between px-4 pt-8 pb-6 border border-gray-200 border-solid"},pe={class:"flex ml-3",role:"group","aria-label":"First group"},fe={class:"px-4 py-1 pb-2 mb-2 text-sm border-b border-gray-200 border-solid"},ye={class:"px-2"},ge={class:"px-2"},be={class:"px-2"},he={class:"h-full pb-32 overflow-y-scroll border-l border-gray-200 border-solid sw-scroll"},Be={class:"flex-2"},ve={class:"mb-1 text-md not-italic font-medium leading-5 text-gray-500 capitalize"},xe={class:"flex-1 whitespace-nowrap right"},ke={class:"text-sm text-right text-gray-500 non-italic"},Ee={key:0,class:"flex justify-center px-4 mt-5 text-sm text-gray-600"},we={class:"flex flex-col min-h-0 mt-8 overflow-hidden",style:{height:"75vh"}},Se=["src"],De={setup(Ve){const c=Q(),F=W(),i=ie(),f=de(),I=X(),{tm:$,t:u}=Y();let v=z({}),t=z({orderBy:"",orderByField:"",estimate_number:""}),x=Z(!1);ee("utils"),te();const R=h(()=>i.selectedViewEstimate),C=h(()=>t.orderBy==="asc"||t.orderBy==null);h(()=>C.value?$("general.ascending"):$("general.descending"));const D=h(()=>v.unique_hash?`/estimates/pdf/${v.unique_hash}`:!1);ae(c,()=>{j()}),L(),j(),_=se.exports.debounce(_,500);function T(e){return c.params.id==e}async function L(){await i.fetchEstimate({limit:"all"},f.companySlug),setTimeout(()=>{N()},500)}async function j(){if(c&&c.params.id){let e=await i.fetchViewEstimate({id:c.params.id},f.companySlug);e.data&&Object.assign(v,e.data.data)}}function N(){const e=document.getElementById(`estimate-${c.params.id}`);e&&(e.scrollIntoView({behavior:"smooth"}),e.classList.add("shake"))}async function _(){let e={};t.estimate_number!==""&&t.estimate_number!==null&&t.estimate_number!==void 0&&(e.estimate_number=t.estimate_number),t.orderBy!==null&&t.orderBy!==void 0&&(e.orderBy=t.orderBy),t.orderByField!==null&&t.orderByField!==void 0&&(e.orderByField=t.orderByField),x.value=!0;try{let l=await i.searchEstimate(e,f.companySlug);x.value=!1,l.data.data&&(i.estimates=l.data.data)}catch{x.value=!1}}function A(){return t.orderBy==="asc"?(t.orderBy="desc",_(),!0):(t.orderBy="asc",_(),!0)}async function P(){I.openDialog({title:u("general.are_you_sure"),message:u("estimates.confirm_mark_as_accepted",1),yesLabel:u("general.ok"),noLabel:u("general.cancel"),variant:"primary",size:"lg",hideNoButton:!1}).then(async e=>{let l={slug:f.companySlug,id:c.params.id,status:"ACCEPTED"};e&&(i.acceptEstimate(l),F.push({name:"estimates.dashboard"}))})}async function U(){I.openDialog({title:u("general.are_you_sure"),message:u("estimates.confirm_mark_as_rejected",1),yesLabel:u("general.ok"),noLabel:u("general.cancel"),variant:"primary",size:"lg",hideNoButton:!1}).then(async e=>{let l={slug:f.companySlug,id:c.params.id,status:"REJECTED"};e&&(i.rejectEstimate(l),F.push({name:"estimates.dashboard"}))})}return(e,l)=>{const g=d("BaseButton"),G=d("BasePageHeader"),b=d("BaseIcon"),M=d("BaseInput"),k=d("BaseRadio"),E=d("BaseInputGroup"),q=d("BaseEstimateStatusBadge"),H=d("BaseFormatMoney"),O=d("router-link"),J=d("BasePage");return m(),y(J,{class:"xl:pl-96"},{default:o(()=>[a(G,{title:r(R).estimate_number},{actions:o(()=>[n("div",me,[r(i).selectedViewEstimate.status==="DRAFT"?(m(),y(g,{key:0,variant:"primary",onClick:P},{default:o(()=>[w(p(e.$t("estimates.accept_estimate")),1)]),_:1})):B("",!0)]),n("div",ce,[r(i).selectedViewEstimate.status==="DRAFT"?(m(),y(g,{key:0,variant:"primary-outline",onClick:U},{default:o(()=>[w(p(e.$t("estimates.reject_estimate")),1)]),_:1})):B("",!0)])]),_:1},8,["title"]),n("div",ue,[n("div",_e,[a(M,{modelValue:r(t).estimate_number,"onUpdate:modelValue":l[0]||(l[0]=s=>r(t).estimate_number=s),placeholder:e.$t("general.search"),type:"text",variant:"gray",onInput:_},{right:o(()=>[a(b,{name:"SearchIcon",class:"h-5 text-gray-400"})]),_:1},8,["modelValue","placeholder"]),n("div",pe,[a(oe,{position:"bottom-start","width-class":"w-50","position-class":"left-0"},{activator:o(()=>[a(g,{variant:"gray"},{default:o(()=>[a(b,{name:"FilterIcon",class:"h-5"})]),_:1})]),default:o(()=>[n("div",fe,p(e.$t("general.sort_by")),1),n("div",ye,[a(S,{class:"rounded-md pt-3 hover:rounded-md"},{default:o(()=>[a(E,{class:"-mt-3 font-normal"},{default:o(()=>[a(k,{id:"filter_estimate_date",modelValue:r(t).orderByField,"onUpdate:modelValue":l[1]||(l[1]=s=>r(t).orderByField=s),label:e.$t("reports.estimates.estimate_date"),size:"sm",name:"filter",value:"estimate_date",onChange:_},null,8,["modelValue","label"])]),_:1})]),_:1})]),n("div",ge,[a(S,{class:"rounded-md pt-3 hover:rounded-md"},{default:o(()=>[a(E,{class:"-mt-3 font-normal"},{default:o(()=>[a(k,{id:"filter_due_date",modelValue:r(t).orderByField,"onUpdate:modelValue":[l[2]||(l[2]=s=>r(t).orderByField=s),_],label:e.$t("estimates.due_date"),value:"expiry_date",size:"sm",name:"filter"},null,8,["modelValue","label"])]),_:1})]),_:1})]),n("div",be,[a(S,{class:"rounded-md pt-3 hover:rounded-md"},{default:o(()=>[a(E,{class:"-mt-3 font-normal"},{default:o(()=>[a(k,{id:"filter_estimate_number",modelValue:r(t).orderByField,"onUpdate:modelValue":[l[3]||(l[3]=s=>r(t).orderByField=s),_],label:e.$t("estimates.estimate_number"),value:"estimate_number",size:"sm",name:"filter"},null,8,["modelValue","label"])]),_:1})]),_:1})])]),_:1}),a(g,{class:"ml-1",variant:"white",onClick:A},{default:o(()=>[r(C)?(m(),y(b,{key:0,name:"SortAscendingIcon",class:"h-5"})):(m(),y(b,{key:1,name:"SortDescendingIcon",class:"h-5"}))]),_:1})])]),n("div",he,[(m(!0),V(ne,null,re(r(i).estimates,(s,K)=>(m(),y(O,{id:"estimate-"+s.id,key:K,to:`/${r(f).companySlug}/customer/estimates/${s.id}/view`,class:le(["flex justify-between p-4 items-center cursor-pointer hover:bg-gray-100 border-l-4 border-transparent",{"bg-gray-100 border-l-4 border-primary-500 border-solid":T(s.id)}]),style:{"border-bottom":"1px solid rgba(185, 193, 209, 0.41)"}},{default:o(()=>[n("div",Be,[n("div",ve,p(s.estimate_number),1),a(q,{status:s.status},{default:o(()=>[w(p(s.status),1)]),_:2},1032,["status"])]),n("div",xe,[a(H,{class:"mb-2 text-xl not-italic font-semibold leading-8 text-right text-gray-900 block",amount:s.total,currency:s.currency},null,8,["amount","currency"]),n("div",ke,p(s.formatted_estimate_date),1)])]),_:2},1032,["id","to","class"]))),128)),r(i).estimates.length?B("",!0):(m(),V("p",Ee,p(e.$t("estimates.no_matching_estimates")),1))])]),n("div",we,[r(D)?(m(),V("iframe",{key:0,src:r(D),class:"flex-1 border border-gray-400 border-solid rounded-md"},null,8,Se)):B("",!0)])]),_:1})}}};export{De as default};
