import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function TimeSvg({ size = 20 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 0C4.477 0 0 4.477 0 10c0 5.522 4.477 10 10 10 5.522 0 10-4.478 10-10 0-5.523-4.478-10-10-10zm4.323 11.902h-4.24c-.014 0-.027-.004-.042-.004-.014 0-.027.004-.041.004a.692.692 0 01-.692-.692V4.15a.692.692 0 011.383 0v6.368h3.631a.692.692 0 010 1.384z"
        fill="#489620"
      />
    </Svg>
  );
}
