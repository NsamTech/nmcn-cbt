const FB={apiKey:"AIzaSyBPJUYDeCqBjrOLKToqacNEyy0-IMzBkBA",authDomain:"n-sam-nmcn-cbt-quest.firebaseapp.com",projectId:"n-sam-nmcn-cbt-quest",storageBucket:"n-sam-nmcn-cbt-quest.firebasestorage.app",messagingSenderId:"903051215543",appId:"1:903051215543:web:8497b2bb0ded6da6710332"};
const WA="2347081064223",TOTAL=250,SECS=10800,L=["A","B","C","D"];
const PAPERS=[{k:"paper1",n:"Paper I",h:"47f52ca3a53d0967c01fb92e717540d1ccf152583ce63b7345156fe519607876"},{k:"paper2",n:"Paper II",h:"705b37245c47bf852ad7c0b06a0a5e0e0e7518b769e757d725ad0b6c6653c0e2"},{k:"paper3",n:"Paper III",h:"d7fac0d22a1bfcc016b49431b2fe85707ae057af8956a044e88a484c2db36ba3"}];
const BANK=window.BANK||{};
const $=id=>document.getElementById(id),esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const key=u=>u.trim().toUpperCase().replace(/\//g,"_");
const sha=async s=>[...new Uint8Array(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(s)))].map(x=>x.toString(16).padStart(2,"0")).join("");
const hp=(u,p)=>sha(key(u)+"|"+p.trim().toUpperCase());
const rng=s=>{let a=s>>>0;return()=>{a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}};
const seedOf=s=>{let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0};
const shuffle=(x,r=Math.random)=>{const a=[...x];for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const waLink=u=>"https://wa.me/"+WA+"?text="+encodeURIComponent("Hello Admin N Sam, please activate my CBT account. Username: "+u);
const fmt=t=>t&&t.toDate?t.toDate().toLocaleString():"-";
let db,auth,me=null,S=null,tmr=null,A={},paper=null,ST={},REV=null,RS=[];
/* ---------- device protection ---------- */
const DEV=(()=>{let d="";try{d=localStorage.cbt_d||""}catch(e){}
 if(!d){const m=document.cookie.match(/(?:^|; )cbt_d=([^;]+)/);d=m?m[1]:""}
 if(!d)d=crypto.randomUUID?crypto.randomUUID():[...crypto.getRandomValues(new Uint8Array(16))].map(x=>x.toString(16).padStart(2,"0")).join("");
 try{localStorage.cbt_d=d}catch(e){}
 document.cookie="cbt_d="+d+";max-age=157680000;path=/;SameSite=Lax";return d})();
const devInfo=()=>{const u=navigator.userAgent,
 br=/Edg\//.test(u)?"Edge":/OPR\//.test(u)?"Opera":/SamsungBrowser/.test(u)?"Samsung Internet":/Firefox\//.test(u)?"Firefox":/Chrome\//.test(u)?"Chrome":/Safari\//.test(u)?"Safari":"Unknown browser",
 os=/Android/.test(u)?"Android":/iPhone|iPad|iPod/.test(u)?"iOS":/Windows/.test(u)?"Windows":/Mac OS X/.test(u)?"macOS":/Linux/.test(u)?"Linux":"Unknown OS";
 return{br,os,scr:screen.width+"x"+screen.height,ua:u.slice(0,200)}};
/* true = this device is the registered one (first approved login registers it) */
async function devOk(k){
 const r=db.collection("devices").doc(k),d=await r.get();
 if(!d.exists){await r.set({id:DEV,...devInfo(),t:Date.now()});return true}
 return d.data().id===DEV;
}
async function devAlert(k,u,n){
 try{const last=+localStorage["cbt_al_"+k]||0;if(Date.now()-last<6e5)return;localStorage["cbt_al_"+k]=Date.now();
  await db.collection("alerts").add({k,u,n,dev:DEV,...devInfo(),t:Date.now(),st:"open"})}catch(e){}
}
function blocked(u){
 showErr("This account is registered to a different device. Login from this device is not allowed. Please contact the administrator.");
 const w=$("wa");w.classList.remove("hide");
 w.innerHTML='<p style="font-size:12px;font-weight:700;margin-bottom:10px">Contact Platform Support – Nsam Technologies on WhatsApp - +2347081064223</p><a class="btn" href="https://wa.me/'+WA+'?text='+encodeURIComponent("Hello Admin N Sam, I need to change my registered device for my CBT account. Username: "+u)+'" target="_blank" rel="noopener">Chat with Admin on WhatsApp</a>';
}
/* background particles */
(function(){const c=$("cv"),x=c.getContext("2d");let w,h,P=[];
 function rs(){w=c.width=c.offsetWidth;h=c.height=c.offsetHeight;P=Array.from({length:Math.round(w*h/9000)},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3}))}
 function f(){x.clearRect(0,0,w,h);for(const p of P){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1;x.fillStyle="rgba(74,222,128,.7)";x.beginPath();x.arc(p.x,p.y,1.4,0,6.3);x.fill()}
  for(let i=0;i<P.length;i++)for(let j=i+1;j<P.length;j++){const dx=P[i].x-P[j].x,dy=P[i].y-P[j].y,d=dx*dx+dy*dy;if(d<9000){x.strokeStyle="rgba(74,222,128,"+(.16*(1-d/9000))+")";x.beginPath();x.moveTo(P[i].x,P[i].y);x.lineTo(P[j].x,P[j].y);x.stroke()}}
  requestAnimationFrame(f)}
 addEventListener("resize",rs);rs();f()})();

/* typed tagline */
(function(){const L=["Log in early so exam day is calm.","Username, password, then the PIN for the day.","Know your exam day. Know your PIN.","Practise here, relax in the exam hall."];let i=0,j=0,del=false;const el=$("typed");
 (function t(){const s=L[i];el.textContent=s.slice(0,j);if(!del&&j<s.length){j++;setTimeout(t,45)}else if(!del){del=true;setTimeout(t,1600)}else if(j>0){j--;setTimeout(t,22)}else{del=false;i=(i+1)%L.length;setTimeout(t,300)}})()})();


