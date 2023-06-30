import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

export function BooksSvg({ size = 25, color = "#489620" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 25 25" fill="none">
      <G clipPath="url(#prefix__clip0)">
        <Path
          d="M0 20.363a2.848 2.848 0 002.845 2.845H23.42v-1.264h-1.317v-3.161h1.317v-.554H25v-1.264h-.948v-3.161H25v-1.265h-1.027v-1.08l-1.561-2.924h1.64v-1.7L19.926 1.79H5.369L1.615 7.706a2.83 2.83 0 00-1.062 2.2 2.847 2.847 0 002.818 2.841 2.846 2.846 0 00-1.79 2.637c0 .868.399 1.637 1.014 2.16A2.84 2.84 0 000 20.363zM1.818 9.905c0-.59.328-1.099.807-1.37H21.47v2.95H3.398c-.871 0-1.58-.708-1.58-1.58zm2.608 3.899h18.361v3.16H4.426c-.872 0-1.58-.708-1.58-1.58 0-.871.708-1.58 1.58-1.58zm-1.58 4.979h17.992v3.16H2.845c-.871 0-1.58-.708-1.58-1.58 0-.872.709-1.58 1.58-1.58z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path d="M0 0h25v25H0V0z" fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
