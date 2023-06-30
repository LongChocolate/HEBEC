import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

export function EditSvg({ size = 25, color = "#489620" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 25 25" fill="none">
      <G clipPath="url(#prefix__clip0)">
        <Path
          d="M8.826 21.873l-5.67-5.67L16.87 2.488l5.67 5.67L8.826 21.873zm-6.2-4.672l5.201 5.202L.03 25l2.597-7.799zm21.66-10.78l-.984.984-5.678-5.678.983-.983a2.536 2.536 0 013.588 0l2.09 2.09a2.55 2.55 0 010 3.587z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path d="M0 0h25v25H0V0z" fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
