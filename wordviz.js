/* wordviz.js - picture + word-part cards, and the "Write it" step.
   Used by every subject page and exercise. Needs shared.js first; wordpics.js is optional but gives the pictures.
   - W.viz.pic(word)     -> the picture for a word (from wordpics.js, or the word's pic emoji in words.js)
   - W.viz.parts(word)   -> the word broken into prefix / root / suffix, with what each piece means
   - W.viz.writeStep(o)  -> "Write it": she writes her own sentence with 3 of the words
   - W.viz.pictureWrite(o) -> "Write sentences": one sentence per lesson word (up to 10), with picture clues */
(function(){
'use strict';
var W=window.W=window.W||{};
var esc=W.esc||function(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});};

/* ---------- styles (kept here so no page needs its own copy) ---------- */
var CSS=[
'.wpic{display:flex;align-items:center;justify-content:center;background:#fbfaf6;border:2px solid var(--line,#e1ddd0);border-radius:14px;margin:4px 0 10px;padding:4px;min-height:96px}',
'.wpic svg{width:100%;max-width:300px;height:auto;display:block}',
'.wpic.big svg{max-width:380px}',
'.wpic.small{min-height:0;margin:6px 0}.wpic.small svg{max-width:200px}',
'.wpic-emoji{font-size:72px;line-height:1.2}',
'.wparts{margin:8px 0 6px}',
'.wp-row{display:flex;flex-wrap:wrap;align-items:stretch;gap:4px}',
'.wp{display:flex;flex-direction:column;align-items:center;justify-content:flex-start;border-radius:12px;padding:6px 10px 7px;min-width:58px;border:2px solid}',
'.wp b{font-size:22px;letter-spacing:.5px;line-height:1.15}',
'.wp small{font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.6px;opacity:.85}',
'.wp i{font-style:normal;font-size:14px;font-weight:700;color:#22303c;text-align:center;max-width:130px;line-height:1.2;margin-top:2px}',
'.wp-prefix{background:#e3edff;border-color:#2f6fed;color:#2f6fed}',
'.wp-root{background:#dff5ea;border-color:#1f9d63;color:#1f9d63}',
'.wp-suffix{background:#fff0dc;border-color:#d9822b;color:#b8661a}',
'.wp-abbr{background:#efe6fa;border-color:#6a4c93;color:#6a4c93}',
'.wp-word{background:#f1efe8;border-color:#b9b2a0;color:#5d6b78}',
'.wp-plus{align-self:center;font-weight:800;color:#5d6b78;font-size:18px}',
'.wp-gap{width:14px}',
'.wp-sum{font-size:15px;color:#5d6b78;margin-top:6px;line-height:1.4}',
'.wp-guess{font-size:12px;color:#5d6b78;font-style:italic}',
'.wp-key{display:flex;gap:6px;flex-wrap:wrap;margin:4px 0 10px;font-size:13px;font-weight:700}',
'.wp-key span{border-radius:99px;padding:2px 10px;border:2px solid}',
'.wr-word{font-size:34px;font-weight:800;margin:2px 0}',
'.wr-box{width:100%;min-height:110px;font:inherit;font-size:22px;line-height:1.5;padding:12px;border:3px solid var(--brand,#2f6fed);border-radius:14px;background:#fff;resize:vertical}',
'.wr-checks{list-style:none;padding:0;margin:10px 0;display:grid;gap:6px}',
'.wr-checks li{display:flex;align-items:center;gap:10px;font-size:18px;padding:6px 10px;border-radius:10px;background:#f4f2ec}',
'.wr-checks li .ic{width:28px;height:28px;border-radius:99px;display:flex;align-items:center;justify-content:center;font-weight:800;background:#ddd;color:#fff;flex:none}',
'.wr-checks li.ok{background:var(--goodbg,#dff5ea)}.wr-checks li.ok .ic{background:var(--good,#1f9d63)}',
'.wr-starter{display:inline-block;background:var(--brand2,#e8f0ff);color:var(--brand,#2f6fed);font-weight:700;border-radius:12px;padding:8px 12px;margin:6px 0}',
'.wr-mine{background:#fffdf5;border:2px dashed var(--line,#e1ddd0);border-radius:12px;padding:10px 12px;margin:8px 0;font-size:20px;line-height:1.5}',
'.wr-mine b{color:var(--brand,#2f6fed)}',
'.wr-top{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:14px;align-items:start}',
'.pw-look{font-weight:700;color:var(--brand,#2f6fed);margin:2px 0 6px}',
'.pw-clues{background:#fffbea;border:2px dashed #e0b84a;border-radius:14px;padding:8px 10px;margin:10px 0}',
'.pw-clues .t{font-size:15px;color:#8a6d00;font-weight:700;margin-bottom:4px}',
'.pw-clue{display:inline-block;border:2px solid #e0b84a;background:#fff;border-radius:99px;padding:6px 14px;margin:4px;font:inherit;font-size:17px;font-weight:700;cursor:pointer;color:#22303c}',
'.pw-clue.used{background:#fff1b8}',
'.pw-mic{font-size:15px;color:var(--muted,#5d6b78);margin:6px 0}',
'.pw-ex{background:var(--brand2,#e8f0ff);border-radius:12px;padding:8px 12px;margin:8px 0;font-style:italic}',
'@media (max-width:640px){.pw-clue{font-size:16px;padding:5px 12px}.wr-top{grid-template-columns:1fr}.wp b{font-size:19px}.wr-word{font-size:28px}.wr-box{font-size:19px}}'
].join('\n');
function addCSS(){if(document.getElementById('wviz-css'))return;var s=document.createElement('style');s.id='wviz-css';s.textContent=CSS;(document.head||document.documentElement).appendChild(s);}
addCSS();

