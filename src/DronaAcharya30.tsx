import React from "react";
import {
  AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig
} from "remotion";

const gold = "#e8c58a";
const cream = "#f3e3c6";
const ink = "#090b10";

const fade = (f:number, a:number, b:number) => interpolate(f,[a,b],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:Easing.out(Easing.cubic)});
const drift = (f:number, a:number, b:number) => interpolate(f,[a,b],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:Easing.inOut(Easing.cubic)});

const Warrior: React.FC<{x:number;y:number;s?:number;color?:string;robe?:string;pose?:"stand"|"kneel"|"sit";crown?:boolean}> = ({x,y,s=1,color="#a96e48",robe="#572e27",pose="stand",crown=true}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx="0" cy="8" rx="95" ry="18" fill="#050608" opacity=".55"/>
    {pose==="sit" ? <>
      <path d="M-58 -210 Q-110 -125 -100 -40 L-150 5 Q-40 48 0 -5 Q70 55 150 0 L95 -55 L62 -205Z" fill={robe} stroke="#c18a55" strokeWidth="7"/>
      <path d="M-55 -190 Q-105 -105 -42 -70 M55 -190 Q105 -105 42 -70" stroke={color} strokeWidth="34" fill="none" strokeLinecap="round"/>
    </> : <>
      <path d={pose==="kneel"?"M-55 -210 Q-105 -115 -70 -65 L-130 -5 L-30 0 L10 -70 L75 -5 L145 0 L75 -95 L55 -210Z":"M-55 -210 Q-100 -130 -78 -5 L78 -5 Q100 -130 55 -210Z"} fill={robe} stroke="#c18a55" strokeWidth="7"/>
      <path d="M-45 -180 L0 -75 L45 -180" fill="none" stroke="#e2bd7e" strokeWidth="12"/>
      <path d="M-52 -175 Q-130 -120 -112 -55 M52 -175 Q130 -120 112 -55" stroke={color} strokeWidth="30" fill="none" strokeLinecap="round"/>
    </>}
    <circle cx="0" cy="-260" r="48" fill={color}/>
    <path d="M-47 -275 Q-52 -335 0 -342 Q52 -335 47 -275 Q20 -300 0 -292 Q-25 -300 -47 -275Z" fill="#ded4c2"/>
    {crown && <path d="M-43 -305 L-33 -370 L0 -340 L34 -370 L44 -305Z" fill="#bd8b45" stroke="#f0d49a" strokeWidth="7"/>}
    <path d="M-22 -253 Q0 -242 22 -253" stroke="#34221d" strokeWidth="5" fill="none"/>
    <path d="M-13 -280 L13 -280" stroke="#2c1e1a" strokeWidth="6"/>
  </g>
);

const Chariot: React.FC<{x:number;y:number;s?:number}> = ({x,y,s=1}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-180 -120 L180 -120 L150 0 L-150 0Z" fill="#65432c" stroke="#d5aa68" strokeWidth="10"/>
    <path d="M-130 -120 L-90 -205 L90 -205 L130 -120" fill="#93653d" stroke="#e4c184" strokeWidth="9"/>
    <circle cx="-112" cy="48" r="58" fill="#111317" stroke="#c79551" strokeWidth="13"/>
    <circle cx="112" cy="48" r="58" fill="#111317" stroke="#c79551" strokeWidth="13"/>
    <circle cx="-112" cy="48" r="10" fill="#e4c184"/><circle cx="112" cy="48" r="10" fill="#e4c184"/>
    <path d="M-180 -118 L-270 -180 M180 -118 L270 -180" stroke="#a77a4b" strokeWidth="14"/>
  </g>
);

const Arrow: React.FC<{x:number;y:number;scale?:number;opacity?:number}> = ({x,y,scale=1,opacity=1}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity}>
    <path d="M-100 0 H95" stroke="#e5d3ad" strokeWidth="5"/>
    <path d="M95 -12 L120 0 L95 12Z" fill="#e5d3ad"/>
    <path d="M-100 0 L-125 -13 L-118 0 L-125 13Z" fill="#b98a54"/>
  </g>
);