const show=v=>["login","app","room","rev","admin"].forEach(s=>$(s).classList.toggle("hide",s!==v));
const view=v=>{$("vRes").classList.toggle("hide",v!=="res");$("vDash").classList.toggle("hide",v!=="dash");$("vList").classList.toggle("hide",v!=="list");$("nDash").classList.toggle("on",v==="dash");$("nExam").classList.toggle("on",v==="list");if(v==="dash")paintDash()};
const msg=h=>{$("ov2b").innerHTML=h;$("ov2").classList.remove("hide");$("ov2c").onclick=()=>$("ov2").classList.add("hide")};
const clearSession=()=>{localStorage.removeItem("cbt_u");localStorage.removeItem("cbt_s");me=null;S=null};
function init(){
 firebase.initializeApp(FB);db=firebase.firestore();auth=firebase.auth();
 auth.onAuthStateChanged(u=>{if(location.hash==="#admin")u?dash():adminLogin()});
 addEventListener("hashchange",route);route();
}
function route(){
 clearInterval(tmr);
 if(location.hash==="#admin"){show("admin");return auth.currentUser?dash():adminLogin()}
 const u=localStorage.cbt_u;if(!u)return show("login");
 me=JSON.parse(u);const s=localStorage.cbt_s;
 if(s){S=JSON.parse(s);if(!S.m){localStorage.removeItem("cbt_s");S=null;return enter()}return room()}
 enter();
}
/* ---------- login ---------- */
$("eye").onclick=()=>{const p=$("p");p.type=p.type==="password"?"text":"password"};
["u","p"].forEach(id=>$(id).addEventListener("keydown",e=>{if(e.key==="Enter")doLogin()}));
$("signin").onclick=doLogin;
function showErr(m){const e=$("lerr");e.textContent=m;e.classList.remove("hide")}
function inactive(u,n){
 showErr("Your account is awaiting activation. Please contact the administrator.");
 const w=$("wa");w.classList.remove("hide");
 w.innerHTML='<p style="font-size:12px;font-weight:700;margin-bottom:10px">Contact Platform Support – Nsam Technologies on WhatsApp - +2347081064223</p><a class="btn" href="'+waLink(u)+'" target="_blank" rel="noopener">Chat with Admin on WhatsApp</a>';
}
async function doLogin(){
 const btn=$("signin");$("lerr").classList.add("hide");$("wa").classList.add("hide");
 const u=$("u").value.trim(),pw=$("p").value;
 if(!u||!pw)return showErr("Please enter your username and password.");
 btn.disabled=true;btn.textContent="Signing in…";
 try{
  const d=await db.collection("students").doc(key(u)).get(),s=d.data();
  if(!d.exists||s.h!==await hp(u,pw))showErr("Invalid username or password.");
  else if(!s.active)inactive(s.username,s.name);
  else if(!await devOk(key(u))){await devAlert(key(u),s.username,s.name);blocked(s.username)}
  else{me={k:key(u),u:s.username,n:s.name};localStorage.cbt_u=JSON.stringify(me);
   db.collection("logins").add({k:me.k,u:me.u,n:me.n,at:firebase.firestore.FieldValue.serverTimestamp()});enter()}
 }catch(e){showErr("Network problem. Check your internet and try again.")}
 btn.disabled=false;btn.innerHTML="➜&nbsp; SIGN IN";
}
/* ---------- dashboard / papers ---------- */
const SITE_URL="https://YOUR-LANDING-PAGE-ADDRESS/";
function paintRef(){const el=$("refBox");if(!el||!me)return;const code=String(me.u).trim().toUpperCase();const link=SITE_URL+"?ref="+encodeURIComponent(code);
 el.innerHTML='<h3>Refer friends and earn '+naira(10000)+'</h3><p>Bring 10 friends who pay and earn '+naira(10000)+' cash. Ask them to type your code <b>'+esc(code)+'</b> when they pay, or send them this link:</p><p style="word-break:break-all"><a href="'+esc(link)+'" target="_blank" rel="noopener">'+esc(link)+'</a></p><a class="btn" target="_blank" rel="noopener" href="https://wa.me/?text='+encodeURIComponent("Practise NMCN midwifery exams on NsamTech. Use my referral code "+code+" when you pay: "+link)+'">Share on WhatsApp</a>'}
function enter(){
 show("app");view("list");$("wId").textContent=me.u;$("pId").textContent=me.u;$("pN").textContent=me.n;$("pU").textContent=me.u;paintRef();
 const cards=()=>$("exlist").innerHTML=PAPERS.map(p=>'<button class="exc" data-k="'+p.k+'"><span class="l">🔓</span><span><b>'+p.n+'</b><em>Duration: '+dl(p.k)+'</em><em>No of Question: '+TOTAL+'</em></span></button>').join("");
 cards();$("exlist").onclick=e=>{const b=e.target.closest(".exc");if(b)openPin(b.dataset.k)};
 loadSet().then(()=>{cards();paintAnn()});retryPending();paintDash();
 devOk(me.k).then(ok=>{if(!ok){const w=me;clearSession();show("login");devAlert(w.k,w.u,w.n);blocked(w.u)}}).catch(()=>{});
}
$("nDash").onclick=()=>view("dash");$("nExam").onclick=()=>view("list");$("goObj").onclick=()=>view("list");
$("logout").onclick=()=>{clearSession();$("u").value="";$("p").value="";show("login")};
document.querySelectorAll("[data-na]").forEach(b=>b.onclick=()=>msg("<div class='ok'>ℹ️</div><p style='margin-top:8px;font-size:13px'>This section is not available yet. Use <b>Objective Questions</b> to take your paper.</p>"));
function openPin(k){paper=PAPERS.find(p=>p.k===k);$("mc").textContent=paper.n;$("pin").value="";$("merr").textContent="";$("ov").classList.remove("hide");$("pin").focus()}
$("mx").onclick=()=>$("ov").classList.add("hide");
$("pin").addEventListener("keydown",e=>{if(e.key==="Enter")goPin()});
$("mgo").onclick=goPin;
const dl=k=>{const m=(ST.dur||{})[k]||SECS/60;return m%60?m+" mins":m/60+(m===60?" hour":" hours")};
const toast=t=>{const e=$("toast");e.textContent=t;e.classList.remove("hide");setTimeout(()=>e.classList.add("hide"),5000)};
async function loadSet(){try{const d=await db.collection("settings").doc("main").get();ST=d.exists?d.data():{}}catch(e){}return ST}
const paintAnn=()=>{$("ann").textContent="📢 "+(ST.banner||"");$("ann").classList.toggle("hide",!ST.banner)};
async function goPin(){
 const m=$("merr"),k=paper.k;
 if(!$("pin").value.trim())return m.textContent="Please enter the PIN.";
 $("mgo").disabled=true;
 try{
  const [st,,qd]=await Promise.all([db.collection("students").doc(me.k).get(),loadSet(),db.collection("questions").doc(k).get()]);
  const o=(ST.sch||{})[k]||{},now=Date.now();
  if(await sha(k+"|"+$("pin").value.trim())!==((ST.pinh||{})[k]||paper.h))m.textContent="Wrong PIN for "+paper.n+". Check and try again.";
  else if(Date.now()>(ST.end||ENDDEF))m.textContent="Access ended on "+new Date(ST.end||ENDDEF).toLocaleDateString()+". Contact Admin N Sam on WhatsApp to renew.";
  else if(!st.exists||!st.data().active){$("ov").classList.add("hide");const w=me;clearSession();show("login");inactive(w.u,w.n)}
  else if(!await devOk(me.k)){const w=me;$("ov").classList.add("hide");clearSession();show("login");await devAlert(w.k,w.u,w.n);blocked(w.u)}
  else if(o.on===false||(o.from&&now<o.from)||(o.to&&now>o.to))m.textContent=paper.n+" is not open right now."+(o.from&&now<o.from?" It opens "+new Date(o.from).toLocaleString()+".":"");
  else{
   const bank=(BANK[k]||[]).concat(qd.exists?qd.data().items:[]);
   if(!bank.length)return m.textContent="Questions for "+paper.n+" are not available yet.";
   const c=await db.collection("config").doc(k).get(),cd=c.exists?c.data():null;
   let ids=cd?cd.ids.filter(i=>bank.some(q=>q.id===i)):[];if(!ids.length)ids=bank.map(q=>q.id);
   ids=shuffle(ids.slice(0,TOTAL),rng(seedOf(me.k+k+(cd?cd.v:0))));
   const mm={};ids.forEach(i=>mm[i]=bank.find(q=>q.id===i));
   S={k,ids,a:{},f:{},i:0,t:Date.now(),d:((ST.dur||{})[k]||SECS/60)*60,m:mm};save();$("ov").classList.add("hide");room();
  }
 }catch(e){m.textContent="Network problem. Try again."}finally{$("mgo").disabled=false}
}

