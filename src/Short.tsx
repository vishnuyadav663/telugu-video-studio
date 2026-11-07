import React from "react";
import {
  AbsoluteFill, Sequence, interpolate, spring,
  useCurrentFrame, useVideoConfig
} from "remotion";
import { shortContent, totalFrames, KarnaScene } from "./content";

const Dust: React.FC<{frame:number;count?:number}> = ({frame,count=42}) => (
  <svg viewBox="0 0 1080 1920" style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}}>
    {Array.from({length:count},(_,i)=>{
      const x=(i*193+71)%1080;
      const y=(i*317+113)%1920;
      const r=1.5+(i%4)*0.7;
      const dy=(frame*(0.25+(i%5)*0.07)+i*29)%1920;
      return <circle key={i} cx={x} cy={(y+dy)%1920} r={r} fill={i%3===0?"#F4D6A0":"#C7D0D0"} opacity={0.12+(i%4)*0.035}/>;
    })}
  </svg>
);

const Warrior: React.FC<{x:number;y:number;scale?:number;color?:string;bow?:boolean}> = ({x,y,scale=1,color="#111820",bow=false}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path d="M-48 12 Q-40 -70 0 -82 Q40 -70 48 12 L62 115 L-62 115Z" fill={color}/>
    <circle cx="0" cy="-112" r="35" fill={color}/>
    <path d="M-42 -120 Q-30 -180 0 -176 Q35 -172 44 -120 L24 -135 L-22 -136Z" fill="#B98B51" stroke="#E8C88D" strokeWidth="5"/>
    <path d="M-40 -35 L-90 40 M40 -35 L90 40" stroke={color} strokeWidth="22" strokeLinecap="round"/>
    {bow && <path d="M108 -145 Q190 -20 108 110 M108 -145 L108 110" fill="none" stroke="#D9B36F" strokeWidth="9"/>}
    <path d="M-54 115 L-75 260 M54 115 L75 260" stroke={color} strokeWidth="28" strokeLinecap="round"/>
    <path d="M-90 260 H-28 M28 260 H90" stroke={color} strokeWidth="20" strokeLinecap="round"/>
  </g>
);

const Chariot: React.FC<{x:number;y:number;scale?:number;tilt?:number}> = ({x,y,scale=1,tilt=0}) => (
  <g transform={`translate(${x} ${y}) rotate(${tilt}) scale(${scale})`}>
    <path d="M-245 -80 L245 -80 L205 50 L-205 50Z" fill="#563B2B" stroke="#D9B16C" strokeWidth="10"/>
    <path d="M-205 -80 L-145 -190 L145 -190 L205 -80" fill="#8D633D" stroke="#E6C17C" strokeWidth="10"/>
    <path d="M-135 -175 H135" stroke="#F1D79C" strokeWidth="12"/>
    <circle cx="-155" cy="95" r="94" fill="#17191B" stroke="#C99A54" strokeWidth="18"/>
    <circle cx="155" cy="95" r="94" fill="#17191B" stroke="#C99A54" strokeWidth="18"/>
    <circle cx="-155" cy="95" r="18" fill="#D9B16C"/><circle cx="155" cy="95" r="18" fill="#D9B16C"/>
    {Array.from({length:8},(_,i)=><g key={i} transform={`rotate(${i*45} -155 95)`}><path d="M-155 12 V178" stroke="#C99A54" strokeWidth="9"/></g>)}
    <path d="M-230 -82 L-340 -150 M230 -82 L340 -150" stroke="#8B6848" strokeWidth="18"/>
  </g>
);

