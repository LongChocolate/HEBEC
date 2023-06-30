import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function NopBaiTapSvg({ size = 25, selected = false }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 25 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.734 19.734V0H9.187v5.625H4.266v14.11h15.468zM12 4.22h4.219v1.406H12V4.219zm5.625 2.812v1.407H6.375V7.03h11.25zm0 2.813v1.406H6.375V9.844h11.25zm0 2.812v1.406H6.375v-1.406h11.25zm-11.25 2.86h4.219v1.406H6.375v-1.406z"
        fill={selected ? "#fff" : "#1F5622"}
      />
      <Path
        d="M4.678 4.219H7.78V1.115L4.678 4.219zM2.86 16.922H.75v2.812h2.11v-2.812zM21.14 16.922h2.11v2.812h-2.11v-2.812zM23.25 24v-2.86H.75V24h22.5z"
        fill={selected ? "#fff" : "#1F5622"}
      />
    </Svg>
  );
}
