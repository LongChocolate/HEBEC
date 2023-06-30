import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

export function PasswordSvg({ size = 25 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 25 25" fill="none">
      <G clipPath="url(#prefix__clip0)">
        <Path
          d="M22.645 2.355c-3.141-3.141-8.252-3.141-11.394 0a8.054 8.054 0 00-1.962 8.177L.216 19.605a.732.732 0 00-.215.518v4.144c0 .405.328.732.733.732h4.143c.195 0 .38-.077.518-.215l1.036-1.036a.732.732 0 00.21-.602l-.13-1.113 1.543-.145a.731.731 0 00.66-.66l.145-1.543 1.113.13a.734.734 0 00.817-.727v-1.364h1.339c.194 0 .38-.078.518-.215l1.878-1.853c2.868.93 5.975.24 8.121-1.907 3.142-3.141 3.142-8.253 0-11.394zm-2.072 5.18a2.2 2.2 0 01-3.107 0 2.199 2.199 0 010-3.108 2.2 2.2 0 013.107 0 2.2 2.2 0 010 3.107z"
          fill="#489620"
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
