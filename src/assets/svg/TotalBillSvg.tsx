import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

function SvgComponent({ size = 24, color = "#fff" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <G clipPath="url(#prefix__clip0)">
        <Path
          d="M20.538.617a1.005 1.005 0 00-1.094.166L17.87 2.177a.112.112 0 01-.15 0L15.577.26a1.02 1.02 0 00-1.361 0l-2.14 1.915a.113.113 0 01-.152 0L9.784.26a1.02 1.02 0 00-1.362 0L6.28 2.177a.113.113 0 01-.15 0L4.553.783a1.013 1.013 0 00-1.687.765v20.904a1.015 1.015 0 001.69.765l1.574-1.394a.113.113 0 01.15 0l2.142 1.917a1.02 1.02 0 001.362 0l2.14-1.915a.113.113 0 01.152 0l2.14 1.915a1.02 1.02 0 001.362 0l2.143-1.916a.113.113 0 01.15 0l1.577 1.393a1.013 1.013 0 001.686-.765V1.548a1.004 1.004 0 00-.596-.931zM6.622 8.142h5.65a.454.454 0 010 .908h-5.65a.454.454 0 010-.908zm10.756 7.716H6.622a.454.454 0 010-.908h10.756a.454.454 0 010 .908zm0-3.404H6.622a.454.454 0 010-.908h10.756a.454.454 0 010 .908z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" d="M0 0h24v24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

const TotalBillSvg = React.memo(SvgComponent);
export { TotalBillSvg };
