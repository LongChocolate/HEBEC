import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

export function FilterSvg({ size = 24, color = "#fff" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <G clipPath="url(#prefix__clip0)">
        <Path
          d="M22.71 0H1.313C.936 0 .59.21.417.546c-.175.34-.144.75.08 1.06L8.334 12.65l.008.012c.285.384.44.85.44 1.329v9.002a1.002 1.002 0 001.396.929l4.404-1.68c.395-.12.657-.493.657-.94V13.99c0-.48.155-.945.44-1.33l.007-.01 7.84-11.044c.223-.31.253-.72.079-1.06A1.004 1.004 0 0022.71 0z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path d="M0 0h24v24H0V0z" fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