/* ---------- exam room ---------- */
const save=()=>localStorage.cbt_s=JSON.stringify(S);
const qOf=id=>S.m[id];
const left=()=>Math.max(0,S.d-Math.floor((Date.now()-S.t)/1000));
function tick(){
 const l=left(),el=$("tm");
 el.textContent=[Math.floor(l/3600),Math.floor(l%3600/60),l%60].map(x=>String(x).padStart(2,"0")).join(":");
 el.classList.toggle("low",l<600);
 if(l>0&&l<=600&&!S.w1){S.w1=1;save();toast(Math.ceil(l/60)+" minutes left")}
 if(l>0&&l<=300&&!S.w2){S.w2=1;save();toast(Math.ceil(l/60)+" minute(s) left. Submit soon.")}
 if(l<=0){clearInterval(tmr);finish(true)}
}
function room(){S.f=S.f||{};show("room");$("rName").textContent=me.n;clearInterval(tmr);draw();tick();tmr=setInterval(tick,1000)}
function go(i){if(i<0||i>=S.ids.length)return;S.i=i;save();draw();scrollTo(0,0)}
function pick(l){const id=S.ids[S.i];if(L.indexOf(l)>=qOf(id).o.length)return;S.a[id]=l;save();draw()}
function draw(){
 const n=S.ids.length,id=S.ids[S.i],q=qOf(id),done=Object.keys(S.a).length;
 $("cA").textContent=done;$("cR").textContent=n-done;$("cT").textContent=n;
 $("qn").textContent="Question "+(S.i+1)+" of "+n;$("flag").textContent=S.f[id]?"⚑ Flagged":"⚑ Flag";$("qt").textContent=q.q;
 $("opts").innerHTML=q.o.map((o,j)=>'<button class="opt '+(S.a[id]===L[j]?"sel":"")+'" data-l="'+L[j]+'"><b>'+L[j]+'.</b> '+esc(o)+'</button>').join("");
 document.querySelectorAll(".opt").forEach(b=>b.onclick=()=>pick(b.dataset.l));
 $("dots").innerHTML=S.ids.map((x,j)=>'<button class="dot '+(S.a[x]?"ans":"")+' '+(j===S.i?"cur":"")+(S.f[x]?" flg":"")+'" data-j="'+j+'">'+(j+1)+'</button>').join("");
 document.querySelectorAll(".dot").forEach(b=>b.onclick=()=>go(+b.dataset.j));
}
$("pv").onclick=()=>go(S.i-1);$("nx").onclick=()=>go(S.i+1);
document.addEventListener("keydown",e=>{if($("room").classList.contains("hide")||!S||!$("ov3").classList.contains("hide"))return;const k=e.key.toUpperCase();if(k.length===1&&"ABCD".includes(k))pick(k);else if(k==="N")go(S.i+1);else if(k==="P")go(S.i-1)});
$("flag").onclick=()=>{const id=S.ids[S.i];if(S.f[id])delete S.f[id];else S.f[id]=1;save();draw()};
$("submit").onclick=()=>{const n=S.ids.length,u=n-Object.keys(S.a).length,ix=f=>S.ids.map((x,j)=>f(x)?'<button class="chip" data-j="'+j+'">'+(j+1)+'</button>':"").join("")||"<i>none</i>";
 $("ov3b").innerHTML='<h3>Review before submitting</h3><p>Answered <b>'+(n-u)+'</b> of '+n+'</p><p><b>Unanswered</b> (tap a number to go there)</p><div class="chips">'+ix(x=>!S.a[x])+'</div><p><b>Flagged for review</b></p><div class="chips">'+ix(x=>S.f[x])+'</div>';
 $("ov3").classList.remove("hide");document.querySelectorAll(".chip").forEach(b=>b.onclick=()=>{$("ov3").classList.add("hide");go(+b.dataset.j)})};
$("ov3k").onclick=()=>$("ov3").classList.add("hide");$("ov3s").onclick=()=>{$("ov3").classList.add("hide");finish(false)};
const pend=r=>{const p=JSON.parse(localStorage.cbt_p||"[]");p.push(r);localStorage.cbt_p=JSON.stringify(p)};
async function saveRes(r){
 const h=db.collection("history").doc(r.k),d=await h.get(),it=d.exists?d.data().items:[];
 if(!it.some(x=>x.t===r.t)){it.push({paper:r.paper,score:r.score,total:r.total,auto:r.auto,t:r.t});await h.set({items:it})}
 try{await db.collection("results").doc(r.k+"_"+r.t).set({...r,at:firebase.firestore.FieldValue.serverTimestamp()})}catch(e){if(e.code!=="permission-denied")throw e}
}
async function retryPending(){const p=JSON.parse(localStorage.cbt_p||"[]"),rest=[];for(const r of p){try{await saveRes(r)}catch(e){rest.push(r)}}
 if(rest.length)localStorage.cbt_p=JSON.stringify(rest);else localStorage.removeItem("cbt_p");return !rest.length}
/* readiness score: average of the latest attempt in each paper */
async function getHist(){try{const d=await db.collection("history").doc(me.k).get();return d.exists?(d.data().items||[]):[]}catch(e){return []}}
function readiness(items){const L={};for(const x of items){if(!x.total)continue;if(!L[x.paper]||x.t>L[x.paper].t)L[x.paper]=x}
 const v=Object.values(L);if(!v.length)return null;const pct=Math.round(v.reduce((a,x)=>a+x.score/x.total*100,0)/v.length);
 return{pct,n:v.length,lv:pct>=70?3:pct>=50?2:1,lb:pct>=70?"Ready":pct>=50?"Getting there":"Keep practising"}}
function paintReady(el,items){if(!el)return;const r=readiness(items),t=PAPERS.length;
 el.innerHTML=r?'<h3>Council readiness score</h3><div class="pc">'+r.pct+'%</div><span class="lb l'+r.lv+'">'+r.lb+'</span><div class="br l'+r.lv+'"><i style="width:'+r.pct+'%"></i></div><div class="sm">'+(r.n===t?'Based on your latest result in all '+t+' papers.':'Based on '+r.n+' of '+t+' papers. Take the other papers for a fuller picture.')+'</div>'
 :'<h3>Council readiness score</h3><div class="sm" style="margin-top:6px">Take a paper to get your readiness score.</div>'}
