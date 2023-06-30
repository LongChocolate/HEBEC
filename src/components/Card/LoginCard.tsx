import * as React from "react";
import { Text, View, Image, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { appStyle, colors } from "@/styles/theme";
import { BlurView } from "expo-blur";
import { Logo } from "@/assets/svg/Logo";
import { boxShadow } from "@/styles/boxShadow";

interface LoginCardProps {
  children: React.ReactNode;
  showLogo?: boolean;
}

const LoginCard = ({ children, showLogo = true }: LoginCardProps) => {
  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: colors.secondary,
          borderTopLeftRadius: 34,
          borderTopRightRadius: 34,
          paddingTop: 5,
          ...boxShadow("#0000001A", 0, -5, 13)
        }
      ]}
    >
      <ImageBackground
        source={require("@/assets/images/background_content.png")}
        style={[
          {
            backgroundColor: "#fff",
            borderTopLeftRadius: 34,
            borderTopRightRadius: 34,
            overflow: "hidden",
            flex: 1,
            ...boxShadow("#0000001A", 0, -5, 13)
          }
        ]}
        imageStyle={appStyle.image}
      >
        <LinearGradient
          colors={["#FFFFFF", "#FFFFFFBF"]}
          start={[0, 0]}
          end={[0, 1]}
          style={{
            flex: 1
          }}
        >
          {children}
        </LinearGradient>
      </ImageBackground>

      {showLogo && (
        <BlurView
          tint="light"
          intensity={70}
          style={{
            position: "absolute",
            top: -55,
            alignSelf: "center",
            borderRadius: 55,
            width: 110,
            aspectRatio: 1 / 1,
            padding: 7,
            ...boxShadow("#3E3E3E45", 0, 4, 14)
          }}
        >
          <LinearGradient
            colors={[colors.primary, colors.secondary]}
            start={[0, 0]}
            end={[0, 1]}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 47,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Logo size={60} />
          </LinearGradient>
        </BlurView>
      )}
    </View>
  );
};

export default LoginCard;
