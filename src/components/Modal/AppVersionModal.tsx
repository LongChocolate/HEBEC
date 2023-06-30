import React, { Component, useState } from "react";
import {
  View,
  TouchableOpacity,
  Keyboard,
  TextInput,
  Modal,
  Platform,
} from "react-native";
import Typography from "../Text/Typography";
import { colors } from "@/styles/theme";
import { boxShadow } from "@/styles/boxShadow";
import AwesomeAlert from "react-native-awesome-alerts";
import { SCREEN_WIDTH } from "@/styles/dimensions";
import { RowView } from "../View/RowView";
import Button from "../Button/MyButton";
import { Linking } from "expo";

interface AlertState {
  modalVisible?: boolean;
}

export class AppVersionModal extends Component<any, AlertState> {
  static appVersionInstance: AppVersionModal;
  closeTimeout: NodeJS.Timeout;
  static show() {
    this.appVersionInstance.show();
  }
  static hide() {
    this.appVersionInstance.hide();
  }

  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
    };
  }

  getModalState() {
    return this.state.modalVisible;
  }

  show() {
    this.setState({
      modalVisible: true,
    });
  }

  onPress = () => {
    if (Platform.OS === "android") {
      Linking.canOpenURL(`market://details?id=${1}`)
        .then(() => {
          Linking.openURL(`market://details?id=${1}`);
        })
        .catch();
    } else if (Platform.OS === "ios") {
      Linking.canOpenURL(`itms-apps://apps.apple.com/app/${1}`)
        .then(() =>
          Linking.openURL(`itms-apps://apps.apple.com/app/id1485216306`)
        )
        .catch();
    }
  };

  hide = () => {
    this.setState({
      modalVisible: false,
    });
  };

  render() {
    if (!this.state.modalVisible) {
      return null;
    }
    return (
      <Modal animationType="fade" transparent={true}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
        >
          <View
            style={{
              alignItems: "center",
              backgroundColor: "#fff",
              borderRadius: 10,
              padding: 15,
            }}
          >
            <Typography>Your version is outdated !</Typography>
            <Button title={"Redirect to the store"} onPress={this.onPress} />
          </View>
        </View>
      </Modal>
    );
  }
}
