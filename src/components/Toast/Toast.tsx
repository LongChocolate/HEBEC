/* eslint-disable class-methods-use-this */
import React, { Component } from "react";
import {
  Keyboard,
  Platform,
  Animated,
  View,
} from "react-native";
import Typography from "../Text/Typography";
import { colors } from "@/styles/theme";
import { RowView } from "../View/RowView";
import { CheckSvg } from "@/assets/svg/CheckSvg";
import { boxShadow } from "@/styles/boxShadow";

const POSITION = {
  ABSOLUTE: "absolute",
  BOTTOM: "bottom",
  TOP: "top",
};

interface ToastConfigure {
  text: string;
  buttonText?: string;
  type?: string;
  duration?: number;
  position?: string;
  iconLeft?: React.ReactNode;
}

interface Props {}

interface State {
  fadeAnim: Animated.Value;
  keyboardHeight: number;
  isKeyboardVisible: boolean;
  modalVisible: boolean;
  position?: string;
  text?: string;
  buttonText?: string;
  type?: string;
  iconLeft?: React.ReactNode;
}

export class Toast extends Component<Props, State> {
  static toastInstance: Toast;
  closeTimeout: NodeJS.Timeout;

  static show(config: ToastConfigure) {
    this.toastInstance.showToast(config);
  }
  static hide() {
    if (this.toastInstance.getModalState()) {
      this.toastInstance.closeToast();
    }
  }

  constructor(props: Props) {
    super(props);

    this.state = {
      fadeAnim: new Animated.Value(0),
      keyboardHeight: 0,
      isKeyboardVisible: false,
      modalVisible: false,
    };

    this.keyboardDidHide = this.keyboardDidHide.bind(this);
    this.keyboardDidShow = this.keyboardDidShow.bind(this);
  }

  componentDidMount() {
    Keyboard.addListener("keyboardDidShow", this.keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", this.keyboardDidHide);
  }

  getToastStyle() {
    return {
      position: POSITION.ABSOLUTE,
      opacity: this.state.fadeAnim,
      width: "100%",
      elevation: 9,
      paddingHorizontal: Platform.OS === "ios" ? 20 : 0,
      top: this.state.position === POSITION.TOP ? 30 : undefined,
      bottom:
        this.state.position === POSITION.BOTTOM ? this.getTop() : undefined,
    };
  }

  getTop() {
    if (Platform.OS === "ios") {
      if (this.state.isKeyboardVisible) {
        return this.state.keyboardHeight;
      }
      return 30;
    }
    return 20;
  }

  getButtonText(buttonText) {
    if (buttonText) {
      if (buttonText.trim().length === 0) {
        return undefined;
      }
      return buttonText;
    }
    return undefined;
  }
  getModalState() {
    return this.state.modalVisible;
  }

  keyboardDidHide() {
    this.setState({
      keyboardHeight: 0,
      isKeyboardVisible: false,
    });
  }

  keyboardDidShow(e) {
    this.setState({
      keyboardHeight: e.endCoordinates.height,
      isKeyboardVisible: true,
    });
  }

  showToast(config: ToastConfigure) {
    this.setState({
      modalVisible: true,
      text: config.text,
      buttonText: this.getButtonText(config.buttonText),
      type: config.type,
      position: config.position ? config.position : POSITION.BOTTOM,
      iconLeft: config.iconLeft || <CheckSvg />,
    });
    // If we have a toast already open, cut off its close timeout so that it won't affect *this* toast.
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
    }
    // Set the toast to close after the duration.
    if (config.duration !== 0) {
      const duration = config.duration > 0 ? config.duration : 1500;
      this.closeTimeout = setTimeout(this.closeToast, duration);
    }
    // Fade the toast in now.
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }

  closeModal = () => {
    this.setState({
      modalVisible: false,
    });
  };

  closeToast = () => {
    clearTimeout(this.closeTimeout);
    Animated.timing(this.state.fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start(this.closeModal);
  };

  render() {
    if (this.state.modalVisible) {
      return (
        <Animated.View style={this.getToastStyle()}>
          <View
            style={{
              backgroundColor: colors.white,
              borderWidth: 1,
              borderColor: colors.primary,
              paddingVertical: 10,
              paddingHorizontal: 25,
              borderRadius: 25,
              ...boxShadow("rgba(0, 0, 0, 0.2)", 0, 2, 6),
              alignSelf: "center",
            }}
          >
            <RowView>
              {this.state.iconLeft}
              <Typography medium primary style={{ marginLeft: 20 }}>
                {this.state.text}
              </Typography>
            </RowView>
          </View>
        </Animated.View>
      );
    }
    return null;
  }
}
