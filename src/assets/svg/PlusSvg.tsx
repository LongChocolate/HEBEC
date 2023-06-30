import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

export function PlusSvg({ size = 20 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M18.636 8.182h-6.818V1.364C11.818.61 11.208 0 10.454 0h-.909c-.752 0-1.363.61-1.363 1.364v6.818H1.364C.61 8.182 0 8.792 0 9.545v.91c0 .752.61 1.363 1.364 1.363h6.818v6.818c0 .753.61 1.364 1.363 1.364h.91c.752 0 1.363-.61 1.363-1.364v-6.818h6.818c.753 0 1.364-.61 1.364-1.364v-.909c0-.752-.61-1.363-1.364-1.363z"
        fill="#fff"
      />
    </Svg>
  );
}
