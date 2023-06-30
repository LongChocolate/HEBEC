import * as React from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { observer } from "mobx-react";
import appStore from "@/store/appStore";
import { colors } from "@/styles/theme";

interface LoadingProps {}

const Loading = observer(({}: LoadingProps) => {
  if (appStore.loading) {
    return (
      <View
        style={{
          zIndex: 99,
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(255,255,255,0.5)",
          flex: 1,
        }}
      >
        <View
          style={[
            {
              borderRadius: 20,
              padding: 20,
              alignItems: "center",
              justifyContent: "center",
              // backgroundColor: "rgba(0,0,0,0.7)",
            },
          ]}
        >
          <ActivityIndicator size="large" color={colors.primary} />
          <Text
            style={{
              marginTop: 10,
              fontSize: 15,
              color: colors.primary,
            }}
          >
            {" "}
            Loading...{" "}
          </Text>
        </View>
      </View>
    );
  }
  return <View>{/*  */}</View>;
});

export default Loading;
