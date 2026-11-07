import React from "react";
import {
  AbsoluteFill, Composition, Easing, interpolate, random,
  useCurrentFrame, useVideoConfig
} from "remotion";

const gold = "#d9a75b";
const dust = Array.from({ length: 75 }, (_, i) => ({
  x: random("x" + i) * 1080,
  y: random("y" + i) * 1920,
  r: 1 + random("r" + i) * 3,
  delay: random("d" + i) * 300,
  speed: 0.35 + random("s" + i) * 1.1,
}));

type WarriorProps = { x?: number; scale?: number; opacity?: number; seated?: boolean; attacker?: boolean };

const Warrior: React.FC<WarriorProps> = ({ x = 0, scale = 1, opacity = 1, seated = false, attacker = false }) => (
  <g transform={`translate(${x} 0) scale(${scale})`} opacity={opacity}>
    <ellipse cx="0" cy="1530" rx="205" ry="42" fill="#08090c" opacity=".7" />
    {seated ? <>
      <path d="M-130 1380 Q-250 1480 -185 1530 Q-90 1580 0 1515 Q110 1590 200 1520 Q220 1470 110 1390Z" fill="#493326" stroke="#9a7043" strokeWidth="8" />
      <path d="M-100 1370 Q0 1450 105 1370 L155 1510 Q20 1550 -150 1500Z" fill="#765035" />
      <path d="M-110 1395 Q0 1465 120 1390" fill="none" stroke="#c08b4e" strokeWidth="9" />
      <path d="M-105 970 Q-160 1110 -125 1390 Q0 1460 125 1390 Q160 1120 105 970Z" fill="#9b6339" stroke="#d4a15d" strokeWidth="8" />
      <path d="M-105 1010 Q0 1120 105 1010 L65 1335 Q0 1375 -65 1335Z" fill="#c08b4e" />
      <path d="M-95 1030 Q-205 1170 -135 1280 Q-70 1310 -35 1245 L-20 1160" fill="none" stroke="#bd8754" strokeWidth="58" strokeLinecap="round" />
      <path d="M95 1030 Q205 1170 135 1280 Q70 1310 35 1245 L20 1160" fill="none" stroke="#bd8754" strokeWidth="58" strokeLinecap="round" />
      <circle cx="0" cy="850" r="102" fill="#b77c52" />
      <path d="M-105 835 Q-120 700 0 690 Q120 700 105 835 Q55 780 0 790 Q-55 780 -105 835Z" fill="#e0d9c8" />
      <path d="M-78 870 Q-80 1015 0 1025 Q80 1015 78 870 Q35 930 0 925 Q-35 930 -78 870Z" fill="#ddd4c1" />
      <path d="M-65 850 Q-25 830 0 850 Q25 830 65 850" stroke="#332a27" strokeWidth="9" fill="none" />
      <path d="M-20 815 L0 860 L20 815" stroke="#8d2e22" strokeWidth="12" fill="none" />
      <path d="M-25 725 Q-15 650 25 675 Q50 700 22 745" fill="#e2dccd" stroke="#9d927f" strokeWidth="8" />
    </> : <>
      <path d="M-55 1230 L-110 1530 L-20 1530 L30 1260Z" fill="#392c28" />
      <path d="M45 1230 L85 1530 L175 1530 L120 1220Z" fill="#4b3428" />
      <path d="M-75 730 Q-140 900 -105 1250 Q0 1310 105 1250 Q140 900 75 730Z" fill="#6c3428" stroke="#c18a4e" strokeWidth="9" />
      <path d="M-65 760 L0 910 L70 760 L110 1215 Q0 1270 -110 1215Z" fill="#a65b32" />
      <path d="M-90 850 L0 1020 L90 850" fill="none" stroke="#e0b66f" strokeWidth="15" />
      <path d="M-90 800 Q-190 980 -160 1170" fill="none" stroke="#a96b43" strokeWidth="58" strokeLinecap="round" />
      <path d="M90 800 Q180 940 155 1080" fill="none" stroke="#a96b43" strokeWidth="58" strokeLinecap="round" />
      <circle cx="0" cy="620" r="100" fill="#b77c52" />
      <path d="M-105 600 Q-115 475 0 470 Q115 475 105 600 Q60 545 0 550 Q-60 545 -105 600Z" fill="#d7d0bf" />
      <path d="M-90 640 Q0 700 90 640" fill="none" stroke="#e5d9c4" strokeWidth="24" strokeLinecap="round" />
      <path d="M-20 570 L0 620 L20 570" stroke="#8c3428" strokeWidth="10" fill="none" />
    </>}
    {attacker && <>
      <path d="M125 760 Q260 500 360 270" stroke="#b9c4c9" strokeWidth="28" fill="none" strokeLinecap="round" />
      <path d="M360 270 L395 190 L380 290Z" fill="#eef0e8" />
      <path d="M105 770 L175 825" stroke="#c18a4e" strokeWidth="34" strokeLinecap="round" />
    </>}
  </g>
);

const Bow: React.FC = () => (
  <g transform="translate(760 1450) rotate(-18)">
    <path d="M0 -230 Q170 0 0 230" fill="none" stroke="#c58a45" strokeWidth="18" />
    <path d="M0 -230 L0 230" stroke="#d8d0b7" strokeWidth="3" />
    <path d="M-12 -10 L140 -10" stroke="#d8d0b7" strokeWidth="5" />
  </g>
);

