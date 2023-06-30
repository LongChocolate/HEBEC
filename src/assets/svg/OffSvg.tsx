import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function OffSvg({ size = 20, selected = false, color = "#1F5622" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.556 3.542C5.556 4.346 6.253 5 7.11 5h5.778c.858 0 1.555-.654 1.555-1.458v-1.25c0-.345-.298-.625-.666-.625h-1.426C12.06.706 11.117 0 10 0 8.883 0 7.94.706 7.648 1.667H6.222c-.368 0-.666.28-.666.625v1.25zM15.333 2.5h.223C16.904 2.5 18 3.527 18 4.792v12.916C18 18.973 16.904 20 15.556 20H4.444C3.096 20 2 18.973 2 17.708V4.792C2 3.528 3.096 2.5 4.444 2.5h.223v1.042c0 1.264 1.096 2.291 2.444 2.291h5.778c1.348 0 2.444-1.027 2.444-2.291V2.5zm-10 15h9.334c.368 0 .666-.28.666-.625s-.298-.625-.666-.625H5.333c-.368 0-.666.28-.666.625s.298.625.666.625zm0-2.5h9.334c.368 0 .666-.28.666-.625s-.298-.625-.666-.625H5.333c-.368 0-.666.28-.666.625s.298.625.666.625zm0-2.5h9.334c.368 0 .666-.28.666-.625s-.298-.625-.666-.625H5.333c-.368 0-.666.28-.666.625s.298.625.666.625zm0-2.5h9.334c.368 0 .666-.28.666-.625s-.298-.625-.666-.625H5.333c-.368 0-.666.28-.666.625s.298.625.666.625z"
        fill={selected ? "#fff" : color}
      />
    </Svg>
  );
}
