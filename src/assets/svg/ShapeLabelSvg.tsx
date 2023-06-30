import * as React from "react";
import Svg, {
  G,
  Path,
  Circle,
  Defs,
  ClipPath,
  LinearGradient,
  Stop,
} from "react-native-svg";

export function ShapeLabelSvg({ size = 24 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <G clipPath="url(#prefix__clip0)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M.462 17.746c.275.569.61 1.107.998 1.605.903 1.116 1.951 1.946 3.27 1.813 1.234-.124 3.037-.887 3.27-.983a10.62 10.62 0 00-1.916-1.236c-.504-.218-1.613-.163-2.533-.146-.92.018-2.101-.294-2.673-.682a2.085 2.085 0 01-.405-.369l-.01-.002zm7.342 2.008c-.467-.905-1.63-3.02-2.553-3.538a3.63 3.63 0 00-2.616-.325c-.335.059-2.328.624-2.635.71.108.116.204.24.288.373.97 1.552 2.452 1.459 4.835 1.505 1.118.021 2.031.634 2.68 1.275z"
          fill="#489620"
        />
      </G>
      <G clipPath="url(#prefix__clip1)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M23.538 17.746a8.896 8.896 0 01-.998 1.605c-.903 1.116-1.951 1.946-3.27 1.813-1.234-.124-3.037-.887-3.27-.983.593-.48 1.235-.894 1.916-1.236.504-.218 1.613-.163 2.533-.146.92.018 2.101-.294 2.672-.682.151-.105.288-.229.406-.369l.01-.002zm-7.342 2.008c.467-.905 1.63-3.02 2.553-3.538a3.63 3.63 0 012.616-.325c.335.059 2.328.624 2.635.71-.108.116-.204.24-.288.373-.97 1.552-2.452 1.459-4.835 1.505-1.118.021-2.031.634-2.68 1.275z"
          fill="#489620"
        />
      </G>
      <Circle cx={12} cy={11.5} r={10} fill="url(#prefix__paint0_linear)" />
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path
            fill="#fff"
            transform="matrix(-1 0 0 1 8 14.5)"
            d="M0 0h8v8H0z"
          />
        </ClipPath>
        <ClipPath id="prefix__clip1">
          <Path fill="#fff" transform="translate(16 14.5)" d="M0 0h8v8H0z" />
        </ClipPath>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={12}
          y1={1.5}
          x2={12}
          y2={21.5}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#489620" />
          <Stop offset={1} stopColor="#2E7D32" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}