async function paintDash(){const it=await getHist();document.querySelectorAll(".rdc").forEach(e=>paintReady(e,it))}
async function finish(auto){
 clearInterval(tmr);if(!S)return;
 const pk=PAPERS.find(p=>p.k===S.k),rows=S.ids.map((id,i)=>({i,id,q:qOf(id),p:S.a[id]})),ok=rows.filter(r=>r.p===r.q.a).length,total=rows.length;
 const rec={k:me.k,u:me.u,n:me.n,paper:pk.k,score:ok,total,auto:!!auto,t:Date.now(),ids:S.ids,miss:rows.filter(r=>r.p!==r.q.a).map(r=>r.id)};
 localStorage.removeItem("cbt_s");S=null;REV={rows};
 let saved=true;try{await saveRes(rec)}catch(e){saved=false;pend(rec)}
 show("rev");$("revT").textContent=(auto?"Time up, exam submitted · ":"Exam submitted · ")+pk.n;
 $("revS").textContent=ok+" / "+total;$("revI").textContent=Math.round(ok/total*100)+"% · "+(total-ok)+" missed"+(saved?"":" · Not saved online yet");
 $("revRetry").classList.toggle("hide",saved);drawRev("a");getHist().then(it=>{if(!it.some(x=>x.t===rec.t))it.push({paper:rec.paper,score:rec.score,total:rec.total,t:rec.t});paintReady($("rdRev"),it)});rvReset(me.k+"_"+rec.t,pk.n);scrollTo(0,0);
}
function drawRev(f){$("tgA").classList.toggle("on",f==="a");$("tgM").classList.toggle("on",f==="m");
 $("revL").innerHTML=REV.rows.filter(r=>f==="a"||r.p!==r.q.a).map(r=>{const c=r.p===r.q.a;return '<div class="rvc '+(c?"good":r.p?"bad":"skip")+'"><div class="st">Question '+(r.i+1)+' · '+(c?"Correct":r.p?"Incorrect":"Not answered")+'</div><div class="rq">'+esc(r.q.q)+'</div>'+
  r.q.o.map((o,j)=>{const a=L[j]===r.q.a,w=L[j]===r.p&&!a;return '<div class="ro '+(a?"cor":w?"wr":"")+'"><b>'+L[j]+'.</b> '+esc(o)+(a?'<i style="color:#178a3a">✓ Correct answer</i>':w?'<i style="color:#be123c">✗ Your answer</i>':"")+'</div>'}).join("")+
  '<div class="why"><b>Explanation:</b> '+esc(r.q.e||"Explanation coming soon.")+'</div></div>'}).join("")||'<div class="revh">Perfect score. No missed questions.</div>'}
$("tgA").onclick=()=>drawRev("a");$("tgM").onclick=()=>drawRev("m");
$("revRetry").onclick=async()=>{if(await retryPending()){$("revRetry").classList.add("hide");$("revI").textContent=$("revI").textContent.replace(" · Not saved online yet"," · Saved");toast("Result saved")}else toast("Still no connection. Try again.")};
/* ---------- student review ---------- */
let RV={r:0,id:"",paper:""};
const rvDraw=()=>document.querySelectorAll("#rvStars span").forEach(s=>s.textContent=+s.dataset.v<=RV.r?"★":"☆");
document.querySelectorAll("#rvStars span").forEach(s=>s.onclick=()=>{RV.r=+s.dataset.v;rvDraw()});
function rvReset(id,pn){RV={r:0,id,paper:pn};rvDraw();$("rvTxt").value="";$("rvTxt").disabled=false;$("rvMsg").textContent="";$("rvSend").disabled=false;$("rvSend").textContent="Submit review"}
$("rvSend").onclick=async()=>{
 const t=$("rvTxt").value.trim();
 if(!RV.r||t.length<5){$("rvMsg").textContent="Please pick a star rating and write a short review.";return}
 $("rvSend").disabled=true;$("rvSend").textContent="Sending…";
 try{
  await db.collection("reviews").doc(RV.id).set({name:me.n,username:me.u,paper:RV.paper,rating:RV.r,text:t,approved:false,createdAt:firebase.firestore.FieldValue.serverTimestamp()});
  $("rvTxt").disabled=true;$("rvSend").textContent="Review sent ✓";$("rvMsg").textContent="Thank you! Your review was sent."}
 catch(e){
  if(e.code==="permission-denied"){$("rvTxt").disabled=true;$("rvSend").textContent="Review sent ✓";$("rvMsg").textContent="You already sent a review for this attempt."}
  else{$("rvSend").disabled=false;$("rvSend").textContent="Submit review";$("rvMsg").textContent="Could not send. Check your internet and try again."}}
};
$("revBack").onclick=enter;
async function myRes(){view("res");$("reslist").innerHTML='<p style="padding:12px">Loading…</p>';
 let it=[];try{const d=await db.collection("history").doc(me.k).get();it=d.exists?d.data().items:[]}catch(e){}
 it=it.concat(JSON.parse(localStorage.cbt_p||"[]").filter(r=>r.k===me.k&&!it.some(x=>x.t===r.t)).map(r=>({...r,p:1}))).sort((a,b)=>b.t-a.t);
 $("reslist").innerHTML=it.length?'<table class="at"><tr><th>Paper</th><th>Score</th><th>%</th><th>Date</th></tr>'+it.map(x=>'<tr><td>'+(PAPERS.find(p=>p.k===x.paper)||{n:x.paper}).n+'</td><td>'+x.score+'/'+x.total+(x.auto?" (time up)":"")+'</td><td>'+Math.round(x.score/x.total*100)+'%</td><td>'+new Date(x.t).toLocaleString()+(x.p?" · not saved online yet":"")+'</td></tr>').join("")+'</table>':'<p style="padding:12px">No attempts yet. Take a paper from <b>Objective Questions</b> and your scores will show here.</p>'}
$("goRes").onclick=myRes;