/* ---------- find a word in this page's words.js ---------- */
function entry(word){
  var k=String(word||'').toLowerCase(),L=window.WORDS||[];
  for(var i=0;i<L.length;i++)if(String(L[i].w).toLowerCase()===k)return L[i];
  return null;
}

/* ---------- best guess at word parts, for words that do not list them ---------- */
var PRE=[['inter','between'],['trans','across'],['super','above'],['multi','many'],['under','below'],['over','too much'],['anti','against'],['semi','half'],['dis','not, opposite'],['mis','wrongly'],['non','not'],['pre','before'],['sub','under'],['un','not'],['re','again, back']];
var SUF=[['ation','the act of'],['tion','the act of'],['sion','the act of'],['ness','the state of being'],['ment','a result, a thing'],['able','can be'],['ible','can be'],['less','without'],['ful','full of'],['ous','full of, having'],['ity','the state of'],['ize','to make'],['ify','to make'],['ly','in a way']];
function guess(word){
  var w=String(word||'').toLowerCase();
  if(!/^[a-z]{5,}$/.test(w))return null;
  var parts=[],i,pre=null,suf=[];
  for(i=0;i<PRE.length;i++){var p=PRE[i][0];if(w.indexOf(p)===0&&w.length-p.length>=(p==='re'||p==='un'?5:4)&&!((p==='re'||p==='un')&&/^[aeiou]/.test(w.slice(p.length)))){pre=PRE[i];w=w.slice(p.length);break;}}
  for(var round=0;round<2;round++){
    for(i=0;i<SUF.length;i++){var s=SUF[i][0];if(w.length-s.length>=4&&w.slice(-s.length)===s){suf.unshift(SUF[i]);w=w.slice(0,-s.length);break;}}
  }
  if(!pre&&!suf.length)return null;
  if(pre)parts.push([pre[0],'prefix',pre[1]]);
  parts.push([w,'root','']);
  suf.forEach(function(s){parts.push([s[0],'suffix',s[1]]);});
  return parts;
}

