/* wordpics.js - a picture for each vocabulary word (used by wordviz.js).
   Every picture is drawn with simple shapes so it loads fast and looks sharp on any screen.
   To add a picture: add a line to PICS below, keyed by the word in lower case.
   A word with no picture here can still show a big emoji: add  pic:'🎈'  to the word in words.js. */
(function(){
'use strict';
var K='#22303c',G='#5d6b78',BL='#2f6fed',GR='#1f9d63',OR='#d9822b',RD='#d64545',PU='#6a4c93',YE='#f2c94c',BR='#8b5a2b',SKY='#dcecff',LG='#e9e4d6';
var F='font-family="Trebuchet MS,Verdana,sans-serif"';
function t(x,y,s,o){o=o||{};return '<text x="'+x+'" y="'+y+'" font-size="'+(o.s||13)+'" font-weight="'+(o.w||700)+'" fill="'+(o.c||K)+'" text-anchor="'+(o.a||'middle')+'" '+F+'>'+s+'</text>';}
function c(x,y,r,f,s,w){return '<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+(f||'none')+'"'+(s?' stroke="'+s+'" stroke-width="'+(w||2)+'"':'')+'/>';}
function e(x,y,rx,ry,f,s,w,rot){return '<ellipse cx="'+x+'" cy="'+y+'" rx="'+rx+'" ry="'+ry+'" fill="'+(f||'none')+'"'+(s?' stroke="'+s+'" stroke-width="'+(w||2)+'"':'')+(rot?' transform="rotate('+rot+' '+x+' '+y+')"':'')+'/>';}
function r(x,y,w,h,f,rx,s,sw){return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+(rx||0)+'" fill="'+(f||'none')+'"'+(s?' stroke="'+s+'" stroke-width="'+(sw||2)+'"':'')+'/>';}
function p(d,f,s,w,extra){return '<path d="'+d+'" fill="'+(f||'none')+'"'+(s?' stroke="'+s+'" stroke-width="'+(w||2)+'" stroke-linecap="round" stroke-linejoin="round"':'')+(extra||'')+'/>';}
function l(x1,y1,x2,y2,s,w,dash){return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+(s||K)+'" stroke-width="'+(w||2)+'" stroke-linecap="round"'+(dash?' stroke-dasharray="'+dash+'"':'')+'/>';}
function ar(x1,y1,x2,y2,col,w){col=col||G;w=w||3;var a=Math.atan2(y2-y1,x2-x1),h=9;
  var bx=x2-h*0.6*Math.cos(a),by=y2-h*0.6*Math.sin(a);
  return l(x1,y1,bx,by,col,w)+'<polygon points="'+x2+','+y2+' '+(x2-h*Math.cos(a-0.5)).toFixed(1)+','+(y2-h*Math.sin(a-0.5)).toFixed(1)+' '+(x2-h*Math.cos(a+0.5)).toFixed(1)+','+(y2-h*Math.sin(a+0.5)).toFixed(1)+'" fill="'+col+'"/>';}
function poly(pts,f,s,w){return '<polygon points="'+pts+'" fill="'+(f||'none')+'"'+(s?' stroke="'+s+'" stroke-width="'+(w||2)+'" stroke-linejoin="round"':'')+'/>';}
function g(x,y,k,inner){return '<g transform="translate('+x+' '+y+') scale('+k+')">'+inner+'</g>';}

/* ---- little building blocks ---- */
function mouse(x,y,k,fur,stroke){fur=fur||'#333';stroke=stroke||(fur==='#fff'?'#777':fur);
  return g(x,y,k||1,
    p('M-26 4 C-44 8 -46 -8 -58 -2',null,'#c98b8b',2.5)+
    e(0,0,27,17,fur,stroke,2)+c(20,-12,7,'#f4b6b6',stroke,1.5)+c(24,-4,12,fur,stroke,2)+c(31,-7,2.2,K)+c(36,-1,2.5,'#e77'));}
function moon(x,y,R,f,wax){var out=c(x,y,R,'#3b4252','#2b313d',1.5);if(f<=0.02)return out;if(f>=0.98)return out+c(x,y,R,'#f6e7a3','#d9c46a',1.5);
  var rx=(R*Math.abs(1-2*f)).toFixed(1),s1=wax?1:0,s2=f<0.5?(wax?0:1):(wax?1:0);
  return out+p('M'+x+' '+(y-R)+' A'+R+' '+R+' 0 0 '+s1+' '+x+' '+(y+R)+' A'+rx+' '+R+' 0 0 '+s2+' '+x+' '+(y-R)+'Z','#f6e7a3','#d9c46a',1.5);}
function helix(x,y,w,h,cols){cols=cols||[BL,OR,GR,RD];var a='',b='',rungs='',n=36;
  for(var i=0;i<=n;i++){var X=x+w*i/n,s=Math.sin(i/n*Math.PI*3),Y1=y+h/2*s,Y2=y-h/2*s;a+=(i?'L':'M')+X.toFixed(1)+' '+Y1.toFixed(1);b+=(i?'L':'M')+X.toFixed(1)+' '+Y2.toFixed(1);
    if(i%3===1&&i<n)rungs+=l(X,Y1,X,Y2,cols[(i/3|0)%cols.length],4);}
  return rungs+p(a,null,PU,4)+p(b,null,PU,4);}
function cellG(x,y,R,col,nuc){return e(x,y,R,R*0.82,col||'#d8f1e4','#5aa57f',2.5)+(nuc===false?'':c(x+R*0.1,y-R*0.05,R*0.32,'#b39ddb','#6a4c93',2))+c(x-R*0.5,y+R*0.3,2.5,'#7fb89a')+c(x+R*0.5,y+R*0.35,2.5,'#7fb89a')+c(x-R*0.35,y-R*0.4,2,'#7fb89a');}
function sun(x,y,R){var rays='';for(var i=0;i<8;i++){var a=i*Math.PI/4;rays+=l(x+(R+4)*Math.cos(a),y+(R+4)*Math.sin(a),x+(R+11)*Math.cos(a),y+(R+11)*Math.sin(a),'#f2a900',3);}return rays+c(x,y,R,YE,'#f2a900',2);}
function plant(x,y,k){return g(x,y,k||1,l(0,0,0,-34,GR,4)+e(-11,-22,11,5,'#4cbb7f',GR,1.5,-30)+e(11,-30,11,5,'#4cbb7f',GR,1.5,30)+e(0,-40,6,9,'#4cbb7f',GR,1.5));}
function pot(x,y,k,inner){return g(x,y,k||1,(inner||'')+poly('-22,0 22,0 16,30 -16,30','#c96f3b','#9c4f24',2)+r(-25,-5,50,8,'#d98150',2,'#9c4f24',2));}
function worm(x,y,k,col){return g(x,y,k||1,p('M0 0 C8 -10 16 10 24 0 S40 -10 48 0',null,col||'#d98c8c',7)+c(49,-1,2,K));}
function face(x,y,R,mood){var o=c(x,y,R,'#ffd9a8','#c98d4b',2);
  if(mood==='shock')return o+c(x-R*0.35,y-R*0.2,R*0.18,'#fff',K,2)+c(x+R*0.35,y-R*0.2,R*0.18,'#fff',K,2)+c(x-R*0.35,y-R*0.2,R*0.07,K)+c(x+R*0.35,y-R*0.2,R*0.07,K)+e(x,y+R*0.4,R*0.18,R*0.26,'#7a2d2d')+l(x-R*0.55,y-R*0.55,x-R*0.2,y-R*0.62,K,2)+l(x+R*0.2,y-R*0.62,x+R*0.55,y-R*0.55,K,2);
  if(mood==='frown')return o+c(x-R*0.35,y-R*0.15,R*0.09,K)+c(x+R*0.35,y-R*0.15,R*0.09,K)+p('M'+(x-R*0.35)+' '+(y+R*0.5)+' Q'+x+' '+(y+R*0.2)+' '+(x+R*0.35)+' '+(y+R*0.5),null,K,2.5)+l(x-R*0.55,y-R*0.5,x-R*0.15,y-R*0.35,K,2.5)+l(x+R*0.15,y-R*0.35,x+R*0.55,y-R*0.5,K,2.5);
  if(mood==='low')return o+l(x-R*0.45,y-R*0.15,x-R*0.2,y-R*0.15,K,2.5)+l(x+R*0.2,y-R*0.15,x+R*0.45,y-R*0.15,K,2.5)+p('M'+(x-R*0.25)+' '+(y+R*0.4)+' q'+(R*0.12)+' -4 '+(R*0.25)+' 0 t'+(R*0.25)+' 0',null,K,2);
  if(mood==='firm')return o+c(x-R*0.35,y-R*0.12,R*0.09,K)+c(x+R*0.35,y-R*0.12,R*0.09,K)+l(x-R*0.55,y-R*0.42,x-R*0.15,y-R*0.3,K,3)+l(x+R*0.15,y-R*0.3,x+R*0.55,y-R*0.42,K,3)+l(x-R*0.3,y+R*0.42,x+R*0.3,y+R*0.42,K,3);
  return o+c(x-R*0.35,y-R*0.15,R*0.09,K)+c(x+R*0.35,y-R*0.15,R*0.09,K)+p('M'+(x-R*0.35)+' '+(y+R*0.3)+' Q'+x+' '+(y+R*0.65)+' '+(x+R*0.35)+' '+(y+R*0.3),null,K,2.5);}
function layers(x,y,w,h,cols){var o='',hh=h/cols.length;cols.forEach(function(cl,i){o+=r(x,y+i*hh,w,hh+0.5,cl);});return o+r(x,y,w,h,null,0,'#7a6a55',1.5);}
var LAY=['#f3dfb0','#d9b98a','#c99b6d','#a9805a','#8d6748'];
function tri(pts,f,s){return poly(pts,f||'#dce6f5',s||BL,2.5);}
function fishBones(x,y,k){return g(x,y,k||1,p('M-30 0 L28 0',null,'#5b4a3a',3)+[-20,-10,0,10,20].map(function(X){return l(X,-10,X+4,0,'#5b4a3a',2)+l(X,10,X+4,0,'#5b4a3a',2);}).join('')+poly('-30,0 -44,-10 -44,10',null,'#5b4a3a',2.5)+c(30,0,6,null,'#5b4a3a',2.5)+c(31,-1,1.5,'#5b4a3a'));}
function trilobite(x,y,k,col){col=col||'#6b5b4b';return g(x,y,k||1,e(0,0,11,15,'#b8a58c',col,2)+l(0,-15,0,15,col,1.5)+l(-10,-4,10,-4,col,1.2)+l(-11,2,11,2,col,1.2)+l(-9,8,9,8,col,1.2)+p('M-11 -8 Q0 -16 11 -8',null,col,2));}
function earth(x,y,R){return c(x,y,R,'#4a90d9','#2f6fb0',2)+p('M'+(x-R*0.5)+' '+(y-R*0.3)+' q'+(R*0.3)+' -'+(R*0.4)+' '+(R*0.6)+' -'+(R*0.1)+' q'+(R*0.1)+' '+(R*0.4)+' -'+(R*0.3)+' '+(R*0.5)+'z','#5fbf6f')+p('M'+(x+R*0.1)+' '+(y+R*0.3)+' q'+(R*0.4)+' -'+(R*0.2)+' '+(R*0.5)+' '+(R*0.1)+' q-'+(R*0.2)+' '+(R*0.4)+' -'+(R*0.5)+' '+(R*0.2)+'z','#5fbf6f');}
function drop(x,y,k,col){return g(x,y,k||1,p('M0 -14 C8 -2 10 4 10 7 A10 10 0 0 1 -10 7 C-10 4 -8 -2 0 -14Z',col||'#2b2b2b',null));}
function person(x,y,k,col){return g(x,y,k||1,c(0,-30,8,'#ffd9a8','#c98d4b',1.5)+p('M-12 0 L-12 -12 Q-12 -21 0 -21 Q12 -21 12 -12 L12 0Z',col||BL));}
function heart(x,y,k,col){return g(x,y,k||1,p('M0 12 C-26 -6 -14 -26 0 -12 C14 -26 26 -6 0 12Z',col||RD,'#a83232',2));}
function balloon(x,y,R,col){return e(x,y,R,R*1.15,col,'#b03a3a',2)+poly((x-3)+','+(y+R*1.15+5)+' '+(x+3)+','+(y+R*1.15+5)+' '+x+','+(y+R*1.15),col)+p('M'+x+' '+(y+R*1.15+5)+' q-6 10 0 18 t0 14',null,G,1.5)+e(x-R*0.35,y-R*0.4,R*0.15,R*0.28,'#ffffff88');}
function fullCell(x,y,txt,col){return r(x,y,34,26,col||'#fff',5,BL,2)+t(x+17,y+18,txt,{s:14});}
function angleArc(cx,cy,R,a1,a2,col){var x1=cx+R*Math.cos(a1),y1=cy-R*Math.sin(a1),x2=cx+R*Math.cos(a2),y2=cy-R*Math.sin(a2),big=(a2-a1)>Math.PI?1:0;return p('M'+x1.toFixed(1)+' '+y1.toFixed(1)+' A'+R+' '+R+' 0 '+big+' 0 '+x2.toFixed(1)+' '+y2.toFixed(1),null,col||OR,3);}
function thermo(x,y,lvl,col){return r(x-6,y-60,12,60,'#fff',6,G,2)+c(x,y+4,10,col,G,2)+r(x-3,y-lvl,6,lvl+4,col)+[15,30,45].map(function(v){return l(x+6,y-v,x+11,y-v,G,1.5);}).join('');}
function dots(x,y,w,h,n,col,seed){var o='',s=seed||7;for(var i=0;i<n;i++){s=(s*9301+49297)%233280;var a=s/233280;s=(s*9301+49297)%233280;var b=s/233280;o+=c((x+a*w).toFixed(1),(y+b*h).toFixed(1),3,col);}return o;}
function zig(x,y,col){return p('M'+(x-6)+' '+y+' l3 -4 l3 4 l3 -4 l3 4',null,col||'#c0392b',1.5);}
function speed(x,y,n){var o='';for(var i=0;i<n;i++)o+=l(x,y+i*8,x-18-i*4,y+i*8,G,2.5);return o;}
function tile(x,y,ch,col){return r(x,y,26,26,col,6)+t(x+13,y+19,ch,{s:16,c:'#fff'});}

var PICS={
 /* ---------- genetics ---------- */
 'heredity':mouse(52,34,0.75)+mouse(140,34,0.75)+t(100,38,'+',{s:22})+ar(98,58,98,82)+mouse(96,104,0.6)+t(170,108,'baby looks',{s:11,c:G})+t(170,121,'like parents',{s:11,c:G}),
 'trait':mouse(92,72,1.25)+r(112,14,72,22,'#fff',11,OR,2)+t(148,30,'black fur',{s:12})+l(120,36,108,56,OR,2)+r(6,96,76,22,'#fff',11,BL,2)+t(44,112,'long tail',{s:12})+l(44,96,30,78,BL,2)+r(140,98,56,22,'#fff',11,GR,2)+t(168,114,'small',{s:12}),
 'dna':helix(14,62,172,70)+t(100,124,'A-T  C-G',{s:12,c:G}),
 'gene':helix(10,48,180,46)+r(70,18,46,60,'none',8,RD,3)+t(93,14,'one gene',{s:12,c:RD})+ar(93,82,93,100,RD)+r(66,104,54,20,'#333',6)+t(93,118,'fur color',{s:11,c:'#fff'}),
 'allele':t(100,16,'one gene, two versions',{s:12,c:G})+r(26,28,62,62,'#333',12)+t(57,72,'F',{s:34,c:'#fff'})+r(112,28,62,62,'#fff',12,'#777',2)+t(143,72,'f',{s:34})+t(57,110,'black',{s:13})+t(143,110,'white',{s:13}),
 'genotype':t(100,18,'the pair of letters',{s:12,c:G})+r(42,30,50,56,'#333',10)+t(67,70,'F',{s:30,c:'#fff'})+r(108,30,50,56,'#fff',10,'#777',2)+t(133,70,'f',{s:30})+p('M42 98 Q100 118 158 98',null,PU,3)+t(100,124,'genotype = Ff',{s:13,c:PU}),
 'phenotype':r(10,40,56,44,'#fff',10,PU,2.5)+t(38,70,'Ff',{s:24,c:PU})+ar(72,62,100,62)+mouse(140,64,1)+t(140,108,'what you SEE',{s:13,c:OR}),
 'dominant allele':t(100,16,'F wins over f',{s:13,c:G})+r(96,28,56,62,'#fff',12,'#bbb',2)+t(124,74,'f',{s:32,c:'#bbb'})+r(40,24,70,74,'#333',12)+t(75,76,'F',{s:44,c:'#fff'})+t(60,118,'shows',{s:13,c:GR})+t(140,118,'hidden',{s:13,c:'#999'}),
 'recessive allele':r(8,24,72,56,'#fff',10,'#999',2)+t(30,62,'F',{s:28})+t(58,62,'f',{s:28,c:'#bbb'})+t(44,96,'f hides',{s:12,c:'#999'})+r(104,24,52,56,'#fff',10,PU,2.5)+t(130,62,'ff',{s:28,c:PU})+ar(160,52,174,52)+mouse(168,104,0.5,'#fff')+t(130,96,'f shows',{s:12,c:PU}),
 'homozygous':r(36,26,52,58,'#333',10)+t(62,66,'F',{s:30,c:'#fff'})+r(112,26,52,58,'#333',10)+t(138,66,'F',{s:30,c:'#fff'})+t(100,64,'=',{s:28,c:GR})+t(100,112,'SAME letters',{s:15,c:GR}),
 'heterozygous':r(36,26,52,58,'#333',10)+t(62,66,'F',{s:30,c:'#fff'})+r(112,26,52,58,'#fff',10,'#777',2)+t(138,66,'f',{s:30})+t(100,64,'&#8800;',{s:28,c:RD})+t(100,112,'DIFFERENT letters',{s:15,c:RD}),
 'hybrid':mouse(40,30,0.6)+mouse(150,30,0.6,'#fff')+t(96,34,'+',{s:22})+ar(96,52,96,74)+mouse(92,98,0.7)+t(160,104,'mix of',{s:11,c:G})+t(160,117,'two kinds',{s:11,c:G}),
 'inheritance':person(36,64,1,PU)+person(164,64,1,OR)+r(20,72,32,24,'#333',6)+t(36,90,'F',{s:18,c:'#fff'})+r(148,72,32,24,'#fff',6,'#777',2)+t(164,90,'f',{s:18})+ar(56,84,84,100)+ar(144,84,116,100)+r(84,96,32,24,YE,6,OR,2)+t(100,113,'Ff',{s:14})+t(100,20,'from mom + dad',{s:12,c:G}),
 'punnett square':t(100,16,'a grid that predicts',{s:12,c:G})+r(60,24,34,26,'#dce6f5',4,BL,2)+t(77,42,'F',{s:16})+r(98,24,34,26,'#dce6f5',4,BL,2)+t(115,42,'f',{s:16})+r(22,54,34,30,'#fbe3c6',4,OR,2)+t(39,74,'F',{s:16})+r(22,88,34,30,'#fbe3c6',4,OR,2)+t(39,108,'f',{s:16})+fullCell(60,56,'FF')+fullCell(98,56,'Ff')+fullCell(60,90,'Ff')+fullCell(98,90,'ff')+t(166,74,'4',{s:22,c:PU})+t(166,92,'boxes',{s:12,c:PU}),
 /* ---------- cells and DNA ---------- */
 'cell':cellG(100,62,52)+t(100,126,'smallest living unit',{s:12,c:G}),
 'nucleus':cellG(100,66,54)+p('M96 52 q4 -6 8 0 t8 0',null,'#fff',2.5)+p('M90 66 q4 -6 8 0 t8 0 t8 0',null,'#fff',2.5)+poly('92,40 96,32 100,38 104,32 108,40',YE,'#c9a100',1.5)+ar(170,22,128,52,RD)+t(172,18,'control center',{s:11,c:RD,a:'end'}),
 'chromosome':p('M70 20 Q90 62 70 104',null,PU,16)+p('M110 20 Q90 62 110 104',null,PU,16)+c(90,62,6,'#3d2a5c')+[30,44,80,94].map(function(Y){return l(62,Y,118,Y,'#fff',2);}).join('')+ar(132,62,150,62)+helix(152,62,40,22)+t(100,124,'packed-up DNA',{s:12,c:G}),
 'base':tile(30,20,'A',RD)+t(70,39,'&#8212;',{s:18})+tile(84,20,'T',BL)+tile(30,70,'C',GR)+t(70,89,'&#8212;',{s:18})+tile(84,70,'G',OR)+t(156,46,'A pairs',{s:12})+t(156,60,'with T',{s:12})+t(156,96,'C pairs',{s:12})+t(156,110,'with G',{s:12}),
 'double helix':helix(14,62,172,74,['#bbb'])+p('M150 18 q12 -8 20 4',null,OR,3)+t(100,126,'twisted ladder',{s:13,c:G}),
 'protein':[20,40,60,80,100,120,140].map(function(X,i){var Y=60+Math.sin(i)*22;return (i?'':'')+c(X+10,Y,11,[RD,BL,GR,OR,PU,YE,'#18a3a3'][i],K,1.5);}).join('')+t(100,120,'a chain of pieces',{s:13,c:G}),
 'rna':(function(){var o='',a='';for(var i=0;i<=30;i++){var X=14+172*i/30,Y=50+16*Math.sin(i/30*Math.PI*3);a+=(i?'L':'M')+X.toFixed(1)+' '+Y.toFixed(1);if(i%4===2)o+=l(X,Y,X,Y+22,[RD,BL,GR,OR][(i/4|0)%4],4);}return o+p(a,null,PU,4);})()+tile(86,88,'U',OR)+t(150,106,'U, not T',{s:13,c:OR})+t(40,106,'one strand',{s:12,c:G}),
 'mrna':c(44,60,36,'#e8dcf7','#6a4c93',2.5)+t(44,64,'DNA',{s:13,c:PU})+ar(84,60,108,60)+r(112,36,76,48,'#fff',6,OR,2.5)+p('M112 36 L150 64 L188 36',null,OR,2)+t(150,104,'AUG GCA ...',{s:13,c:OR})+t(44,116,'nucleus',{s:12,c:G}),
 'trna':p('M80 30 L120 30 M100 30 L100 84',null,'#18a3a3',10)+c(80,30,9,'#18a3a3')+c(120,30,9,'#18a3a3')+c(100,16,10,YE,OR,2)+r(80,90,40,22,'#fff',5,'#18a3a3',2)+t(100,106,'UAC',{s:13})+t(160,22,'brings a',{s:12,c:G})+t(160,36,'piece',{s:12,c:G})+ar(150,44,114,18,G,2),
 'ribosome':l(10,70,190,70,OR,5)+t(30,90,'mRNA',{s:12,c:OR})+e(100,48,40,22,'#9ecbff','#2f6fb0',2.5)+e(100,86,46,20,'#6aa9f0','#2f6fb0',2.5)+[0,1,2,3].map(function(i){return c(118+i*16,18-i*2,7,[RD,GR,PU,YE][i],K,1);}).join('')+t(100,124,'protein builder',{s:12,c:G}),
 'codon':['AUG','GCA','UUC'].map(function(s,i){return r(10+i*64,40,56,36,['#ffe0cc','#d9ecff','#dff5ea'][i],8,[OR,BL,GR][i],2.5)+t(38+i*64,65,s,{s:18});}).join('')+t(100,104,'3 letters = 1 codon',{s:14,c:PU}),
 'multicellular':cellG(36,62,22)+t(36,110,'1 cell',{s:12,c:G})+[[110,40],[134,40],[158,40],[122,62],[146,62],[170,62],[110,84],[134,84],[158,84]].map(function(q){return cellG(q[0],q[1],12);}).join('')+t(140,118,'many cells',{s:13,c:GR}),
 'tissue':[0,1,2].map(function(rw){return [0,1,2,3].map(function(cl){return e(40+cl*40,30+rw*30,18,11,'#f5b7b1','#c0392b',2)+c(40+cl*40,30+rw*30,3.5,'#a93226');}).join('');}).join('')+t(100,124,'same cells, one job',{s:12,c:G}),
 'organ':heart(100,58,2.6)+p('M78 40 q10 8 0 18 M96 30 q10 10 0 22 M114 36 q10 8 0 18',null,'#ffffff99',2)+t(100,124,'made of tissues',{s:12,c:G}),
 'organism':mouse(44,62,0.8)+plant(110,92,1.2)+person(164,94,1.2,GR)+t(100,124,'any living thing',{s:12,c:G}),
 'neuron':c(42,62,16,'#ffd27f',OR,2.5)+c(42,62,5,OR)+[[-1,-1],[-1,1],[-1,0],[0,-1],[0,1]].map(function(d){return l(42+d[0]*14,62+d[1]*14,42+d[0]*30,62+d[1]*30,OR,3);}).join('')+l(58,62,160,62,OR,4)+[-12,0,12].map(function(d){return l(160,62,176,62+d,OR,3);}).join('')+p('M96 46 l8 8 l-6 2 l8 10',null,'#e0a800',3)+t(100,110,'carries messages',{s:13,c:G}),
 'stimulus':sun(40,52,18)+ar(70,56,110,60,'#f2a900')+face(146,62,26,'low')+t(146,22,'squint!',{s:13,c:RD})+t(40,108,'light',{s:12,c:G})+t(146,110,'reaction',{s:12,c:G}),
 'probability':(function(){var cx=62,cy=62,R=40;return c(cx,cy,R,'#dff5ea',GR,2)+p('M'+cx+' '+cy+' L'+cx+' '+(cy-R)+' A'+R+' '+R+' 0 1 1 '+(cx-R)+' '+cy+'Z',GR)+ar(cx,cy,cx+22,cy-26,K,2.5)+c(cx,cy,4,K);})()+t(150,58,'3 out of 4',{s:16,c:GR})+t(150,80,'= likely',{s:13,c:G}),
 /* ---------- rocks and fossils ---------- */
 'fossil':r(14,18,172,92,'#cdbb9c',14,'#9c8565',2)+dots(20,22,160,84,14,'#b5a383',3)+fishBones(100,64,1.4),
 'sediment':r(14,10,172,70,SKY)+[30,60,90,120,150].map(function(X,i){return c(X,24+i%2*14,3.5,'#a9805a')+l(X,36+i%2*14,X,46+i%2*14,'#a9805a88',2,'2 3');}).join('')+layers(14,80,172,42,['#e8cfa0','#c99b6d','#a9805a']),
 'outcropping':p('M0 120 L0 70 Q40 30 80 40 L80 120Z','#9fcf8a')+layers(80,40,70,80,LAY)+p('M150 120 L150 58 Q175 50 200 60 L200 120Z','#9fcf8a')+r(150,112,50,8,'#888')+t(115,30,'rock you can see',{s:12,c:G}),
 'superposition':layers(30,18,90,100,LAY)+ar(140,110,140,24,PU)+t(170,24,'young',{s:12,c:GR})+t(170,116,'old',{s:12,c:RD})+t(75,32,'top',{s:11})+t(75,112,'bottom',{s:11,c:'#fff'}),
 'index fossil':layers(14,20,60,96,LAY)+layers(126,20,60,96,['#e6d2a8','#d9b98a','#c99b6d','#8d6748','#6e5038'])+trilobite(44,68,0.7)+trilobite(156,68,0.7)+l(60,68,140,68,RD,2.5,'6 5')+t(100,60,'same age',{s:12,c:RD}),
 'extinct':trilobite(64,60,2)+l(30,24,98,96,RD,6)+l(98,24,30,96,RD,6)+t(150,56,'gone',{s:18,c:RD})+t(150,76,'forever',{s:14,c:G}),
 /* ---------- ecosystems and fair tests ---------- */
 'ecosystem':r(0,0,200,130,SKY)+sun(170,24,12)+p('M0 80 Q100 70 200 80 L200 130 L0 130Z','#7ab6e8')+p('M0 80 Q30 70 50 80 L50 130 L0 130Z','#9fcf8a')+plant(26,82,0.9)+e(110,104,14,7,OR)+poly('96,104 88,98 88,110',OR)+c(116,102,1.5,K)+e(160,118,16,8,'#999')+p('M150 80 l0 -20 M156 80 l0 -26',null,GR,3),
 'decomposer':e(56,62,30,16,'#c58b3a','#8a5a1a',2,-20)+l(30,74,82,50,'#8a5a1a',2)+worm(96,66,1.2)+ar(70,96,124,96)+r(130,84,58,26,'#6b4a2b',8)+t(159,102,'soil',{s:13,c:'#fff'})+t(56,24,'dead leaf',{s:12,c:G}),
 'producer':sun(36,30,14)+ar(56,44,86,64,'#f2a900')+ar(52,54,82,74,'#f2a900')+pot(120,86,1,plant(0,-4,1.3))+t(170,56,'makes',{s:12,c:GR})+t(170,70,'its own',{s:12,c:GR})+t(170,84,'food',{s:12,c:GR}),
 'consumer':e(70,74,30,24,'#d9cbb8','#8a7a66',2)+c(100,52,16,'#d9cbb8','#8a7a66',2)+e(94,26,5,16,'#d9cbb8','#8a7a66',2,-10)+e(106,26,5,16,'#d9cbb8','#8a7a66',2,10)+c(106,50,2,K)+c(38,74,8,'#fff','#bbb',1.5)+poly('128,56 170,48 170,64',OR,'#b5651d',2)+p('M168 52 l12 -10 M168 56 l14 -4 M168 60 l12 4',null,GR,3)+t(100,118,'eats other living things',{s:12,c:G}),
 'nutrient':r(0,70,200,60,'#8d6748')+plant(100,72,1.3)+p('M100 72 l-14 22 M100 72 l0 30 M100 72 l14 22',null,'#e8d3b0',2.5)+dots(20,82,160,40,16,YE,5)+t(160,30,'food for',{s:12,c:GR})+t(160,44,'growing',{s:12,c:GR}),
 'variable':pot(56,74,0.8,plant(0,-4,0.9))+pot(144,74,0.8,plant(0,-4,0.9))+worm(127,90,0.6)+c(144,92,19,'none',RD,3)+t(56,120,'no worms',{s:12,c:G})+t(144,120,'worms',{s:12,c:RD})+t(100,20,'only ONE thing changes',{s:12,c:RD}),
 'control':pot(56,72,0.9,plant(0,-4,1))+pot(144,72,0.9,plant(0,-4,1))+drop(40,30,0.8,'#4a90d9')+drop(128,30,0.8,'#4a90d9')+sun(72,28,7)+sun(160,28,7)+t(100,58,'=',{s:24,c:GR})+t(100,122,'kept the SAME',{s:13,c:GR}),
 /* ---------- embryos and evolution ---------- */
 'embryo':e(100,62,46,56,'#fff7e6','#d9b98a',3)+p('M92 44 C120 40 122 80 98 82 C84 82 84 68 96 68',null,'#f08c8c',8)+c(96,48,6,'#f08c8c')+c(94,47,1.5,K)+t(160,24,'earliest',{s:12,c:G})+t(160,38,'stage',{s:12,c:G}),
 'vertebrate':e(96,62,62,30,'#9fd3ea','#3a8fb7',2)+poly('34,62 10,40 10,84','#9fd3ea','#3a8fb7')+l(40,62,148,62,'#fff',5)+[50,66,82,98,114,130].map(function(X){return c(X,62,4,'#fff','#3a8fb7',1.5);}).join('')+c(140,52,3,K)+t(96,116,'has a backbone',{s:13,c:G}),
 'ancestor':c(100,108,12,YE,OR,2)+l(100,96,56,60,BR,3)+l(100,96,144,60,BR,3)+c(56,52,10,'#bfe3c9',GR,2)+c(144,52,10,'#bfe3c9',GR,2)+l(56,42,30,14,BR,2.5)+l(56,42,82,14,BR,2.5)+l(144,42,118,14,BR,2.5)+l(144,42,170,14,BR,2.5)+[30,82,118,170].map(function(X){return c(X,12,7,'#dce6f5',BL,2);}).join('')+t(52,112,'came first',{s:12,c:OR})+ar(78,108,86,108,OR,2),
 'evolution':e(24,64,12,7,'#9fd3ea','#3a8fb7',2)+ar(42,64,56,64,G,2)+e(76,64,16,9,'#a8d8c0',GR,2)+l(70,72,64,82,GR,2)+l(84,72,90,82,GR,2)+ar(98,64,112,64,G,2)+e(136,60,20,10,'#c9e6a8','#5a9a2a',2)+l(124,68,120,84,'#5a9a2a',3)+l(148,68,152,84,'#5a9a2a',3)+c(158,52,7,'#c9e6a8','#5a9a2a',2)+t(100,110,'slow change, many generations',{s:12,c:G}),
 'develop':e(30,64,12,9,'#5a5a3a')+p('M18 64 q-8 -6 -14 0',null,'#5a5a3a',3)+ar(48,64,64,64,G,2)+e(86,64,13,10,'#6b7a3a')+l(80,72,76,80,'#6b7a3a',3)+l(92,72,96,80,'#6b7a3a',3)+ar(106,64,122,64,G,2)+e(156,68,28,18,'#5fae4f','#3e7d33',2)+c(144,50,7,'#fff','#3e7d33',2)+c(168,50,7,'#fff','#3e7d33',2)+c(144,50,2.5,K)+c(168,50,2.5,K)+t(100,112,'grows and changes',{s:12,c:G}),
 'similarity':[56,144].map(function(X){return p('M'+(X-8)+' 34 C'+(X+22)+' 30 '+(X+24)+' 80 '+(X+2)+' 84 C'+(X-14)+' 86 '+(X-14)+' 70 '+(X-2)+' 70',null,'#f08c8c',9)+c(X-6,40,8,'#f08c8c');}).join('')+c(54,82,10,'none',RD,2.5)+c(142,82,10,'none',RD,2.5)+t(100,64,'=',{s:24,c:GR})+t(100,118,'both have a tail',{s:12,c:G}),
 /* ---------- natural resources ---------- */
 'natural resource':plant(30,82,1.3)+drop(80,64,1.6,'#4a90d9')+sun(126,52,14)+drop(172,64,1.6,'#2b2b2b')+t(100,116,'from nature, used by people',{s:12,c:G}),
 'renewable':l(70,120,70,56,'#bbb',5)+c(70,52,5,'#888')+[0,120,240].map(function(a){return e(70+20*Math.cos(a*Math.PI/180),52+20*Math.sin(a*Math.PI/180),20,5,'#eee','#999',1.5,a);}).join('')+p('M136 40 A26 26 0 1 1 124 88',null,GR,5)+poly('116,82 132,82 124,96',GR)+t(146,70,'again',{s:12,c:GR}),
 'nonrenewable':r(40,32,50,70,'#333',8)+l(40,52,90,52,'#666',3)+l(40,82,90,82,'#666',3)+drop(65,70,0.9,YE)+ar(104,66,132,66,RD)+c(160,62,22,'#fff',RD,3)+l(160,62,160,48,RD,3)+l(160,62,170,66,RD,3)+t(160,104,'millions',{s:12,c:RD})+t(160,118,'of years',{s:12,c:RD}),
 'fossil fuel':layers(10,60,110,60,LAY)+fishBones(46,78,0.6)+plant(90,96,0.6)+drop(66,110,0.8,'#2b2b2b')+ar(124,90,146,72)+r(150,28,34,56,RD,6)+r(156,36,22,14,'#fff',3)+p('M184 46 q12 0 10 18',null,K,3)+t(166,104,'gas',{s:12,c:G}),
 'consumption':l(20,112,184,112,G,2)+l(20,112,20,14,G,2)+[30,62,94,126,158].map(function(X,i){return r(X,104-i*20,24,8+i*20,OR,4);}).join('')+ar(30,96,178,24,RD,3)+t(70,28,'more used',{s:12,c:RD}),
 'reserve':r(0,0,200,40,SKY)+r(0,40,200,90,'#a9805a')+p('M60 86 Q100 66 140 86 Q100 106 60 86Z','#2b2b2b')+l(100,40,100,72,'#555',4)+r(88,24,24,16,'#888',3)+t(100,122,'saved for later',{s:12,c:'#fff'}),
 'conserve':c(60,52,24,'#eee','#999',2.5)+r(50,74,20,14,'#999',3)+l(36,28,84,76,RD,4)+t(60,110,'light off',{s:12,c:G})+p('M128 40 L150 40 L150 50',null,'#888',8)+drop(150,68,0.7,'#4a90d9')+t(150,110,'use less',{s:12,c:GR}),
 /* ---------- Moon and Earth ---------- */
 'orbit':e(100,64,82,44,'none',G,2,0)+'<ellipse cx="100" cy="64" rx="82" ry="44" fill="none" stroke="#fff" stroke-width="2.5" stroke-dasharray="2 8"/>'+earth(100,64,22)+moon(178,52,10,1)+ar(176,28,160,16,OR,3)+t(100,124,'path around',{s:12,c:G}),
 'rotation':earth(100,64,36)+l(100,18,100,110,K,2,'4 4')+p('M60 40 A48 18 0 0 0 140 40',null,OR,4)+poly('136,32 148,40 134,46',OR)+t(36,70,'spin',{s:14,c:OR}),
 'phase':[0.1,0.5,1,0.5,0.1].map(function(f,i){return moon(22+i*39,56,16,f,i<2);}).join('')+t(100,108,'shapes of the lit part',{s:12,c:G}),
 'waxing':[0.12,0.3,0.5,0.75,0.95].map(function(f,i){return moon(24+i*38,54,9+i*2.5,f,true);}).join('')+ar(30,96,170,96,GR)+t(100,120,'growing bigger',{s:12,c:GR}),
 'waning':[0.95,0.75,0.5,0.3,0.12].map(function(f,i){return moon(24+i*38,54,19-i*2.5,f,false);}).join('')+ar(30,96,170,96,RD)+t(100,120,'getting smaller',{s:12,c:RD}),
 'crescent':moon(70,62,42,0.15,true)+t(150,58,'thin curve',{s:12,c:G})+t(150,74,'like a',{s:12,c:G})+t(150,90,'fingernail',{s:12,c:G}),
 'gibbous':moon(70,62,42,0.8,true)+t(150,58,'more than',{s:12,c:G})+t(150,74,'half lit',{s:12,c:G}),
 /* ---------- heat and energy ---------- */
 'kinetic energy':c(140,72,24,RD,'#a83232',2)+p('M128 60 a14 14 0 0 1 20 -4',null,'#ffffff99',3)+speed(108,60,4)+l(10,98,196,98,G,2)+t(60,122,'moving = energy',{s:13,c:G}),
 'thermal energy':p('M40 54 L160 54 L150 112 L50 112Z','#e8eef5','#777',2.5)+r(30,48,140,8,'#999',3)+dots(54,60,92,46,14,RD,11)+p('M70 40 q-8 -10 0 -20 M100 40 q-8 -10 0 -20 M130 40 q-8 -10 0 -20',null,'#bbb',3)+t(100,126,'hot = lots of motion',{s:12,c:RD}),
 'temperature':thermo(60,94,22,BL)+thermo(140,94,52,RD)+dots(20,20,18,40,4,BL,2)+dots(162,20,30,40,7,RD,9)+t(60,124,'cold',{s:12,c:BL})+t(140,124,'hot',{s:12,c:RD}),
 'particle':p('M30 40 L80 40 L74 110 L36 110Z','#dcecff','#777',2)+c(130,62,36,'#fff',K,4)+l(156,88,180,114,K,7)+dots(108,40,46,44,9,BL,4)+l(70,70,96,62,G,1.5,'3 3')+t(56,124,'cup',{s:12,c:G}),
 'transfer':c(52,62,26,RD,'#a83232',2)+t(52,67,'hot',{s:13,c:'#fff'})+ar(84,50,118,50,OR)+ar(84,62,118,62,OR)+ar(84,74,118,74,OR)+c(150,62,26,'#8fc3f2','#2f6fb0',2)+t(150,67,'cool',{s:13})+t(100,116,'energy moves',{s:12,c:OR}),
 'equilibrium':poly('100,40 88,112 112,112','#bbb','#888')+l(30,40,170,40,K,4)+l(40,40,40,60,G,1.5)+l(160,40,160,60,G,1.5)+p('M18 60 L62 60 Q40 84 18 60Z',RD)+p('M138 60 L182 60 Q160 84 138 60Z',BL)+t(40,98,'35&#176;',{s:14,c:RD})+t(160,98,'35&#176;',{s:14,c:BL})+t(100,26,'balanced',{s:13,c:GR}),
 /* ---------- ELA ---------- */
 'mighty':r(30,56,140,14,'#555',6)+r(18,34,22,58,'#333',5)+r(160,34,22,58,'#333',5)+r(6,42,14,42,'#444',4)+r(180,42,14,42,'#444',4)+p('M90 30 l10 -18 l4 12 l10 -14',null,'#e0a800',4)+t(100,116,'very strong',{s:14,c:RD}),
 'manage':r(52,14,96,104,'#fff',8,G,2)+[0,1,2].map(function(i){return r(62,30+i*28,18,18,'#dff5ea',4,GR,2)+p('M65 '+(39+i*28)+' l5 5 l9 -10',null,GR,3)+l(88,39+i*28,136,39+i*28,'#bbb',4);}).join('')+t(176,70,'done!',{s:13,c:GR}),
 'mutter':face(62,64,32,'low')+p('M104 36 Q104 22 120 22 L176 22 Q190 22 190 36 L190 54 Q190 66 176 66 L128 66 L112 78 L116 66 Q104 64 104 54Z','#fff',G,2)+t(147,50,'mumble...',{s:12,c:'#999',w:400})+t(62,120,'low and quiet',{s:12,c:G}),
 'suddenly':c(100,62,24,'#fff6c9','#c9a100',2)+r(90,86,20,12,'#999',3)+[0,1,2,3,4,5,6,7].map(function(i){var a=i*Math.PI/4;return l(100+34*Math.cos(a),62+34*Math.sin(a),100+50*Math.cos(a),62+50*Math.sin(a),RD,4);}).join('')+t(100,68,'!',{s:28,c:RD})+t(172,28,'no',{s:12,c:G})+t(172,42,'warning',{s:12,c:G}),
 'determined':p('M10 120 L90 24 L170 120Z','#c9d6df','#7d8f9c',2)+p('M74 44 L90 24 L106 44 Q98 40 90 46 Q82 40 74 44Z','#fff')+l(90,24,90,4,K,2.5)+poly('90,4 110,10 90,16',RD)+person(58,96,0.7,PU)+ar(70,72,84,52,PU,2.5)+t(160,30,'never',{s:12,c:PU})+t(160,44,'give up',{s:12,c:PU}),
 'grumble':face(62,64,32,'frown')+p('M104 30 L124 30 L130 22 L136 32 L190 32 L190 70 L120 70 L108 82 L112 70 L104 70Z','#fff',RD,2)+t(147,57,'grrr...',{s:15,c:RD})+t(62,120,'unhappy',{s:12,c:G}),
 'wield':p('M60 110 L118 40',null,BR,8)+r(100,16,56,26,'#777',4,'#555',2)+r(44,94,26,26,'#ffd9a8',10,'#c98d4b',2)+p('M150 70 A60 60 0 0 0 166 20',null,OR,3,' stroke-dasharray="4 5"')+t(160,104,'hold and',{s:12,c:G})+t(160,118,'use it',{s:12,c:G}),
 'horrified':face(70,62,36,'shock')+p('M140 70 L150 92 L160 72 L170 96 L180 74',null,'#7fb3d5',3)+poly('148,104 156,96 160,110','#bfe0f5','#7fb3d5',1.5)+poly('170,108 178,100 182,114','#bfe0f5','#7fb3d5',1.5)+t(160,40,'shocked',{s:12,c:RD})+t(160,54,'and scared',{s:12,c:RD}),
 /* ---------- math ---------- */
 'similar':tri('20,100 60,100 30,70')+tri('90,110 170,110 110,50')+t(100,26,'same shape, new size',{s:12,c:G}),
 'congruent':tri('20,100 80,100 40,40','#dff5ea',GR)+tri('120,100 180,100 140,40','#dff5ea',GR)+t(100,76,'&#8773;',{s:24,c:GR})+l(46,96,52,104,GR,2)+l(146,96,152,104,GR,2)+t(100,124,'exactly the same',{s:12,c:GR}),
 'corresponding':tri('16,100 84,100 36,40')+tri('116,100 184,100 136,40')+angleArc(16,100,14,0,1.25,RD)+angleArc(116,100,14,0,1.25,RD)+angleArc(84,100,14,Math.PI-0.98,Math.PI,BL)+angleArc(184,100,14,Math.PI-0.98,Math.PI,BL)+t(100,124,'matching spots',{s:12,c:G}),
 'vertex':tri('30,104 170,104 90,22','#fff',BL)+c(30,104,7,RD)+c(170,104,7,RD)+c(90,22,7,RD)+ar(140,30,100,24,RD,2.5)+t(164,34,'corner',{s:12,c:RD}),
 'obtuse':l(70,104,180,104,K,4)+l(70,104,24,30,K,4)+angleArc(70,104,30,0,2.13,OR)+t(110,74,'115&#176;',{s:18,c:OR})+t(140,124,'bigger than 90&#176;',{s:12,c:G}),
 'quadrilateral':r(10,30,36,36,'#dce6f5',2,BL,2.5)+r(56,36,52,28,'#dff5ea',2,GR,2.5)+poly('118,66 128,32 152,32 162,66','#ffe0cc',OR,2.5)+poly('180,26 194,48 180,72 166,48','#eadcf7',PU,2.5)+t(100,102,'4 sides, 4 corners',{s:13,c:G}),
 'sufficient':p('M70 20 L130 20 L124 112 L76 112Z','#fff','#777',2.5)+p('M73 52 L127 52 L124 112 L76 112Z','#8fc3f2')+l(60,52,140,52,RD,2,'5 4')+t(170,56,'enough',{s:13,c:GR}),
 'justify':r(10,40,70,44,'#dff5ea',10,GR,2.5)+t(45,68,'answer',{s:13,c:GR})+r(120,40,70,44,'#fff1d6',10,OR,2.5)+t(155,68,'reason',{s:13,c:OR})+ar(118,62,84,62,G,3)+t(100,30,'because...',{s:12,c:G})+t(100,112,'prove it',{s:13,c:PU}),
 /* ---------- example from the parent ---------- */
 'expand':balloon(50,52,16,'#f08c8c')+ar(80,56,108,56)+balloon(148,48,32,'#e05555')+t(50,120,'small',{s:12,c:G})+t(186,112,'bigger',{s:12,c:RD})
};

/* Get the picture for a word as an <svg>.  Returns '' when there is none. */
window.WORDPICS={
  has:function(w){return !!PICS[String(w||'').toLowerCase()];},
  svg:function(w){var k=String(w||'').toLowerCase(),b=PICS[k];if(!b)return '';
    return '<svg class="wpic-svg" viewBox="0 0 200 130" role="img" aria-label="Picture for '+k.replace(/"/g,'')+'" xmlns="http://www.w3.org/2000/svg">'+b+'</svg>';},
  list:function(){return Object.keys(PICS);}
};
})();
