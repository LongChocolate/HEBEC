import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

export function ReviewEndDateSvg({ size = 25, selected = false }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 25 24" fill="none">
      <G clipPath="url(#prefix__clip0)" fill={selected ? "#fff" : "#1F5622"}>
        <Path d="M6.15 6C5.185 6 4.4 5.215 4.4 4.25v-1.5A.75.75 0 015.15 2h1.604A2.755 2.755 0 019.4 0c1.257 0 2.318.847 2.646 2h1.604a.75.75 0 01.75.75v1.5c0 .965-.785 1.75-1.75 1.75h-6.5zM22.4 21a.5.5 0 01-.447-.276l-1.289-2.578a2.51 2.51 0 01-.264-1.118V8c0-1.103.897-2 2-2s2 .897 2 2v9.028c0 .386-.091.772-.264 1.118l-1.289 2.578A.5.5 0 0122.4 21z" />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.4 3h.25a2.752 2.752 0 012.75 2.75v15.5A2.752 2.752 0 0115.65 24H3.15A2.752 2.752 0 01.4 21.25V5.75A2.752 2.752 0 013.15 3h.25v1.25A2.752 2.752 0 006.15 7h6.5a2.752 2.752 0 002.75-2.75V3zM4.15 21h10.5a.75.75 0 000-1.5H4.15a.75.75 0 000 1.5zm0-3h10.5a.75.75 0 000-1.5H4.15a.75.75 0 000 1.5zm0-3h10.5a.75.75 0 000-1.5H4.15a.75.75 0 000 1.5zm0-3h10.5a.75.75 0 000-1.5H4.15a.75.75 0 000 1.5z"
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" d="M0 0h24v24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
