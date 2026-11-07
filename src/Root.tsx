import React from "react";
import { Composition } from "remotion";
import { TeluguShort } from "./Short";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="TeluguShort"
      component={TeluguShort}
      durationInFrames={1350}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