var KIND={prefix:'prefix',root:'root',suffix:'suffix',abbr:'stands for',word:'word'};
function partsHTML(parts,guessed){
  var row='',groups=[[]],prev=false;
  parts.forEach(function(x){
    if(typeof x==='string'||!x||!x[0]){row+='<span class="wp-gap"></span>';prev=false;groups.push([]);return;}
    var t=x[1]||'root',m=x[2]||'';
    row+=(prev?'<span class="wp-plus">+</span>':'')+'<span class="wp wp-'+esc(t)+'"><b>'+esc(x[0])+'</b><small>'+esc(KIND[t]||t)+'</small>'+(m?'<i>'+esc(m)+'</i>':'')+'</span>';
    prev=true;if(m)groups[groups.length-1].push(t==='abbr'?x[0]+' = '+m:x[0]+' ('+m+')');
  });
  var line=groups.filter(function(g){return g.length;}).map(function(g){return g.join(' + ');}).join('   |   ');
  return '<div class="wparts"><div class="wp-row">'+row+'</div>'+(line&&parts.length>1?'<div class="wp-sum">'+esc(line)+'</div>':'')+(guessed?'<div class="wp-guess">Word parts are a best guess.</div>':'')+'</div>';
}

W.viz={
  entry:entry,
  guess:guess,
  /* the picture, wrapped. size: '' | 'big' | 'small' */
  pic:function(word,size){
    var svg=window.WORDPICS&&WORDPICS.svg(word),e=entry(word);
    if(svg)return '<div class="wpic '+(size||'')+'">'+svg+'</div>';
    if(e&&e.pic)return '<div class="wpic '+(size||'')+'"><span class="wpic-emoji" role="img" aria-label="Picture for '+esc(e.w)+'">'+esc(e.pic)+'</span></div>';
    return '';
  },
  hasPic:function(word){var e=entry(word);return !!((window.WORDPICS&&WORDPICS.has(word))||(e&&e.pic));},
  /* word parts. Returns '' when the word has none. */
  parts:function(word){
    var e=entry(word);
    if(e&&e.parts&&e.parts.length)return partsHTML(e.parts,false);
    if(e&&e.parts)return '';
    var gp=guess(word);return gp?partsHTML(gp,true):'';
  },
  partsList:function(word){var e=entry(word);return (e&&e.parts)||guess(word)||[];},
  key:function(){return '<div class="wp-key"><span class="wp-prefix">prefix = front</span><span class="wp-root">root = main part</span><span class="wp-suffix">suffix = end</span></div>';},
  starter:function(word){var e=entry(word);return (e&&e.start)||'';},
  usesWord:usesWord,
  writeStep:writeStep
};

