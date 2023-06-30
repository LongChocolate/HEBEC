import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

export function DanThuocSvg({ size = 25, selected = false }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 25 24" fill="none">
      <G clipPath="url(#prefix__clip0)" fill={selected ? "#fff" : "#1F5622"}>
        <Path d="M15.03 22.61l2.694-2.694-4.928-4.928a6.173 6.173 0 01-5.832 4.95 4.73 4.73 0 001.34 2.671 4.76 4.76 0 006.726 0zM18.718 18.922l2.694-2.694a4.76 4.76 0 000-6.725 4.761 4.761 0 00-6.726 0l-1.771 1.771v1.845l5.803 5.803zM1.998 4.755A4.76 4.76 0 016.753 0a4.76 4.76 0 014.756 4.755v3.81H1.998v-3.81z" />
        <Path d="M1.998 13.78a4.76 4.76 0 004.755 4.756 4.76 4.76 0 004.756-4.756V9.971H1.998v3.81z" />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path d="M.4 0h24v24H.4V0z" fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
