import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
} from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import {
  IImageInfo,
  Props as ImageViewerProps,
} from "react-native-image-zoom-viewer/built/image-viewer.type";
import { CloseSvg } from "@/assets/svg/CloseSvg";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import CameraRoll from "@react-native-community/cameraroll";
import RNFetchBlob from "rn-fetch-blob";
import { Alert } from "../Modal/AlertModal";

interface ImageViewModalProps extends ImageViewerProps {
  visible: boolean;
  onClose?: () => void;
  index?: number;
}

export const ImageViewModal = ({
  visible,
  index = 0,
  onClose,
  ...props
}: ImageViewModalProps) => {
  const getPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Image Download Permission",
          message: "Your permission is required to save images to your device",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
    } catch (err) {}
  };

  const handleDownload = async (link) => {
    if (Platform.OS === "android") {
      const granted = await getPermissionAndroid();
      if (!granted) {
        return;
      }
    }
    onClose();
    RNFetchBlob.config({
      fileCache: true,
      appendExt: "png",
    })
      .fetch("GET", link)
      .then((res) => {
        CameraRoll.save(res.data, { type: "photo" })
          .then((res) => {
            Alert.alert({
              title: "Tải hình ảnh",
              message: "Thành công",
            });
          })
          .catch((err) =>
            Alert.alert({
              title: "Tải hình ảnh",
              message: "Thất bại",
            })
          );
      })
      .catch((error) =>
        Alert.alert({
          title: "Tải hình ảnh",
          message: "Thất bại",
        })
      );
  };

  return (
    <Modal visible={visible} transparent={true}>
      <ImageViewer
        {...props}
        enableSwipeDown
        onSwipeDown={onClose}
        useNativeDriver={false}
        loadingRender={() => (
          <ActivityIndicator size={"large"} color={"#fff"} />
        )}
        index={index}
        enablePreload
        onSave={handleDownload}
        menuContext={{ saveToLocal: "Tải hình về", cancel: "Hủy" }}
      />
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onClose}
        style={{
          position: "absolute",
          top: 20 + getStatusBarHeight(true),
          right: 20,
        }}
      >
        <CloseSvg />
      </TouchableOpacity>
    </Modal>
  );
};
