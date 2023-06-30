import React from "react";

import {
  View,
  StyleProp,
  ViewStyle,
  Platform,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Container, Button, Box, StatusBar } from "native-base";

import { observer } from "mobx-react";
import { BackSvg } from "@/assets/svg/BackSvg";
import { colors } from "@/styles/theme";
import Loading from "../Loading/Loading";
import Constants from "expo-constants";
import Typography from "../Text/Typography";
import { CartSvg } from "@/assets/svg/CartSvg";
import { SearchBar } from "../Input/SearchBar";
import { FilterSvg } from "@/assets/svg/FilterSvg";
import { Navigation } from "@/utils/Navigation";
import { NavigationScreens } from "@/utils/enum";
import { orderStore } from "@/store/orderStore";
import { PlusSvg } from "@/assets/svg/PlusSvg";
import { SendSvg } from "@/assets/svg/SendSvg";
import { Edge, SafeAreaView } from "react-native-safe-area-context";
import OptimizedHeavyScreen from "react-navigation-heavy-screen/src/heavy-screen";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/styles/dimensions";
import { BaseHeader, HeaderProps } from "../Header/BaseHeader";
import { KeyboardAccessoryView } from "react-native-keyboard-accessory";

export enum LEFT_DISPLAY {
  "backBtn" = "BACK_BTN",
  "custom" = "CUSTOM",
}

export enum RIGHT_DISPLAY {
  "cart" = "CART",
  "filter" = "FILTER",
  "add" = "ADD",
  "send" = "SEND",
  "edit" = "EDIT",
}

export enum StatusBarStyle {
  "light" = "light-content",
  "dark" = "dark-content",
}

export enum BorderStyle {
  "dashed" = "DASHED",
  "solid" = "SOLID",
}

interface IAppProps extends HeaderProps {
  children: any;
  style?: StyleProp<ViewStyle>;
  headerTitle?: string;
  leftDisplay?: string;
  rightDisplay?: string;
  containerStyle?: StyleProp<ViewStyle>;
  scrollEnabled?: boolean;
  onPressLeft?: Function;
  onPressRight?: Function;
  ComponentTitleLeft?: React.ReactNode;
  componentHeaderTitle?: React.ReactNode;
  topTabComponent?: React.ReactNode;
  enableKeyboardAware?: boolean;
  enableResetScrollToCoords?: boolean;
  resetScrollToCoords?: { x: number; y: number };
  edges?: Edge[];
  hideHeader?: boolean;
}

const Screen = observer(
  ({
    style,
    containerStyle,
    children,
    scrollEnabled = true,
    topTabComponent,
    enableKeyboardAware = true,
    enableResetScrollToCoords = false,
    resetScrollToCoords,
    edges = ["left", "right"], //cạnh safearea
    ...props
  }: IAppProps) => {
    return (
      <Box style={[{ flexGrow: 1, backgroundColor: "trarnsparent" }, style]}>
        {!props.hideHeader ? (
          <BaseHeader headerColor={colors.primary} {...{ ...props }} />
        ) : (
          <>
            <Box safeAreaTop backgroundColor={colors.primary} />
            <StatusBar
              backgroundColor={props.headerColor}
              barStyle={props.barStyle}
            />
          </>
        )}

        {topTabComponent}

        <OptimizedHeavyScreen style={{ flex: 1 }} placeHolder={PlaceholderView}>
          <SafeAreaView edges={edges} style={{ flex: 1 }}>
            {enableKeyboardAware ? (
              <>
                <ScrollView
                  style={{ flex: 1 }}
                  scrollEnabled={scrollEnabled}
                  nestedScrollEnabled
                  contentContainerStyle={[containerStyle]}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  // bounces={false}
                  keyboardShouldPersistTaps="handled"
                >
                  {children}
                </ScrollView>
                <KeyboardAccessoryView
                  avoidKeyboard
                  androidAdjustResize={false}
                >
                  {/*  */}
                </KeyboardAccessoryView>
              </>
            ) : (
              <View style={containerStyle}>{children}</View>
            )}
          </SafeAreaView>
        </OptimizedHeavyScreen>

        <Loading />
      </Box>
    );
  }
);

export default Screen;

export const PlaceholderView = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};
