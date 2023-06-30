import { Badge } from "native-base";
import { Text } from "react-native";
import React from "react";
import TextBold from "@/components/Text/TextBold";
interface Props {
  text: string | Number;
}

const ElBadge = ({ text }: Props) => {
  return (
    <Badge
      style={{
        borderRadius: 5,
        backgroundColor: "#D74545",
        width: 20,
        height: 20
      }}
    >
      <TextBold style={{ color: "white", textAlign: "center", fontSize: 10 }}>
        {text}
      </TextBold>
    </Badge>
  );
};

export default ElBadge;
