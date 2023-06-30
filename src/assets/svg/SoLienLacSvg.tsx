import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

export function SoLienLacSvg({ size = 25, color = "#489620", selected = false }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 25 25" fill="none">
      <Path
        d="M21.883 3.995h-1.514V.908A.938.938 0 0019.461 0H5.115a2.906 2.906 0 00-2.906 2.906v19.188C2.21 23.7 3.51 25 5.115 25h16.768a.908.908 0 00.908-.908V4.903a.908.908 0 00-.908-.908zm-9.14 9.655l-2.18-1.786a.938.938 0 00-.969 0L7.415 13.65V5.811h5.327v7.84zm5.81-9.655H5.115a1.09 1.09 0 110-2.179h13.438v2.18z"
        fill={selected ? color : "#9E9E9E"}
      />
    </Svg>
  );
}
