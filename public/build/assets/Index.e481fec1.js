import{a9 as W,u as G,m as O,M as ue,p as de,N as K,a4 as Q,r as s,o as c,k as m,i as a,g as l,a as t,Q as k,z as v,t as f,h as C,H as ce,d as U,K as me,e as z,ae as pe,af as _e,b as g,aa as j,ab as H,n as $,a5 as fe,y as be}from"./main.2cb7c090.js";import{u as X}from"./plain.df9c44e6.js";import{_ as ge}from"./SatelliteIcon.cd7ab5d0.js";const ye={props:{row:{type:Object,default:null},table:{type:Object,default:null},loadData:{type:Function,default:null}},setup(D){const r=D,w=W();G();const{t:b}=O(),u=X(),y=ue();de();const h=K();Q("utils");function n(d){w.openDialog({title:b("general.are_you_sure"),message:b("plains.confirm_delete"),yesLabel:b("general.ok"),noLabel:b("general.cancel"),variant:"danger",hideNoButton:!1,size:"lg"}).then(B=>{B&&u.deletePlain({ids:[d]}).then(p=>(p.data.success&&r.loadData&&r.loadData(),!0))})}return(d,B)=>{const p=s("BaseIcon"),V=s("BaseButton"),I=s("BaseDropdownItem"),x=s("router-link"),A=s("BaseDropdown");return c(),m(A,null,{activator:a(()=>[l(y).name==="plains.view"?(c(),m(V,{key:0,variant:"primary"},{default:a(()=>[t(p,{name:"DotsHorizontalIcon",class:"h-5 text-white"})]),_:1})):(c(),m(p,{key:1,name:"DotsHorizontalIcon",class:"h-5 text-gray-500"}))]),default:a(()=>[l(h).hasAbilities(l(k).EDIT_PLAIN)?(c(),m(x,{key:0,to:`/admin/plains/${D.row.id}/edit`},{default:a(()=>[t(I,null,{default:a(()=>[t(p,{name:"PencilIcon",class:"w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500"}),v(" "+f(d.$t("general.edit")),1)]),_:1})]),_:1},8,["to"])):C("",!0),l(h).hasAbilities(l(k).DELETE_PLAIN)?(c(),m(I,{key:1,onClick:B[0]||(B[0]=S=>n(D.row.id))},{default:a(()=>[t(p,{name:"TrashIcon",class:"w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500"}),v(" "+f(d.$t("general.delete")),1)]),_:1})):C("",!0)]),_:1})}}},Be={class:"flex items-center justify-end space-x-5"},ve={class:"relative table-container"},he={class:"relative flex items-center justify-end h-5 border-gray-200 border-solid"},ke={class:"flex text-sm font-medium cursor-pointer select-none text-primary-400"},Ie={class:"absolute items-center left-6 top-2.5 select-none"},Pe={class:"relative block"},we={setup(D){Q("utils");const r=X();ce(),G();const w=W(),b=K(),{t:u}=O();let y=U(!1),h=U(!0);const n=me({due_date:"",vin:"",make:"",model:"",employee_id:"",customer_id:""}),d=U(null),B=z(()=>!r.totalPlains&&!h.value),p=z({get:()=>r.selectedPlains,set:o=>r.selectPlains(o)}),V=z(()=>[{key:"status",thClass:"extra w-10",tdClass:"font-medium text-gray-900",placeholderClass:"w-10",sortable:!1},{key:"customer_id",label:u("plains.customer")},{key:"vin",label:u("plains.vin")},{key:"make",label:u("plains.make")},{key:"model",label:u("plains.model")},{key:"due_date",label:u("plains.due_date")},{key:"created_at",label:u("plains.added_on")},{key:"actions",thClass:"text-right",tdClass:"text-right text-sm font-medium",sortable:!1}]);pe(n,()=>{q()},{debounce:500}),_e(()=>{r.selectAllField&&r.selectAllPlains()});function I(){n.due_date="",n.vin="",n.make="",n.model="",n.employee_id="",n.customer_id=""}function x(){return b.hasAbilities([k.DELETE_PLAIN,k.EDIT_PLAIN])}function A(){y.value&&I(),y.value=!y.value}function S(){d.value&&d.value.refresh()}function q(){S()}async function J({page:o,filter:i,sort:E}){let N={due_date:n.due_date,vin:n.vin,make:n.make,model:n.model,employee_id:n.employee_id,customer_id:n.customer_id};h.value=!0;let _=await r.fetchPlains(N);return h.value=!1,{data:_.data.data,pagination:{totalPages:_.data.meta.last_page,currentPage:o,totalCount:_.data.meta.total,limit:10}}}function Y(){w.openDialog({title:u("general.are_you_sure"),message:u("plains.confirm_delete",2),yesLabel:u("general.ok"),noLabel:u("general.cancel"),variant:"danger",hideNoButton:!1,size:"lg"}).then(o=>{o&&r.deleteMultiplePlains().then(i=>{i.data.success&&d.value&&d.value.refresh()})})}return(o,i)=>{const E=s("BaseBreadcrumbItem"),N=s("BaseBreadcrumb"),_=s("BaseIcon"),T=s("BaseButton"),Z=s("BasePageHeader"),ee=s("BaseCustomerSelectInput"),P=s("BaseInputGroup"),te=s("BaseDatePicker"),F=s("BaseInput"),ae=s("BaseFilterWrapper"),le=s("BaseEmptyPlaceholder"),ne=s("BaseDropdownItem"),oe=s("BaseDropdown"),R=s("BaseCheckbox"),M=s("BaseText"),se=s("router-link"),ie=s("BaseTable"),re=s("BasePage");return c(),m(re,null,{default:a(()=>[t(Z,{title:o.$t("plains.title")},{actions:a(()=>[g("div",Be,[j(t(T,{variant:"primary-outline",onClick:A},{right:a(e=>[l(y)?(c(),m(_,{key:1,name:"XIcon",class:$(e.class)},null,8,["class"])):(c(),m(_,{key:0,class:$(e.class),name:"FilterIcon"},null,8,["class"]))]),default:a(()=>[v(f(o.$t("general.filter"))+" ",1)]),_:1},512),[[H,l(r).totalPlains]]),l(b).hasAbilities(l(k).CREATE_PLAIN)?(c(),m(T,{key:0,onClick:i[0]||(i[0]=e=>o.$router.push("/admin/plains/create"))},{left:a(e=>[t(_,{name:"PlusIcon",class:$(e.class)},null,8,["class"])]),default:a(()=>[v(" "+f(o.$t("plains.add_plain")),1)]),_:1})):C("",!0)])]),default:a(()=>[t(N,null,{default:a(()=>[t(E,{title:o.$t("general.home"),to:"dashboard"},null,8,["title"]),t(E,{title:o.$tc("plains.plain",2),to:"#",active:""},null,8,["title"])]),_:1})]),_:1},8,["title"]),t(ae,{show:l(y),"row-on-xl":!0,onClear:I},{default:a(()=>[t(P,{label:o.$tc("customers.customer",1)},{default:a(()=>[t(ee,{modelValue:l(n).customer_id,"onUpdate:modelValue":i[1]||(i[1]=e=>l(n).customer_id=e),placeholder:o.$t("customers.type_or_click"),"value-prop":"id",label:"name"},null,8,["modelValue","placeholder"])]),_:1},8,["label"]),t(P,{label:o.$t("plains.due_date")},{default:a(()=>[t(te,{modelValue:l(n).due_date,"onUpdate:modelValue":i[2]||(i[2]=e=>l(n).due_date=e),"calendar-button":!0,"calendar-button-icon":"calendar"},null,8,["modelValue"])]),_:1},8,["label"]),t(P,{label:o.$tc("plains.vin")},{default:a(()=>[t(F,{modelValue:l(n).vin,"onUpdate:modelValue":i[3]||(i[3]=e=>l(n).vin=e),type:"text",name:"name",autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label"]),t(P,{label:o.$tc("plains.make")},{default:a(()=>[t(F,{modelValue:l(n).make,"onUpdate:modelValue":i[4]||(i[4]=e=>l(n).make=e),type:"text",name:"name",autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label"]),t(P,{label:o.$tc("plains.model")},{default:a(()=>[t(F,{modelValue:l(n).model,"onUpdate:modelValue":i[5]||(i[5]=e=>l(n).model=e),type:"text",name:"name",autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label"])]),_:1},8,["show"]),j(t(le,{title:o.$t("plains.no_plains"),description:o.$t("plains.list_of_plains")},{actions:a(()=>[l(b).hasAbilities(l(k).CREATE_PLAIN)?(c(),m(T,{key:0,variant:"primary-outline",onClick:i[6]||(i[6]=e=>o.$router.push("/admin/plains/create"))},{left:a(e=>[t(_,{name:"PlusIcon",class:$(e.class)},null,8,["class"])]),default:a(()=>[v(" "+f(o.$t("plains.add_new_plain")),1)]),_:1})):C("",!0)]),default:a(()=>[t(ge,{class:"mt-5 mb-4"})]),_:1},8,["title","description"]),[[H,l(B)]]),j(g("div",ve,[g("div",he,[l(r).selectedPlains.length?(c(),m(oe,{key:0},{activator:a(()=>[g("span",ke,[v(f(o.$t("general.actions"))+" ",1),t(_,{name:"ChevronDownIcon"})])]),default:a(()=>[t(ne,{onClick:Y},{default:a(()=>[t(_,{name:"TrashIcon",class:"mr-3 text-gray-600"}),v(" "+f(o.$t("general.delete")),1)]),_:1})]),_:1})):C("",!0)]),t(ie,{ref:(e,L)=>{L.table=e,d.value=e},data:J,columns:l(V),"placeholder-count":l(r).totalPlains>=20?10:5,class:"mt-3"},fe({header:a(()=>[g("div",Ie,[t(R,{modelValue:l(r).selectAllField,"onUpdate:modelValue":i[7]||(i[7]=e=>l(r).selectAllField=e),variant:"primary",onChange:l(r).selectAllPlains},null,8,["modelValue","onChange"])])]),"cell-status":a(({row:e})=>[g("div",Pe,[t(R,{id:e.id,modelValue:l(p),"onUpdate:modelValue":i[8]||(i[8]=L=>be(p)?p.value=L:null),value:e.data.id},null,8,["id","modelValue","value"])])]),"cell-customer_id":a(({row:e})=>[t(se,{to:{path:`plains/${e.data.id}/edit`}},{default:a(()=>[t(M,{text:e.data.customer.name,length:30,tag:"span",class:"font-medium text-primary-500 flex flex-col"},null,8,["text"]),t(M,{text:e.data.customer.contact_name?e.data.customer.contact_name:"",length:30,tag:"span",class:"text-xs text-gray-400"},null,8,["text"])]),_:2},1032,["to"])]),"cell-due_date":a(({row:e})=>[g("span",null,f(e.data.formatted_due_date),1)]),"cell-created_at":a(({row:e})=>[g("span",null,f(e.data.formatted_created_at),1)]),_:2},[x()?{name:"cell-actions",fn:a(({row:e})=>[t(ye,{row:e.data,table:d.value,"load-data":S},null,8,["row","table"])])}:void 0]),1032,["columns","placeholder-count"])],512),[[H,!l(B)]])]),_:1})}}};export{we as default};