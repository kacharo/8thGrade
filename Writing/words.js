/* Writing word list. Each word gets a clue picture (a little scene) that helps her think of a sentence.
   w      = the word            say   = how to say it            def = meaning (kid-friendly)
   ex     = an example sentence (hidden until she taps "Show me an example")
   start  = a sentence starter for "Help me start" (it should use the word)
   clues  = words from the picture she can tap to drop into her sentence
   parts  = the word broken into pieces: [piece, "prefix" | "root" | "suffix", meaning]
   scene  = the clue picture (drawn below with simple shapes)
   To change which words she gets, edit WRITING_TODAY (leave it empty to give her the words she has written the least). */
(function(){
'use strict';
var K='#22303c',BR='#8b5a2b',GR='#1f9d63',OR='#e07b24',RD='#d64545',BL='#2f6fed',YE='#f2c94c',SK='#dcecff',WH='#fff';
function c(x,y,r,f,s,w){return '<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+(f||'none')+'"'+(s?' stroke="'+s+'" stroke-width="'+(w||2)+'"':'')+'/>';}
function e(x,y,rx,ry,f,s,w,rot){return '<ellipse cx="'+x+'" cy="'+y+'" rx="'+rx+'" ry="'+ry+'" fill="'+(f||'none')+'"'+(s?' stroke="'+s+'" stroke-width="'+(w||2)+'"':'')+(rot?' transform="rotate('+rot+' '+x+' '+y+')"':'')+'/>';}
function r(x,y,w,h,f,rx,s,sw,rot){return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+(rx||0)+'" fill="'+(f||'none')+'"'+(s?' stroke="'+s+'" stroke-width="'+(sw||2)+'"':'')+(rot?' transform="rotate('+rot+' '+(x+w/2)+' '+(y+h/2)+')"':'')+'/>';}
function p(d,f,s,w){return '<path d="'+d+'" fill="'+(f||'none')+'"'+(s?' stroke="'+s+'" stroke-width="'+(w||2)+'" stroke-linecap="round" stroke-linejoin="round"':'')+'/>';}
function svg(label,body){return '<svg viewBox="0 0 400 260" role="img" aria-label="'+label+'">'+body+'</svg>';}
// a simple kid: (x,y) = feet, s = size, look = -1 left / 1 right / 0 front
function kid(x,y,s,shirt,look,arms){
  s=s||1;var h=y-118*s,o='';
  o+=p('M'+(x-8*s)+' '+y+' L'+(x-6*s)+' '+(y-40*s)+' M'+(x+8*s)+' '+y+' L'+(x+6*s)+' '+(y-40*s),'none','#3b4a5a',7*s);
  o+=r(x-17*s,y-88*s,34*s,50*s,shirt,10*s);
  o+=arms||p('M'+(x-15*s)+' '+(y-80*s)+' L'+(x-26*s)+' '+(y-48*s)+' M'+(x+15*s)+' '+(y-80*s)+' L'+(x+26*s)+' '+(y-48*s),'none','#c98e62',6*s);
  o+=c(x,h+12*s,19*s,'#f1c7a3');
  o+=p('M'+(x-20*s)+' '+(h+10*s)+' Q'+x+' '+(h-16*s)+' '+(x+20*s)+' '+(h+10*s)+' L'+(x+20*s)+' '+(h+4*s)+' Q'+x+' '+(h-10*s)+' '+(x-20*s)+' '+(h+4*s)+'Z','#5a3a22');
  var ex=look*7*s;
  o+=c(x-6*s+ex,h+12*s,2.4*s,K)+c(x+6*s+ex,h+12*s,2.4*s,K);
  o+=p('M'+(x-5*s+ex)+' '+(h+21*s)+' Q'+(x+ex)+' '+(h+24*s)+' '+(x+5*s+ex)+' '+(h+21*s),'none',K,1.6*s);
  return o;
}
function paw(x,y,rot){return '<g transform="rotate('+(rot||0)+' '+x+' '+y+')">'+e(x,y+3,5,4,'#6b4423')+c(x-6,y-4,2.2,'#6b4423')+c(x,y-6,2.2,'#6b4423')+c(x+6,y-4,2.2,'#6b4423')+'</g>';}
function cookie(x,y,rr){return c(x,y,rr,'#c8935a','#8b5a2b',1.5)+c(x-rr/3,y-rr/4,1.6,'#4a2c17')+c(x+rr/3,y+rr/5,1.6,'#4a2c17')+c(x,y+rr/2.5,1.4,'#4a2c17');}
function cloud(x,y,s,f){return e(x,y,40*s,20*s,f)+c(x-22*s,y-8*s,18*s,f)+c(x+5*s,y-16*s,22*s,f)+c(x+26*s,y-6*s,16*s,f);}

var SCENES={
 evidence:svg('A cookie jar knocked over in the kitchen, cookie crumbs, muddy paw prints, and a dog with crumbs on its nose',
   r(0,0,400,180,'#fdf3e1')+r(0,180,400,80,'#e9e4d6')+
   r(20,108,130,72,'#d8b48a')+r(14,100,142,12,BR,3)+r(40,124,40,40,'none',4,'#b58a5e',2)+r(90,124,40,40,'none',4,'#b58a5e',2)+
   r(250,40,90,70,SK,6,'#b9b2a0',3)+p('M295 40 V110 M250 75 H340','none','#b9b2a0',3)+
   '<g transform="rotate(-70 118 214)">'+r(92,190,52,48,'#bfe3f5',10,'#6aa9c9',2.5)+r(97,182,42,10,'#6aa9c9',4)+'</g>'+
   cookie(150,226,9)+cookie(172,240,8)+cookie(140,246,7)+c(186,222,2,'#c8935a')+c(196,232,2,'#c8935a')+c(160,212,2,'#c8935a')+
   paw(205,222,70)+paw(226,236,70)+paw(246,220,70)+paw(266,234,70)+paw(284,218,70)+
   e(338,212,42,24,'#d9a066')+e(318,232,9,8,'#d9a066')+e(356,234,9,8,'#d9a066')+p('M298 206 Q280 190 288 176','none','#d9a066',7)+
   c(368,182,22,'#d9a066')+e(352,176,7,14,'#8b5a2b',null,0,20)+e(386,186,10,7,'#e6b47c')+c(394,184,3.5,K)+c(364,178,3,K)+
   c(388,196,2,'#c8935a')+c(381,199,1.8,'#c8935a')+c(392,201,1.6,'#c8935a')+
   p('M372 160 Q376 150 382 156','none',K,2)),
 predict:svg('A girl at a picnic in the park looks up at dark clouds coming. She holds a closed umbrella',
   '<defs><linearGradient id="sk1" x1="0" x2="1"><stop offset="0" stop-color="#cfe6ff"/><stop offset="1" stop-color="#7d8896"/></linearGradient></defs>'+
   r(0,0,400,190,'url(#sk1)')+r(0,180,400,80,'#8fcf7f')+c(50,40,22,YE)+
   cloud(250,55,1,'#6b7480')+cloud(330,70,1.2,'#565e69')+cloud(360,35,0.8,'#6b7480')+
   p('M300 98 l-6 14 M320 104 l-6 14 M340 96 l-6 14 M360 106 l-6 14 M380 98 l-6 14','none',BL,3)+
   p('M200 30 q14 -6 28 0 M196 46 q14 -6 28 0','none','#ffffff',2.5)+
   r(170,206,130,36,RD,4)+p('M196 206 V242 M222 206 V242 M248 206 V242 M274 206 V242 M170 218 H300 M170 230 H300','none','#fff',2)+
   r(240,186,40,24,BR,4)+p('M244 186 Q260 168 276 186','none',BR,3)+
   kid(110,236,1,'#f4a261',1,
     p('M95 156 L84 188 M125 156 L138 186','none','#c98e62',6))+
   p('M139 186 L150 240','none',K,3)+p('M139 186 Q134 176 128 180','none',K,3)+
   p('M141 196 L152 200 L156 232 L148 234Z','#7b2cbf','#5a1f8f',1.5)),
 observe:svg('A student looks through a magnifying glass at a caterpillar on a leaf, with a notebook and pencil',
   r(0,0,400,260,'#eef6ea')+kid(330,240,0.9,'#4c8bf5',-1)+r(0,200,400,60,'#c8a27a')+
   p('M60 190 Q40 120 120 90 Q200 70 230 150 Q170 200 60 190Z','#5cb85c','#2e7d32',3)+p('M70 186 Q140 140 222 148','none','#2e7d32',2.5)+
   c(120,132,9,'#9ccc65','#558b2f',1.5)+c(136,128,9,'#9ccc65','#558b2f',1.5)+c(152,126,9,'#9ccc65','#558b2f',1.5)+c(168,128,10,'#aed581','#558b2f',1.5)+c(171,125,2,K)+
   p('M172 117 l3 -8 M168 117 l-2 -8','none',K,1.5)+
   c(150,128,46,'rgba(220,236,255,.35)','#5d6b78',7)+p('M184 160 L232 214','none',BR,12)+
   r(250,208,120,44,WH,6,'#b9b2a0',2,-3)+p('M262 220 H356 M262 232 H356 M262 244 H320','none','#9db7e0',2)+
   p('M300 250 L366 230','none',YE,7)+p('M366 230 l9 -3','none',K,3)),
 cautious:svg('A kid stops at the edge of a crosswalk and looks both ways. A car is coming down the street',
   r(0,0,400,120,SK)+r(0,120,400,40,'#cfc9bb')+r(0,160,400,70,'#5b6470')+r(0,230,400,30,'#cfc9bb')+
   r(30,40,70,80,'#e2b27c')+r(110,20,60,100,'#b5c7d8')+r(300,50,80,70,'#d9a5b3')+
   r(240,165,20,60,WH)+r(272,165,20,60,WH)+r(304,165,20,60,WH)+r(336,165,20,60,WH)+
   p('M20 195 H60 M100 195 H140','none',YE,4)+
   r(40,170,96,34,RD,12)+r(60,154,58,22,RD,10)+r(66,158,22,14,SK,3)+r(92,158,22,14,SK,3)+c(62,206,10,K)+c(116,206,10,K)+c(136,186,5,YE)+
   p('M150 180 h18 M150 190 h24 M150 200 h18','none','#9aa3ad',2.5)+
   kid(278,158,0.85,'#2a9d8f',-1)+
   r(372,60,6,100,'#555')+r(362,50,26,40,K,5)+c(375,62,6,RD)+c(375,78,6,'#555')),
 enormous:svg('A small kid stands next to an enormous pumpkin with a blue prize ribbon. A normal pumpkin sits beside the kid',
   r(0,0,400,180,SK)+r(0,180,400,80,'#9bd17e')+
   p('M0 150 H400 M0 168 H400','none','#c8a27a',4)+p('M20 140 V180 M80 140 V180 M140 140 V180 M200 140 V180 M260 140 V180 M320 140 V180 M380 140 V180','none','#c8a27a',4)+
   e(250,170,120,74,OR,'#b85b12',3)+e(250,170,70,74,'none','#b85b12',2.5)+e(250,170,24,74,'none','#b85b12',2.5)+
   p('M250 98 Q246 80 262 70','none','#4e7d2a',10)+p('M262 74 Q290 60 300 80','none',GR,4)+
   c(318,150,16,BL,'#1d4fb8',2)+p('M312 164 l-6 26 l8 -6 l4 8 M324 164 l4 26 l-8 -6 l-4 8','#2f6fed','#1d4fb8',1.5)+c(318,150,7,'#ffd166')+
   kid(70,236,0.8,'#e76f51',1,p('M58 162 L46 186 M82 162 L100 140','none','#c98e62',5))+
   e(110,226,16,12,OR,'#b85b12',2)+p('M110 214 l2 -6','none','#4e7d2a',4))
};

window.WORDS=[
 {w:'evidence',say:'EV-ih-dents',def:'Facts or clues that show something is true.',
  ex:'The crumbs on the dog’s nose were evidence that he ate the cookies.',start:'The evidence showed that',
  clues:['dog','cookie jar','crumbs','paw prints','kitchen floor'],
  parts:[['e','prefix','out'],['vid','root','see'],['ence','suffix','a thing that is']],scene:SCENES.evidence},
 {w:'predict',say:'prih-DIKT',def:'To tell what you think will happen before it happens.',
  ex:'I predict it will rain soon because the clouds are getting dark.',start:'I predict that',
  clues:['dark clouds','rain','umbrella','picnic','park'],
  parts:[['pre','prefix','before'],['dict','root','say']],scene:SCENES.predict},
 {w:'observe',say:'ub-ZURV',def:'To watch something carefully to learn about it.',
  ex:'I used a magnifying glass to observe the caterpillar eating a leaf.',start:'When I observe',
  clues:['magnifying glass','caterpillar','leaf','notebook','scientist'],
  parts:[['ob','prefix','toward'],['serve','root','watch, keep']],scene:SCENES.observe},
 {w:'cautious',say:'KAW-shus',def:'Careful to stay away from danger.',
  ex:'She was cautious and looked both ways before crossing the street.',start:'I was cautious when',
  clues:['crosswalk','car','street','look both ways','safe'],
  parts:[['caut','root','careful'],['ious','suffix','full of']],scene:SCENES.cautious},
 {w:'enormous',say:'ih-NOR-mus',def:'Very, very big.',
  ex:'The enormous pumpkin was bigger than the farmer’s truck.',start:'The enormous',
  clues:['pumpkin','blue ribbon','prize','tiny','farm'],
  parts:[['e','prefix','out of'],['norm','root','normal size'],['ous','suffix','full of']],scene:SCENES.enormous}
];
// The words for her next writing session. Leave empty [] to give her the words she has written the least.
window.WRITING_TODAY=['evidence','predict','observe','cautious','enormous'];
})();
