/* shared.js - used by every page of the 8th Grade Learning Hub.
   Login, storage, stars, saved answers and GitHub saving live here. */
(function(){
'use strict';

/* ================= SETTINGS YOU MAY CHANGE ================= */
var CONFIG={owner:'kacharo',repo:'8thGrade',branch:'main'};   // where answers are saved
// Login: replace this whole line with the one made by "Change login" on the main page (Parent settings).
var AUTH={user:'student',salt:'8thgrade-v1',hash:'f465c44648e66eeb1941049795efd942ebc953dbb25e5d0166bc4214f8f08caf'};
var SUBJECTS=[
  {key:'Science',label:'Science',icon:'🔬',color:'#1f9d63',href:'Science/index.html',blurb:'Genetics, matter, Earth'},
  {key:'ELA',label:'ELA',icon:'📖',color:'#2f6fed',href:'ELA/index.html',blurb:'Reading and vocabulary'},
  {key:'Math',label:'Math',icon:'➗',color:'#d9822b',href:'Math/index.html',blurb:'Practice and problem solving'},
  {key:'Social-Study',label:'Social Studies',icon:'🌍',color:'#6a4c93',href:'Social-Study/index.html',blurb:'History and the world'}
];
/* =========================================================== */

/* ---- SHA-256 (works on any page, even without https) ---- */
function sha256(ascii){
  function rr(v,a){return (v>>>a)|(v<<(32-a));}
  var mp=Math.pow,mw=mp(2,32),i,j,result='',words=[],bl=ascii.length*8;
  var hash=sha256.h=sha256.h||[],k=sha256.k=sha256.k||[],pc=k.length,comp={};
  for(var c=2;pc<64;c++){if(!comp[c]){for(i=0;i<313;i+=c)comp[i]=c;hash[pc]=(mp(c,.5)*mw)|0;k[pc++]=(mp(c,1/3)*mw)|0;}}
  ascii+='\x80';while(ascii.length%64-56)ascii+='\x00';
  for(i=0;i<ascii.length;i++){j=ascii.charCodeAt(i);if(j>>8)return '';words[i>>2]|=j<<((3-i)%4)*8;}
  words[words.length]=((bl/mw)|0);words[words.length]=bl;
  for(j=0;j<words.length;){
    var w=words.slice(j,j+=16),old=hash;hash=hash.slice(0,8);
    for(i=0;i<64;i++){
      var w15=w[i-15],w2=w[i-2],a=hash[0],e=hash[4];
      var t1=hash[7]+(rr(e,6)^rr(e,11)^rr(e,25))+((e&hash[5])^((~e)&hash[6]))+k[i]+(w[i]=(i<16)?w[i]:(w[i-16]+(rr(w15,7)^rr(w15,18)^(w15>>>3))+w[i-7]+(rr(w2,17)^rr(w2,19)^(w2>>>10)))|0);
      var t2=(rr(a,2)^rr(a,13)^rr(a,22))+((a&hash[1])^(a&hash[2])^(hash[1]&hash[2]));
      hash=[(t1+t2)|0].concat(hash);hash[4]=(hash[4]+t1)|0;
    }
    for(i=0;i<8;i++)hash[i]=(hash[i]+old[i])|0;
  }
  for(i=0;i<8;i++)for(j=3;j+1;j--){var b=(hash[i]>>(j*8))&255;result+=((b<16)?0:'')+b.toString(16);}
  return result;
}

var W=window.W={CONFIG:CONFIG,SUBJECTS:SUBJECTS,AUTH:AUTH};
var esc=W.esc=function(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});};

/* ---- storage (browser) ---- */
W.store={
  get:function(k,d){try{var v=localStorage.getItem('we_'+k);return v?JSON.parse(v):d;}catch(e){return d;}},
  set:function(k,v){try{localStorage.setItem('we_'+k,JSON.stringify(v));return true;}catch(e){return false;}}
};

/* ---- login ---- */
W.hashLogin=function(user,pass,salt){return sha256(unescape(encodeURIComponent(String(user).trim().toLowerCase()+':'+pass+':'+(salt||AUTH.salt))));};
W.auth={
  ok:function(){try{return sessionStorage.getItem('we_auth')===AUTH.hash||localStorage.getItem('we_auth')===AUTH.hash;}catch(e){return false;}},
  login:function(u,p,keep){
    if(W.hashLogin(u,p)!==AUTH.hash)return false;
    try{sessionStorage.setItem('we_auth',AUTH.hash);if(keep)localStorage.setItem('we_auth',AUTH.hash);}catch(e){}
    return true;
  },
  logout:function(){try{sessionStorage.removeItem('we_auth');localStorage.removeItem('we_auth');}catch(e){}}
};
// Pages inside a subject folder load this file with data-home="../index.html" and are locked until signed in.
var cs=document.currentScript;
W.home=(cs&&cs.getAttribute('data-home'))||'index.html';
if(cs&&cs.getAttribute('data-home')&&!W.auth.ok()){document.documentElement.style.visibility='hidden';location.replace(W.home);}

