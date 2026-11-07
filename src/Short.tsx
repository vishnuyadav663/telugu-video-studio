import React from "react";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig
} from "remotion";
import { shortContent, ShortScene } from "./content";

const Scene: React.FC<{ scene: ShortScene; index: number }> = ({ scene, index }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 18, stiffness: 90 } });
  const exit = interpolate(frame, [durationInFrames - 18, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const opacity = enter * exit;
  const drift = interpolate(frame, [0, durationInFrames], [0, -70]);
  const scale = interpolate(frame, [0, durationInFrames], [1.08, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: scene.background, color: "white", fontFamily: "'Noto Sans Telugu', 'Noto Sans', sans-serif", overflow: "hidden" }}>
      <AbsoluteFill style={{
        opacity: 0.5,
        background: `radial-gradient(circle at 80% 24%, ${scene.accent}55 0%, transparent 36%), radial-gradient(circle at 12% 82%, #ffffff18 0%, transparent 35%)`,
        transform: `translateY(${drift}px) scale(${scale})`
      }} />
      <AbsoluteFill style={{ opacity: 0.12, backgroundImage: "linear-gradient(135deg, transparent 48%, #ffffff 49%, transparent 50%)", backgroundSize: "90px 90px" }} />

      <div style={{ position: "absolute", top: 92, left: 76, right: 76, display: "flex", justifyContent: "space-between", alignItems: "center", opacity }}>
        <div style={{ fontFamily: "Arial, sans-serif", fontSize: 23, letterSpacing: 5, fontWeight: 800, color: scene.accent }}>TELUGU / STORIES</div>
        <div style={{ fontFamily: "Arial, sans-serif", fontSize: 20, color: "#FFFFFF99" }}>0{index + 1} / 05</div>
      </div>

      <div style={{ position: "absolute", left: 78, right: 78, top: 350, opacity, transform: `translateY(${(1 - enter) * 45}px)` }}>
        <div style={{ display: "inline-block", padding: "13px 20px", border: `1px solid ${scene.accent}`, borderRadius: 50, color: scene.accent, fontFamily: "Arial, sans-serif", fontSize: 21, letterSpacing: 3, fontWeight: 700 }}>
          {scene.eyebrow}
        </div>
        <div style={{ marginTop: 56, fontSize: 82, lineHeight: 1.38, fontWeight: 900, letterSpacing: -1, textShadow: "0 8px 35px #00000055", whiteSpace: "pre-line" }}>
          {scene.headline}
        </div>
        <div style={{ width: 130, height: 8, background: scene.accent, marginTop: 48, borderRadius: 8 }} />
        <div style={{ marginTop: 42, fontSize: 39, lineHeight: 1.65, color: "#E7EAF0", fontWeight: 500 }}>
          {scene.supporting}
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 112, left: 78, right: 78, opacity: 0.85 }}>
        <div style={{ height: 5, background: "#FFFFFF30", borderRadius: 10, overflow: "hidden" }}>
          <div style={{ width: `${((index + 1) / 5) * 100}%`, height: "100%", background: scene.accent }} />
        </div>
        <div style={{ marginTop: 24, display: "flex", justifyContent: "space-between", fontFamily: "Arial, sans-serif", fontSize: 19, letterSpacing: 3, color: "#FFFFFF99" }}>
          <span>SHORT DOCUMENTARY</span><span>FOLLOW FOR MORE</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const TeluguShort: React.FC = () => {
  const framesPerScene = 270;
  return (
    <AbsoluteFill style={{ backgroundColor: "#101827" }}>
      {shortContent.scenes.map((scene, index) => (
        <Sequence key={scene.eyebrow} from={index * framesPerScene} durationInFrames={framesPerScene}>
          <Scene scene={scene} index={index} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
