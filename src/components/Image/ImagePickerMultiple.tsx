import React, { useEffect, useMemo, useState } from "react";
import { Alert, Linking, Modal, Platform, View } from "react-native";
import { CheckSvg } from "@/assets/svg/CheckSvg";
import { colors } from "@/styles/theme";
import { Asset } from "expo-media-library";
import { SCREEN_WIDTH } from "@/styles/dimensions";
import Typography from "../Text/Typography";
import { SafeAreaView } from "react-native-safe-area-context";
import * as MediaLibrary from "expo-media-library";
// import AssetsSelector from "./AssetsSelector";
import { AssetsSelector } from "expo-images-picker";
import { Ionicons } from '@expo/vector-icons'

type Props = {
  visible: boolean;
  onClose: () => void;
  onPick: (data: Asset[]) => void;
  multiSelectImage?: boolean;
};

export const ImagePickerMultiple = ({
  visible,
  onClose,
  onPick,
  multiSelectImage,
}: Props) => {
  const [permission, setPermission] = useState(false);

  const widgetSettings = useMemo(
    () => ({
      getImageMetaData: false,
      initialLoad: 100,
      assetsType: [MediaLibrary.MediaType.photo],
      minSelection: 1,
      maxSelection: multiSelectImage ? 10 : 1,
      portraitCols: 2,
      landscapeCols: 5,
    }),
    [multiSelectImage]
  );

  const widgetStyles = useMemo(
    () => ({
      margin: 3,
      bgColor: "#fff",
      spinnerColor: colors.primary,
      widgetWidth: 100,
      videoIcon: {
        Component: null,
        iconName: "",
        color: "",
        size: 0,
      },
      selectedIcon: {
        Component: Ionicons,
        iconName: 'ios-checkmark-circle-outline',
        color: 'white',
        bg: "rgba(255,255,255,0.7)",
        size: 26,
      },
    }),
    []
  );

  const widgetNavigator = useMemo(
    () => ({
        Texts: {
            finish: 'Chọn',
            back: 'Trở về',
            selected: 'Chọn',
        },
        midTextColor: colors.darkGrey,
        buttonTextStyle: {color:colors.primary},
        buttonStyle: {},
        onBack: onClose,
        onSuccess: onPick,
    }),
    []
)

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        if (Platform.OS === "ios") {
          Alert.alert(
            "Vui lòng bật quyền truy cập album ảnh",
            "Điều này sẽ giúp bạn thêm được ảnh trong ứng dụng của chúng tôi",
            [
              {
                text: "Huỷ",
                onPress: onClose,
              },
              {
                text: "Cài đặt",
                onPress: () => Linking.openURL("app-settings:"),
              },
            ]
          );
        }
        return;
      }
      setPermission(true);
    })();
  }, []);

  if (!visible || !permission) {
    return null;
  }

  return (
    <Modal visible={true} animationType={"slide"}>
      <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
        <AssetsSelector
          // options={{
          //   assetsType: ["photo"],
          //   noAssetsText: "",
          //   maxSelections: multiSelectImage ? 10 : 1,
          //   margin: 3,
          //   portraitCols: 2,
          //   landscapeCols: 5,
          //   widgetWidth: 100,
          //   widgetBgColor: "#fff",
          //   videoIcon: {
          //     Component: null,
          //     iconName: "",
          //     color: "",
          //     size: 0,
          //   },
          //   selectedIcon: {
          //     Component: CheckSvg,
          //     iconName: "",
          //     color: colors.primary,
          //     bg: "rgba(255,255,255,0.7)",
          //     size: 30,
          //   },
          //   noAssets: {
          //     Component: CustomNoAssetsComponent,
          //   },
          //   defaultTopNavigator: {
          //     continueText: "Chọn",
          //     goBackText: "Trở về",
          //     buttonBgColor: "#fff",
          //     buttonTextColor: colors.primary,
          //     midTextColor: colors.darkGrey,
          //     backFunction: onClose,
          //     doneFunction: onPick,
          //   },
          // }}
          Navigator={widgetNavigator}
          Settings={widgetSettings}
          Styles={widgetStyles}
          Errors={{
            errorTextColor: "",
            errorMessages: {
              hasErrorWithPermissions: "",
              hasErrorWithLoading: "",
              hasErrorWithResizing: "",
              hasNoAssets: "",
            },
          }}
        />
      </SafeAreaView>
    </Modal>
  );
};

const CustomNoAssetsComponent = () => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: SCREEN_WIDTH,
      }}
    >
      <Typography center size18 bold>
        Không tìm thấy hình ảnh
      </Typography>
    </View>
  );
};