const SceneCaption: React.FC<{kicker:string;line:string;sub:string;opacity:number}> = ({kicker,line,sub,opacity}) => (
  <div style={{position:"absolute",left:70,right:70,bottom:150,textAlign:"center",opacity,textShadow:"0 4px 24px #000"}}>
    <div style={{fontFamily:"Arial,sans-serif",fontSize:22,letterSpacing:8,color:gold,fontWeight:700}}>{kicker}</div>
    <div style={{fontFamily:"Georgia,serif",fontSize:43,lineHeight:1.18,color:cream,marginTop:20,fontWeight:700}}>{line}</div>
    <div style={{fontFamily:"Arial,sans-serif",fontSize:22,lineHeight:1.4,color:"#d7c4a5",marginTop:18}}>{sub}</div>
  </div>
);

export const DronaAcharya30: React.FC = () => {
  const f=useCurrentFrame();
  const {fps}=useVideoConfig();
  const t=f/fps;
  const camera=1+0.045*drift(f,0,899);
  const scene1=1-fade(f,224,246);
  const scene2=fade(f,225,250)*(1-fade(f,520,545));
  const scene3=fade(f,520,545)*(1-fade(f,735,760));
  const scene4=fade(f,735,760);
  const arrowPhase=drift(f,30,210);
  const bowDrop=drift(f,545,635);
  const attacker=drift(f,770,865);
  const flash=interpolate(f,[855,862,875],[0,.88,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
  const particles=Array.from({length:72},(_,i)=>({x:(i*157)%1080,y:(i*283)%1920,r:1+(i%4),v:.5+(i%5)*.2}));
  const cap1=1-fade(f,220,240),cap2=fade(f,225,245)*(1-fade(f,510,530)),cap3=fade(f,520,540)*(1-fade(f,730,750)),cap4=fade(f,735,755);
  return <AbsoluteFill style={{background:ink,fontFamily:"Georgia,serif",overflow:"hidden"}}>
    <svg width="100%" height="100%" viewBox="0 0 1080 1920" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="dronaSky30" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#101b29"/><stop offset=".5" stopColor="#69402f"/><stop offset="1" stopColor="#100d10"/></linearGradient>
        <linearGradient id="earth30" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#513528"/><stop offset="1" stopColor="#100d0e"/></linearGradient>
        <radialGradient id="sun30"><stop stopColor="#ffc77e" stopOpacity=".9"/><stop offset="1" stopColor="#e86d35" stopOpacity="0"/></radialGradient>
        <filter id="blur30"><feGaussianBlur stdDeviation="30"/></filter>
      </defs>
      <rect width="1080" height="1920" fill="url(#dronaSky30)"/>
      <circle cx="540" cy="760" r="510" fill="url(#sun30)"/>
      <path d="M0 1120 Q250 990 520 1120 T1080 1080 V1920 H0Z" fill="#17191c"/>
      <path d="M0 1370 Q250 1280 540 1380 T1080 1330 V1920 H0Z" fill="url(#earth30)"/>
      {particles.map((p,i)=><circle key={i} cx={(p.x+Math.sin(f*.025+i)*28+1080)%1080} cy={(p.y-f*p.v+2400)%2100-90} r={p.r} fill={i%4===0?"#ffb56b":"#e6d3ae"} opacity={.12+(i%5)*.045}/>)}
      <g opacity={scene1} transform={`translate(540 1120) scale(${camera}) translate(-540 -1120)`}>
        {Array.from({length:16},(_,i)=><g key={i} opacity=".55"><path d={`M${i*78-20} 1120 l-28 220 m28 -220 l36 215`} stroke="#171719" strokeWidth="12"/><circle cx={i*78-20} cy="1105" r="14" fill="#161719"/></g>)}
        <Chariot x={540} y={1450} s={1.3}/>
        <Warrior x={540} y={1320} s={1.65} color="#bd8054" robe="#733d2b"/>
        {Array.from({length:8},(_,i)=><Arrow key={i} x={-150+arrowPhase*1400+i*145} y={650+i*95} scale={.85} opacity={.8}/>)}
        <path d="M130 970 Q540 720 950 970" stroke="#e9bc76" strokeWidth="3" opacity=".22" fill="none"/>
      </g>
      <g opacity={scene2}>
        <Warrior x={260} y={1370} s={1.25} color="#b97b53" robe="#28645d"/>
        <Warrior x={520} y={1400} s={1.2} color="#bd8054" robe="#8c6037"/>
        <Chariot x={280} y={1510} s={.85}/>
        <g transform="translate(760 1450)">
          <ellipse cx="0" cy="0" rx="150" ry="78" fill="#30251f"/>
          <path d="M-100 -35 Q-120 -150 -20 -165 Q85 -170 115 -65 L155 -20 L120 35 L-90 50Z" fill="#6b5540" stroke="#c39a64" strokeWidth="9"/>
          <path d="M95 -100 Q185 -155 185 -70 Q180 -20 140 -25" fill="none" stroke="#9b7651" strokeWidth="18"/>
          <path d="M-110 -70 L-155 -125 L-145 -35" fill="#b3946a"/>
          <path d="M-70 45 L-100 100 M70 45 L105 100" stroke="#211a16" strokeWidth="22"/>
        </g>
        <path d="M720 1190 L820 990 L900 1190" fill="none" stroke="#d9b475" strokeWidth="12" opacity=".7"/>
        <Warrior x={820} y={1320} s={1.25} color="#b97b53" robe="#7b392a"/>
        <text x="540" y="470" fill="#f2d5a0" fontSize="46" textAnchor="middle" letterSpacing="8" opacity=".9">ASHWATTHAMA IS DEAD</text>
      </g>
      <g opacity={scene3}>
        <rect width="1080" height="1920" fill="#090b10" opacity=".38"/>
        <circle cx="540" cy="850" r="390" fill="#d28a51" opacity=".09" filter="url(#blur30)"/>
        <Warrior x={540} y={1430} s={1.9} color="#bd8054" robe="#69362b"/>
        <g transform={`translate(0 ${bowDrop*430}) rotate(${bowDrop*60} 840 1330)`}><path d="M820 1040 Q1010 1320 820 1600" fill="none" stroke="#d4a45e" strokeWidth="22"/><path d="M820 1040 L820 1600" stroke="#eee0c2" strokeWidth="4"/></g>
        <Warrior x={180} y={1460} s={.9} color="#b97b53" robe="#28645d"/>
        <path d="M180 1160 Q260 1090 340 1160" stroke="#e7c88c" strokeWidth="5" fill="none" opacity=".5"/>
        <rect x="0" y="0" width="1080" height="1920" fill="#000" opacity={bowDrop*.32}/>
      </g>
      <g opacity={scene4}>
        <rect width="1080" height="1920" fill="#080a0e" opacity=".38"/>
        <circle cx="540" cy="920" r="470" fill="#d28a51" opacity=".11" filter="url(#blur30)"/>
        <Warrior x={500} y={1450} s={1.7} pose="sit" color="#bd8054" robe="#75402d"/>
        <g transform={`translate(${attacker*560} 0)`}>
          <Warrior x={1020} y={1430} s={1.25} color="#b97b53" robe="#562b24"/>
          <path d="M940 1190 L790 850" stroke="#d7d2c3" strokeWidth="20" strokeLinecap="round"/>
          <path d="M790 850 L755 760 L830 825Z" fill="#e6dfd0"/>
        </g>
        <rect width="1080" height="1920" fill="#fff0d0" opacity={flash}/>
      </g>
    </svg>
    <AbsoluteFill style={{background:"linear-gradient(180deg,rgba(0,0,0,.42),transparent 30%,transparent 66%,rgba(0,0,0,.72))"}}/>
    <AbsoluteFill style={{opacity:scene1,justifyContent:"flex-start",alignItems:"center",paddingTop:115}}>
      <div style={{fontFamily:"Arial,sans-serif",fontSize:22,letterSpacing:9,color:gold}}>DAY FIFTEEN · KURUKSHETRA</div>
      <div style={{fontSize:56,color:cream,marginTop:28,textAlign:"center",fontWeight:700}}>THE UNBEATABLE TEACHER</div>
    </AbsoluteFill>
    <SceneCaption kicker="THE STALEMATE" line="Drona stood like an unyielding mountain." sub="Unmatched. Unbroken. Feared across the battlefield." opacity={cap1}/>
    <SceneCaption kicker="THE PSYCHOLOGICAL TURN" line="“Ashwatthama is dead!”" sub="A half-truth was set in motion to break the master." opacity={cap2}/>
    <SceneCaption kicker="THE BREAKING POINT" line="The bow slipped from his hands." sub="He turned to Yudhishthira, seeking the truth." opacity={cap3}/>
    <SceneCaption kicker="THE FINAL MOMENT" line="The master closed his eyes." sub="Dhrishtadyumna advanced. The battlefield fell silent." opacity={cap4}/>
  </AbsoluteFill>;
};
