import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent({ size = 24, color = "#171C1B" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.81 2h8.38C19.83 2 22 4.17 22 7.81V16.19c0 3.64-2.17 5.81-5.81 5.81H7.81c-2.55 0-4.39-1.07-5.25-2.97-.37-.8-.56-1.75-.56-2.84V7.81C2 4.17 4.17 2 7.81 2zm9.74 10.5c.78-.67 2.04-.67 2.82 0l.13.11v-4.8c0-2.82-1.49-4.31-4.31-4.31H7.81C4.99 3.5 3.5 4.99 3.5 7.81v8.38c0 .76.13 1.41.35 1.97l3.74-2.51c.8-.54 1.93-.48 2.64.14l.34.28c.78.67 2.04.67 2.82 0l4.16-3.57zM9 10.38a2.38 2.38 0 100-4.76 2.38 2.38 0 000 4.76z"
        fill={color}
      />
    </Svg>
  );
}

const AddPhotoSvg = React.memo(SvgComponent);
export { AddPhotoSvg };
