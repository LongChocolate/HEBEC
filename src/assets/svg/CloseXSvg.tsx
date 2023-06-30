import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function CloseXSvg({ size = 15, color = "#231F20" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 15 15" fill="none">
      <Path
        d="M.408 14.592c.272.272.629.408.985.408.357 0 .713-.136.985-.408L7.5 9.47l5.122 5.122c.272.272.628.408.985.408a1.393 1.393 0 00.985-2.378L9.47 7.5l5.122-5.122a1.393 1.393 0 10-1.97-1.97L7.5 5.53 2.378.408a1.393 1.393 0 10-1.97 1.97L5.53 7.5.408 12.622a1.393 1.393 0 000 1.97z"
        fill={color}
      />
    </Svg>
  );
}
