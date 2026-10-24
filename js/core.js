// Công cụ chung: vật liệu, nhân vật, lớp học, texture
onerror=m=>{document.getElementById('err').textContent='Lỗi: '+m};
const T=THREE,$=i=>document.getElementById(i);
const GC=[0xe53935,0xfb8c00,0xfdd835,0x43a047,0x1e88e5];
const cl=x=>Math.min(1,Math.max(0,x)),L=(a,b,k)=>a+(b-a)*k,ease=x=>x<.5?2*x*x:1-Math.pow(-2*x+2,2)/2;
const M=(c,o={})=>new T.MeshStandardMaterial({color:c,roughness:.85,flatShading:true,...o});
const E=(c,i=1)=>M(c,{emissive:c,emissiveIntensity:i});
const B=(w,h,d)=>new T.BoxGeometry(w,h,d),C=(r,h,s=16)=>new T.CylinderGeometry(r,r,h,s),S=r=>new T.SphereGeometry(r,14,10);
function add(g,geo,c,x=0,y=0,z=0,o){const m=new T.Mesh(geo,o&&o.m||M(c));m.position.set(x,y,z);m.castShadow=m.receiveShadow=true;g.add(m);return m}
let K=[],shotI=-1;
function kid(g,x,z,ry=0,o={}){const p=new T.Group();p.position.set(x,0,z);p.rotation.y=ry;const sk=o.skin||0xf2c9a0,bd=o.body||0xffffff,hr=o.hair||0x2a1f1a,pn=o.pants||0x2d3a55;
const lg=[-.09,.09].map(x=>{const l=new T.Group();l.position.set(x,.5,0);p.add(l);add(l,C(.062,.5,10),o.teacher?bd:pn,0,-.25,0);add(l,B(.12,.07,.21),o.teacher?0xf5e6d0:0xf4f4f4,0,-.47,.045);return l});
if(o.teacher){add(p,new T.CylinderGeometry(.17,.28,1.02,18),bd,0,.62,0);add(p,B(.3,.9,.015),0xf9d5e0,0,.6,.2);add(p,new T.TorusGeometry(.1,.022,6,14),0xf48fb1,0,1.1,0).rotation.x=Math.PI/2}
else{if(o.skirt){add(p,new T.CylinderGeometry(.17,.28,.42,18),pn,0,.48,0);add(p,new T.CylinderGeometry(.155,.185,.5,18),bd,0,.9,0)}else add(p,new T.CylinderGeometry(.165,.195,.64,18),bd,0,.8,0);add(p,new T.TorusGeometry(.09,.02,6,14),0xdddddd,0,1.1,0).rotation.x=Math.PI/2}
const ar=[-1,1].map(s=>{const a=new T.Group();a.position.set(s*.225,1.06,0);p.add(a);add(a,C(.057,.22,10),bd,0,-.1,0);add(a,C(.042,.22,10),sk,0,-.32,0);add(a,S(.05),sk,0,-.45,0);return a});
add(p,C(.05,.1,10),sk,0,1.13,0);const h=add(p,S(.2),sk,0,1.3,0);h.scale.set(.95,1.05,.98);
[-1,1].forEach(s=>{add(p,S(.04),sk,s*.19,1.3,0);add(p,S(.03),0xffffff,s*.07,1.32,.17).scale.z=.5;add(p,S(.017),0x1a1a1a,s*.07,1.32,.195);add(p,B(.06,.012,.01),hr,s*.07,1.385,.19);add(p,S(.03),0xf4a6a0,s*.12,1.25,.15)});
add(p,S(.02),0xe0a67e,0,1.28,.2);add(p,B(.07,.014,.01),0xc0504d,0,1.22,.195);
add(p,S(.215),hr,0,1.35,-.035).scale.set(1,.85,1);add(p,S(.2),hr,0,1.44,.07).scale.set(1,.4,.5);
if(o.pony){add(p,S(.08),hr,0,1.38,-.24);add(p,new T.ConeGeometry(.07,.38,8),hr,0,1.18,-.28)}
if(o.long)add(p,B(.4,.55,.12),hr,0,1.12,-.15);
if(o.bun)add(p,S(.1),hr,0,1.53,-.1);
if(o.hat)add(p,new T.ConeGeometry(.45,.24,24),0xe8d8a0,0,1.5,0);
if(o.glass)[-.075,.075].forEach(x=>add(p,new T.TorusGeometry(.055,.01,6,14),0x222222,x,1.32,.2));
if(o.bag){add(p,B(.3,.4,.14),o.bag,0,.92,-.2);[-.1,.1].forEach(x=>add(p,B(.03,.4,.02),o.bag,x,.95,.14))}
if(o.lan!=null){add(p,B(.04,.4,.01),o.lan,0,.97,.2);add(p,B(.11,.13,.012),o.lan,0,.78,.205)}
if(o.cam){add(p,B(.22,.14,.1),0x222222,.18,.8,.28);add(p,C(.045,.08),0x555555,.18,.8,.35).rotation.x=Math.PI/2}
if(o.note)add(p,B(.2,.28,.03),0x1e5fd0,-.2,.8,.24);
p.scale.setScalar(o.s||(o.teacher?1.06:1));p.u={ar,lg};K.push(p);g.add(p);return p}
const ROLES=[{glass:1,hair:0x2a1f1a,bag:0x3b5ba5},{pony:1,skirt:1,hair:0x3a2418,skin:0xf0c4a0},{cam:1,hair:0x4a3020,skin:0xe3b48c},{long:1,skirt:1,note:1,hair:0x1a1410,bag:0xd36a8f},{hair:0x2a1f1a,skin:0xe8bc94}];
function crew(g,x,z,gi,n=4,r=1.35,a0=0){return [...Array(n)].map((_,i)=>{const a=a0+i*6.283/n;return kid(g,x+Math.sin(a)*r,z+Math.cos(a)*r,a+Math.PI,{...ROLES[i],lan:GC[gi]})})}
const idle=t=>K.forEach((k,i)=>{const u=k.u;if(k.walk){k.position.y=Math.abs(Math.sin(t*8+i))*.06;u.lg[0].rotation.x=Math.sin(t*8+i)*.6;u.lg[1].rotation.x=-Math.sin(t*8+i)*.6;u.ar[0].rotation.x=-Math.sin(t*8+i)*.6;u.ar[1].rotation.x=Math.sin(t*8+i)*.6}else{k.position.y=Math.abs(Math.sin(t*1.6+i))*.015;u.ar[0].rotation.x=u.ar[1].rotation.x=k.raise?L(0,-3,k.raise):Math.sin(t+i)*.08}});
const tex=(w,h,f,rep)=>{const c=document.createElement('canvas');c.width=w;c.height=h;f(c.getContext('2d'),w,h);const t=new T.CanvasTexture(c);t.wrapS=t.wrapT=T.RepeatWrapping;if(rep)t.repeat.set(rep[0],rep[1]);return t};
const TILE=tex(128,128,(x,w,h)=>{x.fillStyle='#ecdcbc';x.fillRect(0,0,w,h);x.fillStyle='#dcc7a0';x.fillRect(0,0,64,64);x.fillRect(64,64,64,64);x.strokeStyle='#b9a37c';x.strokeRect(0,0,w,h)},[30,30]);
const GRASS=tex(256,256,(x,w,h)=>{x.fillStyle='#8cc063';x.fillRect(0,0,w,h);for(let i=0;i<1800;i++){x.fillStyle='hsl('+(85+Math.random()*30)+',45%,'+(40+Math.random()*22)+'%)';x.fillRect(Math.random()*w,Math.random()*h,2,5)}},[40,40]);
const flo=(g,c)=>{const t=(c==0xd9b98a||c==0xc6a87a)?TILE:(c==0x8a6a4a||c==0xcdd8c0)?null:GRASS;return add(g,B(90,.2,90),c,0,-.1,0,{m:new T.MeshStandardMaterial({color:t==TILE?0xffffff:c,map:t,roughness:.95})})};
function tree(g,x,z){const h=2.8;add(g,C(.24,h,8),0x6b4a2f,x,h/2,z);for(let i=0;i<7;i++){const a=i*.9,r=.8+(i%2)*.4;add(g,S(1.15-(i%3)*.15),i%3?0xd9412c:0xe8573a,x+Math.cos(a)*r,h+.3+(i%3)*.4,z+Math.sin(a)*r*.8)}add(g,S(1.2),0x3f9b4a,x,h+1.3,z)}
function palm(g,x,z){for(let i=0;i<5;i++)add(g,C(.15-i*.014,.75,8),0x8d6e50,x+i*.08,.37+i*.7,z);for(let i=0;i<8;i++){const a=i*.785,l=add(g,new T.ConeGeometry(.2,2.4,4),0x3c8d40,x+.4+Math.cos(a)*.8,3.7,z+Math.sin(a)*.8);l.rotation.set(Math.sin(a)*1.15,0,-Math.cos(a)*1.15)}add(g,S(.14),0x6d4c41,x+.4,3.4,z)}
function star(r){const s=new T.Shape();for(let i=0;i<10;i++){const a=i*Math.PI/5+Math.PI/2,q=i%2?r*.45:r;i?s.lineTo(Math.cos(a)*q,Math.sin(a)*q):s.moveTo(Math.cos(a)*q,Math.sin(a)*q)}return new T.ExtrudeGeometry(s,{depth:r*.3,bevelEnabled:false})}
function txt(str,w,h,col='#fff',fs=56){const c=document.createElement('canvas');c.width=1024;c.height=Math.round(1024*h/w);const x=c.getContext('2d');x.font='700 '+fs+'px "Be Vietnam Pro",sans-serif';x.fillStyle=col;x.textBaseline='top';let ln='',y=6;str.split(' ').forEach(wd=>{const t=ln+wd+' ';if(x.measureText(t).width>1000&&ln){x.fillText(ln,8,y);y+=fs*1.2;ln=wd+' '}else ln=t});x.fillText(ln,8,y);
const tx=new T.CanvasTexture(c),gm=new T.PlaneGeometry(w,h);gm.translate(w/2,0,0);return new T.Mesh(gm,new T.MeshBasicMaterial({map:tx,transparent:true}))}
const wr=(m,k)=>{k=Math.max(k,.001);m.scale.x=k;m.material.map.repeat.x=k};
function petals(g,c,n=160){const p=new Float32Array(n*3);for(let i=0;i<n;i++){p[i*3]=(Math.random()-.5)*30;p[i*3+1]=Math.random()*10;p[i*3+2]=(Math.random()-.5)*24}
const geo=new T.BufferGeometry();geo.setAttribute('position',new T.BufferAttribute(p,3));const pts=new T.Points(geo,new T.PointsMaterial({color:c,size:.18}));pts.frustumCulled=false;g.add(pts);
return t=>{for(let i=0;i<n;i++){p[i*3+1]-=.02;p[i*3]+=Math.sin(t+i)*.004;if(p[i*3+1]<0)p[i*3+1]=10}geo.attributes.position.needsUpdate=true}}
function room(g){flo(g,0xd9b98a);const wm=new T.MeshStandardMaterial({color:0xfff1d0,roughness:.95});add(g,B(34,9,.3),0,0,4.5,-8,{m:wm});
const sw=(x,r)=>{const m=new T.Mesh(new T.PlaneGeometry(40,9),wm);m.position.set(x,4.5,-8+20);m.rotation.y=r;g.add(m)};sw(-17,Math.PI/2);sw(17,-Math.PI/2);
const ce=new T.Mesh(new T.PlaneGeometry(34,40),new T.MeshStandardMaterial({color:0xf5efe0}));ce.position.set(0,9,12);ce.rotation.x=Math.PI/2;g.add(ce);[-8,0,8].forEach(x=>[0,8].forEach(z=>add(g,B(2.4,.1,.5),0xffffff,x,8.9,z,{m:new T.MeshBasicMaterial({color:0xfffbe8})})));
add(g,B(34,.9,.35),0x9fc5a8,0,.45,-7.9);
const bd=add(g,B(8,2.6,.1),0x2f5d46,0,3.8,-7.8);add(g,B(8.4,.12,.14),0x8d6e63,0,2.46,-7.75);[-4.1,4.1].forEach(x=>add(g,B(.12,2.7,.14),0x8d6e63,x,3.8,-7.75));[0,1,2].forEach(i=>add(g,B(.3,.05,.08),0xffffff,-1+i*.5,2.55,-7.7));
add(g,B(2.4,1.6,.08),0xda251d,0,6.6,-7.8);add(g,star(.5),0xffcd00,-.0,6.6,-7.76).position.x=-.0;
add(g,B(3.2,2.2,.1),0x5fa8d3,-9,3.8,-7.8);add(g,B(1.1,.8,.12),0x7cb342,-9.4,4,-7.75);add(g,B(.9,1,.12),0xffb74d,-8.4,3.5,-7.75);add(g,B(3.4,2.4,.08),0xc9a26b,-12.6,3.8,-7.8);[0,1,2,3,4].forEach(i=>add(g,B(.5,.6,.02),GC[i],-13.8+i*.6,3.8+(i%2)*.4,-7.74));
add(g,C(.45,.08,24),0xffffff,6,6.6,-7.7).rotation.x=Math.PI/2;add(g,B(.04,.3,.02),0x222222,6,6.7,-7.64);add(g,B(.25,.04,.02),0x222222,6.1,6.6,-7.64);
add(g,B(1.6,3.4,.12),0x8d5a2b,-15,1.7,-7.8);add(g,B(3.2,2.4,.7),0x9c7a52,14,1.2,-7.5);[0,1,2].forEach(i=>[0,1,2,3].forEach(j=>add(g,B(.55,.4,.3),[0xe57373,0x64b5f6,0xfff176,0x81c784][(i+j)%4],12.8+i*.9,.5+j*.55,-7.1)));
add(g,B(3.4,3.2,.1),0xffe1a0,10,3.8,-7.8,{m:new T.MeshBasicMaterial({color:0xffe1a0})});[[0,1.7,3.6,.12],[0,-1.7,3.6,.12]].forEach(([a,y,w,h])=>add(g,B(w,h,.14),0x8d6e63,10,3.8+y,-7.75));[-1.75,0,1.75].forEach(x=>add(g,B(.1,3.4,.14),0x8d6e63,10+x,3.8,-7.75));
[7.9,12.1].forEach(x=>add(g,B(.8,3.6,.2),0xf8bbd0,x,3.8,-7.6));tree(g,10,-11);
const ray=new T.Mesh(B(3,.05,12),new T.MeshBasicMaterial({color:0xffe9a8,transparent:true,opacity:.14}));ray.position.set(6,3,-2);ray.rotation.set(.5,.5,0);g.add(ray);
add(g,C(.08,.9),0x444444,-6,.45,-6);add(g,S(.55),0x3b8ed0,-6,1.4,-6);add(g,new T.TorusGeometry(.6,.03,6,20),0xb0893f,-6,1.4,-6).rotation.y=1;return bd}
const DP=[[-8,1],[-4,2.5],[0,1],[4,2.5],[8,1]];
function desks(g,sign){const cr=DP.map(([x,z],i)=>{add(g,B(2.2,.1,1.4),0xc99a62,x,.8,z);add(g,B(2,.7,1.2),0xa87b48,x,.35,z);add(g,B(.9,.01,.6),0xffffff,x-.3,.86,z);add(g,B(.5,.08,.35),GC[(i+2)%5],x+.6,.9,z+.2);add(g,C(.07,.14,10),0xeeeeee,x-.8,.92,z-.3);add(g,B(.18,.015,.18),0xffee58,x+.2,.86,z-.3);if(sign){add(g,C(.03,2.2),0x444444,x,1.1,z);add(g,B(1,.55,.06),GC[i],x,2.4,z)}return crew(g,x,z,i,4,1.4,.8)});return cr}
