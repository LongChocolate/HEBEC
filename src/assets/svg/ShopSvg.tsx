import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

export function ShopSvg({ size = 23, selected = false }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.497 5.455a.156.156 0 00-.155-.144H2.66a.156.156 0 00-.156.144L1.41 19.825a.156.156 0 00.156.168h7.736l.866.007.006-.007h8.261a.156.156 0 00.156-.168l-1.094-14.37zm-7.323 14.538c.225-.259.444-.517.646-.761.805-.97 4.204-6.451 4.204-6.451s-.435.474-3.385 4.188c-1.066 1.342-1.917 2.316-2.582 3.022l.245.002h.872zM6.115 9.52a1.4 1.4 0 100-2.799 1.4 1.4 0 000 2.799zm9.228-1.4a1.4 1.4 0 11-2.8 0 1.4 1.4 0 012.8 0zm-10.58 8.636c-.464.725-.764 1.913-.948 3.234h1.507c.167-1.22.438-2.322.87-2.992 1.366-2.116 3.352-2.742 4.203-3.01l.174-.056c.718-.237 4.499-1.29 4.499-1.29s.513 3.408-.015 6.221c-.071.384-.154.76-.249 1.127h.483c.1-.392.187-.79.262-1.196.579-3.074.017-6.801.017-6.801s-5.233 1.151-6.018 1.41l-.191.062c-.93.293-3.101.978-4.594 3.291z"
        fill={selected ? "#489620" : "#ffffff"}
      />
      <Path
        d="M13.295 8.134l-.015-3.582a3.252 3.252 0 00-6.504 0l-.023 3.584a.638.638 0 01-1.277-.005v-3.58a4.552 4.552 0 019.104 0v3.58a.642.642 0 01-1.285.003z"
        fill={selected ? "url(#prefix__paint0_linear)" : "#ffffff"}
      />
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={10.028}
          y1={0}
          x2={10.028}
          y2={8.774}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#B1FF5F" />
          <Stop offset={0.318} stopColor="#83C94C" />
          <Stop offset={1} stopColor="#88CD4E" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}
