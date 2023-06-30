import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

export function DashboardSvg({ size = 23, selected = false }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 23 23" fill="none">
      <G clipPath="url(#prefix__clip0)" fill={selected ? "#489620" : "#9E9E9E"}>
        <Path d="M1.677 0h7.188c.924 0 1.677.752 1.677 1.677V5.99c0 .924-.753 1.677-1.677 1.677H1.677A1.679 1.679 0 010 5.99V1.677C0 .752.752 0 1.677 0zM1.677 9.583h7.188c.924 0 1.677.752 1.677 1.678v10.062c0 .925-.753 1.677-1.677 1.677H1.677A1.679 1.679 0 010 21.323V11.26c0-.925.752-1.677 1.677-1.677zM21.323 15.333h-7.188c-.924 0-1.677.752-1.677 1.678v4.312c0 .925.753 1.677 1.678 1.677h7.187c.925 0 1.677-.752 1.677-1.677V17.01c0-.925-.752-1.677-1.677-1.677zM14.136 0h7.187C22.248 0 23 .752 23 1.677v10.062c0 .925-.752 1.678-1.677 1.678h-7.188a1.679 1.679 0 01-1.677-1.678V1.678c0-.925.753-1.677 1.678-1.677z" />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path d="M0 0h23v23H0V0z" fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
