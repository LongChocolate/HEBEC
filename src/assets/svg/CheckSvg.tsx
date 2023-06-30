import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

export function CheckSvg({ size = 16, color = "#fff" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <G clipPath="url(#prefix__clip0)">
        <Path
          d="M15.06 5.106l-7.912 7.912a1.502 1.502 0 01-2.124 0L.94 8.933A1.501 1.501 0 013.062 6.81l3.024 3.024 6.851-6.851a1.501 1.501 0 012.124 2.123z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path d="M.5.5h15v15H.5V.5z" fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
