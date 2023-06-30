import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

export function NewsFeedSvg({ size = 25, selected = false }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 25 24" fill="none">
      <G clipPath="url(#prefix__clip0)" fill={selected ? "#fff" : "#1F5622"}>
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.9.471l2.333 2.624c.228.257.354.59.354.933v19.936H2.204A1.404 1.404 0 01.8 22.56V1.404C.8.63 1.429 0 2.204 0h14.647c.401 0 .783.172 1.05.471zM9.755 5.357H5.191a.702.702 0 000 1.404h4.563a.702.702 0 000-1.404zm-4.563 13.92h10.49a.702.702 0 000-1.405H5.191a.702.702 0 100 1.404zm0-2.924h10.49a.702.702 0 000-1.404H5.191a.702.702 0 100 1.404zm0-2.924h10.49a.702.702 0 000-1.404H5.191a.702.702 0 000 1.404z"
        />
        <Path d="M21.997 7.345h1.399c.775 0 1.404.63 1.404 1.404V21.4a2.564 2.564 0 01-2.564 2.565h-.24V7.345z" />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path d="M.8 0h24v24H.8V0z" fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
