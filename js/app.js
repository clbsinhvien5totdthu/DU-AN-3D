// Dữ liệu 14 cảnh (SC), giao diện, điều khiển, vòng lặp render
const SC=[
{t:'Phương pháp dạy học theo dự án',c:'Học để hiểu, làm để biết, trải nghiệm để trưởng thành.',bg:0xffd9a0,col:'#ffb74d',nb:'▶ Bắt đầu',b:[s0]},
{ph:1,t:'Giai đoạn 1: Quyết định (lập đề xuất)',c:'Giai đoạn 1: Xác định mối quan tâm của người học và quyết định chủ đề dự án.',bg:0xfff0c2,col:'#e8b83a',b:[s1]},
{ph:2,t:'Giai đoạn 2: Xây dựng kế hoạch',c:'Giai đoạn 2: Lên kế hoạch tiến trình, xác định công việc cụ thể, phân công nhiệm vụ và thời gian.',bg:0xcfe3f6,col:'#4a90d9',b:[s2]},
{ph:3,t:'Giai đoạn 3: Tiến hành (thực hiện dự án)',c:['3a. Thu thập thông tin: khảo sát thực địa, phỏng vấn người dân.','3b. Xử lý thông tin: số liệu thành bảng tính và biểu đồ.','3c. Đánh giá thông tin: tranh luận, đối chiếu bản đồ và số liệu.','3d. Làm việc nhóm: ghép các phần việc thành báo cáo hoàn chỉnh.'],bg:0xcdeccd,col:'#43a047',subs:['3a Thu thập','3b Xử lý','3c Đánh giá','3d Làm việc nhóm'],b:[s3a,s3b,s3c,s3d]},
{ph:4,t:'Giai đoạn 4: Đánh giá',c:'Giai đoạn 4: Xem xét, đánh giá tiến trình thực hiện và chất lượng sản phẩm dự án.',bg:0xe8d3ee,col:'#b05cc0',b:[s4]},
{t:'Tổng quan 4 giai đoạn',c:'Một chu trình học tập trọn vẹn, lấy người học làm trung tâm.',bg:0x1b2740,col:'#ffc83a',nb:'▶ Xem minh chứng thực tế',b:[s5]},
{t:'Minh chứng: Địa lí lớp 12',c:'Học sinh tự đề xuất nhiệm vụ và chia thành 5 nhóm nghiên cứu chuyên sâu.',bg:0xfff0c2,col:'#ffb74d',b:[s6]},
{t:'Nhóm 1: Dân số',c:'Nhóm 1: Nghiên cứu vấn đề dân số và đề xuất giải pháp.',bg:0xbfe3f5,col:'#e53935',grp:0,b:[g1]},
{t:'Nhóm 2: Việc làm',c:'Nhóm 2: Nghiên cứu vấn đề việc làm.',bg:0xbfe3f5,col:'#fb8c00',grp:1,b:[g2]},
{t:'Nhóm 3: Lương thực',c:'Nhóm 3: Nghiên cứu vấn đề lương thực.',bg:0xffd9a0,col:'#fdd835',grp:2,b:[g3]},
{t:'Nhóm 4: Giáo dục, y tế',c:'Nhóm 4: Nghiên cứu vấn đề phát triển giáo dục, y tế.',bg:0xbfe3f5,col:'#43a047',grp:3,b:[g4]},
{t:'Nhóm 5: Nhà ở',c:'Nhóm 5: Nghiên cứu vấn đề nhà ở.',bg:0xbfe3f5,col:'#1e88e5',grp:4,b:[g5]},
{t:'Kết quả thực hiện',c:'Các em tự tìm kiếm, xử lý, phân tích dữ liệu thực tế, trình bày báo cáo viết, bổ sung và xây dựng giải pháp chung phát triển kinh tế - xã hội địa phương.',bg:0xfff0c2,col:'#69f0ae',b:[s8]},
{t:'Học qua dự án: học để làm, làm để hiểu.',c:'Học qua dự án: học để làm, làm để hiểu.',bg:0xffb88a,col:'#ff8a65',nb:'↻ Xem lại',b:[s9]}];
const SK={0:['#8fbbe8','#ffe2b0'],7:['#5aa7e6','#dff1ff'],8:['#5aa7e6','#dff1ff'],9:['#f4a259','#ffe6a8'],10:['#5aa7e6','#dff1ff'],11:['#5aa7e6','#dff1ff'],13:['#6c4f9c','#ffb070']};
const cloud=()=>{const c=new T.Group();[[0,0,1.8],[2.2,.3,1.4],[-2.2,.2,1.4],[1,1,1.2]].forEach(([x,y,r])=>{const m=new T.Mesh(new T.SphereGeometry(r,10,8),new T.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.9}));m.position.set(x,y,0);m.scale.z=.5;c.add(m)});return c};
const GN=['Nhóm 1 Dân số','Nhóm 2 Việc làm','Nhóm 3 Lương thực','Nhóm 4 Giáo dục, y tế','Nhóm 5 Nhà ở'];

