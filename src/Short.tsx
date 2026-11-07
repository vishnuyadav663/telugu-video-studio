import React from "react";
import {
  AbsoluteFill, Audio, staticFile, Sequence, interpolate, spring,
  useCurrentFrame, useVideoConfig
} from "remotion";
import { shortContent, ShortScene } from "./content";

const GoldBar = ({x,y,s=1}:{x:number;y:number;s?:number}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M0 25 L24 0 H118 L142 25 L126 76 H16 Z" fill="#A66A20" stroke="#FFE09A" strokeWidth="3"/>
    <path d="M24 0 H118 L142 25 H0 Z" fill="#FFD36B"/>
    <path d="M0 25 H142 L126 76 H16 Z" fill="#D99A36"/>
    <path d="M38 14 H105" stroke="#FFF0B5" strokeWidth="3" opacity=".8"/>
  </g>
);
const Art: React.FC<{kind:ShortScene["visual"]; frame:number}> = ({kind,frame}) => {
  const drift = Math.sin(frame/24)*12;
  return <svg viewBox="0 0 1080 1050" preserveAspectRatio="xMidYMid slice" style={{position:"absolute",left:0,bottom:0,width:"100%",height:"68%"}}>
    <defs>
      <linearGradient id="sky" x2="0" y2="1"><stop stopColor="#25364C"/><stop offset="1" stopColor="#080D16"/></linearGradient>
      <linearGradient id="gold" x2="0" y2="1"><stop stopColor="#FFF0A8"/><stop offset="1" stopColor="#B66A18"/></linearGradient>
      <linearGradient id="glass" x2="1" y2="1"><stop stopColor="#8CC4D1" stopOpacity=".5"/><stop offset="1" stopColor="#102234" stopOpacity=".9"/></linearGradient>
    </defs>
    <rect width="1080" height="1050" fill="url(#sky)"/>
    <circle cx="830" cy="190" r="150" fill="#F6C86C" opacity=".12"/>
    {kind==="crisis" && <g>
      <path d="M0 720 L0 510 120 510 120 390 240 390 240 530 360 530 360 300 520 300 520 520 680 520 680 420 830 420 830 570 1080 570 1080 1050 0 1050Z" fill="#111B29"/>
      {Array.from({length:18},(_,i)=><rect key={i} x={i*66} y={610+(i%3)*55} width="36" height="24" fill="#F4B75E" opacity=".18"/>)}
      <path d="M100 240 H600 L560 520 H140Z" fill="#541F28" stroke="#FF8A7B" strokeWidth="5"/>
      <path d="M150 300 H550 M180 365 H510 M210 430 H480" stroke="#F7D6C8" strokeWidth="10" opacity=".55"/>
      <text x="350" y="270" textAnchor="middle" fill="#FFF1E8" fontSize="45" fontWeight="bold">ECONOMIC CRISIS</text>
      <path d="M80 840 H1000" stroke="#DDAA64" strokeWidth="3" opacity=".5"/>
    </g>}
    {kind==="reserves" && <g>
      <path d="M140 820 V340 Q140 250 230 250 H850 Q940 250 940 340 V820Z" fill="#172536" stroke="#91A9B8" strokeWidth="12"/>
      <circle cx="540" cy="535" r="245" fill="#0B121D" stroke="#AAB8C3" strokeWidth="28"/>
      <circle cx="540" cy="535" r="190" fill="none" stroke="#516477" strokeWidth="10"/>
      {Array.from({length:12},(_,i)=><path key={i} d="M540 355 V385" stroke="#D7E2E8" strokeWidth="8" transform={`rotate(${i*30} 540 535)`}/>)}
      <path d="M540 535 L690 430" stroke="#F5C66D" strokeWidth="15" strokeLinecap="round"/>
      <circle cx="540" cy="535" r="20" fill="#F5C66D"/>
      <text x="540" y="900" textAnchor="middle" fill="#F2C879" fontSize="42" letterSpacing="5">FOREX RESERVES</text>
      <path d="M0 950 H1080" stroke="#6B8296" strokeWidth="5"/>
    </g>}
    {kind==="vault" && <g>
      <rect x="100" y="170" width="880" height="760" rx="30" fill="#17202A" stroke="#B68A43" strokeWidth="18"/>
      <circle cx="540" cy="540" r="280" fill="#0A1018" stroke="#D4A44F" strokeWidth="24"/>
      <circle cx="540" cy="540" r="225" fill="none" stroke="#805C2C" strokeWidth="10"/>
      <circle cx="540" cy="540" r="42" fill="#D6A64E"/>
      {Array.from({length:8},(_,i)=><g key={i} transform={`rotate(${i*45} 540 540)`}><rect x="525" y="280" width="30" height="260" rx="12" fill="#C69A4A"/></g>)}
      <g transform={`translate(0 ${drift})`}><GoldBar x={250} y={760}/><GoldBar x={420} y={700}/><GoldBar x={590} y={760}/><GoldBar x={760} y={700}/></g>
    </g>}
    {kind==="convoy" && <g>
      <path d="M0 760 Q540 620 1080 760 V1050 H0Z" fill="#10151C"/>
      <path d="M0 900 H1080" stroke="#E4B76D" strokeWidth="8" strokeDasharray="70 55" opacity=".55"/>
      {[170,490,810].map((x,i)=><g key={i} transform={`translate(${x} ${650+i*45})`}>
        <path d="M0 90 L35 35 H190 L240 90 V155 H0Z" fill={i===1?"#A5A8A6":"#26384B"} stroke="#B9C6D0" strokeWidth="5"/>
        <path d="M55 40 H175 L205 85 H30Z" fill="url(#glass)"/>
        <circle cx="55" cy="155" r="27" fill="#090D12" stroke="#8795A0" strokeWidth="8"/><circle cx="190" cy="155" r="27" fill="#090D12" stroke="#8795A0" strokeWidth="8"/>
        <path d="M240 110 L300 130" stroke="#F6D38B" strokeWidth="10" opacity=".8"/>
      </g>)}
      <path d="M0 590 L1080 590" stroke="#F2C66D" strokeWidth="3" opacity=".2"/>
    </g>}
    {kind==="airlift" && <g>
      <path d="M0 820 H1080 V1050 H0Z" fill="#111821"/>
      <path d="M0 825 L1080 825" stroke="#E0B56A" strokeWidth="6" opacity=".6"/>
      <g transform={`translate(${drift} 0)`}>
        <path d="M130 500 L750 500 L930 590 L750 650 L130 650 L70 590Z" fill="#C8D2D7" stroke="#F9D68B" strokeWidth="7"/>
        <path d="M420 500 L560 270 L620 270 L590 500Z" fill="#9BAFBA"/>
        <path d="M450 650 L570 790 L620 790 L590 650Z" fill="#9BAFBA"/>
        <path d="M130 540 H750" stroke="#647786" strokeWidth="8"/>
        <text x="500" y="600" textAnchor="middle" fill="#1A2B3B" fontSize="42" fontWeight="bold">CARGO</text>
      </g>
      <g><GoldBar x={350} y={780} s={.8}/><GoldBar x={470} y={780} s={.8}/><GoldBar x={590} y={780} s={.8}/></g>
    </g>}
    {kind==="flight" && <g>
      <path d="M80 760 Q540 120 1000 760" fill="none" stroke="#75D8D0" strokeWidth="8" strokeDasharray="18 20" strokeDashoffset={-frame*2}/>
      <circle cx="120" cy="730" r="24" fill="#F7C86C"/><circle cx="960" cy="730" r="24" fill="#F7C86C"/>
      <text x="100" y="820" fill="white" fontSize="35">LONDON</text><text x="820" y="820" fill="white" fontSize="35">TOKYO</text>
      <g transform={`translate(${interpolate(frame,[0,220],[150,700],{extrapolateRight:"clamp"})} ${360+Math.sin(frame/12)*18})`}>
        <path d="M-100 0 L-15 -18 L25 -90 L48 -90 L35 -18 L110 0 L110 15 L35 12 L45 65 L25 65 L-15 12 L-100 15Z" fill="#E9F2F4"/>
      </g>
    </g>}
    {kind==="repayment" && <g>
      <path d="M180 390 L540 190 L900 390 V850 H180Z" fill="#1C3440" stroke="#D2B16C" strokeWidth="9"/>
      <path d="M130 400 H950 L540 160Z" fill="#B88D4C"/>
      {[280,440,600,760].map(x=><rect key={x} x={x} y="430" width="65" height="360" fill="#D5DCE0" opacity=".8"/>)}
      <path d="M160 850 H920" stroke="#D5B56D" strokeWidth="14"/>
      <path d="M330 580 L470 710 L760 430" fill="none" stroke="#7DE0B0" strokeWidth="28" strokeLinecap="round" strokeLinejoin="round"/>
    </g>}
    {kind==="payoff" && <g>
      <circle cx="540" cy="340" r="180" fill="#E9B85E" opacity=".15"/>
      <path d="M0 850 L0 700 130 700 130 580 240 580 240 660 350 660 350 470 500 470 500 650 650 650 650 520 780 520 780 620 900 620 900 470 1080 470 V1050 H0Z" fill="#132538"/>
      {Array.from({length:20},(_,i)=><rect key={i} x={i*58} y={760+(i%3)*45} width="25" height="22" fill="#F5C86E" opacity=".38"/>)}
      <path d="M0 870 Q540 760 1080 870" fill="none" stroke="#F1C46E" strokeWidth="6"/>
      <GoldBar x={410} y={690} s={1.2}/>
    </g>}
    <rect x="0" y="0" width="1080" height="1050" fill="url(#sky)" opacity=".08"/>
  </svg>;
};

