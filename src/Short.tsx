import React from "react";
import {
  AbsoluteFill, Sequence, interpolate, spring,
  useCurrentFrame, useVideoConfig
} from "remotion";
import { shortContent, ShortScene } from "./content";

const GoldBar: React.FC<{x:number;y:number;scale?:number}> = ({x,y,scale=1}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path d="M0 24 L28 0 L142 0 L170 24 L150 72 L20 72 Z" fill="#8C5A13" stroke="#F7D77A" strokeWidth="3"/>
    <path d="M28 0 L142 0 L170 24 L0 24 Z" fill="#FFE08A"/>
    <path d="M0 24 L170 24 L150 72 L20 72 Z" fill="#D89B32"/>
    <path d="M28 10 L132 10" stroke="#FFF0B5" strokeWidth="4" opacity=".7"/>
  </g>
);

const Artwork: React.FC<{type:ShortScene["visual"]; frame:number}> = ({type,frame}) => {
  const drift = interpolate(frame,[0,300],[0,38],{extrapolateRight:"clamp"});
  return (
    <svg viewBox="0 0 1080 1040" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#24384D"/><stop offset=".58" stopColor="#101722"/><stop offset="1" stopColor="#080C12"/></linearGradient>
        <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#FFF0A8"/><stop offset=".45" stopColor="#D79A31"/><stop offset="1" stopColor="#68400E"/></linearGradient>
        <linearGradient id="steel" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#607080"/><stop offset="1" stopColor="#17212C"/></linearGradient>
        <radialGradient id="glow"><stop stopColor="#F7C76B" stopOpacity=".42"/><stop offset="1" stopColor="#F7C76B" stopOpacity="0"/></radialGradient>
      </defs>
      <rect width="1080" height="1040" fill="url(#sky)"/>
      <circle cx="550" cy="390" r="430" fill="url(#glow)"/>
      {type==="crisis" && <g transform={`translate(${-drift*.35} 0)`}>
        <path d="M80 690 L100 460 L180 400 L260 460 L280 690Z" fill="#27313B"/>
        <path d="M55 470 Q180 330 305 470" fill="#394653" stroke="#A6B1BB" strokeWidth="8"/>
        <path d="M40 475 H320 M80 500 H280" stroke="#D2D6D9" strokeWidth="10"/>
        {Array.from({length:7},(_,i)=><rect key={i} x={78+i*34} y={520} width="16" height="150" fill="#111820"/>)}
        <rect x="410" y="330" width="560" height="350" rx="22" fill="#151C25" stroke="#9DABB8" strokeWidth="8"/>
        <rect x="450" y="370" width="480" height="270" rx="12" fill="#080D13" stroke="#5C6875" strokeWidth="4"/>
        <path d="M500 570 L610 470 L700 530 L820 420 L900 470" fill="none" stroke="#FF625C" strokeWidth="13"/>
        <path d="M500 590 H900" stroke="#FF625C" strokeWidth="5" opacity=".6"/>
        <path d="M0 790 Q280 700 550 800 T1080 790 V1040 H0Z" fill="#080C12"/>
      </g>}
      {type==="reserves" && <g transform={`translate(${-drift*.45} 0)`}>
        <path d="M0 680 H1080 V1040 H0Z" fill="#0A1119"/>
        <path d="M80 600 L80 470 L340 470 L340 600Z" fill="#253442" stroke="#8394A4" strokeWidth="8"/>
        <path d="M60 470 L210 380 L360 470Z" fill="#394B5A" stroke="#A5B0B8" strokeWidth="7"/>
        <path d="M120 500 H300 M120 540 H300" stroke="#AAB7C2" strokeWidth="9"/>
        <path d="M450 640 Q590 560 740 640 L950 640 L950 730 L450 730Z" fill="#182A37" stroke="#6E8392" strokeWidth="7"/>
        <path d="M530 630 L600 510 L830 510 L900 630Z" fill="#213746" stroke="#8799A4" strokeWidth="6"/>
        <path d="M600 510 L645 450 L780 450 L830 510Z" fill="#405664"/>
        <path d="M690 440 V360" stroke="#D8E0E4" strokeWidth="10"/>
        <path d="M690 360 Q760 330 820 360 L820 410 L690 410Z" fill="#B94A35"/>
        <path d="M120 820 H950" stroke="#FFB84D" strokeWidth="5" strokeDasharray="20 18"/>
      </g>}
      {type==="vault" && <g transform={`translate(0 ${drift*.18})`}>
        <circle cx="540" cy="500" r="350" fill="#17202A" stroke="#B68A43" strokeWidth="30"/>
        <circle cx="540" cy="500" r="290" fill="#26323B" stroke="#E5BD69" strokeWidth="12"/>
        <circle cx="540" cy="500" r="230" fill="#0D141C" stroke="#7F663B" strokeWidth="12"/>
        <circle cx="540" cy="500" r="70" fill="#A9823F" stroke="#F7D88A" strokeWidth="12"/>
        {Array.from({length:12},(_,i)=><g key={i} transform={`rotate(${i*30} 540 500)`}><rect x="528" y="230" width="24" height="90" rx="12" fill="#D9B56B"/><rect x="528" y="680" width="24" height="90" rx="12" fill="#D9B56B"/></g>)}
        <g transform="translate(170 740)"><GoldBar x="0" y="0" scale="1.1"/><GoldBar x="180" y="0" scale="1.1"/><GoldBar x="360" y="0" scale="1.1"/><GoldBar x="90" y="-78" scale="1.1"/><GoldBar x="270" y="-78" scale="1.1"/></g>
      </g>}
      {type==="convoy" && <g transform={`translate(${-drift*.4} 0)`}>
        <path d="M0 760 L1080 620 V1040 H0Z" fill="#111820"/>
        {Array.from({length:10},(_,i)=><path key={i} d={`M${i*130} 0 L${i*130-170} 780`} stroke="#B9D5E8" strokeWidth="5" opacity=".12"/>)}
        <path d="M0 800 L1080 690" stroke="#E4B85D" strokeWidth="8" strokeDasharray="50 42" opacity=".7"/>
        <g transform="translate(170 510)">
          <rect x="0" y="90" width="650" height="230" rx="34" fill="#17232E" stroke="#9AA8B2" strokeWidth="8"/>
          <rect x="80" y="20" width="450" height="120" rx="24" fill="#243441" stroke="#A6B2BC" strokeWidth="7"/>
          <rect x="120" y="42" width="140" height="75" fill="#5B7280"/><rect x="290" y="42" width="190" height="75" fill="#526A78"/>
          <circle cx="130" cy="320" r="72" fill="#080B10" stroke="#74818B" strokeWidth="15"/><circle cx="530" cy="320" r="72" fill="#080B10" stroke="#74818B" strokeWidth="15"/>
          <rect x="600" y="165" width="45" height="30" fill="#F4C66D"/>
        </g>
        <g transform="translate(780 760) rotate(-15)"><circle cx="0" cy="0" r="112" fill="#080B10" stroke="#6B7780" strokeWidth="22"/><circle cx="0" cy="0" r="54" fill="#27333D" stroke="#A6B2BC" strokeWidth="12"/><path d="M-70 -70 L70 70 M70 -70 L-70 70" stroke="#A6B2BC" strokeWidth="12"/></g>
      </g>}
      {type==="airlift" && <g transform={`translate(${-drift*.4} 0)`}>
        <path d="M0 760 H1080 V1040 H0Z" fill="#111821"/>
        <path d="M0 770 L1080 770" stroke="#F3C76D" strokeWidth="8"/>
        <path d="M150 640 L330 560 L910 560 L1020 650 L1020 760 L150 760Z" fill="#25323E" stroke="#A7B5C0" strokeWidth="8"/>
        <path d="M330 560 L410 420 L770 420 L910 560Z" fill="#3B4D5A" stroke="#A7B5C0" strokeWidth="8"/>
        <path d="M420 430 L475 350 L730 350 L770 430" fill="#667986" stroke="#CBD3D7" strokeWidth="7"/>
        <path d="M550 350 L570 180 L635 180 L650 350Z" fill="#A9B6BF"/>
        <path d="M0 845 L1080 845" stroke="#D8E2E9" strokeWidth="4" strokeDasharray="28 24" opacity=".55"/>
        <g transform="translate(470 700)"><GoldBar x="0" y="0" scale=".9"/><GoldBar x="150" y="0" scale=".9"/><GoldBar x="75" y="-72" scale=".9"/></g>
        <path d="M250 260 Q540 70 870 230" fill="none" stroke="#F1C86C" strokeWidth="5" strokeDasharray="16 14"/>
      </g>}
      {type==="flight" && <g transform={`translate(0 ${drift*.15})`}>
        <path d="M0 780 Q250 610 520 760 T1080 730 V1040 H0Z" fill="#0A1520"/>
        <path d="M120 720 Q500 250 940 560" fill="none" stroke="#F5C96D" strokeWidth="8" strokeDasharray="18 16"/>
        <g transform="translate(530 420) rotate(-18)"><path d="M-250 0 L-40 -35 L40 -180 L90 -180 L70 -35 L250 0 L250 35 L70 20 L90 145 L45 145 L-40 20 L-250 35Z" fill="#E9EDF0" stroke="#8296A4" strokeWidth="6"/></g>
        <circle cx="120" cy="720" r="28" fill="#FF675D"/><circle cx="940" cy="560" r="28" fill="#FF675D"/>
      </g>}
      {type==="repayment" && <g transform={`translate(0 ${drift*.12})`}>
        <path d="M90 750 V420 H990 V750Z" fill="#253340" stroke="#C5B48A" strokeWidth="9"/>
        <path d="M55 420 L540 230 L1025 420Z" fill="#596A75" stroke="#E5D2A4" strokeWidth="9"/>
        {Array.from({length:7},(_,i)=><g key={i}><rect x={160+i*125} y="450" width="48" height="290" fill="#B4C0C6"/><path d={`M${150+i*125} 450 H${218+i*125}`} stroke="#E3E7E8" strokeWidth="12"/></g>)}
        <path d="M90 770 H990" stroke="#E6C77D" strokeWidth="18"/>
        <g transform="translate(320 820)"><GoldBar x="0" y="0"/><GoldBar x="180" y="0"/><GoldBar x="360" y="0"/></g>
      </g>}
      {type==="payoff" && <g transform={`translate(${-drift*.2} 0)`}>
        <path d="M0 810 L0 620 L90 620 L90 470 L220 470 L220 590 L340 590 L340 370 L500 370 L500 560 L630 560 L630 290 L790 290 L790 520 L920 520 L920 180 L1080 180 L1080 1040 L0 1040Z" fill="#182A38" stroke="#526B7A" strokeWidth="6"/>
        {Array.from({length:35},(_,i)=><rect key={i} x={(i%7)*150+30} y={Math.floor(i/7)*100+620} width="28" height="42" fill="#F4CB73" opacity=".75"/>)}
        <path d="M70 720 L250 650 L420 680 L600 510 L780 450 L1000 230" fill="none" stroke="#F4C76A" strokeWidth="13"/>
        <path d="M930 230 L1000 230 L990 300" fill="none" stroke="#F4C76A" strokeWidth="13"/>
        <path d="M0 900 Q300 780 580 900 T1080 870" fill="none" stroke="#E7B64F" strokeWidth="5" opacity=".7"/>
      </g>}
      <rect y="0" width="1080" height="1040" fill="url(#glow)" opacity=".18"/>
    </svg>
  );
};

