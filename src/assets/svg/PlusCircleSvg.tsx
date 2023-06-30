import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

export function PlusCircleSvg({ size = 20 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Circle
        cx={10}
        cy={10}
        r={9}
        fill="#489620"
        stroke="#489620"
        strokeWidth={2}
      />
      <Path
        d="M14.318 9.09H10.91V5.683A.682.682 0 0010.227 5h-.454a.682.682 0 00-.682.682V9.09H5.68A.682.682 0 005 9.773v.454c0 .377.305.682.682.682H9.09v3.41c0 .375.305.681.682.681h.454a.682.682 0 00.682-.682V10.91h3.41a.682.682 0 00.681-.682v-.454a.682.682 0 00-.682-.682z"
        fill="#fff"
      />
    </Svg>
  );
}
