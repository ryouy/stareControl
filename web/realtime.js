(async function () {
  "use strict";
  if (window.__stareControlStop) { await window.__stareControlStop(); }
  const root = document.createElement("div");
  root.id = "starecontrol-realtime";
  const css = document.createElement("style");
  css.textContent = [
    "#starecontrol-realtime{position:fixed;inset:0;z-index:2147483646;background:#0a101d;color:#edf3ff;font:14px/1.5 system-ui,-apple-system,BlinkMacSystemFont,\"Segoe UI\",sans-serif;overflow:hidden;box-sizing:border-box}",
    "#starecontrol-realtime *{box-sizing:border-box}",
    "#starecontrol-realtime .panel{position:absolute;top:18px;left:18px;width:300px;max-height:calc(100% - 36px);overflow:auto;padding:22px;background:rgba(19,29,47,.96);border:1px solid #354158;border-radius:20px;box-shadow:0 15px 60px #0008;z-index:6}",
    "#starecontrol-realtime h2{margin:0;font-size:21px;letter-spacing:-.5px;font-weight:660}",
    "#starecontrol-realtime .sub{font-size:12px;color:#a5b4cd;margin:4px 0 18px}",
    "#starecontrol-realtime .section{margin:14px 0;border-top:1px solid #344059;padding-top:14px}",
    "#starecontrol-realtime button{border:1px solid #41516c;background:#24334d;color:#edf3ff;border-radius:11px;padding:10px 12px;cursor:pointer;font:inherit;font-weight:550}",
    "#starecontrol-realtime button:hover{background:#344760}",
    "#starecontrol-realtime button.primary{background:#dce9ff;border-color:#dce9ff;color:#142037}",
    "#starecontrol-realtime button:disabled{opacity:.4;cursor:not-allowed}",
    "#starecontrol-realtime .buttons{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:8px 0}",
    "#starecontrol-realtime .buttons .wide{grid-column:span 2}",
    "#starecontrol-realtime .tiny{font-size:12px;color:#aab9d1}",
    "#starecontrol-realtime .metric{display:flex;justify-content:space-between;align-items:center;margin:7px 0;gap:12px}",
    "#starecontrol-realtime .metric strong{font-variant-numeric:tabular-nums}",
    "#starecontrol-realtime input[type=range]{width:100%;accent-color:#a8ccff;margin:7px 0 0}",
    "#starecontrol-realtime .camera{position:absolute;right:19px;top:18px;z-index:4;width:245px;background:#172438;border:1px solid #354158;border-radius:16px;padding:10px;box-shadow:0 12px 36px #0007}",
    "#starecontrol-realtime .camera-viewport{position:relative;aspect-ratio:4/3;border-radius:10px;overflow:hidden;background:#070e19}",
    "#starecontrol-realtime video,#starecontrol-realtime canvas.face{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transform:scaleX(-1)}",
    "#starecontrol-realtime video{display:block}",
    "#starecontrol-realtime .cam-caption{font-size:11px;color:#a5b6cd;margin-top:8px;text-align:center}",
    "#starecontrol-realtime .heading{position:absolute;top:40px;left:50%;transform:translateX(-50%);text-align:center;z-index:3;pointer-events:none;max-width:50vw}",
    "#starecontrol-realtime .heading h1{font-size:clamp(18px,3vw,34px);margin:0;font-weight:630;letter-spacing:-.7px}",
    "#starecontrol-realtime .heading p{color:#9eb1cc;margin:5px 0;font-size:13px}",
    "#starecontrol-realtime.calibrating .panel,#starecontrol-realtime.calibrating .camera{opacity:0;pointer-events:none}",
    "#starecontrol-realtime.calibrating .heading{top:25%}",
    "#starecontrol-realtime .target{position:absolute;width:38px;height:38px;border:2px solid #c9ddff;border-radius:50%;transform:translate(-50%,-50%);display:none;z-index:5;pointer-events:none;box-shadow:0 0 0 14px #8ebaff16,0 0 42px #96bfff55}",
    "#starecontrol-realtime .target:after{content:\"\";position:absolute;inset:12px;border-radius:100%;background:#eaf5ff}",
    "#starecontrol-realtime .cursor{position:absolute;width:26px;height:26px;border:2px solid #8ee9ce;border-radius:50%;transform:translate(-50%,-50%);display:none;z-index:4;pointer-events:none;box-shadow:0 0 0 9px #8ee9ce18,0 0 30px #8ee9ce44;transition:left 45ms linear,top 45ms linear}",
    "#starecontrol-realtime .cursor:after{content:\"\";position:absolute;inset:9px;background:#8ee9ce;border-radius:50%}",
    "#starecontrol-realtime .pulse{position:absolute;width:12px;height:12px;border:2px solid #fff;border-radius:50%;transform:translate(-50%,-50%);pointer-events:none;animation:scpulse .6s ease-out forwards;z-index:3}",
    "@keyframes scpulse{to{width:100px;height:100px;opacity:0}}",
    "#starecontrol-realtime .footer{position:absolute;bottom:14px;right:18px;max-width:min(550px,65vw);font-size:12px;color:#8194ae;text-align:right}",
    "#starecontrol-realtime .progress{height:5px;border-radius:6px;background:#2b3954;overflow:hidden;margin:8px 0}",
    "#starecontrol-realtime .progress span{display:block;height:100%;width:0%;background:#a7caff;transition:width .15s}",
    "#starecontrol-realtime .status{font-size:12px;color:#9cc4ff;min-height:36px}",
    "#starecontrol-realtime .note{font-size:11px;color:#8094b1;margin:12px 0 0}",
    "#starecontrol-realtime .pill{display:inline-block;padding:3px 8px;background:#30445b;border-radius:8px;font-size:11px;color:#bdd5f2}",
    "@media(max-width:730px){#starecontrol-realtime .panel{left:8px;top:8px;width:260px;padding:13px}#starecontrol-realtime .camera{right:8px;top:8px;width:145px}#starecontrol-realtime .heading{top:56%;max-width:70vw}#starecontrol-realtime .heading h1{font-size:18px}#starecontrol-realtime .footer{font-size:10px}}"
  ].join("");
  root.innerHTML = [
    '<div class="heading"><h1 id="sc-title">視線の推定</h1><p id="sc-instruction">カメラを開始して、画面の9点を順番に見てください</p></div>',
    '<div class="panel"><h2>stareControl <span class="pill">Live</span></h2><div class="sub">視線推定と細目クリック / 実験版</div>',
    '<div class="buttons"><button class="primary wide" id="sc-start">カメラを開始</button><button id="sc-cal" disabled>9点学習</button><button id="sc-full">全画面</button><button id="sc-mode">左クリック</button><button id="sc-csv" disabled>CSV保存</button><button class="wide" id="sc-stop">終了</button></div>',
    '<div class="section"><div class="metric"><span>顔の検出</span><strong id="sc-face">未開始</strong></div><div class="metric"><span>推定位置</span><strong id="sc-pos">—</strong></div><div class="metric"><span>処理速度</span><strong id="sc-fps">—</strong></div><div class="metric"><span>直近のクリック</span><strong id="sc-click">—</strong></div></div>',
    '<div class="section"><label for="sc-sensitivity">細目クリックの感度 <span id="sc-sval">78%</span></label><input id="sc-sensitivity" type="range" min="65" max="90" value="78" step="1"><p class="tiny">両目を軽く細めて約0.45秒保つとクリック。普通の瞬きは短いため無視します。</p>',
    '<label for="sc-hold">必要な維持時間 <span id="sc-hval">450 ms</span></label><input id="sc-hold" type="range" min="300" max="1000" value="450" step="50"></div>',
    '<div class="section"><div class="tiny">キャリブレーション</div><div class="progress"><span id="sc-bar"></span></div><div class="status" id="sc-status">カメラを開始してください。</div><p class="note">全画面にしてから9点学習すると、画面全体を使えます。推定は近似値で、OSのマウスは動きません。動画を保存・送信する処理はありません。</p></div></div>',
    '<div class="camera"><div class="camera-viewport"><video id="sc-video" autoplay playsinline muted></video><canvas class="face" id="sc-canvas" width="320" height="240"></canvas></div><div class="cam-caption">リアルタイムの目・虹彩検出</div></div>',
    '<div class="target" id="sc-target"></div><div class="cursor" id="sc-cursor"></div>',
    '<div class="footer">MediaPipe Face Landmarker · browser local inference · calibration required</div>'
  ].join("");
  root.appendChild(css);
  document.body.appendChild(root);
  const byId = id => root.querySelector("#" + id);
  const video=byId("sc-video"), faceCanvas=byId("sc-canvas"), faceCtx=faceCanvas.getContext("2d");
  const startBtn=byId("sc-start"), calBtn=byId("sc-cal"), fullBtn=byId("sc-full"), modeBtn=byId("sc-mode"), csvBtn=byId("sc-csv");
  const cursor=byId("sc-cursor"), target=byId("sc-target");
  const status=msg=>{ byId("sc-status").textContent=msg; };
  const points=[[.08,.08],[.5,.08],[.92,.08],[.92,.5],[.5,.5],[.08,.5],[.08,.92],[.5,.92],[.92,.92]];
  let stream=null, detector=null, running=false, busy=false, raf=0, frames=0, countedAt=performance.now();
  let training=null, model=null, baseline=null, smoothed=null, clickMode="LEFT", squintStart=0, latched=false, lastClick=0;
  let recentOpen=[], dataset=[], lastFaceAt=0, lastFrameAt=0, lastPrediction=null, currentLandmarks=null;
  let unbindKeys=null;
  const median=arr=>{ const s=[...arr].sort((a,b)=>a-b);return s.length?s[Math.floor(s.length/2)]:NaN; };
  const mean=arr=>arr.reduce((a,b)=>a+b,0)/Math.max(arr.length,1);
  const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
  function eye(lm, spec){
    const [a,b,v1,v2,v3,v4,iris,upper,lower]=spec;
    const l=lm[a],r=lm[b], top=lm[upper], bot=lm[lower],p=lm[iris];
    const ear=(dist(lm[v1],lm[v4])+dist(lm[v2],lm[v3]))/(2*Math.max(dist(l,r),.0001));
    const xlo=Math.min(l.x,r.x), xhi=Math.max(l.x,r.x);
    const ylo=Math.min(top.y,bot.y), yhi=Math.max(top.y,bot.y);
    return {ear,gx:(p.x-xlo)/Math.max(xhi-xlo,.0001),gy:(p.y-ylo)/Math.max(yhi-ylo,.0001),ix:p.x,iy:p.y};
  }
  // 478 landmarks: iris centers 468 / 473.
  // EAR vertex ordering: outer, upper1, upper2, inner, lower2, lower1.
  function features(lm){
    if(!lm || lm.length<478)return null;
    const a=eye(lm,[33,133,160,158,153,144,468,159,145]);
    const b=eye(lm,[362,263,385,387,373,380,473,386,374]);
    const nose=lm[1],le=lm[33],re=lm[263],faceL=lm[234],faceR=lm[454],chin=lm[152],brow=lm[10];
    const width=Math.max(dist(faceL,faceR),.0001);
    const midX=(le.x+re.x)/2, midY=(le.y+re.y)/2;
    const yaw=(nose.x-midX)/Math.max(dist(le,re),.0001);
    const pitch=(nose.y-midY)/Math.max(dist(brow,chin),.0001);
    const irisX=(a.gx+b.gx)/2,irisY=(a.gy+b.gy)/2;
    return {a,b,v:[irisX,irisY,a.gx-b.gx,a.gy-b.gy,
      nose.x,nose.y,width,yaw,pitch,
      irisX*irisX,irisY*irisY,irisX*irisY]};
  }
  function solve(A,b){
    const n=b.length, M=A.map((row,i)=>[...row,b[i]]);
    for(let c=0;c<n;c++){
      let p=c;for(let r=c+1;r<n;r++)if(Math.abs(M[r][c])>Math.abs(M[p][c]))p=r;
      if(Math.abs(M[p][c])<1e-10)return null;
      [M[c],M[p]]=[M[p],M[c]];
      const pivot=M[c][c];for(let j=c;j<=n;j++)M[c][j]/=pivot;
      for(let r=0;r<n;r++)if(r!==c){const q=M[r][c];for(let j=c;j<=n;j++)M[r][j]-=q*M[c][j];}
    }
    return M.map(row=>row[n]);
  }
  function fit(samples){
    if(samples.length<35)throw new Error("有効な学習サンプルが足りません");
    const d=samples[0].v.length;
    const av=Array.from({length:d},(_,j)=>mean(samples.map(s=>s.v[j])));
    const sd=Array.from({length:d},(_,j)=>Math.max(Math.sqrt(mean(samples.map(s=>(s.v[j]-av[j])**2))),.0001));
    const rows=samples.map(s=>[1,...s.v.map((v,j)=>(v-av[j])/sd[j])]);
    const p=d+1,mat=Array.from({length:p},()=>Array(p).fill(0));
    const tx=Array(p).fill(0),ty=Array(p).fill(0);
    rows.forEach((row,i)=>{for(let j=0;j<p;j++){tx[j]+=row[j]*samples[i].x;ty[j]+=row[j]*samples[i].y;for(let k=0;k<p;k++)mat[j][k]+=row[j]*row[k];}});
    for(let j=1;j<p;j++)mat[j][j]+=6;
    mat[0][0]+=.001;
    const bx=solve(mat,tx),by=solve(mat,ty);
    if(!bx||!by)throw new Error("学習計算に失敗しました");
    return {av,sd,bx,by};
  }
  function predict(v){
    const z=[1,...v.map((x,i)=>(x-model.av[i])/model.sd[i])];
    const clip=x=>Math.min(1,Math.max(0,x));
    return {x:clip(z.reduce((s,q,i)=>s+q*model.bx[i],0)),
            y:clip(z.reduce((s,q,i)=>s+q*model.by[i],0))};
  }
  function place(el,x,y){el.style.left=(x*100)+"%";el.style.top=(y*100)+"%";}
  function tickCalibration(info, now){
    if(!training || !info)return;
    const elapsed=now-training.stepAt;
    const p=points[training.index];
    if(elapsed>650 && info.a.ear>.13 && info.b.ear>.13){
      training.samples.push({v:info.v,x:p[0],y:p[1],ea:info.a.ear,eb:info.b.ear});
    }
    if(elapsed>=2000){
      if(training.samples.length-training.startCount<5){
        training.stepAt=now-1000;
        status("顔をカメラに向け、点を見続けてください");
        return;
      }
      training.index++;training.startCount=training.samples.length;training.stepAt=now;
      if(training.index>=points.length){
        const samples=training.samples;
        training=null;root.classList.remove("calibrating");target.style.display="none";
        try{
          model=fit(samples);
          baseline=[median(samples.map(s=>s.ea)),median(samples.map(s=>s.eb))];
          recentOpen=[];smoothed=null;latched=false;squintStart=0;
          status("学習完了。緑の丸が推定した視線位置です。目を細めてクリックを試してください。");
          byId("sc-title").textContent="視線のリアルタイム推定";
          byId("sc-instruction").textContent="緑の点を視線で動かしてください";
        }catch(e){status("学習失敗: "+e.message);}
        byId("sc-bar").style.width=model?"100%":"0%";
      }else{
        const q=points[training.index];
        place(target,q[0],q[1]);byId("sc-bar").style.width=(training.index/points.length*100)+"%";
        byId("sc-title").textContent="点を見つめてください";
        byId("sc-instruction").textContent=(training.index+1)+" / "+points.length+" — 顔をなるべく動かさず、目だけを動かす";
        status("点 "+(training.index+1)+" / 9 を学習しています");
      }
    }
  }
  function handleClick(info,now){
    if(!baseline||!model||training||!info){squintStart=0;latched=false;return;}
    const ra=info.a.ear/Math.max(baseline[0],.01), rb=info.b.ear/Math.max(baseline[1],.01);
    const limit=Number(byId("sc-sensitivity").value)/100;
    const squint=(ra+rb)/2<limit && ra<limit+.09 && rb<limit+.09;
    if(squint){
      if(!squintStart)squintStart=now;
      if(!latched && now-squintStart>=Number(byId("sc-hold").value) && now-lastClick>1100){
        latched=true;lastClick=now;
        byId("sc-click").textContent=clickMode==="LEFT"?"左クリック":"右クリック";
        status("クリック検出: "+(clickMode==="LEFT"?"左":"右")+" （ブラウザ内の疑似クリック）");
        if(smoothed){
          const pulse=document.createElement("div");pulse.className="pulse";place(pulse,smoothed.x,smoothed.y);
          root.appendChild(pulse);setTimeout(()=>pulse.remove(),700);
        }
        dataset.push({timestamp:new Date().toISOString(),event:clickMode+"_CLICK",
          x:smoothed?smoothed.x:"",y:smoothed?smoothed.y:"",earA:info.a.ear,earB:info.b.ear});
      }
    }else if((ra+rb)/2>limit+.10){squintStart=0;latched=false;}
  }
  function renderFace(lm,info){
    faceCtx.clearRect(0,0,320,240);
    if(!lm||!info)return;
    faceCtx.lineWidth=2;
    for(const id of [33,133,159,145,362,263,386,374]){
      const p=lm[id];faceCtx.fillStyle="#8bceff";faceCtx.beginPath();faceCtx.arc(p.x*320,p.y*240,2.6,0,Math.PI*2);faceCtx.fill();
    }
    for(const e of [info.a,info.b]){
      faceCtx.beginPath();faceCtx.arc(e.ix*320,e.iy*240,5,0,Math.PI*2);
      faceCtx.strokeStyle=e.ear<.18?"#ffb4a5":"#a0ffd8";faceCtx.stroke();
    }
  }
  function loop(now){
    if(!running)return;
    raf=requestAnimationFrame(loop);
    if(busy||!detector||video.readyState<2||now-lastFrameAt<33)return;
    busy=true;lastFrameAt=now;
    try{
      const r=detector.detectForVideo(video,now);
      const lm=r.faceLandmarks&&r.faceLandmarks[0]||null;
      const info=features(lm);
      renderFace(lm,info);
      if(info){
        lastFaceAt=now;byId("sc-face").textContent="検出中";
        if(!model&&!training){
          recentOpen.push([info.a.ear,info.b.ear]);if(recentOpen.length>100)recentOpen.shift();
        }
        if(training)tickCalibration(info,now);
        if(model&&!training){
          const v=predict(info.v);
          if(!smoothed)smoothed=v;
          else smoothed={x:smoothed.x*.77+v.x*.23,y:smoothed.y*.77+v.y*.23};
          place(cursor,smoothed.x,smoothed.y);cursor.style.display="block";
          lastPrediction=v;
          byId("sc-pos").textContent=Math.round(smoothed.x*100)+"%, "+Math.round(smoothed.y*100)+"%";
          handleClick(info,now);
        }else{cursor.style.display="none";}
        if(!training && model && !latched && now-lastClick>1200)status("視線を推定中（緑の点）。両目を細めると疑似クリック。");
        if(training && now-training.stepAt<350)status("点 "+(training.index+1)+" / 9 を見つめてください");
        if(frames%4===0 && model && !training){
          dataset.push({timestamp:new Date().toISOString(),event:"GAZE",
            x:smoothed.x,y:smoothed.y,earA:info.a.ear,earB:info.b.ear});
          if(dataset.length>20000)dataset.shift();
          csvBtn.disabled=false;
        }
      }else{
        byId("sc-face").textContent="未検出";renderFace(null,null);
        if(now-lastFaceAt>250){cursor.style.display="none";squintStart=0;latched=false;}
        if(training)training.stepAt+=33;
      }
      frames++;
      if(now-countedAt>=1000){
        byId("sc-fps").textContent=Math.round(frames*1000/(now-countedAt))+" fps";
        frames=0;countedAt=now;
      }
    }catch(e){status("処理エラー: "+e.message);console.error(e);}
    finally{busy=false;}
  }
  async function start(){
    if(running)return;
    startBtn.disabled=true;status("MediaPipeモデルを読み込んでいます…");
    try{
      const lib=await import("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/+esm");
      const vision=await lib.FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm");
      detector=await lib.FaceLandmarker.createFromOptions(vision,{
        baseOptions:{modelAssetPath:"https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",delegate:"CPU"},
        runningMode:"VIDEO",numFaces:1,outputFaceBlendshapes:false
      });
      stream=await navigator.mediaDevices.getUserMedia({video:{width:{ideal:640},height:{ideal:480},frameRate:{ideal:30}},audio:false});
      video.srcObject=stream;await video.play();
      running=true;frames=0;countedAt=performance.now();lastFrameAt=0;lastFaceAt=performance.now();
      startBtn.textContent="カメラ動作中";calBtn.disabled=false;
      status("カメラを開始しました。まず「全画面」→「9点学習」をおすすめします。");
      raf=requestAnimationFrame(loop);
    }catch(e){
      status("起動できません: "+(e.message||e)+". Chromeでカメラ権限と通信状況を確認してください。");
      console.error(e);startBtn.disabled=false;startBtn.textContent="再試行";
      if(stream){stream.getTracks().forEach(t=>t.stop());stream=null;}
      if(detector){detector.close();detector=null;}
    }
  }
  function calibrate(){
    if(!running)return;
    model=null;baseline=null;smoothed=null;dataset=[];lastPrediction=null;lastClick=0;
    csvBtn.disabled=true;byId("sc-pos").textContent="—";
    root.classList.add("calibrating");
    training={index:0,samples:[],startCount:0,stepAt:performance.now()};
    const p=points[0];place(target,p[0],p[1]);target.style.display="block";cursor.style.display="none";
    byId("sc-bar").style.width="0%";
    byId("sc-title").textContent="点を見つめてください";
    byId("sc-instruction").textContent="1 / 9 — 点が切り替わるまで見続けてください";
    status("9点学習中：それぞれ約2秒間見つめます");
  }
  async function stop(){
    running=false;cancelAnimationFrame(raf);
    if(stream){stream.getTracks().forEach(t=>t.stop());stream=null;}
    if(detector){detector.close();detector=null;}
    if(document.fullscreenElement===root)await document.exitFullscreen().catch(()=>{});
    if(unbindKeys)unbindKeys();
    root.remove();window.__stareControlStop=null;
  }
  startBtn.addEventListener("click",start);
  calBtn.addEventListener("click",calibrate);
  fullBtn.addEventListener("click",async()=>{
    try{if(document.fullscreenElement===root){await document.exitFullscreen();}
        else{await root.requestFullscreen();}}
    catch(e){status("全画面にできません: "+e.message+"。画面内で学習は続行できます。");}
  });
  modeBtn.addEventListener("click",()=>{
    clickMode=clickMode==="LEFT"?"RIGHT":"LEFT";
    modeBtn.textContent=clickMode==="LEFT"?"左クリック":"右クリック";
  });
  byId("sc-sensitivity").addEventListener("input",e=>byId("sc-sval").textContent=e.target.value+"%");
  byId("sc-hold").addEventListener("input",e=>byId("sc-hval").textContent=e.target.value+" ms");
  csvBtn.addEventListener("click",()=>{
    const lines=["timestamp,event,x,y,earA,earB",...dataset.map(d=>
      [d.timestamp,d.event,d.x,d.y,d.earA,d.earB].map(v=>v==null?"":v).join(","))];
    const url=URL.createObjectURL(new Blob([lines.join("\n")],{type:"text/csv;charset=utf-8"}));
    const a=document.createElement("a");a.href=url;a.download="stareControl_realtime.csv";a.click();
    setTimeout(()=>URL.revokeObjectURL(url),2000);
  });
  byId("sc-stop").addEventListener("click",stop);
  const handleKey=e=>{if(e.key.toLowerCase()==="r"&&!e.repeat&&document.activeElement.tagName!=="INPUT"){modeBtn.click();}};
  document.addEventListener("keydown",handleKey);unbindKeys=()=>document.removeEventListener("keydown",handleKey);
  window.__stareControlStop=stop;
  status("準備完了。まず「カメラを開始」を押してください。");
})().catch(err=>console.error("stareControl initialization failed",err));