import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

export function SealsSvg({ size = 40, selected = false }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <G clipPath="url(#prefix__clip0)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M37.69 16.231a44.454 44.454 0 01-4.992 8.022c-4.513 5.58-9.755 9.733-16.35 9.068C10.18 32.7 1.167 28.885 0 28.406a53.079 53.079 0 019.58-6.18c2.518-1.09 8.066-.818 12.665-.73 4.6.087 10.507-1.472 13.363-3.412a10.442 10.442 0 002.027-1.842l.054-.01zM.98 26.27C3.314 21.746 9.135 11.174 13.745 8.58a18.147 18.147 0 0113.079-1.624C28.5 7.25 38.463 10.073 40 10.509a12.312 12.312 0 00-1.439 1.864c-4.85 7.76-12.261 7.292-24.174 7.52-5.591.11-10.158 3.172-13.406 6.376z"
          fill={selected ? "#489620" : "#9E9E9E"}
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path d="M0 0h40v40H0V0z" fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