/* ---------- writing checks ---------- */
function stem(w){w=w.toLowerCase().replace(/[^a-z]/g,'');if(w.length>4&&/[ey]$/.test(w))w=w.slice(0,-1);return w;}
function tokens(t){return String(t).toLowerCase().replace(/[’']/g,'').split(/[^a-z0-9]+/).filter(Boolean);}
function usesWord(text,word){
  var tk=tokens(text);
  return String(word).split(/\s+/).every(function(part){var s=stem(part);return tk.some(function(x){return x.indexOf(s)===0;});});
}
function countWords(t){return tokens(t).length;}

/* ---------- "Write it" ----------
   o = {stage, vocab:[[word,def,ex,say],...], say(text,rate), spoken(text), add(pts,max), log(entry), next(), count (default 3), num ('2b') } */
function writeStep(o){
  var stage=o.stage,V=o.vocab||[],N=Math.min(o.count||3,V.length),say=o.say||function(){},spoken=o.spoken||function(t){return t;};
  if(!N){o.next();return;}
  var pr=(W.practice&&W.practice.list())||{},seen=(W.store&&W.store.get('written',{}))||{};
  var idx=V.map(function(v,i){return i;}).sort(function(a,b){
    var pa=pr[V[a][0].toLowerCase()]?0:1,pb=pr[V[b][0].toLowerCase()]?0:1;if(pa!==pb)return pa-pb;
    var sa=seen[V[a][0].toLowerCase()]||0,sb=seen[V[b][0].toLowerCase()]||0;if(sa!==sb)return sa-sb;
    return Math.random()-0.5;});
  var pick=idx.slice(0,N),n=0,done=[];
  o.add(0,N*10);
  function head(){return '<div class="card"><h2>'+esc(o.num||'')+' Write it</h2><p class="muted">Word '+(n+1)+' of '+N+'. Write your own sentence. Use the word!</p>'+
    '<div class="bar"><i style="width:'+Math.round(n/N*100)+'%"></i></div>';}
  function show(){
    var v=V[pick[n]],word=v[0],st=W.viz.starter(word)||'',used=false;
    stage.innerHTML=head()+
      '<div class="wr-top"><div>'+W.viz.pic(word,'big')+'</div><div>'+
        '<div class="wr-word">'+esc(word)+' <button class="say" id="wHear" aria-label="Hear the word">🔊</button></div>'+
        W.viz.parts(word)+
        '<div class="def"><b>Meaning:</b> '+esc(v[1])+'</div>'+
        '<div class="ex">Example: '+esc(v[2])+'</div>'+
      '</div></div>'+
      (st?'<div class="row" style="margin-top:10px"><button class="b alt" id="wStart">✏️ Help me start</button><span class="muted" id="wStartTxt"></span></div>':'')+
      '<textarea class="wr-box" id="wBox" rows="3" spellcheck="true" autocapitalize="sentences" placeholder="Type your sentence here…"></textarea>'+
      '<ul class="wr-checks" id="wChecks"></ul>'+
      '<div class="row"><button class="b green" id="wDone" disabled>✓ Done</button><button class="b alt" id="wRead">🔊 Read my sentence</button><button class="b alt" id="wSkip" style="margin-left:auto">Skip this word</button></div>'+
      '<div id="fb"></div></div>';
    var box=document.getElementById('wBox');
    document.getElementById('wHear').onclick=function(){say(spoken(word),0.7);};
    document.getElementById('wRead').onclick=function(){var t=box.value.trim();say(t?spoken(t):'Type your sentence first.');};
    if(st)document.getElementById('wStart').onclick=function(){
      used=true;if(box.value.trim().toLowerCase().indexOf(st.toLowerCase())!==0)box.value=st+' '+box.value.trim();
      box.value=box.value.replace(/\s*$/,' ');box.focus();try{box.setSelectionRange(box.value.length,box.value.length);}catch(e){}
      document.getElementById('wStartTxt').textContent='Now finish the sentence in your own words.';check();};
    function checks(){
      var t=box.value.trim(),own=countWords(t)-(used&&st&&t.toLowerCase().indexOf(st.toLowerCase())===0?countWords(st):0);
      var c=[
        {ok:usesWord(t,word),txt:'I used the word <b>'+esc(word)+'</b>',pts:4,need:true},
        {ok:countWords(t)>=6,txt:'At least 6 words ('+countWords(t)+' so far)',pts:2,need:true},
        {ok:/^[A-Z]/.test(t),txt:'Starts with a capital letter',pts:2},
        {ok:/[.!?]["”’)]?$/.test(t),txt:'Ends with . ! or ?',pts:2}];
      if(used&&st)c.push({ok:own>=3,txt:'I added at least 3 words of my own',pts:0,need:true});
      return c;
    }
    function check(){
      var c=checks();
      document.getElementById('wChecks').innerHTML=c.map(function(x){return '<li class="'+(x.ok?'ok':'')+'"><span class="ic">'+(x.ok?'✓':'')+'</span><span>'+x.txt+'</span></li>';}).join('');
      document.getElementById('wDone').disabled=!c.every(function(x){return x.ok||!x.need;});
    }
    box.oninput=check;check();
    document.getElementById('wDone').onclick=function(){
      var c=checks(),t=box.value.trim(),pts=c.reduce(function(s,x){return s+(x.ok?x.pts:0);},0),all=c.every(function(x){return x.ok;});
      o.add(pts,0);
      o.log({sec:(o.num?o.num+' ':'')+'Write it',q:'Write a sentence with the word: '+word+(used?' (used the starter "'+st+'")':''),tried:[t],
        answer:'Her own sentence. Checks: '+c.map(function(x){return (x.ok?'[x] ':'[ ] ')+x.txt.replace(/<[^>]+>/g,'');}).join(', '),first:all});
      try{seen[word.toLowerCase()]=(seen[word.toLowerCase()]||0)+1;W.store.set('written',seen);}catch(e){}
      done.push({w:word,t:t});
      var f=document.getElementById('fb');f.className='good';f.innerHTML=(all?'⭐ Great sentence! ':'✓ Nice! ')+'+'+pts+' points';
      document.getElementById('wDone').disabled=true;document.getElementById('wSkip').disabled=true;box.readOnly=true;
      setTimeout(nextWord,all?1200:1600);
    };
    document.getElementById('wSkip').onclick=function(){
      o.log({sec:(o.num?o.num+' ':'')+'Write it',q:'Write a sentence with the word: '+word,tried:[box.value.trim()||'(skipped)'],answer:'(skipped)',first:false});
      done.push({w:word,t:'',skip:true});nextWord();};
  }
  function nextWord(){n++;if(n<N)show();else summary();}
  function summary(){
    var mine=done.filter(function(d){return !d.skip;});
    stage.innerHTML='<div class="card"><h2>'+esc(o.num||'')+' Write it: your sentences</h2>'+
      (mine.length?mine.map(function(d){
        var re=new RegExp('('+stem(d.w.split(/\s+/)[0]).replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'[a-z]*)','i');
        return '<div class="wr-mine">'+esc(d.t).replace(re,'<b>$1</b>')+'</div>';}).join('')+'<p class="muted">Tap 🔊 to hear all of them.</p>':'<p class="muted">You skipped the writing this time. Try it next time!</p>')+
      '<div class="row" style="margin-top:12px">'+(mine.length?'<button class="b alt" id="wAll">🔊 Hear my sentences</button>':'')+'<button class="b green" id="next">Next: Match &rarr;</button></div></div>';
    if(mine.length)document.getElementById('wAll').onclick=function(){say(spoken(mine.map(function(d){return d.t;}).join(' ')));};
    document.getElementById('next').onclick=o.next;
  }
  show();
}
/* ---------- "Write sentences" with picture clues ----------
   One word per screen: the word's picture, its parts and meaning, tap-in picture clues (clues:[...] in words.js),
   "Help me start" (start in words.js), "Show me an example" (the word's example sentence), and live checks.
   o = {stage, vocab:[[word,def,ex,say],...], max (default 10), num ('9.'), say(text,rate), spoken(text), add(pts,max), log(entry), next() }
   Points per sentence: used the word 4, at least 6 words 2, wrote about the picture 2, capital 1, end mark 1. */
function pictureWrite(o){
  var stage=o.stage,V=o.vocab||[],say=o.say||function(){},spoken=o.spoken||function(t){return t;};
  var pr=(W.practice&&W.practice.list())||{},seen=(W.store&&W.store.get('written',{}))||{};
  var idx=V.map(function(v,i){return i;}).sort(function(a,b){
    var pa=pr[V[a][0].toLowerCase()]?0:1,pb=pr[V[b][0].toLowerCase()]?0:1;if(pa!==pb)return pa-pb;
    var sa=seen[V[a][0].toLowerCase()]||0,sb=seen[V[b][0].toLowerCase()]||0;if(sa!==sb)return sa-sb;
    return a-b;});
  var pick=idx.slice(0,Math.min(o.max||10,V.length)),N=pick.length,n=0,done=[];
  if(!N){o.next();return;}
  o.add(0,N*10);
  function $(id){return document.getElementById(id);}
  function show(){
    window.scrollTo(0,0);
    var v=V[pick[n]],word=v[0],e=entry(word)||{},st=e.start||'',clues=e.clues||[],usedStart=false,sawEx=false;
    stage.innerHTML='<div class="card"><h2>'+esc(o.num||'')+' Write sentences</h2><p class="muted">Word '+(n+1)+' of '+N+'. Look at the picture, then write your own sentence with the word.</p>'+
      '<div class="bar"><i style="width:'+Math.round(n/N*100)+'%"></i></div>'+
      '<div class="wr-top"><div>'+W.viz.pic(word,'big')+'<div class="pw-look">🔍 Look at the picture. What is happening?</div></div><div>'+
        '<div class="wr-word">'+esc(word)+' <button class="say" id="pwHear" aria-label="Hear the word">🔊</button></div>'+
        (v[3]?'<div class="rs">say it: '+esc(v[3])+'</div>':'')+W.viz.parts(word)+
        '<div class="def"><b>Meaning:</b> '+esc(v[1])+' <button class="say" id="pwDef" aria-label="Hear the meaning">🔊</button></div>'+
        (clues.length?'<div class="pw-clues"><div class="t">🧩 Picture clues: tap one to hear it and put it in your sentence</div>'+
          clues.map(function(c,i){return '<button class="pw-clue" data-c="'+i+'">'+esc(c)+'</button>';}).join('')+'</div>':'')+
      '</div></div>'+
      '<div class="row" style="margin-top:6px">'+(st?'<button class="b alt" id="pwStart">✏️ Help me start</button>':'')+(v[2]?'<button class="b alt" id="pwEx">👀 Show me an example</button>':'')+'</div>'+
      '<div id="pwExBox"></div>'+
      '<textarea class="wr-box" id="pwBox" rows="3" spellcheck="true" autocapitalize="sentences" placeholder="Type your sentence here…" style="margin-top:10px"></textarea>'+
      '<div class="pw-mic">🎤 Don’t feel like typing? Tap the microphone on your keyboard and <b>say</b> your sentence.</div>'+
      '<ul class="wr-checks" id="pwChecks"></ul>'+
      '<div class="row"><button class="b green" id="pwDone" disabled>✓ Done</button><button class="b alt" id="pwRead">🔊 Read my sentence</button><button class="b alt" id="pwSkip" style="margin-left:auto">Skip</button></div>'+
      '<div id="fb"></div></div>';
    var box=$('pwBox');
    $('pwHear').onclick=function(){say(spoken(word),0.7);};
    $('pwDef').onclick=function(){say(spoken(word+'. '+v[1]));};
    $('pwRead').onclick=function(){var t=box.value.trim();say(t?spoken(t):'Type your sentence first.');};
    stage.querySelectorAll('[data-c]').forEach(function(b){b.onclick=function(){
      var c=clues[+b.dataset.c];say(spoken(c));b.classList.add('used');
      var s=box.selectionStart==null?box.value.length:box.selectionStart,a=box.value.slice(0,s),z=box.value.slice(s);
      var ins=(a&&!/\s$/.test(a)?' ':'')+c+(/^\s/.test(z)?'':' ');
      box.value=a+ins+z;var pos=(a+ins).length;box.focus();try{box.setSelectionRange(pos,pos);}catch(x){}check();};});
    if(st)$('pwStart').onclick=function(){
      usedStart=true;if(box.value.trim().toLowerCase().indexOf(st.toLowerCase())!==0)box.value=st+' '+box.value.trim();
      box.value=box.value.replace(/\s*$/,' ');box.focus();try{box.setSelectionRange(box.value.length,box.value.length);}catch(x){}check();};
    if(v[2])$('pwEx').onclick=function(){sawEx=true;
      $('pwExBox').innerHTML='<div class="pw-ex">Example: '+esc(v[2])+' <button class="say" id="pwExSay" aria-label="Hear it">🔊</button><br><small>Now write your <b>own</b> sentence about the picture.</small></div>';
      $('pwExSay').onclick=function(){say(spoken(v[2]));};};
    function checks(){
      var t=box.value.trim(),cu=clues.filter(function(c){return usesWord(t,c);});
      var own=countWords(t)-(usedStart&&t.toLowerCase().indexOf(st.toLowerCase())===0?countWords(st):0);
      var L=[
        {ok:usesWord(t,word),txt:'I used the word <b>'+esc(word)+'</b>',pts:4,need:true},
        {ok:countWords(t)>=6,txt:'At least 6 words ('+countWords(t)+' so far)',pts:2,need:true}];
      if(clues.length)L.push({ok:cu.length>0,txt:'I wrote about the picture'+(cu.length?' ('+esc(cu.join(', '))+')':' (use a picture clue)'),pts:2});
      L.push({ok:/^[A-Z]/.test(t),txt:'Starts with a capital letter',pts:clues.length?1:2});
      L.push({ok:/[.!?]["”’)]?$/.test(t),txt:'Ends with . ! or ?',pts:clues.length?1:2});
      if(usedStart)L.push({ok:own>=3,txt:'I added at least 3 words of my own',pts:0,need:true});
      return L;
    }
    function check(){
      var L=checks();
      $('pwChecks').innerHTML=L.map(function(x){return '<li class="'+(x.ok?'ok':'')+'"><span class="ic">'+(x.ok?'✓':'')+'</span><span>'+x.txt+'</span></li>';}).join('');
      $('pwDone').disabled=!L.every(function(x){return x.ok||!x.need;});
    }
    box.oninput=check;check();
    $('pwDone').onclick=function(){
      var L=checks(),t=box.value.trim(),pts=L.reduce(function(s,x){return s+(x.ok?x.pts:0);},0),all=L.every(function(x){return x.ok;});
      var help=[];if(usedStart)help.push('used the starter "'+st+'"');if(sawEx)help.push('looked at the example');
      o.add(pts,0);
      o.log({sec:(o.num?o.num+' ':'')+'Write sentences',q:'Write a sentence with the word: '+word+(help.length?' ('+help.join('; ')+')':''),tried:[t],
        answer:'Her own sentence ('+pts+' of 10 points). Checks: '+L.map(function(x){return (x.ok?'[x] ':'[ ] ')+x.txt.replace(/<[^>]+>/g,'');}).join(', '),first:all});
      try{seen[word.toLowerCase()]=(seen[word.toLowerCase()]||0)+1;W.store.set('written',seen);}catch(x){}
      done.push({w:word,t:t});
      var f=$('fb');f.className='good';f.style.marginTop='10px';f.innerHTML=(all?'⭐ Great sentence! ':'✓ Nice! ')+'+'+pts+' points';
      $('pwDone').disabled=$('pwSkip').disabled=true;box.readOnly=true;
      setTimeout(nextWord,all?1200:1700);
    };
    $('pwSkip').onclick=function(){
      o.log({sec:(o.num?o.num+' ':'')+'Write sentences',q:'Write a sentence with the word: '+word,tried:[box.value.trim()||'(skipped)'],answer:'(skipped)',first:false});
      done.push({w:word,t:'',skip:true});nextWord();};
  }
  function nextWord(){n++;if(n<N)show();else summary();}
  function summary(){
    window.scrollTo(0,0);
    var mine=done.filter(function(d){return !d.skip;});
    stage.innerHTML='<div class="card"><h2>'+esc(o.num||'')+' Your sentences</h2>'+
      (mine.length?mine.map(function(d){
        var re=new RegExp('('+stem(d.w.split(/\s+/)[0]).replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'[a-z]*)','i');
        return '<div class="wr-mine">'+esc(d.t).replace(re,'<b>$1</b>')+'</div>';}).join('')
       :'<p class="muted">You skipped the writing this time. Try it next time!</p>')+
      '<div class="row" style="margin-top:12px">'+(mine.length?'<button class="b alt" id="pwAll">🔊 Hear my sentences</button>':'')+'<button class="b green" id="next">Next: Submit &rarr;</button></div></div>';
    if(mine.length)$('pwAll').onclick=function(){say(spoken(mine.map(function(d){return d.t;}).join(' ')));};
    $('next').onclick=o.next;
  }
  show();
}
W.viz.pictureWrite=pictureWrite;

})();
