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
          marginLeft: -10,
          marginRight: -15,
          paddingRight: -5
        }}
      >
        <TextBold
          style={{
            marginRight: 5,
            fontSize: 14,
            color: this.props.focused ? "#F4663E" : "#000"
            // flex: 1
          }}
        >
          GỬI GIAO HÀNG
        </TextBold>
        <ElBadge
          text={this.props.quality > 9 ? "9" : this.props.quality}
        ></ElBadge>
      </View>
    );
  }
}

const mapState = state => {
  return {
    quality: state.orderDelivery.total
  };
};

export default connect(mapState)(FoodBadge);
