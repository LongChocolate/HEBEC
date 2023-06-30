import React from "react";
import { View, Text } from "react-native";
import Typography from "./Typography";
import { colors } from "@/styles/theme";

export const SuperScript = ({
  classTitle,
  subClassTitle,
  color = colors.primary,
  bold = false,
  medium = false,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
      }}
    >
      <Typography
        size16
        lineHeight={19}
        center
        bold={bold}
        medium={medium}
        color={color}
      >
        {classTitle}
      </Typography>
      <Typography
        size12
        lineHeight={13}
        center
        bold={bold}
        medium={medium}
        color={color}
      >
        {subClassTitle}
      </Typography>
    </View>
  );
};
