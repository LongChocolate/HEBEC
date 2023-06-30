import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

export function LogoutSvg({ size = 25 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 25 25" fill="none">
      <G clipPath="url(#prefix__clip0)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.583 14.583a1.041 1.041 0 112.083 0v4.167a3.129 3.129 0 01-3.125 3.125h-3.125v1.041A2.085 2.085 0 018.333 25c-.222 0-.433-.032-.646-.097l-6.268-2.09A2.1 2.1 0 010 20.833V2.083C0 .934.934 0 2.083 0c.03 0 .057.006.085.012.021.004.042.01.064.01a.322.322 0 00.047-.01A.232.232 0 012.344 0H13.54a3.129 3.129 0 013.125 3.125V6.25a1.041 1.041 0 11-2.083 0V3.125c0-.574-.466-1.042-1.042-1.042H8.69l.309.103a2.1 2.1 0 011.418 1.98v15.625h3.125c.575 0 1.042-.467 1.042-1.041v-4.167zm5.945-9.07l4.167 4.167a1.04 1.04 0 010 1.473l-4.167 4.167a1.042 1.042 0 01-1.778-.737v-3.125h-4.167a1.042 1.042 0 010-2.083h4.167V6.25a1.041 1.041 0 011.778-.736z"
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
