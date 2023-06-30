import * as React from "react";
import { Text, View, StyleSheet, ViewStyle, StyleProp } from "react-native";
import Typography from "../Text/Typography";
import { colors } from "@/styles/theme";

interface CardHeaderProps {
  title: string;
  style?: StyleProp<ViewStyle>;
}

const CardHeader = ({ title, style }: CardHeaderProps) => {
  return (
    <View style={[{ flexDirection: "row", alignItems: "center" }, style]}>
      <View
        style={{
          backgroundColor: colors.primary,
          width: 3,
          height: "60%",
          marginRight: 10
        }}
      ></View>
      <Typography bold size={17} lineHeight={22} black>
        {title}
      </Typography>
    </View>
  );
};

export default CardHeader;
