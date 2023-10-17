import{M as Q,m as W,K as j,d as y,a4 as X,u as Y,e as B,E as Z,P as ee,r as d,o as u,k as b,i as n,a,g as s,n as z,z as V,t as m,h as k,b as i,b6 as F,b7 as te,c as S,j as oe,F as ae}from"./main.2cb7c090.js";import{u as se}from"./invoice.a9d8183a.js";import{u as ne}from"./global.5b7fa7f1.js";import"./auth.38b50123.js";const re={class:"fixed top-0 left-0 hidden h-full pt-16 pb-4 bg-white w-88 xl:block"},ie={class:"flex items-center justify-between px-4 pt-8 pb-6 border border-gray-200 border-solid"},le={class:"flex ml-3",role:"group","aria-label":"First group"},de={class:"px-4 py-1 pb-2 mb-2 text-sm border-b border-gray-200 border-solid"},ce={class:"px-2"},ue={class:"px-2"},me={class:"px-2"},pe={class:"h-full pb-32 overflow-y-scroll border-l border-gray-200 border-solid sw-scroll"},_e={class:"flex-2"},fe={class:"mb-1 not-italic font-medium leading-5 text-gray-500 capitalize text-md"},ve={class:"flex-1 whitespace-nowrap right"},ye={class:"text-sm text-right text-gray-500 non-italic"},be={key:0,class:"flex justify-center px-4 mt-5 text-sm text-gray-600"},he={class:"flex flex-col min-h-0 mt-8 overflow-hidden",style:{height:"75vh"}},ge=["src"],ke={setup(Be){const p=Q(),l=se(),f=ne(),{tm:$}=W();let h=j({}),o=j({orderBy:"",orderByField:"",invoice_number:""});y(null),y(null);let I=y(!1),N=y(!1);y(!1),X("utils"),Y();const R=B(()=>l.selectedViewInvoice),P=B(()=>o.orderBy==="asc"||o.orderBy==null);B(()=>P.value?$("general.ascending"):$("general.descending"));const D=B(()=>h.unique_hash?`/invoices/pdf/${h.unique_hash}`:!1);Z(p,()=>{C()}),E(),C(),c=ee.exports.debounce(c,500);function U(e){return p.params.id==e}async function E(){await l.fetchInvoices({limit:"all"},f.companySlug),setTimeout(()=>{M()},500)}async function C(){if(p&&p.params.id){let e=await l.fetchViewInvoice({id:p.params.id},f.companySlug);e.data&&Object.assign(h,e.data.data)}}function M(){const e=document.getElementById(`invoice-${p.params.id}`);e&&(e.scrollIntoView({behavior:"smooth"}),e.classList.add("shake"))}async function c(){let e={};o.invoice_number!==""&&o.invoice_number!==null&&o.invoice_number!==void 0&&(e.invoice_number=o.invoice_number),o.orderBy!==null&&o.orderBy!==void 0&&(e.orderBy=o.orderBy),o.orderByField!==null&&o.orderByField!==void 0&&(e.orderByField=o.orderByField),I.value=!0;try{let r=await l.searchInvoice(e,f.companySlug);I.value=!1,r.data.data&&(l.invoices=r.data.data)}catch{I.value=!1}}function T(){return o.orderBy==="asc"?(o.orderBy="desc",c(),!0):(o.orderBy="asc",c(),!0)}function q(){router.push({name:"invoice.portal.payment",params:{id:l.selectedViewInvoice.id,company:l.selectedViewInvoice.company.slug}})}return(e,r)=>{const v=d("BaseIcon"),g=d("BaseButton"),A=d("BasePageHeader"),G=d("BaseInput"),w=d("BaseRadio"),x=d("BaseInputGroup"),L=d("BaseInvoiceStatusBadge"),H=d("BaseFormatMoney"),O=d("router-link"),K=d("BasePage");return u(),b(K,{class:"xl:pl-96"},{default:n(()=>[a(A,{title:s(R).invoice_number},{actions:n(()=>{var t,_;return[a(g,{disabled:s(N),variant:"primary-outline",class:"mr-2",tag:"a",href:`/invoices/pdf/${s(h).unique_hash}`,download:""},{left:n(J=>[a(v,{name:"DownloadIcon",class:z(J.class)},null,8,["class"]),V(" "+m(e.$t("invoices.download")),1)]),_:1},8,["disabled","href"]),((_=(t=s(l))==null?void 0:t.selectedViewInvoice)==null?void 0:_.paid_status)!=="PAID"&&s(f).enabledModules.includes("Payments")?(u(),b(g,{key:0,variant:"primary",onClick:q},{default:n(()=>[V(m(e.$t("invoices.pay_invoice")),1)]),_:1})):k("",!0)]}),_:1},8,["title"]),i("div",re,[i("div",ie,[a(G,{modelValue:s(o).invoice_number,"onUpdate:modelValue":r[0]||(r[0]=t=>s(o).invoice_number=t),placeholder:e.$t("general.search"),type:"text",variant:"gray",onInput:c},{right:n(()=>[a(v,{name:"SearchIcon",class:"h-5 text-gray-400"})]),_:1},8,["modelValue","placeholder"]),i("div",le,[a(te,{position:"bottom-start","width-class":"w-50","position-class":"left-0"},{activator:n(()=>[a(g,{variant:"gray"},{default:n(()=>[a(v,{name:"FilterIcon",class:"h-5"})]),_:1})]),default:n(()=>[i("div",de,m(e.$t("general.sort_by")),1),i("div",ce,[a(F,{class:"pt-3 rounded-md hover:rounded-md"},{default:n(()=>[a(x,{class:"-mt-3 font-normal"},{default:n(()=>[a(w,{id:"filter_invoice_date",modelValue:s(o).orderByField,"onUpdate:modelValue":[r[1]||(r[1]=t=>s(o).orderByField=t),c],label:e.$t("invoices.invoice_date"),name:"filter",size:"sm",value:"invoice_date"},null,8,["modelValue","label"])]),_:1})]),_:1})]),i("div",ue,[a(F,{class:"pt-3 rounded-md hover:rounded-md"},{default:n(()=>[a(x,{class:"-mt-3 font-normal"},{default:n(()=>[a(w,{id:"filter_due_date",modelValue:s(o).orderByField,"onUpdate:modelValue":[r[2]||(r[2]=t=>s(o).orderByField=t),c],label:e.$t("invoices.due_date"),name:"filter",size:"sm",value:"due_date"},null,8,["modelValue","label"])]),_:1})]),_:1})]),i("div",me,[a(F,{class:"pt-3 rounded-md hover:rounded-md"},{default:n(()=>[a(x,{class:"-mt-3 font-normal"},{default:n(()=>[a(w,{id:"filter_invoice_number",modelValue:s(o).orderByField,"onUpdate:modelValue":[r[3]||(r[3]=t=>s(o).orderByField=t),c],label:e.$t("invoices.invoice_number"),size:"sm",name:"filter",value:"invoice_number"},null,8,["modelValue","label"])]),_:1})]),_:1})])]),_:1}),a(g,{class:"ml-1",variant:"white",onClick:T},{default:n(()=>[s(P)?(u(),b(v,{key:0,name:"SortAscendingIcon",class:"h-5"})):(u(),b(v,{key:1,name:"SortDescendingIcon",class:"h-5"}))]),_:1})])]),i("div",pe,[(u(!0),S(ae,null,oe(s(l).invoices,(t,_)=>(u(),b(O,{id:"invoice-"+t.id,key:_,to:`/${s(f).companySlug}/customer/invoices/${t.id}/view`,class:z(["flex justify-between p-4 items-center cursor-pointer hover:bg-gray-100 border-l-4 border-transparent",{"bg-gray-100 border-l-4 border-primary-500 border-solid":U(t.id)}]),style:{"border-bottom":"1px solid rgba(185, 193, 209, 0.41)"}},{default:n(()=>[i("div",_e,[i("div",fe,m(t.invoice_number),1),a(L,{status:t.status},{default:n(()=>[V(m(t.status),1)]),_:2},1032,["status"])]),i("div",ve,[a(H,{class:"mb-2 text-xl not-italic font-semibold leading-8 text-right text-gray-900 block",amount:t.total,currency:t.currency},null,8,["amount","currency"]),i("div",ye,m(t.formatted_invoice_date),1)])]),_:2},1032,["id","to","class"]))),128)),s(l).invoices.length?k("",!0):(u(),S("p",be,m(e.$t("invoices.no_matching_invoices")),1))])]),i("div",he,[s(D)?(u(),S("iframe",{key:0,ref:(t,_)=>{_.report=t},src:s(D),class:"flex-1 border border-gray-400 border-solid rounded-md",onClick:r[4]||(r[4]=(...t)=>e.ViewReportsPDF&&e.ViewReportsPDF(...t))},null,8,ge)):k("",!0)])]),_:1})}}};export{ke as default};
