import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function LocationSvg({ size = 25 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 25 25" fill="none">
      <Path
        d="M12.5 0C7.33 0 3.125 4.205 3.125 9.375c0 6.498 8.463 15.036 8.822 15.397a.785.785 0 001.106 0c.36-.361 8.822-8.899 8.822-15.397C21.875 4.205 17.67 0 12.5 0z"
        fill="#489620"
      />
      <Path
        d="M12.5 14.063a4.688 4.688 0 100-9.376 4.688 4.688 0 000 9.375z"
        fill="#fff"
      />
    </Svg>
  );
}
