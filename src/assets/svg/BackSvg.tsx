import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function BackSvg({ size = 30, color = "#fff" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 30 30" fill="none">
      <Path
        d="M11.11 15.006L22.333 3.783c.31-.308.48-.72.48-1.16 0-.44-.17-.852-.48-1.16L21.35.48A1.628 1.628 0 0020.19 0c-.44 0-.852.17-1.161.48L5.666 13.842c-.31.31-.48.724-.478 1.164-.001.442.168.855.478 1.165l13.35 13.35c.31.309.721.479 1.161.479.44 0 .852-.17 1.16-.48l.984-.982c.64-.64.64-1.682 0-2.321l-11.21-11.21z"
        fill={color}
      />
    </Svg>
  );
}
