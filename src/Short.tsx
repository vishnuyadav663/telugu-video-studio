import React from "react";
import {
  AbsoluteFill,
  Audio,
  staticFile,
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
  const progress = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp"
  });
  const exit = interpolate(frame, [durationInFrames - 12, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp"
  });
  const zoom = interpolate(progress, [0, 1], [1.08, 1.0]);
  const shake = scene.visual === "convoy" && frame >= 60 && frame <= 78
    ? Math.sin(frame * 2.5) * 8 : 0;
  const countdown = Math.floor(interpolate(frame, [0, 60], [21, 15], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp"
  }));
  const palette: Record<ShortScene["visual"], string> = {
    crisis: "radial-gradient(circle at 50% 35%, #49323A, #10151F 65%)",
    reserves: "linear-gradient(145deg, #253344, #101722 70%)",
    vault: "radial-gradient(circle at 50% 45%, #69502B, #17130F 68%)",
    convoy: "linear-gradient(145deg, #35252A, #10151F 72%)",
    airlift: "linear-gradient(160deg, #4B3A2A, #111722 70%)",
    flight: "linear-gradient(145deg, #163C4A, #101722 72%)",
    repayment: "linear-gradient(145deg, #1C463B, #101722 72%)",
    payoff: "radial-gradient(circle at 50% 30%, #5C492B, #101722 70%)"
  };

  return (
    <AbsoluteFill style={{
      background: palette[scene.visual],
      color: "#FFFFFF",
      fontFamily: "'Noto Sans Telugu', 'Nirmala UI', sans-serif",
      overflow: "hidden",
      opacity: exit,
      transform: `translate(${shake}px, ${-shake * 0.45}px) scale(${zoom})`
    }}>
      <AbsoluteFill style={{
        background: "radial-gradient(circle, transparent 35%, rgba(0,0,0,0.78) 100%)"
      }} />
      <AbsoluteFill style={{
        opacity: 0.12,
        backgroundImage: "linear-gradient(135deg, transparent 48%, #FFFFFF 49%, transparent 50%)",
        backgroundSize: "100px 100px"
      }} />

      <div style={{
        position: "absolute", top: 86, left: 70, right: 70,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        opacity: enter
      }}>
        <div style={{ fontFamily: "Arial, sans-serif", fontSize: 21, letterSpacing: 4, color: scene.accent, fontWeight: 800 }}>
          INDIA • 1991
        </div>
        <div style={{ fontFamily: "Arial, sans-serif", fontSize: 19, color: "#FFFFFF99" }}>
          {String(index + 1).padStart(2, "0")} / 08
        </div>
      </div>

      <div style={{
        position: "absolute", top: 330, left: 76, right: 76,
        opacity: enter, transform: `translateY(${(1 - enter) * 42}px)`
      }}>
        <div style={{
          display: "inline-block", padding: "12px 19px",
          border: `1px solid ${scene.accent}`, borderRadius: 40,
          color: scene.accent, fontFamily: "Arial, sans-serif",
          fontSize: 19, letterSpacing: 2.5, fontWeight: 700
        }}>{scene.label}</div>

        {scene.visual === "crisis" && (
          <div style={{ marginTop: 38, color: "#FF7777", fontFamily: "Arial, sans-serif", fontSize: 68, fontWeight: 900 }}>
            2–3 WEEKS
          </div>
        )}
        {scene.visual === "vault" && (
          <div style={{ marginTop: 34, color: scene.accent, fontFamily: "Arial, sans-serif", fontSize: 76, fontWeight: 900 }}>
            {interpolate(frame, [35, 115], [0, 46.91], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }).toFixed(2)} T
          </div>
        )}
        {scene.visual === "repayment" && (
          <div style={{ marginTop: 34, color: scene.accent, fontFamily: "Arial, sans-serif", fontSize: 54, fontWeight: 900 }}>
            LOAN REPAID
          </div>
        )}

        <div style={{
          marginTop: 36, fontSize: 75, lineHeight: 1.42,
          fontWeight: 900, letterSpacing: -1,
          textShadow: "0 8px 35px #00000080", whiteSpace: "pre-line"
        }}>{scene.headline}</div>
        <div style={{
          marginTop: 34, width: 125, height: 7,
          background: scene.accent, borderRadius: 8
        }} />
        <div style={{
          marginTop: 32, fontSize: 35, lineHeight: 1.65,
          color: "#E8ECF3", fontWeight: 500
        }}>{scene.subtitle}</div>
      </div>

      {scene.visual === "flight" && (
        <svg viewBox="0 0 900 300" style={{ position: "absolute", left: 70, right: 70, bottom: 330, width: "calc(100% - 140px)", height: 260 }}>
          <path d="M80 210 Q430 -30 810 170" fill="none" stroke={scene.accent} strokeWidth="5" strokeDasharray="12 13" strokeDashoffset={interpolate(frame, [0, 150], [500, 0], { extrapolateRight: "clamp" })} />
          <circle cx="80" cy="210" r="13" fill="#FFD166" />
          <circle cx="810" cy="170" r="13" fill="#FFD166" />
          <g fill="white" fontSize="30" fontFamily="Arial">
            <text x="55" y="260">MUMBAI</text>
            <text x="710" y="225">LONDON</text>
          </g>
        </svg>
      )}

      <div style={{
        position: "absolute", bottom: 225, left: 66, right: 66,
        padding: "18px 22px", borderRadius: 18,
        background: "rgba(0,0,0,0.58)", borderLeft: `5px solid ${scene.accent}`,
        color: "#FFFFFF", fontSize: 27, lineHeight: 1.5, fontWeight: 600,
        textAlign: "center", opacity: interpolate(frame, [8, 18], [0, 1], {
          extrapolateLeft: "clamp", extrapolateRight: "clamp"
        })
      }}>
        {scene.narration}
      </div>

      <div style={{ position: "absolute", bottom: 112, left: 76, right: 76 }}>
        <div style={{ height: 5, background: "#FFFFFF35", borderRadius: 8, overflow: "hidden" }}>
          <div style={{ width: `${((index + progress) / 8) * 100}%`, height: "100%", background: scene.accent }} />
        </div>
        <div style={{
          marginTop: 22, display: "flex", justifyContent: "space-between",
          fontFamily: "Arial, sans-serif", fontSize: 17,
          letterSpacing: 2, color: "#FFFFFF99"
        }}>
          <span>TELUGU HISTORY</span><span>FOLLOW FOR MORE</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const TeluguShort: React.FC = () => {
  let from = 0;
  return (
    <AbsoluteFill style={{ backgroundColor: "#101722" }}>
      <Audio src={staticFile("audio/voiceover.wav")} />
      {shortContent.scenes.map((scene, index) => {
        const start = from;
        from += scene.durationInFrames;
        return (
          <Sequence key={scene.id} from={start} durationInFrames={scene.durationInFrames}>
            <Scene scene={scene} index={index} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
