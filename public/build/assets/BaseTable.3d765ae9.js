import{ag as K,_ as O,r as T,o as i,c as s,b as u,n as c,t as h,h as m,a as P,F as k,j as C,z as _,K as N,d as F,e as L,E as J,f as Q,a2 as A,g as y,i as U,S as X,k as Z,P as $}from"./main.2cb7c090.js";function V(a,t){if(!t||a===null||typeof a!="object")return a;const[e,n]=t.split(/\.(.+)/);return V(a[e],n)}function ee(a,t){return t.reduce((e,n)=>(e[n]=a[n],e),{})}class te{constructor(t,e){this.data=t,this.columns=e}getValue(t){return V(this.data,t)}getColumn(t){return this.columns.find(e=>e.key===t)}getSortableValue(t){const e=this.getColumn(t).dataType;let n=this.getValue(t);if(n==null)return"";if(n instanceof String&&(n=n.toLowerCase()),e.startsWith("date")){const b=e.replace("date:","");return K(n,b).format("YYYYMMDDHHmmss")}return e==="numeric"?n:n.toString()}}class ae{constructor(t){const e=ee(t,["key","label","thClass","tdClass","sortBy","sortable","hidden","dataType"]);for(const n in e)this[n]=t[n];e.dataType||(this.dataType="string"),e.sortable===void 0&&(this.sortable=!0)}getFilterFieldName(){return this.filterOn||this.key}isSortable(){return this.sortable}getSortPredicate(t,e){const n=this.getSortFieldName(),l=e.find(g=>g.key===n).dataType;return l.startsWith("date")||l==="numeric"?(g,d)=>{const p=g.getSortableValue(n),x=d.getSortableValue(n);return t==="desc"?x<p?-1:1:p<x?-1:1}:(g,d)=>{const p=g.getSortableValue(n),x=d.getSortableValue(n);return t==="desc"?x.localeCompare(p):p.localeCompare(x)}}getSortFieldName(){return this.sortBy||this.key}}const ne={props:{pagination:{type:Object,default:()=>({})}},computed:{pages(){return this.pagination.totalPages===void 0?[]:this.pageLinks()},hasFirst(){return this.pagination.currentPage>=4||this.pagination.totalPages<10},hasLast(){return this.pagination.currentPage<=this.pagination.totalPages-3||this.pagination.totalPages<10},hasFirstEllipsis(){return this.pagination.currentPage>=4&&this.pagination.totalPages>=10},hasLastEllipsis(){return this.pagination.currentPage<=this.pagination.totalPages-3&&this.pagination.totalPages>=10},shouldShowPagination(){return this.pagination.totalPages===void 0||this.pagination.count===0?!1:this.pagination.totalPages>1}},methods:{isActive(a){return(this.pagination.currentPage||1)===a},pageClicked(a){a==="..."||a===this.pagination.currentPage||a>this.pagination.totalPages||a<1||this.$emit("pageChange",a)},pageLinks(){const a=[];let t=2,e=this.pagination.totalPages-1;this.pagination.totalPages>=10&&(t=Math.max(1,this.pagination.currentPage-2),e=Math.min(this.pagination.currentPage+2,this.pagination.totalPages));for(let n=t;n<=e;n++)a.push(n);return a}}},re={key:0,class:"flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6"},ie={class:"flex justify-between flex-1 sm:hidden"},se={class:"hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"},le={class:"text-sm text-gray-700"},oe=_(" Showing "+h(" ")+" "),de={key:0,class:"font-medium"},ge=_(" "+h(" ")+" to "+h(" ")+" "),ue={key:1,class:"font-medium"},ce={key:0},he={key:1},ye=_(" "+h(" ")+" of "+h(" ")+" "),fe={key:2,class:"font-medium"},me=_(" "+h(" ")+" results "),pe={class:"relative z-0 inline-flex -space-x-px rounded-md shadow-sm","aria-label":"Pagination"},be=u("span",{class:"sr-only"},"Previous",-1),xe={key:1,class:"relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300"},ve=["onClick"],ke={key:2,class:"relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300"},Ce=u("span",{class:"sr-only"},"Next",-1);function Pe(a,t,e,n,b,l){const g=T("BaseIcon");return l.shouldShowPagination?(i(),s("div",re,[u("div",ie,[u("a",{href:"#",class:c([{"disabled cursor-normal pointer-events-none !bg-gray-100 !text-gray-400":e.pagination.currentPage===1},"relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"]),onClick:t[0]||(t[0]=d=>l.pageClicked(e.pagination.currentPage-1))}," Previous ",2),u("a",{href:"#",class:c([{"disabled cursor-default pointer-events-none !bg-gray-100 !text-gray-400":e.pagination.currentPage===e.pagination.totalPages},"relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"]),onClick:t[1]||(t[1]=d=>l.pageClicked(e.pagination.currentPage+1))}," Next ",2)]),u("div",se,[u("div",null,[u("p",le,[oe,e.pagination.limit&&e.pagination.currentPage?(i(),s("span",de,h(e.pagination.currentPage*e.pagination.limit-(e.pagination.limit-1)),1)):m("",!0),ge,e.pagination.limit&&e.pagination.currentPage?(i(),s("span",ue,[e.pagination.currentPage*e.pagination.limit<=e.pagination.totalCount?(i(),s("span",ce,h(e.pagination.currentPage*e.pagination.limit),1)):(i(),s("span",he,h(e.pagination.totalCount),1))])):m("",!0),ye,e.pagination.totalCount?(i(),s("span",fe,h(e.pagination.totalCount),1)):m("",!0),me])]),u("div",null,[u("nav",pe,[u("a",{href:"#",class:c([{"disabled cursor-normal pointer-events-none !bg-gray-100 !text-gray-400":e.pagination.currentPage===1},"relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50"]),onClick:t[2]||(t[2]=d=>l.pageClicked(e.pagination.currentPage-1))},[be,P(g,{name:"ChevronLeftIcon"})],2),l.hasFirst?(i(),s("a",{key:0,href:"#","aria-current":"page",class:c([{"z-10 bg-primary-50 border-primary-500 text-primary-600":l.isActive(1),"bg-white border-gray-300 text-gray-500 hover:bg-gray-50":!l.isActive(1)},"relative inline-flex items-center px-4 py-2 text-sm font-medium border"]),onClick:t[3]||(t[3]=d=>l.pageClicked(1))}," 1 ",2)):m("",!0),l.hasFirstEllipsis?(i(),s("span",xe," ... ")):m("",!0),(i(!0),s(k,null,C(l.pages,d=>(i(),s("a",{key:d,href:"#",class:c([{"z-10 bg-primary-50 border-primary-500 text-primary-600":l.isActive(d),"bg-white border-gray-300 text-gray-500 hover:bg-gray-50":!l.isActive(d),disabled:d==="..."},"relative items-center hidden px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 md:inline-flex"]),onClick:p=>l.pageClicked(d)},h(d),11,ve))),128)),l.hasLastEllipsis?(i(),s("span",ke," ... ")):m("",!0),l.hasLast?(i(),s("a",{key:3,href:"#","aria-current":"page",class:c([{"z-10 bg-primary-50 border-primary-500 text-primary-600":l.isActive(e.pagination.totalPages),"bg-white border-gray-300 text-gray-500 hover:bg-gray-50":!l.isActive(e.pagination.totalPages)},"relative inline-flex items-center px-4 py-2 text-sm font-medium border"]),onClick:t[4]||(t[4]=d=>l.pageClicked(e.pagination.totalPages))},h(e.pagination.totalPages),3)):m("",!0),u("a",{href:"#",class:c(["relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50",{"disabled cursor-default pointer-events-none !bg-gray-100 !text-gray-400":e.pagination.currentPage===e.pagination.totalPages}]),onClick:t[5]||(t[5]=d=>l.pageClicked(e.pagination.currentPage+1))},[Ce,P(g,{name:"ChevronRightIcon"})],2)])])])])):m("",!0)}var _e=O(ne,[["render",Pe]]);const we={class:"flex flex-col"},Se={class:"-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 pb-4 lg:pb-0"},Te={class:"inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"},Ne={class:"relative overflow-hidden bg-white border-b border-gray-200 shadow sm:rounded-lg"},Be=["onClick"],Fe={key:0,class:"asc-direction"},Le={key:1,class:"desc-direction"},Ae={key:0},Ve={key:1},Ie={key:0,class:"absolute top-0 left-0 z-10 flex items-center justify-center w-full h-full bg-white bg-opacity-60"},ze={key:1,class:"text-center text-gray-500 pb-2 flex h-[160px] justify-center items-center flex-col"},De={class:"block mt-1"},Me={props:{columns:{type:Array,required:!0},data:{type:[Array,Function],required:!0},sortBy:{type:String,default:""},sortOrder:{type:String,default:""},tableClass:{type:String,default:"min-w-full divide-y divide-gray-200"},theadClass:{type:String,default:"bg-gray-50"},tbodyClass:{type:String,default:""},noResultsMessage:{type:String,default:"No Results Found"},loading:{type:Boolean,default:!1},loadingType:{type:String,default:"placeholder",validator:function(a){return["placeholder","spinner"].indexOf(a)!==-1}},placeholderCount:{type:Number,default:3}},setup(a,{expose:t}){const e=a;let n=N([]),b=F(!1),l=N(e.columns.map(r=>new ae(r))),g=N({fieldName:"",order:""}),d=F("");const p=L(()=>Array.isArray(e.data)),x=L(()=>{if(!p.value||g.fieldName===""||l.length===0)return n.value;const r=I(g.fieldName);return r?[...n.value].sort(r.getSortPredicate(g.order,l)):n.value});function I(r){return l.find(o=>o.key===r)}function z(r){let o="whitespace-nowrap px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider";return r.defaultThClass&&(o=r.defaultThClass),r.sortable?o=`${o} cursor-pointer`:o=`${o} pointer-events-none`,r.thClass&&(o=`${o} ${r.thClass}`),o}function B(r){let o="px-6 py-4 text-sm text-gray-500 whitespace-nowrap";return r.defaultTdClass&&(o=r.defaultTdClass),r.tdClass&&(o=`${o} ${r.tdClass}`),o}function D(r){let o="w-full";return r.placeholderClass&&(o=`${o} ${r.placeholderClass}`),o}function E(){return d.value=null,e.data}async function M(){const r=d.value&&d.value.currentPage||1;b.value=!0;const o=await e.data({sort:g,page:r});return b.value=!1,d.value=o.pagination,o.data}function R(r){g.fieldName!==r.key?(g.fieldName=r.key,g.order="asc"):g.order=g.order==="asc"?"desc":"asc",p.value||w()}async function w(){const r=p.value?E():await M();n.value=r.map(o=>new te(o,l))}async function Y(r){d.value.currentPage=r,await w()}async function H(){await w()}function j(r,o){return $.exports.get(r,o)}return p.value&&J(()=>e.data,()=>{w()}),Q(async()=>{await w()}),t({refresh:H}),(r,o)=>{const q=T("base-content-placeholders-text"),W=T("base-content-placeholders"),G=T("BaseIcon");return i(),s("div",we,[u("div",Se,[u("div",Te,[u("div",Ne,[A(r.$slots,"header"),u("table",{class:c(a.tableClass)},[u("thead",{class:c(a.theadClass)},[u("tr",null,[(i(!0),s(k,null,C(y(l),f=>(i(),s("th",{key:f.key,class:c([z(f),{"text-bold text-black":y(g).fieldName===f.key}]),onClick:v=>R(f)},[_(h(f.label)+" ",1),y(g).fieldName===f.key&&y(g).order==="asc"?(i(),s("span",Fe," \u2191 ")):m("",!0),y(g).fieldName===f.key&&y(g).order==="desc"?(i(),s("span",Le," \u2193 ")):m("",!0)],10,Be))),128))])],2),a.loadingType==="placeholder"&&(a.loading||y(b))?(i(),s("tbody",Ae,[(i(!0),s(k,null,C(a.placeholderCount,f=>(i(),s("tr",{key:f,class:c(f%2===0?"bg-white":"bg-gray-50")},[(i(!0),s(k,null,C(a.columns,v=>(i(),s("td",{key:v.key,class:c(["",B(v)])},[P(W,{class:c(D(v)),rounded:!0},{default:U(()=>[P(q,{class:"w-full h-6",lines:1})]),_:2},1032,["class"])],2))),128))],2))),128))])):(i(),s("tbody",Ve,[(i(!0),s(k,null,C(y(x),(f,v)=>(i(),s("tr",{key:v,class:c(v%2===0?"bg-white":"bg-gray-50")},[(i(!0),s(k,null,C(a.columns,S=>(i(),s("td",{key:S.key,class:c(["",B(S)])},[A(r.$slots,"cell-"+S.key,{row:f},()=>[_(h(j(f.data,S.key)),1)])],2))),128))],2))),128))]))],2),a.loadingType==="spinner"&&(a.loading||y(b))?(i(),s("div",Ie,[P(X,{class:"w-10 h-10 text-primary-500"})])):!a.loading&&!y(b)&&y(x)&&y(x).length===0?(i(),s("div",ze,[P(G,{name:"ExclamationCircleIcon",class:"w-6 h-6 text-gray-400"}),u("span",De,h(a.noResultsMessage),1)])):m("",!0),y(d)?(i(),Z(_e,{key:2,pagination:y(d),onPageChange:Y},null,8,["pagination"])):m("",!0)])])])])}}};export{Me as default};
