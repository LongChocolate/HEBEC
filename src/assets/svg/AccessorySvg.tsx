import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function AccessorySvg({ size = 15 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 15 15" fill="none">
      <Path
        d="M8.445 7.503L2.833 1.891a.813.813 0 01-.24-.58c0-.22.086-.425.24-.58L3.325.24a.814.814 0 01.58-.24c.22 0 .426.085.58.24l6.682 6.681c.155.155.24.362.239.582a.813.813 0 01-.24.582L4.493 14.76a.814.814 0 01-.58.24.814.814 0 01-.58-.24l-.492-.491a.822.822 0 010-1.16l5.605-5.606z"
        fill="#BEBEC0"
      />
    </Svg>
  );
}
