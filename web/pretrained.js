(async function(){
"use strict";
if(window.stopStarePretrained) await window.stopStarePretrained();
const root=document.createElement("div");root.id="stare-pretrained";
const css=document.createElement("style");
css.textContent=[
"#stare-pretrained{position:fixed;inset:0;z-index:2147483646;background:#0c1421;color:#eef4ff;font:14px system-ui,sans-serif;overflow:hidden}",
"#stare-pretrained *{box-sizing:border-box}",
"#stare-pretrained .panel{position:absolute;left:18px;top:18px;bottom:18px;width:306px;overflow:auto;background:#182437;border:1px solid #3c4b62;padding:21px;border-radius:18px;z-index:5}",
"#stare-pretrained h2{margin:0;font-size:22px}",
"#stare-pretrained .muted{font-size:12px;color:#a7b9d2}",
"#stare-pretrained .buttons{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:15px 0}",
"#stare-pretrained button{cursor:pointer;border:1px solid #53637b;background:#273b55;color:#eaf3ff;border-radius:10px;padding:10px 7px;font:inherit}",
"#stare-pretrained button.primary{background:#e1edff;color:#182a45;font-weight:650}",
"#stare-pretrained button:disabled{opacity:.5;cursor:not-allowed}",
"#stare-pretrained .wide{grid-column:span 2}",
"#stare-pretrained .divider{border-top:1px solid #35455e;margin:18px 0}",
"#stare-pretrained .stat{display:flex;justify-content:space-between;margin:8px 0;gap:10px}",
"#stare-pretrained label{display:block;color:#afbed5;font-size:12px;margin:15px 0 4px}",
"#stare-pretrained input[type=range]{width:100%;accent-color:#acd5ff}",
"#stare-pretrained .check{display:block;margin:9px 0;font-size:12px;color:#c4d5e9}",
"#stare-pretrained .status{font-size:12px;color:#acd2ff;min-height:42px;white-space:pre-wrap}",
"#stare-pretrained .preview{position:absolute;right:18px;top:18px;width:240px;background:#172538;padding:10px;border:1px solid #40516a;border-radius:15px;z-index:3}",
"#stare-pretrained .camera{position:relative;aspect-ratio:4/3;background:#000;border-radius:9px;overflow:hidden}",
"#stare-pretrained video,#stare-pretrained canvas{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transform:scaleX(-1)}",
"#stare-pretrained .heading{position:absolute;top:45px;left:50%;transform:translateX(-30%);text-align:center;pointer-events:none}",
"#stare-pretrained .heading h1{font-size:27px;margin:0}",
"#stare-pretrained .heading p{color:#a4b9d5}",
"#stare-pretrained .cursor{width:28px;height:28px;border:2px solid #89e8ca;border-radius:50%;transform:translate(-50%,-50%);position:absolute;display:none;pointer-events:none;box-shadow:0 0 0 12px #89e8ca28;z-index:3}",
"#stare-pretrained .cursor:after{content:'';position:absolute;inset:9px;background:#89e8ca;border-radius:50%}",
"#stare-pretrained .center{display:none;position:absolute;left:50%;top:50%;width:46px;height:46px;border-radius:50%;border:3px solid #dfecff;transform:translate(-50%,-50%);box-shadow:0 0 0 15px #aacbff24}",
"#stare-pretrained .center:after{content:'';position:absolute;inset:15px;background:#dfecff;border-radius:50%}",
"#stare-pretrained.calibrating .center{display:block}",
"#stare-pretrained.calibrating .panel,#stare-pretrained.calibrating .preview{opacity:0;pointer-events:none}",
"#stare-pretrained .cancel{display:none;position:absolute;top:15px;right:18px;z-index:9}",
"#stare-pretrained.calibrating .cancel{display:block}",
"#stare-pretrained .pulse{position:absolute;transform:translate(-50%,-50%);border:2px solid #f8e6a2;width:24px;height:24px;border-radius:50%;animation:stpulse .7s ease-out forwards;pointer-events:none}",
"@keyframes stpulse{to{width:85px;height:85px;opacity:0}}",
"@media(max-width:700px){#stare-pretrained .panel{width:220px;padding:12px;left:8px;top:8px;bottom:8px}#stare-pretrained .preview{width:135px;right:8px;top:8px}#stare-pretrained .heading{top:55%;left:55%}#stare-pretrained .heading h1{font-size:18px}}"
].join("");
root.innerHTML=[
'<section class="panel"><h2>stareControl</h2><p class="muted">学習済みモデル版 · Gaze360</p>',
'<div class="buttons"><button id="start" class="primary wide">カメラを開始</button><button id="full">全画面</button><button id="five" disabled>5点補正（約10秒）</button><button id="center" disabled>中央だけ補正</button><button id="csv" disabled>CSV保存</button><button id="reset">補正を解除</button><button id="side" class="wide">疑似クリック：左</button><button id="stop" class="wide">終了</button></div>',
'<div class="divider"></div><div class="stat"><span>顔</span><b id="face">未開始</b></div>',
'<div class="stat"><span>左右方向</span><b id="yaw">—</b></div><div class="stat"><span>上下方向</span><b id="pitch">—</b></div><div class="stat"><span>推定位置</span><b id="xy">—</b></div><div class="stat"><span>推論</span><b id="rate">—</b></div><div class="stat"><span>補正状態</span><b id="cal-mode">未補正</b></div>',
'<div class="divider"></div><label>水平範囲 <span id="xv">45°</span></label><input id="gx" type="range" min="25" max="100" value="45" step="5">',
'<label>垂直範囲 <span id="yv">35°</span></label><input id="gy" type="range" min="20" max="90" value="35" step="5">',
'<label class="check"><input id="flipx" type="checkbox"> 水平方向を反転</label><label class="check"><input id="flipy" type="checkbox" checked> 垂直方向を反転</label>',
'<label>細目の感度 <span id="sv">78%</span></label><input id="sensitivity" type="range" min="65" max="90" value="78">',
'<div class="divider"></div><div id="status" class="status">準備完了。カメラを開始してください。</div><p class="muted">まず全画面にして5点補正を試してください。画面上の位置は概算で、モデルの推定精度には限界があります。</p></section>',
'<aside class="preview"><div class="camera"><video id="video" autoplay muted playsinline></video><canvas id="overlay" width="320" height="240"></canvas></div><p class="muted">カメラ / MediaPipe</p></aside>',
'<div class="heading"><h1 id="title">学習なしで視線を推定</h1><p id="hint">学習済みモデルを使用します。追加の学習は不要です。</p></div>',
'<div id="cursor" class="cursor"></div><div class="center"></div><button id="cancel" class="cancel">補正を中止</button>'
].join("");
root.appendChild(css);document.body.appendChild(root);
const el=id=>root.querySelector("#"+id),video=el("video"),draw=el("overlay").getContext("2d"),cursor=el("cursor");
const canvas=document.createElement("canvas");canvas.width=448;canvas.height=448;
const painter=canvas.getContext("2d",{willReadFrequently:true});
let ort=null,session=null,inputName=null,landmarker=null,stream=null,active=false,raf=0,busy=false,lastFrame=0,lastSample=0,lastFace=0;
let yaw=0,pitch=0,offset={x:0,y:0},smoothing=null,center=null,fiveTask=null,screenFit=null,opened=[],squintAt=0,latched=false,lastClick=0,leftClick=true;
let count=0,fpsAt=performance.now(),records=[];
const setStatus=m=>el("status").textContent=m;
const clamp=x=>Math.min(1,Math.max(0,x));
const median=a=>a.slice().sort((x,y)=>x-y)[Math.floor(a.length/2)];
const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
function eyes(p){
 const eye=(a,b,u,v,l,r)=>(distance(p[u],p[r])+distance(p[v],p[l]))/(2*Math.max(distance(p[a],p[b]),.00001));
 return [eye(33,133,160,158,153,144),eye(362,263,385,387,373,380)];
}
function tensor(){
 const d=painter.getImageData(0,0,448,448).data,n=448*448,arr=new Float32Array(n*3);
 const mean=[.485,.456,.406],std=[.229,.224,.225];
 for(let i=0,j=0;i<n;i++,j+=4){
  arr[i]=(d[j]/255-mean[0])/std[0];
  arr[n+i]=(d[j+1]/255-mean[1])/std[1];
  arr[2*n+i]=(d[j+2]/255-mean[2])/std[2];
 }
 return new ort.Tensor("float32",arr,[1,3,448,448]);
}
function crop(lm){
 const w=video.videoWidth,h=video.videoHeight;let l=1,t=1,r=0,b=0;
 for(const p of lm){l=Math.min(l,p.x);t=Math.min(t,p.y);r=Math.max(r,p.x);b=Math.max(b,p.y)}
 const dx=r-l,dy=b-t,padding=.08;
 l=Math.max(0,(l-padding*dx)*w);t=Math.max(0,(t-padding*dy)*h);
 r=Math.min(w,(r+padding*dx)*w);b=Math.min(h,(b+padding*dy)*h);
 if(r-l<35||b-t<35)return false;
 painter.drawImage(video,l,t,r-l,b-t,0,0,448,448);return true;
}
function radians(logits){
 const a=logits.data;if(a.length!==90)throw Error("学習済みモデルの出力形式が違います（90クラスを期待）");
 let mx=-Infinity;for(const x of a)mx=Math.max(mx,x);
 let sum=0,scores=0;for(let i=0;i<a.length;i++){const v=Math.exp(a[i]-mx);sum+=v;scores+=v*i}
 return ((scores/sum*4)-180)*Math.PI/180;
}
function toPosition(){
 if(screenFit){
   const y=yaw*180/Math.PI, p=pitch*180/Math.PI;
   const features=[1,y-screenFit.cYaw,p-screenFit.cPitch];
   return {x:clamp(features.reduce((v,q,i)=>v+q*screenFit.cx[i],0)),
           y:clamp(features.reduce((v,q,i)=>v+q*screenFit.cy[i],0))};
 }
 const xDeg=Number(el("gx").value),yDeg=Number(el("gy").value);
 const dx=(yaw-offset.x)*180/Math.PI,dy=(pitch-offset.y)*180/Math.PI;
 return {x:clamp(.5+(el("flipx").checked?-1:1)*dx/xDeg),y:clamp(.5+(el("flipy").checked?-1:1)*dy/yDeg)};
}
const fivePoints=[
 {x:.5,y:.5,label:"中央"},{x:.14,y:.5,label:"左端"},{x:.86,y:.5,label:"右端"},
 {x:.5,y:.14,label:"上端"},{x:.5,y:.86,label:"下端"}
];
function solve3(a,b){
 const m=a.map((row,i)=>[...row,b[i]]);
 for(let k=0;k<3;k++){
   let p=k;
   for(let j=k+1;j<3;j++)if(Math.abs(m[j][k])>Math.abs(m[p][k]))p=j;
   if(Math.abs(m[p][k])<1e-10)return null;
   [m[k],m[p]]=[m[p],m[k]];
   const d=m[k][k];for(let q=k;q<4;q++)m[k][q]/=d;
   for(let j=0;j<3;j++)if(j!==k){
     const x=m[j][k];for(let q=k;q<4;q++)m[j][q]-=x*m[k][q];
   }
 }
 return m.map(row=>row[3]);
}
function fitFive(points){
 if(points.length!==5)throw Error("5点の記録が足りません");
 const cYaw=points[0].yaw*180/Math.PI,cPitch=points[0].pitch*180/Math.PI;
 const features=points.map(e=>[1,e.yaw*180/Math.PI-cYaw,e.pitch*180/Math.PI-cPitch]);
 const A=Array.from({length:3},()=>[0,0,0]),bx=[0,0,0],by=[0,0,0];
 for(let i=0;i<5;i++)for(let j=0;j<3;j++){
   bx[j]+=features[i][j]*points[i].x;by[j]+=features[i][j]*points[i].y;
   for(let k=0;k<3;k++)A[j][k]+=features[i][j]*features[i][k];
 }
 A[1][1]+=.0005;A[2][2]+=.0005;
 const cx=solve3(A,bx),cy=solve3(A,by);
 if(!cx||!cy)throw Error("視線変化が十分ではありません");
 const dx=Math.hypot(points[2].yaw-points[1].yaw,points[2].pitch-points[1].pitch);
 const dy=Math.hypot(points[4].yaw-points[3].yaw,points[4].pitch-points[3].pitch);
 if(dx<.012||dy<.012)throw Error("左右または上下を見た際の違いが検出できません。目を大きく動かしてください");
 const errs=features.map((f,i)=>{
   const x=f.reduce((v,q,j)=>v+q*cx[j],0);
   const y=f.reduce((v,q,j)=>v+q*cy[j],0);
   return Math.hypot((x-points[i].x)*root.clientWidth,(y-points[i].y)*root.clientHeight);
 });
 return {cx,cy,cYaw,cPitch,fitError:errs.reduce((a,b)=>a+b,0)/errs.length};
}
function pointAt(p){
 const marker=root.querySelector(".center");
 marker.style.left=(p.x*100)+"%";marker.style.top=(p.y*100)+"%";
}
function stopCal(msg){
 center=null;fiveTask=null;root.classList.remove("calibrating");
 pointAt({x:.5,y:.5});
 el("title").textContent="視線を推定中";
 el("hint").textContent="緑の点が画面上の推定位置です";
 if(msg)setStatus(msg);
}
function tickFive(t){
 if(!fiveTask)return;
 const task=fiveTask,dt=t-task.since;
 if(dt>=550)task.samples.push([yaw,pitch]);
 if(dt<1750)return;
 if(task.samples.length<4){
   task.retries=(task.retries||0)+1;
   if(task.retries>4){stopCal("補正に必要なサンプルが不足しています。カメラと顔の位置を確認してください。");return;}
   task.since=t-600;task.samples=[];
   return;
 }
 const p=fivePoints[task.index];
 task.data.push({x:p.x,y:p.y,
   yaw:median(task.samples.map(v=>v[0])),pitch:median(task.samples.map(v=>v[1]))});
 task.index++;task.samples=[];task.since=t;task.retries=0;
 if(task.index>=5){
   try{
     const fitted=fitFive(task.data);
     screenFit=fitted;smoothing=null;
     el("cal-mode").textContent="5点（自動）";
     stopCal("5点補正完了。左右・上下の方向と移動幅を自動調整しました。学習内誤差: "+Math.round(fitted.fitError)+"px");
   }catch(e){stopCal("補正失敗: "+e.message)}
 }else{
   const next=fivePoints[task.index];pointAt(next);
   el("title").textContent=next.label+"を見つめてください";
   el("hint").textContent=(task.index+1)+" / 5 · 点が切り替わるまで見続けてください";
 }
}
function place(p){cursor.style.left=(p.x*100)+"%";cursor.style.top=(p.y*100)+"%"}
function showEyes(lm){
 draw.clearRect(0,0,320,240);
 for(const id of [33,133,159,145,362,263,386,374,468,473]){
  const p=lm[id];if(!p)continue;draw.beginPath();draw.arc(p.x*320,p.y*240,id>467?4:2,0,Math.PI*2);
  draw.fillStyle=id>467?"#89ead2":"#b0d1f5";draw.fill();
 }
}
function squintCheck(lm,p,now){
 const ratio=eyes(lm);
 if(ratio[0]>.16&&ratio[1]>.16){opened.push(ratio);if(opened.length>100)opened.shift()}
 if(opened.length<8)return;
 const norm=[median(opened.map(a=>a[0])),median(opened.map(a=>a[1]))],th=Number(el("sensitivity").value)/100;
 const a=ratio[0]/Math.max(norm[0],.01),b=ratio[1]/Math.max(norm[1],.01);
 if(a<th&&b<th){
  if(!squintAt)squintAt=now;
  if(!latched&&now-squintAt>450&&now-lastClick>1100){
   lastClick=now;latched=true;
   const circle=document.createElement("div");circle.className="pulse";circle.style.left=(p.x*100)+"%";circle.style.top=(p.y*100)+"%";
   root.appendChild(circle);setTimeout(()=>circle.remove(),700);
   setStatus((leftClick?"左":"右")+"疑似クリックを検出しました");
   records.push([Date.now(),leftClick?"LEFT_CLICK":"RIGHT_CLICK",yaw,pitch,p.x,p.y]);
  }
 }else if(a>th+.10&&b>th+.10){squintAt=0;latched=false}
}
async function process(t){
 if(!active||busy||!session||!landmarker||video.readyState<2||t-lastFrame<115)return;
 lastFrame=t;busy=true;
 try{
  const found=landmarker.detectForVideo(video,t).faceLandmarks;
  const lm=found&&found[0];
  if(!lm||lm.length<474){el("face").textContent="見失いました";cursor.style.display="none";draw.clearRect(0,0,320,240);return}
  lastFace=t;el("face").textContent="検出中";showEyes(lm);
  if(!crop(lm))return;
  const outputs=await session.run({[inputName]:tensor()});
  if(!outputs.yaw||!outputs.pitch)throw Error("ONNXのyaw / pitch出力が見つかりません");
  yaw=radians(outputs.yaw);pitch=radians(outputs.pitch);
  el("yaw").textContent=(yaw*180/Math.PI).toFixed(1)+"°";
  el("pitch").textContent=(pitch*180/Math.PI).toFixed(1)+"°";
  if(fiveTask)tickFive(t);
  if(center){
   if(t-center.start>450)center.samples.push([yaw,pitch]);
   el("hint").textContent="中央を見続けてください · "+Math.max(0,Math.ceil((center.start+3200-t)/1000))+"秒";
   if(t-center.start>=3200&&center.samples.length>=3){
    offset={x:median(center.samples.map(a=>a[0])),y:median(center.samples.map(a=>a[1]))};
    center=null;root.classList.remove("calibrating");el("title").textContent="視線を推定中";
    el("hint").textContent="短い中央補正が完了しました";setStatus("中央を基準に補正しました。");
    smoothing=null;
   }
  }
  let p=toPosition();if(!smoothing)smoothing=p;else smoothing={x:smoothing.x*.75+p.x*.25,y:smoothing.y*.75+p.y*.25};
  if(!center&&!fiveTask){place(smoothing);cursor.style.display="block";squintCheck(lm,smoothing,t)}
  else{cursor.style.display="none";squintAt=0;latched=false}
  el("xy").textContent=Math.round(smoothing.x*100)+"%, "+Math.round(smoothing.y*100)+"%";
  if(count%3===0)records.push([Date.now(),"GAZE",yaw,pitch,smoothing.x,smoothing.y]);
  if(records.length>15000)records.shift();el("csv").disabled=false;
  count++;if(t-fpsAt>=1000){el("rate").textContent=(count*1000/(t-fpsAt)).toFixed(1)+" fps";count=0;fpsAt=t}
 }catch(e){console.error(e);setStatus("推論エラー: "+e.message)}
 finally{busy=false}
}
function loop(t){if(!active)return;raf=requestAnimationFrame(loop);void process(t)}
async function start(){
 el("start").disabled=true;setStatus("ONNXモデルとMediaPipeを読み込み中…");
 try{
  const mods=await Promise.all([
   import("https://cdn.jsdelivr.net/npm/onnxruntime-web@1.21.0/+esm"),
   import("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/+esm")
  ]);
  ort=mods[0];const mp=mods[1];
  ort.env.wasm.numThreads=1;ort.env.wasm.wasmPaths="https://cdn.jsdelivr.net/npm/onnxruntime-web@1.21.0/dist/";
  session=await ort.InferenceSession.create("./mobileone_s0_gaze.onnx",{executionProviders:["wasm"]});
  inputName=session.inputNames[0];
  const vision=await mp.FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm");
  landmarker=await mp.FaceLandmarker.createFromOptions(vision,{
   baseOptions:{modelAssetPath:"https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",delegate:"CPU"},
   runningMode:"VIDEO",numFaces:1
  });
  stream=await navigator.mediaDevices.getUserMedia({video:{width:{ideal:640},height:{ideal:480}},audio:false});
  video.srcObject=stream;await video.play();active=true;
  el("center").disabled=false;el("five").disabled=false;el("start").textContent="カメラ動作中";
  el("title").textContent="視線を推定中";el("hint").textContent="必要なら中央だけ補正してください";
  setStatus("学習済みモデルで推論中。緑の点は画面位置の概算です。");
  raf=requestAnimationFrame(loop);
 }catch(e){
  console.error(e);setStatus("起動失敗: "+e.message+"\nモデルのダウンロードとブラウザ権限を確認してください。");
  el("start").disabled=false;el("start").textContent="再試行";
  if(stream){stream.getTracks().forEach(t=>t.stop());stream=null}
  if(landmarker){landmarker.close();landmarker=null}
  if(session){await session.release();session=null}
 }
}
async function stop(){
 active=false;cancelAnimationFrame(raf);
 if(stream)stream.getTracks().forEach(t=>t.stop());
 if(landmarker)landmarker.close();
 if(session)await session.release();
 if(document.fullscreenElement===root)await document.exitFullscreen().catch(()=>{});
 center=null;fiveTask=null;root.remove();window.stopStarePretrained=null;
}
el("start").addEventListener("click",start);el("stop").addEventListener("click",stop);
el("full").addEventListener("click",async()=>{
 try{if(document.fullscreenElement===root)await document.exitFullscreen();else await root.requestFullscreen()}
 catch(e){setStatus("全画面エラー: "+e.message)}
});
el("center").addEventListener("click",()=>{
 if(!active)return;stopCal();screenFit=null;el("cal-mode").textContent="中央のみ";center={start:performance.now(),samples:[]};
 root.classList.add("calibrating");cursor.style.display="none";
 el("title").textContent="中央を見てください";el("hint").textContent="約3秒の補正";setStatus("中央補正中…");
});
el("five").addEventListener("click",()=>{
 if(!active)return;stopCal();squintAt=0;latched=false;
 fiveTask={index:0,samples:[],data:[],since:performance.now(),retries:0};
 root.classList.add("calibrating");cursor.style.display="none";
 pointAt(fivePoints[0]);el("title").textContent="中央を見つめてください";
 el("hint").textContent="1 / 5 · 5点を見るだけ（約10秒）";setStatus("5点補正中です。");
});
el("cancel").addEventListener("click",()=>stopCal("補正を中止しました。"));
el("reset").addEventListener("click",()=>{stopCal();screenFit=null;offset={x:0,y:0};smoothing=null;el("cal-mode").textContent="未補正";setStatus("補正を解除しました。");});
el("side").addEventListener("click",()=>{leftClick=!leftClick;el("side").textContent="疑似クリック："+(leftClick?"左":"右")});
for(const [id,out,suffix] of [["gx","xv","°"],["gy","yv","°"],["sensitivity","sv","%"]]){
 el(id).addEventListener("input",ev=>el(out).textContent=ev.target.value+suffix);
}
el("csv").addEventListener("click",()=>{
 const out=["timestamp,event,yaw_rad,pitch_rad,x_fraction,y_fraction",...records.map(r=>r.join(","))].join("\n");
 const u=URL.createObjectURL(new Blob([out],{type:"text/csv;charset=utf-8"}));
 const a=document.createElement("a");a.href=u;a.download="starecontrol_pretrained.csv";a.click();
 setTimeout(()=>URL.revokeObjectURL(u),2000);
});
window.stopStarePretrained=stop;
})().catch(e=>console.error("stareControl pretrained initialization error",e));