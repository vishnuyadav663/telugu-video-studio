import React from "react";
import { Composition } from "remotion";
import { TeluguShort } from "./Short";
import { totalFrames, shortContent } from "./content";

export const RemotionRoot: React.FC = () => (
  <Composition
    id="TeluguShort"
    component={TeluguShort}
    durationInFrames={totalFrames}
    fps={shortContent.fps}
    width={1080}
    height={1920}
  />
);
