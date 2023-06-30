import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

export function NewsSvg({ size = 24, selected = false }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 23" fill="none">
      <G clipPath="url(#prefix__clip0)" fill={selected ? "#489620" : "#9E9E9E"}>
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.888.469l2.235 2.514c.219.247.34.565.34.894v19.105H1.846A1.346 1.346 0 01.5 21.638V1.363C.5.62 1.102.017 1.846.017h14.036c.385 0 .75.165 1.006.452zM9.081 5.15H4.708a.673.673 0 100 1.346h4.373a.673.673 0 000-1.346zm-4.373 13.34h10.053a.673.673 0 000-1.346H4.708a.673.673 0 000 1.345zm0-2.802h10.053a.673.673 0 000-1.346H4.708a.673.673 0 000 1.346zm0-2.802h10.053a.673.673 0 100-1.346H4.708a.673.673 0 000 1.346z"
        />
        <Path d="M20.813 7.056h1.341c.744 0 1.346.603 1.346 1.346v12.123c0 1.357-1.1 2.458-2.457 2.458h-.23V7.056z" />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path d="M.5 0h23v23H.5V0z" fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