const Scene: React.FC<{scene:ShortScene;index:number}> = ({scene,index}) => {
  const frame=useCurrentFrame(); const {fps,durationInFrames}=useVideoConfig();
  const enter=spring({frame,fps,config:{damping:20,stiffness:75}});
  const progress=interpolate(frame,[0,durationInFrames],[0,1],{extrapolateRight:"clamp"});
  const fade=interpolate(frame,[durationInFrames-15,durationInFrames],[1,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
  const palettes:Record<ShortScene["visual"],string>={crisis:"#180F19",reserves:"#101D2A",vault:"#17130C",convoy:"#15151C",airlift:"#171A20",flight:"#0D2029",repayment:"#10251F",payoff:"#17202C"};
  return <AbsoluteFill style={{backgroundColor:palettes[scene.visual],color:"white",fontFamily:"'Noto Sans Telugu',sans-serif",opacity:fade,overflow:"hidden"}}>
    <AbsoluteFill style={{background:"radial-gradient(ellipse at 50% 45%, transparent 15%, rgba(0,0,0,.78) 100%)"}}/>
    <Art kind={scene.visual} frame={frame}/>
    <div style={{position:"absolute",top:78,left:70,right:70,display:"flex",justifyContent:"space-between",fontFamily:"Arial",fontSize:21,letterSpacing:4,color:scene.accent,fontWeight:800}}>
      <span>INDIA • 1991</span><span>{String(index+1).padStart(2,"0")} / 08</span>
    </div>
    <div style={{position:"absolute",top:205,left:74,right:74,opacity:enter,transform:`translateY(${(1-enter)*35}px)`}}>
      <div style={{fontFamily:"Arial",fontSize:19,letterSpacing:3,color:scene.accent,fontWeight:800}}>{scene.label}</div>
      <div style={{marginTop:22,fontSize:62,lineHeight:1.35,fontWeight:900,textShadow:"0 5px 30px #000",whiteSpace:"pre-line"}}>{scene.headline}</div>
      <div style={{marginTop:22,width:110,height:6,background:scene.accent,borderRadius:8}}/>
    </div>
    <div style={{position:"absolute",bottom:190,left:72,right:72,textAlign:"center",fontSize:30,lineHeight:1.5,fontWeight:600,textShadow:"0 3px 18px #000",background:"rgba(3,8,14,.62)",padding:"18px 22px",borderRadius:18}}>
      {scene.subtitle}
    </div>
    <div style={{position:"absolute",bottom:105,left:72,right:72,height:5,background:"#FFFFFF35",borderRadius:8,overflow:"hidden"}}>
      <div style={{width:`${((index+progress)/8)*100}%`,height:"100%",background:scene.accent}}/>
    </div>
    <div style={{position:"absolute",bottom:55,left:72,right:72,display:"flex",justifyContent:"space-between",fontFamily:"Arial",fontSize:16,letterSpacing:2,color:"#FFFFFF99"}}><span>TELUGU HISTORY</span><span>FOLLOW FOR MORE</span></div>
  </AbsoluteFill>;
};

export const TeluguShort:React.FC=()=> {
  let from=0;
  return <AbsoluteFill style={{background:"#080D14"}}>
    <Audio src={staticFile("audio/voiceover.wav")} />
    {shortContent.scenes.map((scene,index)=>{const start=from;from+=scene.durationInFrames;return <Sequence key={scene.id} from={start} durationInFrames={scene.durationInFrames}><Scene scene={scene} index={index}/></Sequence>;})}
  </AbsoluteFill>;
};
