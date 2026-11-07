import React from "react";
import { Composition } from "remotion";
import { TeluguShort } from "./Short";
import { totalFrames, shortContent } from "./content";
import { DronaFinalMoment } from "./DronaFinalMoment";
import { DronaAcharya30 } from "./DronaAcharya30";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="TeluguShort"
      component={TeluguShort}
      durationInFrames={totalFrames}
      fps={shortContent.fps}
      width={1080}
      height={1920}
    />
    <Composition
      id="DronaAcharya30"
      component={DronaAcharya30}
      durationInFrames={900}
      fps={30}
      width={1080}
      height={1920}
    />
    <Composition
      id="DronaFinalMoment"
      component={DronaFinalMoment}
      durationInFrames={300}
      fps={30}
      width={1080}
      height={1920}
    />
  </>
);
