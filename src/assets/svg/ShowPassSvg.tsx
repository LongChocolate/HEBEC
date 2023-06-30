import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

export function ShowPassSvg({ size = 20, showPass = false }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      {showPass ? (
        <G clipPath="url(#prefix__clip0)">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 9.818C1.573 5.828 5.455 3 10 3c4.55 0 8.427 2.827 10 6.818-1.573 3.991-5.45 6.818-10 6.818-4.545 0-8.427-2.827-10-6.818zm5.455 0A4.547 4.547 0 0010 14.364a4.547 4.547 0 004.546-4.546A4.547 4.547 0 0010 5.273a4.547 4.547 0 00-4.545 4.545zm1.818 0A2.73 2.73 0 0110 7.091a2.73 2.73 0 012.727 2.727A2.73 2.73 0 0110 12.546a2.73 2.73 0 01-2.727-2.728z"
            fill="#489620"
          />
        </G>
      ) : (
        <G clipPath="url(#prefix__clip0)">
          <G clipPath="url(#prefix__clip1)">
            <Path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.732 1L13 0l-1.772 3.07C10.825 3.023 10.415 3 10 3 5.455 3 1.573 5.827 0 9.818a10.809 10.809 0 004.33 5.199L3 17.32l1.732 1 10-17.32zm-8.69 11.053l1.233-2.136a2.729 2.729 0 011.448-2.508l1.233-2.136a4.547 4.547 0 00-3.915 6.78zm6.425-3.398l-2.24 3.881a2.73 2.73 0 002.24-3.88zM10 14.364c-.27 0-.533-.024-.79-.069l-1.24 2.15c.657.125 1.336.191 2.03.191 4.55 0 8.427-2.827 10-6.818a10.804 10.804 0 00-4.985-5.577l-1.533 2.656A4.547 4.547 0 0110 14.363z"
              fill="#489620"
            />
          </G>
        </G>
      )}

      <Defs>
        <ClipPath id="prefix__clip0">
          <Path d="M0 0h20v20H0V0z" fill="#fff" />
        </ClipPath>
        <ClipPath id="prefix__clip1">
          <Path fill="#fff" d="M0-1h20v20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
