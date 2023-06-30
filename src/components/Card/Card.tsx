import React from "react";
import { View, Text, ViewProps } from "react-native";
import { boxShadow } from "@/styles/boxShadow";
import { colors, border } from "@/styles/theme";

interface CardProps extends ViewProps {
  children?: React.ReactNode;
}

export const Card = ({ children, ...props }: CardProps) => {
  return (
    <View
      style={[
        {
          borderRadius: 8,
          backgroundColor: "#fff",
          ...border(1, colors.lightGrey),
        },
        props.style,
      ]}
    >
      {children}
    </View>
  );
};
