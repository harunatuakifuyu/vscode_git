import{j as a}from"./jsx-runtime-BlSqMCxk.js";/* empty css              */import{u as e,a as i}from"./components-DD0otnDp.js";function m(){const{records:r}=e(),o=i();function n(t){console.log("value.star3",typeof t.star3);const s=new FormData;s.append("star1",t.star1),s.append("star2",t.star2),s.append("star3",t.star3),s.append("id",t.id),console.log("formData",typeof s.get("star3")),o.submit(s,{action:".",method:"post"})}return a.jsxs("div",{className:"pl-40",children:[a.jsx("h1",{children:"技術書"}),a.jsx("ul",{className:"grid grid-cols-5 gap-4",children:r.map((t,s)=>a.jsxs("div",{children:[a.jsx("img",{className:"bookimg",src:t.picurl,alt:"book cover"}),a.jsx("button",{name:`${s}star1`,children:t.star1?"★":"☆"}),a.jsx("button",{name:`${s}star2`,children:t.star2?"★":"☆"}),a.jsx("button",{name:`${s}star3`,children:t.star3?"★":"☆"}),a.jsx("button",{type:"button",onClick:()=>{n(t)},children:"+"})]}))})]})}export{m as default};