const R=new T.WebGLRenderer({antialias:true});R.shadowMap.enabled=true;R.shadowMap.type=T.PCFSoftShadowMap;R.toneMapping=T.ACESFilmicToneMapping;R.toneMappingExposure=1.3;R.setPixelRatio(Math.min(devicePixelRatio,2));$('stage').appendChild(R.domElement);
const cam=new T.PerspectiveCamera(45,1,.1,300);let sc,upd,cur=0,sub=0,t0=0,tm;
const rs=()=>{R.setSize(innerWidth,innerHeight);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix()};addEventListener('resize',rs);rs();
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
function say(s){const e=$('cap');e.textContent='';clearTimeout(tm);if(reduce){e.textContent=s;return}let i=0;const f=()=>{e.textContent=s.slice(0,++i);if(i<s.length)tm=setTimeout(f,26)};tm=setTimeout(f,1000)}
function build(){const S=SC[cur];K=[];shotI=-1;sc=new T.Scene();sc.background=new T.Color(S.bg);sc.fog=new T.Fog(S.bg,40,110);
sc.add(new T.HemisphereLight(0xfff4e0,0x8a7a60,.95));const d=new T.DirectionalLight(0xffe0b0,1.1);d.position.set(10,16,8);d.castShadow=true;d.shadow.mapSize.set(1024,1024);const q=d.shadow.camera;q.left=q.bottom=-24;q.right=q.top=24;q.far=70;sc.add(d);
const sk=SK[cur],cd=[];if(sk){sc.background=tex(2,256,(x,w,h)=>{const gr=x.createLinearGradient(0,0,0,h);gr.addColorStop(0,sk[0]);gr.addColorStop(1,sk[1]);x.fillStyle=gr;x.fillRect(0,0,w,h)});sc.background.repeat.set(1,1);sc.fog.color.set(sk[1]);for(let i=0;i<9;i++){const c=cloud();c.position.set(-70+i*17,24+(i%3)*4,-55-(i%2)*15);c.scale.setScalar(2+(i%3));sc.add(c);cd.push(c)}for(let i=0;i<8;i++){const h=new T.Mesh(new T.ConeGeometry(16,10,8),new T.MeshStandardMaterial({color:0x6fae5a,flatShading:true}));h.position.set(-70+i*20,2,-60);h.scale.y=.7;sc.add(h)}}
const r=S.b[sub](sc),cs=seq(r.s);t0=performance.now();upd=t=>{cd.forEach((c,i)=>c.position.x=((c.position.x+80+.01*(1+i%3))%160)-80);r.k&&r.k(t);idle(t);cs(t)};say(Array.isArray(S.c)?S.c[sub]:S.c)}
function show(f){$('stage').classList.add('out');setTimeout(()=>{f();$('stage').classList.remove('out')},600)}
function go(i,j=0){cur=(i+SC.length)%SC.length;sub=j;const S=SC[cur];
document.documentElement.style.setProperty('--c',S.col);$('ttl').textContent=S.t;$('badge').textContent=S.ph||'';$('badge').classList.toggle('off',!S.ph);
$('nx').textContent=S.nb||'▶';[...$('dots').children].forEach((b,k)=>b.classList.toggle('on',k===cur));
const names=S.subs||(S.grp!=null?GN:[]);$('subs').innerHTML='';names.forEach((n,k)=>{const b=document.createElement('button');b.textContent=n;b.className=(S.grp!=null?k===S.grp:k===sub)?'on':'';b.onclick=()=>S.grp!=null?go(7+k):pick(k);$('subs').appendChild(b)});
show(build)}
function pick(k){sub=k;[...$('subs').children].forEach((b,i)=>b.classList.toggle('on',i===k));show(build)}
SC.forEach((s,i)=>{const b=document.createElement('button');b.title=s.t;b.setAttribute('aria-label',s.t);b.onclick=()=>go(i);$('dots').appendChild(b)});
$('nx').onclick=()=>go(cur+1);$('pv').onclick=()=>go(cur-1);
addEventListener('keydown',e=>{if(e.key==='ArrowRight')go(cur+1);if(e.key==='ArrowLeft')go(cur-1)});
let sx=0;$('stage').addEventListener('pointerdown',e=>sx=e.clientX);$('stage').addEventListener('pointerup',e=>{const d=e.clientX-sx;if(d<-50)go(cur+1);else if(d>50)go(cur-1)});
$('cc').onclick=()=>document.body.classList.toggle('nocc');
let ac,on=false;$('snd').onclick=()=>{if(!ac){ac=new AudioContext();const n=[261.6,329.6,392,440,392,329.6,293.7,349.2];let k=0;setInterval(()=>{if(!on)return;const o=ac.createOscillator(),g=ac.createGain();o.frequency.value=n[k++%8]*(k%16<8?1:.5);g.gain.setValueAtTime(.0001,ac.currentTime);g.gain.exponentialRampToValueAtTime(.05,ac.currentTime+.05);g.gain.exponentialRampToValueAtTime(.0001,ac.currentTime+1.6);o.connect(g).connect(ac.destination);o.start();o.stop(ac.currentTime+1.7)},700)}
on=!on;$('snd').textContent=on?'♪ Đang bật':'♪ Tiếng'};
function loop(){requestAnimationFrame(loop);if(upd){upd((performance.now()-t0)/1000);R.render(sc,cam)}}
go(0);loop();
