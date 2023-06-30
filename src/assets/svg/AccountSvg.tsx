import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

export function AccountSvg({ size = 24, selected = false }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 23" fill="none">
      <G clipPath="url(#prefix__clip0)" fill={selected ? "#489620" : "#9E9E9E"}>
        <Path d="M7.071 4.929a4.929 4.929 0 019.857 0v3.285A4.933 4.933 0 0112 13.143a4.933 4.933 0 01-4.929-4.929V4.93zM15.545 14.828l3.497 1.166a6.51 6.51 0 014.458 6.185.821.821 0 01-.821.821H1.32a.821.821 0 01-.821-.821 6.51 6.51 0 014.458-6.185l3.497-1.166a.821.821 0 01.26-.042h6.57c.089 0 .177.014.26.042z" />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path d="M.5 0h23v23H.5V0z" fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
