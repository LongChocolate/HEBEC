import * as React from "react";
import Svg, { Path, G, Defs, ClipPath } from "react-native-svg";

export function DefaultAvatar({ size = 104 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 104 104" fill="none">
      <Path
        d="M104 52c0 28.719-23.281 52-52 52S0 80.719 0 52 23.281 0 52 0s52 23.281 52 52z"
        fill="#E0E0E0"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M52 102c27.614 0 50-22.386 50-50S79.614 2 52 2 2 24.386 2 52s22.386 50 50 50zm0 2c28.719 0 52-23.281 52-52S80.719 0 52 0 0 23.281 0 52s23.281 52 52 52z"
        fill="#9E9E9E"
      />
      <G clipPath="url(#prefix__clip0)" fill="#9E9E9E">
        <Path d="M40.857 37.143C40.857 30.989 45.846 26 52 26c6.154 0 11.143 4.989 11.143 11.143v7.428C63.137 50.724 58.15 55.709 52 55.715c-6.152-.006-11.137-4.991-11.143-11.142v-7.43zM60.015 59.525l7.906 2.635A14.72 14.72 0 0178 76.143 1.857 1.857 0 0176.143 78H27.857A1.857 1.857 0 0126 76.143 14.72 14.72 0 0136.079 62.16l7.906-2.635c.189-.063.387-.096.587-.097h14.857c.2.001.397.034.586.097z" />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path d="M26 26h52v52H26V26z" fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