const SceneArt: React.FC<{scene:KarnaScene;frame:number}> = ({scene,frame}) => {
  const t=frame/30;
  const sway=Math.sin(frame/42)*14;
  const zoom=interpolate(frame,[0,180],[1,1.09]);
  const bg = <><defs>
    <linearGradient id="epicSky" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#182638"/><stop offset=".48" stopColor="#754A3B"/><stop offset="1" stopColor="#120F12"/></linearGradient>
    <radialGradient id="sun"><stop stopColor="#F7D79B" stopOpacity=".85"/><stop offset=".35" stopColor="#D88A55" stopOpacity=".25"/><stop offset="1" stopColor="#D88A55" stopOpacity="0"/></radialGradient>
    <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#55402F"/><stop offset="1" stopColor="#17171A"/></linearGradient>
    <filter id="soft"><feGaussianBlur stdDeviation="22"/></filter>
  </defs>
  <rect width="1080" height="1920" fill="url(#epicSky)"/>
  <circle cx="540" cy="720" r="490" fill="url(#sun)"/>
  <path d="M0 1120 Q180 1030 350 1120 T720 1100 T1080 1110 V1920 H0Z" fill="url(#ground)"/>
  <path d="M0 1260 L180 1090 L320 1250 L470 1080 L650 1250 L830 1070 L1080 1230 V1450 H0Z" fill="#17191D" opacity=".62"/>
  <g opacity=".22" fill="#D5B18A"><circle cx="140" cy="970" r="8"/><circle cx="840" cy="1020" r="10"/><circle cx="710" cy="910" r="5"/><circle cx="350" cy="1040" r="7"/></g>
  </>;
  return <svg viewBox="0 0 1080 1920" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
    {bg}
    <g transform={`translate(540 980) scale(${zoom}) translate(-540 -980)`}>
      {scene.visual==="battlefield" && <>
        <g opacity=".28"><Warrior x={140} y={1120} scale={1.4}/><Warrior x={910} y={1100} scale={1.5}/><Warrior x={350} y={1180} scale={1.1}/><Warrior x={760} y={1190} scale={1.2}/></g>
        <Chariot x={540+sway} y={1250} scale={1.05}/>
        <Warrior x={475} y={1080} scale={1.35} color="#18212A"/>
        <Warrior x={650} y={1080} scale={1.35} color="#26313B" bow/>
        <path d="M90 900 L390 770 M250 850 L520 730 M690 790 L980 900" stroke="#E8C27C" strokeWidth="5" opacity=".6"/>
      </>}
      {scene.visual==="faceoff" && <>
        <Chariot x={275+sway} y={1280} scale={.72} tilt={-2}/>
        <Chariot x={815-sway} y={1280} scale={.72} tilt={2}/>
        <Warrior x={280} y={1000} scale={1.35} color="#222A32"/>
        <Warrior x={800} y={1000} scale={1.35} color="#17232D" bow/>
        <path d="M340 890 Q540 680 740 890" fill="none" stroke="#E8C27C" strokeWidth="5" strokeDasharray="18 18" opacity=".7"/>
        {Array.from({length:7},(_,i)=><path key={i} d={`M${120+i*130} ${800+(i%2)*80} l180 -110`} stroke="#E6D0A3" strokeWidth="5" opacity=".4"/>)}
      </>}
      {scene.visual==="wheel" && <>
        <path d="M0 1390 Q240 1260 520 1400 T1080 1370 V1920 H0Z" fill="#34291F"/>
        <g transform={`translate(540 1290) rotate(${-18+Math.sin(frame/30)*3})`}>
          <circle r="340" fill="#151719" stroke="#B9844B" strokeWidth="34"/>
          <circle r="285" fill="none" stroke="#E1BC7B" strokeWidth="12"/>
          {Array.from({length:12},(_,i)=><g key={i} transform={`rotate(${i*30})`}><path d="M0 -285 V-28" stroke="#C99B5E" strokeWidth="24"/><path d="M-34 -310 H34" stroke="#E4C17E" strokeWidth="12"/></g>)}
          <circle r="65" fill="#8A6038" stroke="#F1D39A" strokeWidth="16"/>
        </g>
        <path d="M0 1510 Q280 1420 540 1510 T1080 1480" fill="none" stroke="#A47B4F" strokeWidth="26"/>
        <path d="M380 1550 Q530 1460 700 1550" stroke="#C9A16D" strokeWidth="16" fill="none"/>
      </>}
      {scene.visual==="struggle" && <>
        <Chariot x={530} y={1260} scale={.95} tilt={-8}/>
        <Warrior x={790} y={1160} scale={1.5} color="#202A30"/>
        <path d="M720 1100 Q640 1240 590 1430" stroke="#D8B47A" strokeWidth="26" fill="none" strokeLinecap="round"/>
        <path d="M550 1450 L420 1530 M550 1450 L670 1530" stroke="#17191A" strokeWidth="45" strokeLinecap="round"/>
        <circle cx="540" cy="1450" r="22" fill="#D4AF73"/>
        <path d="M0 1580 Q280 1490 540 1570 T1080 1560" fill="none" stroke="#8B6443" strokeWidth="20"/>
      </>}
      {scene.visual==="reminder" && <>
        <circle cx="300" cy="1000" r="240" fill="#5C9B8B" opacity=".12" filter="url(#soft)"/>
        <Warrior x={790} y={1110} scale={1.55} color="#1D2730" bow/>
        <g transform="translate(240 1090)">
          <path d="M-80 30 Q-160 -130 -60 -240 Q10 -330 100 -220 Q165 -110 80 30Z" fill="#376F68" stroke="#B4D9C9" strokeWidth="8"/>
          <circle cx="0" cy="-130" r="58" fill="#A8754F"/>
          <path d="M-70 -165 Q-20 -260 70 -175 L45 -220 L-30 -225Z" fill="#D4B06D"/>
          <path d="M-110 40 Q0 -10 110 40 L145 300 H-140Z" fill="#244E4C" stroke="#A7D1C1" strokeWidth="7"/>
          <path d="M-85 70 Q-190 150 -250 90" stroke="#A7D1C1" strokeWidth="26" fill="none" strokeLinecap="round"/>
        </g>
        <path d="M400 720 Q540 600 680 720" stroke="#B6D8C9" strokeWidth="5" fill="none" opacity=".5"/>
      </>}
      {scene.visual==="bow" && <>
        <Warrior x={540} y={1090} scale={1.85} color="#1A222A" bow/>
        <path d="M700 850 Q910 1080 700 1320" fill="none" stroke="#D7B36D" strokeWidth="18"/>
        <path d="M690 1080 L1010 1080" stroke="#E8D3A2" strokeWidth="8"/>
        <path d="M960 1055 L1010 1080 L960 1105" stroke="#E8D3A2" strokeWidth="8" fill="none"/>
        <circle cx="540" cy="860" r="330" fill="none" stroke="#E8C27C" strokeWidth="3" opacity=".18"/>
      </>}
      {scene.visual==="arrow" && <>
        <Warrior x={250} y={1110} scale={1.45} color="#202A30"/>
        <Chariot x={790} y={1330} scale={.68} tilt={-5}/>
        <path d={`M${-120+frame*10} 910 L${260+frame*10} 1010`} stroke="#E8D3A2" strokeWidth="8" opacity=".95"/>
        <path d={`M${230+frame*10} 985 L${270+frame*10} 1010 L${230+frame*10} 1035`} stroke="#E8D3A2" strokeWidth="8" fill="none"/>
        <path d="M0 820 L1080 820" stroke="#E7C88D" strokeWidth="2" opacity=".12"/>
      </>}
      {scene.visual==="silence" && <>
        <Chariot x={540} y={1350} scale={.9} tilt={-4}/>
        <Warrior x={540} y={1110} scale={1.5} color="#161C22"/>
        <circle cx="540" cy="760" r="360" fill="none" stroke="#D4B47D" strokeWidth="2" opacity=".22"/>
        <path d="M0 1470 Q260 1370 540 1470 T1080 1450" stroke="#C39B63" strokeWidth="4" opacity=".4" fill="none"/>
      </>}
    </g>
    <rect width="1080" height="1920" fill="url(#sun)" opacity=".12"/>
  </svg>;
};

