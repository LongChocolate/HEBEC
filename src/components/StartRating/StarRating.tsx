import * as React from "react";
import { TouchableOpacity, Image, View } from "react-native";

import EStyleSheet from "react-native-extended-stylesheet";
import { appStyle } from "@/styles/theme";
import { useState } from "react";
import { StarSvg } from "@/assets/svg/StarSvg";
import { StarBorderSvg } from "@/assets/svg/StarBorderSvg";

interface StarRatingProps {
  numberStarActive: number;
  onPress?: (arg: any) => void;
  height?: number;
  disableButton?: boolean;
}

export const StarRating = ({
  numberStarActive = 5,
  height = 21,
  onPress,
  disableButton,
}: StarRatingProps) => {
  const arr = ["", "", "", "", ""];
  const [numberStart, setNumberStart] = useState(numberStarActive);

  const pressStar = (index: number) => {
    setNumberStart(index + 1);
    if (onPress) {
      onPress(index + 1);
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
        height: height,
      }}
    >
      {arr.map((item, index) => {
        return (
          <TouchableOpacity
            style={styles.imageStar}
            key={index.toString()}
            onPress={() => pressStar(index)}
            disabled={disableButton}
          >
            {index < numberStart ? <StarSvg /> : <StarBorderSvg />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = EStyleSheet.create({
  imageStar: {
    height: "100%",
    marginRight: "4rem",
  },
});