/* ---------- admin ---------- */
const NAV='<nav><div class="brand">Nsam Technologies<small>ADMIN</small></div><div class="nl"><a id="aRf">Refresh</a><a class="lo" id="aLo">Logout</a></div></nav>';
const PRICE=2000,ENDDEF=new Date("2026-12-10T23:59:59+01:00").getTime(),naira=n=>"\u20A6"+(+n||0).toLocaleString();
function adminLogin(m=""){
 show("admin");$("admin").innerHTML='<div class="alog"><div class="ac acard"><div class="logo im" style="margin:0 auto 14px"><img src="logo.png" alt="Nsam Technologies logo"></div><div class="abadge">ADMIN ACCESS</div><h2>Administrator Login</h2><p class="asub">Sign in to manage students, papers and results.</p><input id="ae" type="email" placeholder="Admin email" autocomplete="username"><input id="ap" type="password" placeholder="Password" autocomplete="current-password"><button class="ab" id="ag" style="width:100%;margin-top:10px;height:40px;font-size:13px">➜&nbsp; SIGN IN</button><p class="aerr">'+m+'</p><a class="aback" href="#">← Back to student login</a></div><div class="afoot">Nsam Technologies · NMCN Exam Practice Portal</div></div>';
 $("ap").addEventListener("keydown",e=>{if(e.key==="Enter")$("ag").click()});
 $("ag").onclick=async()=>{try{await auth.signInWithEmailAndPassword($("ae").value.trim(),$("ap").value)}catch(e){adminLogin("Wrong email or password.")}};
}
async function dash(){
 show("admin");$("admin").innerHTML='<div class="ac">Loading…</div>';
 try{
  const [st,se,lo,re,cf,sg,qs,dv,al,gr,rw]=await Promise.all(["students","secrets","logins","results","config","settings","questions","devices","alerts","groups","rewards"].map(c=>db.collection(c).get()));
  A={st:st.docs.map(d=>({k:d.id,...d.data()})).sort((a,b)=>a.username.localeCompare(b.username)),pw:{},lg:{},rs:{},cfg:{}};
  A.dv={};dv.forEach(d=>A.dv[d.id]=d.data());A.gr=[];gr.forEach(d=>A.gr.push({id:d.id,...d.data()}));A.rw={};rw.forEach(d=>A.rw[d.id]=d.data());A.al=al.docs.map(d=>({id:d.id,...d.data()})).sort((a,b)=>(b.t||0)-(a.t||0));
  A.pn={};A.set={};A.qx={};sg.forEach(d=>{if(d.id==="main")A.set=d.data()});qs.forEach(d=>A.qx[d.id]=d.data().items||[]);se.forEach(d=>{if(d.id==="pins")A.pn=d.data();else A.pw[d.id]=d.data().password});cf.forEach(d=>A.cfg[d.id]=d.data());
  lo.forEach(d=>(A.lg[d.data().k]??=[]).push(d.data()));re.forEach(d=>(A.rs[d.data().k]??=[]).push(d.data()));
  [A.lg,A.rs].forEach(o=>Object.values(o).forEach(a=>a.sort((p,q)=>(q.at?.seconds||9e9)-(p.at?.seconds||9e9))));
  adminView();
 }catch(e){$("admin").innerHTML=NAV+'<div class="ac"><p style="color:#be123c">Could not load: '+esc(e.message)+'</p></div>';$("aLo").onclick=()=>auth.signOut();$("aRf").onclick=dash}
}
const row=s=>{const g=A.lg[s.k]||[],r=A.rs[s.k]||[];
 return '<details class="arow"><summary><span><b>'+esc(s.name)+'</b><small>'+esc(s.username)+'</small></span><span class="asm">Logins '+g.length+' · Exams '+r.length+'</span><label class="sw" onclick="event.stopPropagation()"><input type="checkbox" data-k="'+s.k+'" '+(s.active?"checked":"")+'><i></i></label></summary><div class="adt"><p>Password: <b>'+esc(A.pw[s.k]||"?")+'</b></p><p>Last login: '+(g.length?fmt(g[0].at):"never")+'</p><p>Payment: '+(s.paid?'<b>Paid '+naira(s.paidAmt)+'</b> on '+new Date(s.paidAt).toLocaleDateString()+' <button class="ab s" data-unpay="'+s.k+'">Undo</button>':'<b style="color:#be123c">Not paid</b> <button class="ab s" data-pay="'+s.k+'">Mark as paid</button>')+'</p><p>Referred by: <b>'+esc(s.refBy||"nobody")+'</b> <input data-rf="'+s.k+'" placeholder="Referrer username" style="max-width:170px"> <button class="ab s" data-sr="'+s.k+'">Save</button></p><p>Bundle: <b>'+esc((bundleOf(s.username||"")||{name:"none"}).name)+'</b></p><p>Registered device: '+(A.dv[s.k]?'<b>'+esc(A.dv[s.k].br+" · "+A.dv[s.k].os)+'</b> since '+new Date(A.dv[s.k].t).toLocaleDateString():"none yet (the next login registers one)")+'</p>'+
 (r.length?'<table><tr><th>Paper</th><th>Score</th><th>When</th></tr>'+r.map(x=>{const p=PAPERS.find(y=>y.k===x.paper);return '<tr><td>'+(p?p.n:x.paper)+'</td><td>'+x.score+'/'+x.total+(x.auto?" (auto)":"")+'</td><td>'+fmt(x.at)+'</td></tr>'}).join("")+'</table>':'<p class="asm">No exam taken yet.</p>')+'<div class="atop" style="margin-top:8px"><input data-np="'+s.k+'" placeholder="New password" style="max-width:150px"><button class="ab s" data-cp="'+s.k+'">Change password</button><button class="ab s" data-rd="'+s.k+'">Reset device</button><button class="ab s" data-del="'+s.k+'" style="color:#be123c">Delete student</button></div></div></details>'};
function list(){const f=$("q").value.trim().toLowerCase(),pf=$("pf").value;$("ls").innerHTML=A.st.filter(s=>(!f||(s.username+" "+s.name).toLowerCase().includes(f))&&(!pf||(pf==="p")===!!s.paid)).map(row).join("")||'<p class="asm">No match.</p>'}
function adminView(){
 const sum=o=>Object.values(o).reduce((n,a)=>n+a.length,0);
 $("admin").innerHTML=NAV+'<div class="ahead"><h1>Admin Dashboard</h1><p>Manage students, papers, results and settings</p></div><div class="ac"><div class="astats"><div><b>'+A.st.length+'</b>Students</div><div><b>'+A.st.filter(s=>s.active).length+'</b>Active</div><div><b>'+sum(A.lg)+'</b>Logins</div><div><b>'+sum(A.rs)+'</b>Exams taken</div><div><b>'+A.st.filter(s=>s.paid).length+'</b>Paid</div><div><b>'+naira(A.st.reduce((n,s)=>n+(s.paid?+s.paidAmt||0:0),0))+'</b>Collected</div></div></div>'+
 alCard()+resCard()+setCard()+'<div class="ac"><h2>Question sets</h2>'+PAPERS.map(p=>{const c=A.cfg[p.k];return '<div class="pcard"><b>'+p.n+'</b><span>Bank: '+((BANK[p.k]||[]).length+(A.qx[p.k]||[]).length)+' questions · Current set: '+(c?c.ids.length+" questions, set "+new Date(c.v).toLocaleString():"not randomized yet (students get the whole bank)")+'</span><button class="ab" data-r="'+p.k+'">Randomize '+TOTAL+' questions</button></div>'}).join("")+'</div>'+
 '<div class="ac"><h2>Students</h2><input id="q" type="text" placeholder="Search by username or name"><select id="pf"><option value="">All students</option><option value="p">Paid only</option><option value="u">Unpaid only</option></select><div class="atop"><button class="ab s" id="aa">Activate all</button><button class="ab s" id="da">Deactivate all</button></div><div id="ls"></div></div>'+
 qCard()+anCard()+addCard()+refCard()+groupCard()+bkCard()+'<div class="ac"><details><summary><b>Import students</b></summary><p class="asm" style="margin:8px 0">One per line: username,password,name. Importing a username again replaces it.</p><textarea id="csv" rows="6"></textarea><label class="asm"><input type="checkbox" id="act" checked> Activate on import</label><br><br><button class="ab" id="im">Import</button></details></div>';
 xBind();list();$("q").oninput=list;$("pf").onchange=list;$("ls").addEventListener("click",payClick);$("bk").onclick=backup;$("aRf").onclick=dash;$("aLo").onclick=()=>auth.signOut();
 $("ls").onchange=toggle;document.querySelectorAll("[data-r]").forEach(b=>b.onclick=()=>rand(b.dataset.r));
 $("aa").onclick=()=>all(true);$("da").onclick=()=>all(false);$("im").onclick=imp;$("ls").addEventListener("click",refClick);$("rwBox").onclick=rwClick;$("gdBox").onclick=gdClick;$("gs").onclick=saveGroup;
}
const bundleOf=u=>(A.gr||[]).find(g=>(g.members||[]).includes(String(u).trim().toUpperCase()));
const priceFor=s=>{const g=bundleOf(s.username||"");return g&&g.members.length>=4?PRICE-500:PRICE};
const refCount=c=>A.st.filter(s=>s.paid&&(s.refBy||"")===c).length;
const refCard=()=>{const codes=[...new Set(A.st.filter(s=>s.refBy).map(s=>s.refBy))].sort();
 return '<div class="ac"><h2>Referral rewards</h2><p class="asm">Every 10 paying referrals earns '+naira(10000)+' cash. A referral counts once the referred student is marked as paid. Set "Referred by" under a student\'s row in Students.</p><div id="rwBox">'+
 (codes.length?'<table class="at"><tr><th>Referrer</th><th>Paid referrals</th><th>Rewards earned</th><th>Paid out</th><th>Owed</th><th></th></tr>'+codes.map(c=>{const paid=refCount(c),earned=Math.floor(paid/10),out=(A.rw[key(c)]||{}).paidOut||0,owed=earned-out;return '<tr><td><b>'+esc(c)+'</b></td><td>'+paid+'</td><td>'+earned+'</td><td>'+out+'</td><td>'+(owed>0?'<b style="color:#be123c">'+owed+' × '+naira(10000)+'</b>':'0')+'</td><td>'+(owed>0?'<button class="ab" data-rw="'+esc(c)+'">Mark one reward paid</button>':'')+'</td></tr>'}).join("")+'</table>':'<p class="asm">No referrals yet.</p>')+'</div></div>'};