const Scene: React.FC<{scene:KarnaScene;index:number}> = ({scene,index}) => {
  const frame=useCurrentFrame();
  const {fps,durationInFrames}=useVideoConfig();
  const intro=spring({frame,fps,config:{damping:24,stiffness:70}});
  const fade=interpolate(frame,[0,10,durationInFrames-12,durationInFrames],[0,1,1,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
  const y=interpolate(intro,[0,1],[54,0]);
  const progress=interpolate(frame,[0,durationInFrames],[0,1],{extrapolateRight:"clamp"});
  return <AbsoluteFill style={{background:"#080B0E",opacity:fade,overflow:"hidden",color:"#F7F0E4"}}>
    <AbsoluteFill><SceneArt scene={scene} frame={frame}/></AbsoluteFill>
    <AbsoluteFill style={{background:"linear-gradient(180deg,rgba(5,8,12,.52) 0%,rgba(5,8,12,.02) 32%,rgba(5,8,12,.08) 50%,rgba(5,8,12,.78) 78%,#080B0E 100%)"}}/>
    <AbsoluteFill style={{background:"radial-gradient(ellipse at 50% 48%,transparent 28%,rgba(0,0,0,.22) 72%,rgba(0,0,0,.7) 100%)"}}/>
    <div style={{position:"absolute",top:76,left:70,right:70,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <div style={{display:"flex",gap:14,alignItems:"center"}}>
        <div style={{width:8,height:8,borderRadius:20,background:scene.accent,boxShadow:`0 0 18px ${scene.accent}`}}/>
        <span style={{fontFamily:"Arial,sans-serif",fontSize:18,letterSpacing:5,fontWeight:700,color:"#F1E4CD"}}>MAHABHARATAM <span style={{opacity:.45}}>/ THE FINAL DAY</span></span>
      </div>
      <span style={{fontFamily:"Arial,sans-serif",fontSize:17,letterSpacing:3,color:"#FFFFFF99"}}>{String(index+1).padStart(2,"0")} / 08</span>
    </div>
    <div style={{position:"absolute",left:70,right:70,bottom:270,transform:`translateY(${y}px)`,opacity:intro}}>
      <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:24}}>
        <div style={{height:3,width:50,background:scene.accent}}/>
        <span style={{fontFamily:"Arial,sans-serif",fontSize:17,letterSpacing:4,fontWeight:700,color:scene.accent}}>{scene.label}</span>
      </div>
      <div style={{fontFamily:"'Noto Sans Telugu','Nirmala UI',sans-serif",fontSize:66,fontWeight:900,lineHeight:1.28,whiteSpace:"pre-line",textShadow:"0 8px 34px rgba(0,0,0,.9)",maxWidth:940}}>{scene.headline}</div>
      <div style={{height:4,width:112,background:scene.accent,marginTop:24,boxShadow:`0 0 20px ${scene.accent}77`}}/>
      <div style={{fontFamily:"'Noto Sans Telugu','Nirmala UI',sans-serif",fontSize:29,lineHeight:1.55,color:"#E8DFD0",marginTop:20,fontWeight:500,maxWidth:900,textShadow:"0 3px 18px #000"}}>{scene.subtitle}</div>
    </div>
    <div style={{position:"absolute",left:70,right:70,bottom:104}}>
      <div style={{height:3,background:"#FFFFFF35"}}><div style={{height:"100%",width:`${((index+progress)/8)*100}%`,background:scene.accent,boxShadow:`0 0 14px ${scene.accent}`}}/></div>
      <div style={{display:"flex",justifyContent:"space-between",marginTop:17,fontFamily:"Arial,sans-serif",fontSize:14,letterSpacing:3,color:"#FFFFFF80"}}><span>AN EPIC MOMENT</span><span>ILLUSTRATIVE RECREATION</span></div>
    </div>
    <Dust frame={frame}/>
    <AbsoluteFill style={{pointerEvents:"none",border:"1px solid rgba(255,255,255,.10)",margin:22}}/>
  </AbsoluteFill>;
};

export const TeluguShort:React.FC=()=> {
  let from=0;
  return <AbsoluteFill style={{background:"#080B0E"}}>
    {shortContent.scenes.map((scene,index)=>{
      const start=from; from+=scene.durationInFrames;
      return <Sequence key={scene.id} from={start} durationInFrames={scene.durationInFrames}><Scene scene={scene} index={index}/></Sequence>;
    })}
  </AbsoluteFill>;
};
