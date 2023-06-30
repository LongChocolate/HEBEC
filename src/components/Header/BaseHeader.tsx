import { BackSvg } from "@/assets/svg/BackSvg";
import { CartSvg } from "@/assets/svg/CartSvg";
import { EditSvg } from "@/assets/svg/EditSvg";
import { FilterSvg } from "@/assets/svg/FilterSvg";
import { PlusSvg } from "@/assets/svg/PlusSvg";
import { SendSvg } from "@/assets/svg/SendSvg";
import { orderStore } from "@/store/orderStore";
import { SCREEN_WIDTH } from "@/styles/dimensions";
import { alignJustify, boxShadow, colors } from "@/styles/theme";
import { NavigationScreens } from "@/utils/enum";
import { Navigation } from "@/utils/Navigation";
import { observer } from "mobx-react";
import { HStack, Button, StatusBar, Box } from "native-base";
import React, { useCallback, useRef, useState } from "react";
import {
  View,
  Text,
  ViewStyle,
  TouchableOpacity,
  Pressable,
  StatusBarStyle,
} from "react-native";
import { LEFT_DISPLAY, RIGHT_DISPLAY } from "../Screen/BaseScreen";
import Typography from "../Text/Typography";
import { RowView } from "../View/RowView";

export interface HeaderProps {
  headerTitle?: string;
  componentLeft?: React.ReactNode;
  ComponentTitleLeft?: React.ReactNode;
  componentRight?: React.ReactNode;
  componentTitle?: React.ReactNode;
  showHeaderTool?: boolean;
  showLeft?: boolean;
  showRight?: boolean;
  headerStyle?: ViewStyle;
  hideShadow?: boolean;
  headerColor?: string;
  fixedHeader?: boolean;
  onPressBack?: () => void;
  leftContainerStyle?: ViewStyle;
  barStyle?: StatusBarStyle;
  leftDisplay?: string;
  onPressLeft?: Function;
  onPressRight?: Function;
  rightDisplay?: string;
  componentHeaderTitle?: React.ReactNode;
}

export const BaseHeader = observer(
  ({
    showLeft = true,
    showRight = true,
    barStyle = "light-content",
    rightDisplay,
    onPressRight,
    ...props
  }: HeaderProps) => {
    return (
      <>
        <StatusBar backgroundColor={props.headerColor} barStyle={barStyle} />
        <Box safeAreaTop backgroundColor={props.headerColor} />
        <View
          style={[
            {
              // zIndex: 9999,
              backgroundColor: props.headerColor,
              overflow: "hidden",
            },
            props.fixedHeader && {
              position: "absolute",
              top: 0,
              width: SCREEN_WIDTH,
            },
            !props.hideShadow && boxShadow("rgba(0, 0, 0, 0.15)", 0, 2, 4),
          ]}
        >
          <HStack
            style={[
              {
                backgroundColor: props.headerColor,
                borderBottomWidth: 0,
                marginHorizontal: 0,
                borderTopWidth: 0,
                paddingTop: 0,
                paddingBottom: 0,
                height: 60,
                ...props.headerStyle,
              },
            ]}
          >
            <RowView
              style={{
                flex: 1,
                paddingHorizontal: 10,
                backgroundColor: "transparent",
              }}
            >
              <HStack
                style={{
                  flex:
                    props.ComponentTitleLeft ||
                    props.leftDisplay == LEFT_DISPLAY.custom
                      ? 10
                      : 1,
                  ...props.leftContainerStyle,
                }}
              >
                {props.leftDisplay == LEFT_DISPLAY.backBtn && (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity
                      onPress={() => {
                        props.onPressLeft ? props.onPressLeft() : false;
                      }}
                    >
                      <BackSvg size={20} />
                    </TouchableOpacity>

                    {props.ComponentTitleLeft}
                  </View>
                )}
                {props.leftDisplay == LEFT_DISPLAY.custom &&
                  props.ComponentTitleLeft}
              </HStack>

              <HStack
                style={{
                  flex: props.headerTitle || props.componentHeaderTitle ? 5 : 0,
                  height: "100%",
                  ...alignJustify(),
                }}
              >
                {props.headerTitle ? (
                  <Typography size18 center white bold>
                    {props.headerTitle}
                  </Typography>
                ) : null}

                {props.componentHeaderTitle}
              </HStack>

              <HStack style={{ flex: 1, justifyContent: "flex-end" }}>
                {rightDisplay == RIGHT_DISPLAY.cart && (
                  <TouchableOpacity
                    onPress={() => {
                      Navigation.navigate(NavigationScreens.CartShop);
                      onPressRight ? onPressRight() : false;
                    }}
                  >
                    <CartSvg size={24} />
                    {orderStore.booksSelected.length > 0 && (
                      <View
                        style={{
                          backgroundColor: colors.error,
                          width: 18,
                          aspectRatio: 1 / 1,
                          borderRadius: 9,
                          borderWidth: 2,
                          borderColor: colors.primary,
                          position: "absolute",
                          top: -8,
                          right: -8,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Typography size={8} lineHeight={10} white>
                          {orderStore.totalQuantityBookSelected > 9
                            ? "+9"
                            : orderStore.totalQuantityBookSelected}
                        </Typography>
                      </View>
                    )}
                  </TouchableOpacity>
                )}
                {rightDisplay == RIGHT_DISPLAY.filter && (
                  <TouchableOpacity
                    onPress={() => {
                      onPressRight ? onPressRight() : false;
                    }}
                  >
                    <FilterSvg size={24} />
                  </TouchableOpacity>
                )}
                {rightDisplay == RIGHT_DISPLAY.send && (
                  <TouchableOpacity
                    onPress={() => {
                      onPressRight ? onPressRight() : false;
                    }}
                  >
                    <SendSvg size={24} />
                  </TouchableOpacity>
                )}

                {rightDisplay == RIGHT_DISPLAY.add && (
                  <TouchableOpacity
                    onPress={() => {
                      onPressRight ? onPressRight() : false;
                    }}
                  >
                    <PlusSvg size={24} />
                  </TouchableOpacity>
                )}

                {rightDisplay == RIGHT_DISPLAY.edit && (
                  <TouchableOpacity
                    onPress={() => {
                      onPressRight ? onPressRight() : false;
                    }}
                  >
                    <EditSvg size={24} color="#fff" />
                  </TouchableOpacity>
                )}
              </HStack>
            </RowView>
          </HStack>
        </View>
      </>
    );
  }
);