const groupCard=()=>'<div class="ac"><h2>Class bundles</h2><p class="asm">Groups of 4 or more students pay '+naira(500)+' less each ('+naira(PRICE-500)+' instead of '+naira(PRICE)+'). Enter usernames separated by commas. A student can belong to one group only.</p><input id="gn" placeholder="Group name" style="max-width:220px"><textarea id="gm" rows="2" placeholder="Usernames, e.g. DOM/3Y1S/05, DOM/3Y1S/12, DOM/3Y1S/19, DOM/3Y1S/20"></textarea><div class="atop"><button class="ab" id="gs">Save group</button></div><div id="gdBox" style="margin-top:12px">'+
 (A.gr.length?A.gr.map(g=>{const n=g.members.length;return '<div class="pcard"><b>'+esc(g.name)+'</b><span>'+n+' student'+(n===1?'':'s')+' · '+(n>=4?'<b style="color:#178a3a">Bundle price active: '+naira(PRICE-500)+' each</b>':'<b>Needs '+(4-n)+' more for the bundle</b>')+'</span><p class="asm">'+g.members.map(u=>esc(u)).join(", ")+'</p><button class="ab s" data-gd="'+esc(g.id)+'" style="color:#be123c">Delete group</button></div>'}).join(""):'<p class="asm">No groups yet.</p>')+'</div></div>';
async function refClick(e){const b=e.target.closest("[data-sr]");if(!b)return;const k=b.dataset.sr,s=A.st.find(x=>x.k===k);if(!s)return;
 const code=(document.querySelector('[data-rf="'+k+'"]').value||"").trim().toUpperCase();
 if(code&&!A.st.some(x=>x.username===code))return alert("No student has the username "+code+". Check the spelling.");
 if(code&&code===s.username)return alert("A student cannot refer themselves.");
 try{await db.collection("students").doc(k).update({refBy:code});s.refBy=code;adminView()}catch(x){alert("Could not save: "+x.message)}}
async function rwClick(e){const b=e.target.closest("[data-rw]");if(!b)return;const c=b.dataset.rw;
 if(!confirm("Mark one "+naira(10000)+" referral reward as paid to "+c+"?"))return;
 const out=((A.rw[key(c)]||{}).paidOut||0)+1;
 try{await db.collection("rewards").doc(key(c)).set({code:c,paidOut:out,paidAt:Date.now()});A.rw[key(c)]={code:c,paidOut:out};adminView()}catch(x){alert("Could not save: "+x.message)}}
async function saveGroup(){const name=$("gn").value.trim(),mem=[...new Set($("gm").value.split(/[,\n]/).map(x=>x.trim().toUpperCase()).filter(Boolean))];
 if(!name||!mem.length)return alert("Enter a group name and at least one username.");
 const missing=mem.filter(u=>!A.st.some(s=>s.username===u));if(missing.length)return alert("These usernames were not found: "+missing.join(", ")+". Check the spelling.");
 const taken=mem.filter(u=>bundleOf(u));if(taken.length)return alert("Already in another group: "+taken.join(", ")+". Remove them from that group first.");
 try{await db.collection("groups").add({name,members:mem,createdAt:Date.now()});alert("Group saved.");dash()}catch(x){alert("Could not save: "+x.message)}}
async function gdClick(e){const b=e.target.closest("[data-gd]");if(!b)return;const g=A.gr.find(x=>x.id===b.dataset.gd);if(!g||!confirm("Delete group "+g.name+"?"))return;
 try{await db.collection("groups").doc(g.id).delete();dash()}catch(x){alert("Could not save: "+x.message)}}
async function payClick(e){const b=e.target.closest("[data-pay],[data-unpay]");if(!b)return;const k=b.dataset.pay||b.dataset.unpay,s=A.st.find(x=>x.k===k);if(!s)return;
 try{let u;if(b.dataset.pay){const a=+prompt("Amount paid by "+s.name+" (naira)",priceFor(s));if(!a||a<0)return;u={paid:true,paidAmt:a,paidAt:Date.now()}}
  else{if(!confirm("Remove the payment record for "+s.name+"?"))return;u={paid:false,paidAmt:0,paidAt:0}}
  await db.collection("students").doc(k).update(u);Object.assign(s,u);adminView()}catch(x){alert("Could not save: "+x.message)}}
const bkCard=()=>'<div class="ac"><h2>Backup</h2><p class="asm">Downloads a copy of students, passwords, payments, results, settings and imported questions. Keep the file private and somewhere safe.</p><button class="ab" id="bk">Download full backup</button></div>';
async function backup(){const b=$("bk");b.disabled=true;b.textContent="Preparing...";const o={savedAt:new Date().toISOString()};
 for(const c of ["students","secrets","logins","results","history","config","settings","questions","devices","alerts","reviews"]){try{const q=await db.collection(c).get();o[c]={};q.forEach(d=>o[c][d.id]=d.data())}catch(e){o[c]="not readable: "+(e.code||e.message)}}
 const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify(o)],{type:"application/json"}));a.download="nsam-cbt-backup-"+new Date().toISOString().slice(0,10)+".json";a.click();b.disabled=false;b.textContent="Download full backup"}
