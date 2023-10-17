import{u as N,l as M,m as E,p as A,d as w,q as p,s as $,v as G,x as L,e as y,r as l,o as c,c as R,a as n,i as u,g as e,k as _,y as b,b as B,z as h,t as I,w as T,A as U}from"./main.2cb7c090.js";const z=["onSubmit"],F={class:"mt-5 mb-8"},O={class:"mb-4"},H={setup(P){const k=N(),s=M(),{t:m}=E(),V=A(),d=w(!1);let o=w(!1);const x={email:{required:p.withMessage(m("validation.required"),$),email:p.withMessage(m("validation.email_incorrect"),G)},password:{required:p.withMessage(m("validation.required"),$)}},a=L(x,y(()=>s.loginData)),S=y(()=>o.value?"text":"password");async function q(){if(U.defaults.withCredentials=!0,a.value.$touch(),a.value.$invalid)return!0;d.value=!0;try{d.value=!0,await s.login(s.loginData),V.push("/admin/dashboard"),k.showNotification({type:"success",message:"Logged in successfully."})}catch{d.value=!1}}return(i,t)=>{const g=l("BaseInput"),f=l("BaseInputGroup"),v=l("BaseIcon"),D=l("router-link"),C=l("BaseButton");return c(),R("form",{id:"loginForm",class:"mt-12 text-left",onSubmit:T(q,["prevent"])},[n(f,{error:e(a).email.$error&&e(a).email.$errors[0].$message,label:i.$t("login.email"),class:"mb-4",required:""},{default:u(()=>[n(g,{modelValue:e(s).loginData.email,"onUpdate:modelValue":t[0]||(t[0]=r=>e(s).loginData.email=r),invalid:e(a).email.$error,focus:"",type:"email",name:"email",onInput:t[1]||(t[1]=r=>e(a).email.$touch())},null,8,["modelValue","invalid"])]),_:1},8,["error","label"]),n(f,{error:e(a).password.$error&&e(a).password.$errors[0].$message,label:i.$t("login.password"),class:"mb-4",required:""},{default:u(()=>[n(g,{modelValue:e(s).loginData.password,"onUpdate:modelValue":t[4]||(t[4]=r=>e(s).loginData.password=r),invalid:e(a).password.$error,type:e(S),name:"password",onInput:t[5]||(t[5]=r=>e(a).password.$touch())},{right:u(()=>[e(o)?(c(),_(v,{key:0,name:"EyeOffIcon",class:"w-5 h-5 mr-1 text-gray-500 cursor-pointer",onClick:t[2]||(t[2]=r=>b(o)?o.value=!e(o):o=!e(o))})):(c(),_(v,{key:1,name:"EyeIcon",class:"w-5 h-5 mr-1 text-gray-500 cursor-pointer",onClick:t[3]||(t[3]=r=>b(o)?o.value=!e(o):o=!e(o))}))]),_:1},8,["modelValue","invalid","type"])]),_:1},8,["error","label"]),B("div",F,[B("div",O,[n(D,{to:"forgot-password",class:"text-sm text-primary-400 hover:text-gray-700"},{default:u(()=>[h(I(i.$t("login.forgot_password")),1)]),_:1})])]),n(C,{loading:d.value,type:"submit"},{default:u(()=>[h(I(i.$t("login.login")),1)]),_:1},8,["loading"])],40,z)}}};export{H as default};