import React, { Component } from "react";
import { View, Text } from "react-native";
import ElBadge from "./Badge";

import TextBold from "@/components/Text/TextBold";

interface FoodBadgeProps {
  quality?: string | number;
  focused: boolean;
}

class FoodBadge extends Component<FoodBadgeProps> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingLeft: -10
        }}
      >
        <TextBold
          style={{
            marginRight: 5,
            fontSize: 14,
            color: this.props.focused ? "#F4663E" : "#000"
          }}
        >
          XE ÔM
        </TextBold>
        <ElBadge
          text={this.props.quality > 9 ? "9" : this.props.quality}
        ></ElBadge>
      </View>
    );
  }
}

const mapState = state => ({
  quality: state.orderTransport.total
});

export default connect(mapState)(FoodBadge);