const Scene: React.FC<{scene:ShortScene;index:number}> = ({scene,index}) => {
  const frame=useCurrentFrame();
  const {fps,durationInFrames}=useVideoConfig();
  const enter=spring({frame,fps,config:{damping:22,stiffness:62}});
  const progress=interpolate(frame,[0,durationInFrames],[0,1],{extrapolateRight:"clamp"});
  const exit=interpolate(frame,[0,12,durationInFrames-18,durationInFrames],[0,1,1,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
  const camera=interpolate(progress,[0,1],[1.13,1.025]);
  const drift=interpolate(frame,[0,durationInFrames],[0,1]);
  const accent=scene.accent;
  const reveal=interpolate(enter,[0,1],[42,0]);
  return (
    <AbsoluteFill style={{background:"#05080D",color:"#FFF",overflow:"hidden",opacity:exit}}>
      <AbsoluteFill style={{transform:`scale(${camera})`,transformOrigin:"50% 46%"}}>
        <Artwork type={scene.visual} frame={frame}/>
      </AbsoluteFill>
      <AbsoluteFill style={{background:"linear-gradient(180deg,rgba(3,7,12,.46) 0%,rgba(3,7,12,.04) 24%,rgba(3,7,12,.04) 48%,rgba(3,7,12,.78) 72%,#05080D 100%)"}}/>
      <AbsoluteFill style={{background:"linear-gradient(112deg,transparent 20%,rgba(255,224,164,.075) 48%,transparent 70%)",transform:`translateX(${interpolate(drift,[0,1],[-420,420])}px)`}}/>
      <div style={{position:"absolute",top:68,left:66,right:66,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{display:"flex",alignItems:"center",gap:16}}>
          <div style={{width:9,height:9,borderRadius:20,background:accent,boxShadow:`0 0 22px ${accent}`}}/>
          <div style={{fontFamily:"Arial,sans-serif",fontSize:20,letterSpacing:6,fontWeight:800,color:"#F2E8D4"}}>INDIA 1991 <span style={{color:"#FFFFFF70"}}>/ THE GOLD CRISIS</span></div>
        </div>
        <div style={{fontFamily:"Arial,sans-serif",fontSize:19,letterSpacing:3,color:"#FFFFFFB0"}}>{String(index+1).padStart(2,"0")} — 08</div>
      </div>
      <div style={{position:"absolute",left:70,right:70,bottom:250,opacity:enter,transform:`translateY(${reveal}px)`}}>
        <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:22}}>
          <div style={{width:54,height:3,background:accent}}/>
          <div style={{fontFamily:"Arial,sans-serif",fontSize:18,letterSpacing:5,fontWeight:700,color:accent}}>{scene.label}</div>
        </div>
        <div style={{fontFamily:"'Noto Sans Telugu','Nirmala UI',sans-serif",fontSize:68,fontWeight:900,lineHeight:1.24,whiteSpace:"pre-line",letterSpacing:"-.5px",textShadow:"0 8px 38px rgba(0,0,0,.9)",maxWidth:940}}>{scene.headline}</div>
        <div style={{width:116,height:5,background:accent,marginTop:24,boxShadow:`0 0 22px ${accent}66`}}/>
        <div style={{fontFamily:"'Noto Sans Telugu','Nirmala UI',sans-serif",fontSize:31,lineHeight:1.5,color:"#E7E0D4",marginTop:22,fontWeight:500,maxWidth:900,textShadow:"0 3px 18px #000"}}>{scene.subtitle}</div>
      </div>
      <div style={{position:"absolute",bottom:104,left:70,right:70}}>
        <div style={{height:3,background:"#FFFFFF35",overflow:"hidden"}}>
          <div style={{width:`${((index+progress)/8)*100}%`,height:"100%",background:accent,boxShadow:`0 0 14px ${accent}`}}/>
        </div>
        <div style={{marginTop:18,display:"flex",justifyContent:"space-between",fontFamily:"Arial,sans-serif",fontSize:15,letterSpacing:4,color:"#FFFFFF8A"}}>
          <span>AN INDIA STORY</span><span>1991 • ARCHIVE RECONSTRUCTION</span>
        </div>
      </div>
      <AbsoluteFill style={{pointerEvents:"none"}}>
        {Array.from({length:34},(_,i)=>{
          const x=(i*137+41)%1080;
          const y=(i*223+79)%1500;
          const size=2+(i%3);
          const travel=((frame*(0.22+(i%5)*0.035)+i*53)%190)-95;
          return <div key={i} style={{position:"absolute",left:x,top:y+travel,width:size,height:size,borderRadius:20,background:i%4===0?"#F5D18B":"#D8E0E5",opacity:.12+(i%4)*.035,boxShadow:"0 0 9px rgba(255,220,160,.45)"}}/>;
        })}
      </AbsoluteFill>
      <AbsoluteFill style={{pointerEvents:"none",background:"radial-gradient(ellipse at 50% 42%,transparent 34%,rgba(0,0,0,.24) 68%,rgba(0,0,0,.82) 100%)"}}/>
      <div style={{position:"absolute",inset:0,pointerEvents:"none",opacity:.11,backgroundImage:"repeating-linear-gradient(0deg,transparent 0px,rgba(255,255,255,.55) 1px,transparent 2px)",backgroundSize:"100% 4px"}}/>
      <div style={{position:"absolute",inset:0,border:"1px solid rgba(255,255,255,.10)",margin:22,pointerEvents:"none"}}/>
    </AbsoluteFill>
  );
};

export const TeluguShort:React.FC=()=>{
  let from=0;
  return (
    <AbsoluteFill style={{background:"#080D14"}}>
      {shortContent.scenes.map((scene,index)=>{
        const start=from; from+=scene.durationInFrames;
        return <Sequence key={scene.id} from={start} durationInFrames={scene.durationInFrames}><Scene scene={scene} index={index}/></Sequence>;
      })}
    </AbsoluteFill>
  );
};