function toggle(e){
 const c=e.target,s=A.st.find(x=>x.k===c.dataset.k);if(!s)return;s.active=c.checked;
 db.collection("students").doc(s.k).update({active:c.checked}).catch(()=>{alert("Could not save. Check your internet.");c.checked=!c.checked;s.active=c.checked});
}
async function all(v){
 if(!confirm((v?"Activate":"Deactivate")+" ALL students?"))return;
 for(let i=0;i<A.st.length;i+=400){const b=db.batch();A.st.slice(i,i+400).forEach(s=>b.update(db.collection("students").doc(s.k),{active:v}));await b.commit()}
 dash();
}
async function rand(k){
 const b=(BANK[k]||[]).concat(A.qx[k]||[]),p=PAPERS.find(x=>x.k===k);if(!b.length)return alert("No questions in the bank for "+p.n+" yet.");
 const ids=shuffle(b.map(q=>q.id)).slice(0,TOTAL);
 await db.collection("config").doc(k).set({ids,v:Date.now()});alert(p.n+": new set of "+ids.length+" questions saved.");dash();
}
async function imp(){
 const lines=$("csv").value.split("\n").map(x=>x.trim()).filter(x=>x&&!/^username/i.test(x)),act=$("act").checked;let n=0;
 for(let i=0;i<lines.length;i+=150){
  const b=db.batch();
  for(const l of lines.slice(i,i+150)){
   const [u,p,...r]=l.split(",");if(!u||!p)continue;const k=key(u);
   b.set(db.collection("students").doc(k),{username:u.trim().toUpperCase(),name:r.join(",").trim()||u.trim(),h:await hp(u,p),active:act});
   b.set(db.collection("secrets").doc(k),{password:p.trim().toUpperCase()});n++;
  }
  await b.commit();
 }
 alert(n+" students imported.");dash();
}
/* ---------- admin extras ---------- */
const pn=k=>(PAPERS.find(p=>p.k===k)||{n:k}).n,dtl=ms=>ms?new Date(ms-new Date(ms).getTimezoneOffset()*6e4).toISOString().slice(0,16):"";
const flat=()=>Object.values(A.rs).flat().sort((a,b)=>(b.at?.seconds||9e9)-(a.at?.seconds||9e9)),pc=r=>Math.round(r.score/r.total*100);
const alCard=()=>{const o=A.al.filter(a=>a.st==="open");
 return '<div class="ac" id="al"><h2>Security alerts'+(o.length?' ('+o.length+')':'')+'</h2><p class="asm">Students who tried to log in from a device that is not their registered one. Approve replaces their registered device with the one they tried.</p>'+
 (o.length?'<div style="overflow:auto;max-height:360px"><table class="at"><tr><th>Student</th><th>Attempted device</th><th>Time</th><th></th></tr>'+o.slice(0,50).map(a=>'<tr><td><b>'+esc(a.n)+'</b><br><span class="asm">'+esc(a.u)+'</span></td><td>'+esc(a.br+" · "+a.os)+'<br><span class="asm">'+esc(a.scr||"")+'</span></td><td>'+new Date(a.t).toLocaleString()+'</td><td style="white-space:nowrap"><button class="ab" data-ap="'+esc(a.id)+'">Approve</button> <button class="ab s" data-dm="'+esc(a.id)+'">Dismiss</button></td></tr>').join("")+'</table></div>':'<p class="asm">No open alerts.</p>')+'</div>'};
const resCard=()=>'<div class="ac"><h2>Results</h2><div class="atop"><select id="rf"><option value="">All papers</option>'+PAPERS.map(p=>'<option value="'+p.k+'">'+p.n+'</option>').join("")+'</select><label class="asm">Pass mark % <input id="rm" type="number" value="50" style="width:70px"></label><button class="ab s" id="rx">Download CSV (opens in Excel)</button></div><p class="asm" id="rs"></p><div style="overflow:auto;max-height:420px" id="rt"></div></div>';
function drawRes(){const f=$("rf").value,pm=+$("rm").value||50;RS=flat().filter(r=>!f||r.paper===f);
 const avg=RS.length?Math.round(RS.reduce((n,r)=>n+pc(r),0)/RS.length):0,ps=RS.filter(r=>pc(r)>=pm).length;
 $("rs").textContent=RS.length+" attempts · average "+avg+"% · pass rate "+(RS.length?Math.round(ps/RS.length*100):0)+"% (pass mark "+pm+"%)";
 $("rt").innerHTML=RS.length?'<table class="at"><tr><th>Name</th><th>Username</th><th>Paper</th><th>Score</th><th>When</th></tr>'+RS.slice(0,300).map(r=>'<tr><td>'+esc(r.n)+'</td><td>'+esc(r.u)+'</td><td>'+pn(r.paper)+'</td><td>'+r.score+'/'+r.total+' ('+pc(r)+'%)</td><td>'+fmt(r.at)+'</td></tr>').join("")+'</table>':'<p class="asm">No results yet.</p>'}
