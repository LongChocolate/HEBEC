import * as React from "react";
import { TouchableOpacity, Image, View, StyleSheet } from "react-native";

import EStyleSheet from "react-native-extended-stylesheet";
import { appStyle } from "@/styles/theme";
import { useState } from "react";
import { boxShadow } from "@/styles/boxShadow";

interface StarRatingReviewProps {
  numberStarActive: number;
  onPress?: (arg: number) => void;
  height?: number;
}

const StarRatingReview = ({
  numberStarActive = 0,
  height = 21,
  onPress
}: StarRatingReviewProps) => {
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
        marginVertical: 20,
        height: height
      }}
    >
      {arr.map((item, index) => {
        return (
          <TouchableOpacity
            style={[styles.imageBackgroundShadow, { height }]}
            key={index.toString()}
            onPress={() => pressStar(index)}
          >
            <View style={styles.imageStar}>
              <Image
                source={
                  index < numberStart
                    ? require("@/assets/images/54_star_yellow.png")
                    : require("@/assets/images/54_star_grey.png")
                }
                style={appStyle.image}
                resizeMode={"cover"}
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default StarRatingReview;

const styles = StyleSheet.create({
  imageStar: {
    height: "100%",
    aspectRatio: 49 / 47
  },
  imageBackgroundShadow: {
    marginRight: 10,
    borderRadius: 15,
    backgroundColor: "#fff",
    aspectRatio: 1 / 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    ...boxShadow("#424C551A", 0, 5, 10)
  }
});
