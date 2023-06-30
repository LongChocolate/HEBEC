import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import Typography from "../Text/Typography";
import * as ImagePicker from "expo-image-picker";
import { CameraModal } from "../Camera/CameraModal";
import { appStyle, colors } from "@/styles/theme";
import { Navigation } from "@/utils/Navigation";
import { CheckSvg } from "@/assets/svg/CheckSvg";
import { ImagePickerMultiple } from "../Image/ImagePickerMultiple";
import { Asset } from "expo-media-library";
import { compressImage } from "@/utils/helper";
import appStore from "@/store/appStore";

interface Props {
  visible: boolean;
  onClose: () => void;
  onGetImage: (data: string[]) => void;
  multiSelectImage?: boolean;
}

export const PickImage = ({
  visible,
  onClose,
  onGetImage,
  multiSelectImage = false,
}: Props) => {
  const [visibleCamera, setVisibleCamera] = useState(false);
  const [visibleImagePicker, setVisibleImagePicker] = useState(false);

  const getImageFromLibrary = async () => {
    setVisibleImagePicker(true);
  };

  const getImageFromCamera = () => {
    setVisibleCamera(true);
  };

  const onPickImage = async (data: Asset[]) => {
    onCancelModal();

    setTimeout(async () => {
      try {
        appStore.loading = true;
        let arr = data.map(async (e) => {
          const imageCompress = await compressImage(e.uri);
          return imageCompress.uri;
        });
        const images = await Promise.all(arr);
        onGetImage(images);
      } finally {
        appStore.loading = false;
      }
    }, 200);
  };

  const onTakePhoto = async (photo: string) => {
    onCancelModal();

    setTimeout(async () => {
      try {
        appStore.loading = true;
        const imageCompress = await compressImage(photo);
        onGetImage([imageCompress.uri]);
      } finally {
        appStore.loading = false;
      }
    }, 200);
  };

  const onCancelModal = () => {
    setVisibleCamera(false);
    setVisibleImagePicker(false);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  if (!visible) {
    return null;
  }

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      backdropColor={"rgba(35, 31, 32, 0.4)"}
      style={{ justifyContent: "flex-end", margin: 0 }}
    >
      <View
        style={{
          backgroundColor: "#fff",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={getImageFromLibrary}
          style={{
            paddingVertical: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography bold>Thư viện</Typography>
        </TouchableOpacity>

        <View style={appStyle.divider} />

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={getImageFromCamera}
          style={{
            paddingVertical: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography bold>Máy ảnh</Typography>
        </TouchableOpacity>
      </View>
      {visibleCamera && (
        <CameraModal
          onClose={onCancelModal}
          visible={visibleCamera}
          onTakePhoto={onTakePhoto}
        />
      )}
      {visibleImagePicker && (
        <ImagePickerMultiple
          visible={visibleImagePicker}
          onClose={onCancelModal}
          onPick={onPickImage}
          multiSelectImage={multiSelectImage}
        />
      )}
    </Modal>
  );
};