export const DronaFinalMoment: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const zoom = interpolate(f, [0, 300], [1, 1.14], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const reveal = interpolate(f, [0, 35], [0, 1], { extrapolateRight: "clamp" });
  const bowDrop = interpolate(f, [145, 205], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
  const attackerIn = interpolate(f, [165, 235], [1.2, 0.08], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const flash = interpolate(f, [238, 244, 252], [0, 0.9, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fade = interpolate(f, [280, 300], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleOpacity = interpolate(f, [8, 30, 255, 285], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  const attackerOpacity = interpolate(f, [160, 200], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const endTitle = interpolate(f, [205, 230, 275, 295], [0, 1, 1, 0], { extrapolateRight: "clamp" });

  return <AbsoluteFill style={{ background: "#090d13", fontFamily: "Georgia, serif", overflow: "hidden" }}>
    <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 58%" }}>
      <svg width="100%" height="100%" viewBox="0 0 1080 1920" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="drona-sky" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#111c2a" /><stop offset=".55" stopColor="#54352c" /><stop offset="1" stopColor="#100f13" /></linearGradient>
          <radialGradient id="drona-sun"><stop stopColor="#ffc879" stopOpacity=".9" /><stop offset="1" stopColor="#e77b39" stopOpacity="0" /></radialGradient>
          <linearGradient id="drona-ground" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#49332a" /><stop offset="1" stopColor="#100f12" /></linearGradient>
        </defs>
        <rect width="1080" height="1920" fill="url(#drona-sky)" />
        <circle cx="545" cy="700" r="500" fill="url(#drona-sun)" opacity=".85" />
        <path d="M0 1050 Q170 930 330 1050 T650 1030 T1080 1010 L1080 1510 L0 1510Z" fill="#17191c" />
        {Array.from({ length: 13 }, (_, i) => <g key={i} opacity=".7" transform={`translate(${i * 95 - 30} ${1080 + (i % 3) * 35})`}>
          <path d="M0 0 L-28 230 M0 0 L32 220 M0 0 L0 290" stroke="#171719" strokeWidth="18" />
          <circle cx="0" cy="-15" r="22" fill="#19191b" />
        </g>)}
        <path d="M0 1390 Q260 1290 520 1390 T1080 1350 L1080 1920 L0 1920Z" fill="url(#drona-ground)" />
        <path d="M0 1330 Q250 1260 540 1350 T1080 1300" stroke="#c17a48" strokeOpacity=".18" strokeWidth="70" fill="none" />
        <g opacity={reveal}>
          <Warrior x={515} scale={1.05} seated />
          <g transform={`translate(${bowDrop * 210} ${bowDrop * 150}) rotate(${bowDrop * 72} 760 1450)`}><Bow /></g>
        </g>
        <g transform={`translate(${attackerIn * 420} 0)`} opacity={attackerOpacity}>
          <Warrior x={880} scale={0.78} attacker opacity={0.88} />
          <rect x="790" y="530" width="210" height="1000" fill="#0b0c10" opacity=".34" />
        </g>
        {Array.from({ length: 5 }, (_, i) => {
          const x = interpolate(f, [30 + i * 8, 85 + i * 8], [1180, -200], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return <g key={i} opacity=".6"><path d={`M${x} ${850 + i * 95} l170 -40`} stroke="#d5b17b" strokeWidth="4" /><path d={`M${x + 160} ${810 + i * 95} l30 0 l-18 22Z`} fill="#d5b17b" /></g>;
        })}
        {dust.map((p, i) => {
          const y = ((p.y - f * p.speed + 2200) % 2200) - 100;
          const x = p.x + Math.sin((f + p.delay) * 0.025) * 22;
          return <circle key={i} cx={x} cy={y} r={p.r} fill={i % 4 === 0 ? "#ffb86b" : "#e8d1a2"} opacity={0.12 + (i % 5) * 0.055} />;
        })}
        <rect width="1080" height="1920" fill="#ffd59b" opacity={flash} />
        <rect width="1080" height="1920" fill="#03060a" opacity={fade} />
      </svg>
    </AbsoluteFill>
    <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: 150, opacity: titleOpacity }}>
      <div style={{ color: "#e9c58b", fontSize: 28, letterSpacing: 9, textTransform: "uppercase" }}>THE KURUKSHETRA WAR</div>
      <div style={{ width: 130, height: 2, background: gold, marginTop: 24, opacity: 0.8 }} />
    </AbsoluteFill>
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 240, opacity: endTitle }}>
      <div style={{ color: "#f1d4a0", fontSize: 64, letterSpacing: 3, textShadow: "0 4px 24px #000", textAlign: "center" }}>THE FALL OF DRONA</div>
      <div style={{ color: "#d7c7ad", fontSize: 25, letterSpacing: 5, marginTop: 20 }}>WHEN TRUTH BECAME A WEAPON</div>
    </AbsoluteFill>
    <AbsoluteFill style={{ background: "linear-gradient(180deg,rgba(0,0,0,.45),transparent 25%,transparent 72%,rgba(0,0,0,.62))" }} />
  </AbsoluteFill>;
};
