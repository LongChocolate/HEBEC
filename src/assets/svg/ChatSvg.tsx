import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

export function ChatSvg({ size = 25, color = "#489620", stroke = "#fff" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 25 25" fill="none">
      <G clipPath="url(#prefix__clip0)">
        <Path
          d="M23.886 3a1.027 1.027 0 00-.592-.587C19.41.943 5.637.926 1.706 2.413A1.027 1.027 0 001.114 3C1.069 3.115 0 5.905 0 11.196c0 5.291 1.069 8.08 1.114 8.197.106.27.321.483.592.586.088.033 2.155.795 7.42 1.036l2.687 2.418c.39.35.983.35 1.374 0l2.686-2.418c5.266-.24 7.333-1.003 7.42-1.036.272-.103.487-.316.593-.586.046-.116 1.114-2.906 1.114-8.197 0-5.29-1.069-8.08-1.114-8.197zM7.269 12.24a1.043 1.043 0 110-2.087 1.043 1.043 0 010 2.086zm5.231 0a1.043 1.043 0 110-2.087 1.043 1.043 0 010 2.086zm5.215 0a1.043 1.043 0 110-2.087 1.043 1.043 0 010 2.086z"
          fill={color}
          stroke={stroke}
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