function exportCsv(){const q=v=>'"'+String(v??"").replace(/"/g,'""')+'"',l=[["Name","Username","Paper","Score","Total","Percent","Date"].map(q).join(",")].concat(RS.map(r=>[r.n,r.u,pn(r.paper),r.score,r.total,pc(r),fmt(r.at)].map(q).join(",")));
 const a=document.createElement("a");a.href=URL.createObjectURL(new Blob(["\ufeff"+l.join("\n")],{type:"text/csv"}));a.download="results.csv";a.click()}
const setCard=()=>{const s=A.set||{},d=s.dur||{},c=s.sch||{};return '<div class="ac"><h2>Paper settings</h2><p class="asm">PIN, time allowed and opening window for each paper. Leave the PIN blank to keep the current one.</p>'+PAPERS.map(p=>{const o=c[p.k]||{};return '<div class="pcard"><b>'+p.n+'</b><span>Current PIN: <b>'+esc(A.pn[p.k]||"default")+'</b></span><div class="atop"><input data-pin="'+p.k+'" placeholder="New PIN" inputmode="numeric" style="max-width:110px"><label class="asm">Minutes <input data-dur="'+p.k+'" type="number" value="'+(d[p.k]||SECS/60)+'" style="width:80px"></label><label class="asm"><input data-on="'+p.k+'" type="checkbox" '+(o.on===false?"":"checked")+'> Open</label></div><div class="atop"><label class="asm">From <input data-from="'+p.k+'" type="datetime-local" value="'+dtl(o.from)+'"></label><label class="asm">Until <input data-to="'+p.k+'" type="datetime-local" value="'+dtl(o.to)+'"></label></div></div>'}).join("")+'<label class="asm">Access ends on <input id="endd" type="date" value="'+new Date(s.end||ENDDEF).toISOString().slice(0,10)+'"></label><br><label class="asm">Announcement shown to students after login</label><input id="ban" value="'+esc(s.banner||"")+'" placeholder="e.g. Paper I holds on Monday 9am"><br><br><button class="ab" id="sv">Save settings</button></div>'};
async function saveSet(){
 const s={pinh:{...((A.set||{}).pinh||{})},dur:{},sch:{}},pw={...A.pn};
 for(const p of PAPERS){const g=a=>document.querySelector("["+a+'="'+p.k+'"]'),v=g("data-pin").value.trim();
  if(v){if(!/^\d{3,6}$/.test(v))return alert("PIN for "+p.n+" must be 3 to 6 digits.");s.pinh[p.k]=await sha(p.k+"|"+v);pw[p.k]=v}
  s.dur[p.k]=+g("data-dur").value||SECS/60;const f=g("data-from").value,t=g("data-to").value;s.sch[p.k]={on:g("data-on").checked,from:f?+new Date(f):0,to:t?+new Date(t):0}}
 s.banner=$("ban").value.trim();s.end=$("endd").value?+new Date($("endd").value+"T23:59:59+01:00"):ENDDEF;
 try{await db.collection("settings").doc("main").set(s);await db.collection("secrets").doc("pins").set(pw);alert("Settings saved.");dash()}catch(e){alert("Could not save: "+e.message)}
}
const qCard=()=>'<div class="ac"><h2>Import questions</h2><p class="asm">One question per line: question,A,B,C,D,correct letter,explanation. Put text that contains commas inside "double quotes". A header line is optional. Imported so far: '+PAPERS.map(p=>p.n+" "+(A.qx[p.k]||[]).length).join(" · ")+'</p><select id="qp">'+PAPERS.map(p=>'<option value="'+p.k+'">'+p.n+'</option>').join("")+'</select><textarea id="qb" rows="6"></textarea><div class="atop"><button class="ab" id="qi">Import questions</button><button class="ab s" id="qc">Remove imported questions for this paper</button></div></div>';
function csvParse(t){const r=[];let w=[],c="",q=false;for(let i=0;i<t.length;i++){const h=t[i];if(q){if(h=='"'){if(t[i+1]=='"'){c+='"';i++}else q=false}else c+=h}else if(h=='"')q=true;else if(h==","){w.push(c);c=""}else if(h=="\n"||h=="\r"){if(h=="\r"&&t[i+1]=="\n")i++;w.push(c);c="";r.push(w);w=[]}else c+=h}w.push(c);r.push(w);return r.filter(x=>x.some(y=>y.trim()))}
async function impQ(){
 const k=$("qp").value,rows=csvParse($("qb").value).filter(r=>!/^question$/i.test(r[0].trim())),add=[],bad=[],t=Date.now().toString(36);
 rows.forEach((r,i)=>{const [q,a,b,c,d,an,...e]=r.map(x=>x.trim()),o=[a,b,c,d];while(o.length&&!o[o.length-1])o.pop();const A2=(an||"").toUpperCase();
  if(!q||o.length<2||o.some(x=>!x)||!"ABCD".includes(A2)||A2.length!==1||"ABCD".indexOf(A2)>=o.length)bad.push(i+1);else add.push({id:"x"+t+i,q,o,a:A2,e:e.join(",")})});
 if(!rows.length)return alert("Paste some questions first.");
 if(bad.length)return alert("Nothing imported. Check these lines: "+bad.join(", "));
 const items=(A.qx[k]||[]).concat(add);if(JSON.stringify(items).length>900000)return alert("Too many imported questions for one paper.");
 try{await db.collection("questions").doc(k).set({items});alert(add.length+" questions imported into "+pn(k)+".");dash()}catch(e){alert("Could not save: "+e.message)}
}
async function clrQ(){const k=$("qp").value;if(!confirm("Remove all imported questions for "+pn(k)+"?"))return;await db.collection("questions").doc(k).delete();dash()}
const anCard=()=>{const t={};flat().forEach(r=>{(r.ids||[]).forEach(i=>{(t[r.paper+"|"+i]??={n:0,m:0}).n++});(r.miss||[]).forEach(i=>{(t[r.paper+"|"+i]??={n:0,m:0}).m++})});
 const rows=Object.entries(t).filter(([,v])=>v.n>=2).sort((a,b)=>b[1].m/b[1].n-a[1].m/a[1].n).slice(0,15),txt=key=>{const [p,i]=key.split("|"),q=(BANK[p]||[]).concat(A.qx[p]||[]).find(x=>String(x.id)===i);return q?q.q:"(question "+i+")"};
 return '<div class="ac"><h2>Most missed questions</h2>'+(rows.length?'<table class="at"><tr><th>Question</th><th>Paper</th><th>Missed</th></tr>'+rows.map(([k,v])=>'<tr><td>'+esc(txt(k).slice(0,140))+'</td><td>'+pn(k.split("|")[0])+'</td><td>'+Math.round(v.m/v.n*100)+'% of '+v.n+'</td></tr>').join("")+'</table>':'<p class="asm">Not enough data yet. This fills in once at least 2 students have taken the same question.</p>')+'</div>'};
const addCard=()=>'<div class="ac"><h2>Add one student</h2><div class="atop"><input id="nu" placeholder="Username e.g. DOM/3Y1S/95" style="max-width:220px"><input id="np" placeholder="Password" style="max-width:120px"><input id="nn" placeholder="Full name"><button class="ab" id="na">Add student</button></div></div>';
function xBind(){
 $("al").onclick=async e=>{const b=e.target.closest("[data-ap],[data-dm]");if(!b)return;const a=A.al.find(x=>x.id===(b.dataset.ap||b.dataset.dm));if(!a)return;
  try{
   if(b.dataset.ap){if(!confirm("Replace "+a.n+"'s registered device with this "+a.br+" on "+a.os+"? The old device will be locked out."))return;
    await db.collection("devices").doc(a.k).set({id:a.dev,br:a.br,os:a.os,scr:a.scr||"",ua:a.ua||"",t:Date.now(),by:"admin"});
    for(const x of A.al.filter(x=>x.k===a.k&&x.st==="open"))await db.collection("alerts").doc(x.id).update({st:x.dev===a.dev?"approved":"dismissed"});
    alert("Device approved for "+a.n+".")}
   else await db.collection("alerts").doc(a.id).update({st:"dismissed"});
   dash()}catch(x){alert("Could not save: "+x.message)}};
 $("rf").onchange=drawRes;$("rm").oninput=drawRes;drawRes();$("rx").onclick=exportCsv;$("sv").onclick=saveSet;$("qi").onclick=impQ;$("qc").onclick=clrQ;
 $("na").onclick=()=>{const u=$("nu").value.trim(),p=$("np").value.trim(),n=$("nn").value.trim().replace(/,/g," ");if(!u||!p||!n)return alert("Fill in username, password and name.");$("csv").value=u+","+p+","+n;$("act").checked=true;imp()};
 $("ls").onclick=async e=>{const b=e.target.closest("[data-cp],[data-del],[data-rd]");if(!b)return;const k=b.dataset.cp||b.dataset.del||b.dataset.rd,s=A.st.find(x=>x.k===k);
  try{if(b.dataset.rd){if(!confirm("Reset the registered device for "+s.name+"? The next successful login will register a new device."))return;await db.collection("devices").doc(k).delete();dash()}
  else if(b.dataset.del){if(!confirm("Delete "+s.name+"? Their past results stay in the results list."))return;await db.collection("students").doc(k).delete();await db.collection("secrets").doc(k).delete();await db.collection("devices").doc(k).delete();dash()}
  else{const p=document.querySelector('[data-np="'+k+'"]').value.trim();if(!p)return alert("Type the new password first.");await db.collection("students").doc(k).update({h:await hp(s.username,p)});await db.collection("secrets").doc(k).set({password:p.toUpperCase()});alert("Password changed.");dash()}}catch(x){alert("Could not save: "+x.message)}}}

init();
