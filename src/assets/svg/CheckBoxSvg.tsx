import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";

export function CheckBoxSvg({ size = 16, isCheck = false }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      {isCheck ? (
        <>
          <Rect width={16} height={16} rx={2} fill="#489620" />
          <Path
            d="M12.736 6.538L7.99 11.285a.9.9 0 01-1.274 0L4.264 8.834A.9.9 0 015.537 7.56l1.815 1.814 4.11-4.11a.9.9 0 011.274 1.274z"
            fill="#fff"
          />
        </>
      ) : (
        <Rect
          x={0.5}
          y={0.5}
          width={15}
          height={15}
          rx={1.5}
          stroke="#9E9E9E"
        />
      )}
    </Svg>
  );
}