/* ---- stars (shared by every page) ---- */
W.xp={
  get:function(){var s=W.store.get('stats',{xp:0});return (s&&s.xp)||0;},
  add:function(n){var s=W.store.get('stats',{xp:0})||{xp:0};s.xp=(s.xp||0)+n;W.store.set('stats',s);}
};

/* ---- saved answers (kept in this browser until they are safely on GitHub) ---- */
W.subs={
  list:function(subject){var a=W.store.get('subs',[])||[];return subject?a.filter(function(r){return r.subject===subject;}):a;},
  add:function(rec){var a=W.store.get('subs',[])||[];a.unshift(rec);W.store.set('subs',a.slice(0,80));},
  patch:function(id,p){var a=W.store.get('subs',[])||[];a.forEach(function(r){if(r.id===id)for(var k in p)r[k]=p[k];});W.store.set('subs',a);},
  remove:function(id){W.store.set('subs',(W.store.get('subs',[])||[]).filter(function(r){return r.id!==id;}));}
};
W.saveTextFile=function(text,fname){
  try{var bl=new Blob([text],{type:'text/plain'});var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download=fname;
    document.body.appendChild(a);a.click();setTimeout(function(){try{URL.revokeObjectURL(a.href);}catch(e){}a.remove();},800);return true;}catch(e){return false;}
};

/* ---- which repository folder is this page in?  (answers are saved next to the page, in <folder>/answers/) ---- */
W.dir=function(subjectKey){
  var host=location.hostname;
  if(/\.github\.io$/i.test(host)){
    var p=location.pathname.split('/').filter(Boolean).map(decodeURIComponent);
    if(p.length&&p[0].toLowerCase()===CONFIG.repo.toLowerCase())p=p.slice(1);
    p.pop();                                  // drop the file name
    if(p.length)return p.join('/');
  }
  return subjectKey||'';
};

/* ---- GitHub ---- */
function b64(t){return btoa(unescape(encodeURIComponent(t)));}
W.gh={
  raw:function(){return W.store.get('gh',null)||{};},
  cfg:function(){var c=W.gh.raw();if(!c.token)return null;return {owner:c.owner||CONFIG.owner,repo:c.repo||CONFIG.repo,branch:c.branch||CONFIG.branch,token:c.token};},
  msg:function(r){
    if(r.status===401)return 'GitHub did not accept the token (it may be expired or mistyped).';
    if(r.status===403)return 'The token is not allowed to write to this repository (it needs Contents: Read and write).';
    if(r.status===404)return 'Repository, branch or folder not found, or the token does not have access to it.';
    if(r.status===0)return 'No internet connection right now.';
    if(r.status===-1)return 'GitHub saving is not set up yet.';
    return 'GitHub said: '+(r.msg||('error '+r.status));
  },
  put:function(c,path,text){
    var url='https://api.github.com/repos/'+encodeURIComponent(c.owner)+'/'+encodeURIComponent(c.repo)+'/contents/'+path.split('/').map(encodeURIComponent).join('/');
    var body={message:'Add answers: '+path,content:b64(text),branch:c.branch};
    return fetch(url,{method:'PUT',headers:{'Authorization':'Bearer '+c.token,'Accept':'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28','Content-Type':'application/json'},body:JSON.stringify(body)})
      .then(function(r){
        if(r.status===200||r.status===201||r.status===422)return {ok:true};     // 422 = that exact file is already there
        return r.json().catch(function(){return {};}).then(function(j){return {ok:false,status:r.status,msg:(j&&j.message)||''};});
      }).catch(function(){return {ok:false,status:0,msg:'offline'};});
  },
  // rec needs: dir, exercise, file (.txt name), report, name, when, pts, max, pct, log
  saveRecord:function(rec){
    var c=W.gh.cfg();if(!c)return Promise.resolve({ok:false,status:-1});
    var dir=(rec.dir||'').replace(/^\/+|\/+$/g,'');
    var base=(dir?dir+'/':'')+'answers/'+rec.exercise+'/'+rec.file.replace(/\.txt$/,'');
    var data=JSON.stringify({exercise:rec.exercise,name:rec.name,when:rec.when,points:rec.pts,outOf:rec.max,percent:rec.pct,answers:rec.log},null,2);
    return W.gh.put(c,base+'.txt',rec.report).then(function(r1){if(!r1.ok)return r1;return W.gh.put(c,base+'.json',data);});
  },
  test:function(c){
    return fetch('https://api.github.com/repos/'+encodeURIComponent(c.owner)+'/'+encodeURIComponent(c.repo),{headers:{'Authorization':'Bearer '+c.token,'Accept':'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28'}})
      .then(function(r){
        if(!r.ok)return r.json().catch(function(){return {};}).then(function(j){return {ok:false,status:r.status,msg:j.message||''};});
        return r.json().then(function(j){return {ok:true,priv:j.private,push:j.permissions?j.permissions.push:undefined};});
      }).catch(function(){return {ok:false,status:0,msg:'offline'};});
  },
  busy:false,last:0,
  // send anything still waiting (optionally only one subject). Calls done(sentCount) when finished.
  flush:function(subject,done){
    if(!W.gh.cfg()||W.gh.busy||Date.now()-W.gh.last<20000){return;}
    var todo=W.subs.list(subject).filter(function(r){return r.ghStatus==='pending';});if(!todo.length)return;
    W.gh.busy=true;W.gh.last=Date.now();var sent=0,i=0;
    (function next(){
      if(i>=todo.length){W.gh.busy=false;done&&done(sent);return;}
      var r=todo[i++];
      W.gh.saveRecord(r).then(function(res){
        if(res.ok){W.subs.patch(r.id,{ghStatus:'sent',ghErr:''});sent++;next();}
        else{W.subs.patch(r.id,{ghErr:W.gh.msg(res)});W.gh.busy=false;done&&done(sent);}
      });
    })();
  }
};

