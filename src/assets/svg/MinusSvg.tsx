import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

export function MinusSvg({ size = 20 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Circle cx={10} cy={10} r={10} fill="#489620" />
      <Path
        d="M5.682 9h8.636c.377 0 .682.305.682.682v.454a.682.682 0 01-.682.682H5.682A.682.682 0 015 10.136v-.454C5 9.305 5.305 9 5.682 9z"
        fill="#fff"
      />
    </Svg>
  );
}
