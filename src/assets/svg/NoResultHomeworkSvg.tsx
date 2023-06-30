import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

export function NoResultHomeworkSvg({ size = 100 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <G clipPath="url(#prefix__clip0)">
        <G clipPath="url(#prefix__clip1)">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M90.278 29.452a111.143 111.143 0 01-6.864 22.601C76.128 68.45 66.156 81.87 49.802 84.53c-15.299 2.491-39.533-.888-42.66-1.292A132.696 132.696 0 0126.28 62.116c5.374-4.261 18.947-7.193 30.11-9.958 11.163-2.766 24.42-10.352 30.06-16.884a26.104 26.104 0 003.704-5.76l.125-.062zM8.128 77.445c2.707-12.432 9.92-41.728 19.375-50.975a45.368 45.368 0 0130.533-12.384c4.243-.376 30.126-.005 34.119.054a30.792 30.792 0 00-2.268 5.431c-6.691 21.878-24.892 25.542-53.51 33.803-13.432 3.88-22.478 14.231-28.248 24.07z"
            fill="#fff"
          />
        </G>
        <Path
          d="M52.412 0h3.156v6.313h-3.156V0zM47.677 10.259h-6.313v3.156h6.313V10.26zM65.827 10.259h-6.313v3.156h6.313V10.26z"
          fill="#A4AFC1"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M85.382 38.936a4.74 4.74 0 004.735 4.735 4.74 4.74 0 004.735-4.735 4.74 4.74 0 00-4.735-4.735 4.74 4.74 0 00-4.735 4.735zm3.156 0a1.579 1.579 0 113.156.001 1.579 1.579 0 01-3.156 0z"
          fill="#A4AFC1"
        />
        <Path
          d="M61.82 24.273A5.28 5.28 0 0056.547 19a5.28 5.28 0 00-5.274 5.273v12.422H61.82V24.273zM33.695 54.273h3.516v7.032h-3.516v-7.032z"
          fill="#9E9E9E"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M44.242 29.664h-21.21V71.97h21.21V29.664zM40.727 64.82H30.18V50.758h10.547V64.82zm0-17.578H30.18v-3.515h10.547v3.515zm0-7.031H30.18v-3.516h10.547v3.516z"
          fill="#9E9E9E"
        />
        <Path
          d="M19.516 75.484h24.726V79H16V33.18h3.516v42.304zM76 33.18h-3.516v42.304H47.758V79H76V33.18z"
          fill="#9E9E9E"
        />
        <Path
          d="M47.758 71.969V52.27l3.515 5.625v6.925H61.82v-6.925l3.516-5.625V29.664h3.633V71.97H47.758z"
          fill="#9E9E9E"
        />
        <Path
          d="M54.79 56.887l-3.517-5.624V40.21H61.82v11.052l-3.515 5.624v4.418h-3.516v-4.418z"
          fill="#9E9E9E"
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" d="M0 0h100v100H0z" />
        </ClipPath>
        <ClipPath id="prefix__clip1">
          <Path fill="#fff" transform="rotate(-15 50 50)" d="M0 0h100v100H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