/* ---- "My saved answers" card used by every subject page ---- */
W.ui={
  toast:function(m){var t=document.getElementById('toast');if(!t)return;t.textContent=m;t.classList.add('on');setTimeout(function(){t.classList.remove('on');},2200);},
  saved:function(el,subject){
    var subs=W.subs.list(subject),cfg=W.gh.cfg();
    var stat=function(r){return r.ghStatus==='sent'?'<span class="badge ok">☁ Saved to GitHub</span>':(r.ghStatus==='pending'?'<span class="badge wait">⏳ Waiting to send</span>':'<span class="muted">On this device only</span>');};
    el.innerHTML='<h2>📝 My saved answers</h2>'+(subs.length?subs.map(function(r){
      return '<div class="wc" style="margin-bottom:10px"><b>'+W.esc(r.title||r.exercise)+'</b>'+(r.name?' &middot; '+W.esc(r.name):'')+' &middot; '+stat(r)+
        '<div class="muted">'+W.esc(new Date(r.when).toLocaleString())+' &middot; '+r.pts+' of '+r.max+' points ('+r.pct+'%)</div>'+
        (r.ghStatus==='pending'&&r.ghErr?'<div class="def" style="color:var(--warn)">'+W.esc(r.ghErr)+'</div>':'')+
        '<div class="row" style="margin-top:8px"><button class="b alt" data-dl="'+r.id+'">⬇ Download</button>'+
        (r.ghStatus==='pending'&&cfg?'<button class="b" data-send="'+r.id+'">↻ Send to GitHub</button>':'')+
        '<button class="b red" data-rm="'+r.id+'">Delete from this device</button></div></div>';}).join('')
      :'<p class="muted">Nothing saved yet. Finish an exercise and press Submit.</p>');
    var find=function(id){return subs.filter(function(r){return String(r.id)===String(id);})[0];};
    el.querySelectorAll('[data-dl]').forEach(function(b){b.onclick=function(){var r=find(b.dataset.dl);if(r&&!W.saveTextFile(r.report,r.file||'answers.txt'))W.ui.toast('Could not download');};});
    el.querySelectorAll('[data-send]').forEach(function(b){b.onclick=function(){var r=find(b.dataset.send);if(!r)return;b.disabled=true;
      W.gh.saveRecord(r).then(function(res){if(res.ok){W.subs.patch(r.id,{ghStatus:'sent',ghErr:''});W.ui.toast('Sent to GitHub');}else{W.subs.patch(r.id,{ghErr:W.gh.msg(res)});W.ui.toast('Not sent');}W.ui.saved(el,subject);});};});
    el.querySelectorAll('[data-rm]').forEach(function(b){b.onclick=function(){var r=find(b.dataset.rm);if(r&&confirm(r.ghStatus==='pending'?'These answers have NOT reached GitHub yet. Delete them anyway?':'Delete this copy from this device? (The copy on GitHub stays.)')){W.subs.remove(r.id);W.ui.saved(el,subject);}};});
    W.gh.flush(subject,function(n){if(n)W.ui.toast('Sent '+n+' saved answer'+(n>1?'s':'')+' to GitHub');W.ui.saved(el,subject);});
  }
};
})();
