import SceneMotion from "./SceneMotion";
import Beach from "./scene/Beach";
import Birds from "./scene/Birds";
import Clouds from "./scene/Clouds";
import CruiseShip from "./scene/CruiseShip";
import Glitter from "./scene/Glitter";
import PalmTree from "./scene/PalmTree";
import Plane from "./scene/Plane";
import Sky from "./scene/Sky";
import Sun from "./scene/Sun";
import Waves from "./scene/Waves";
import Yacht from "./scene/Yacht";

/** The inline illustration is rendered on the server, keeping its artwork out of client JavaScript. */
export default function HeroScene() {
  return (
    <SceneMotion>
      <svg className="h-full w-full" viewBox="0 0 1440 960" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg" focusable="false">
        <g className="scene-scroll-sky">
          <Sky />
          <Sun />
          <Clouds />
          <Birds />
          <Plane depth="far" />
          <Plane depth="mid" />
          <Plane depth="near" />
        </g>
        <g className="scene-scroll-ocean">
          <Waves />
          <Glitter />
        </g>
        <g className="scene-scroll-vessels">
          <CruiseShip />
          <Yacht />
          <Waves foreground />
        </g>
        <g className="scene-scroll-beach"><Beach /></g>
        <g className="scene-palms-parallax">
          <PalmTree variant="far" />
          <PalmTree variant="near" />
        </g>
      </svg>
    </SceneMotion>
  );
}
