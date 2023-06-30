import React, { useRef, useState } from "react";
import {
  TextInput,
  View,
  TextInputProps,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  KeyboardTypeOptions,
  TextStyle,
  Platform,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  ImageResizeMode,
} from "react-native";
import { alignJustify, colors } from "@/styles/theme";
import Typography from "../Text/Typography";
import { isEqual } from "lodash";
import { AddPhotoSvg } from "@/assets/svg/AddPhotoSvg";
import { EditSvg } from "@/assets/svg/EditSvg";
import { EImage } from "../Image/EImage";
import { PickImage } from "../Modal/PickImage";
import Button from "../Button/MyButton";

export interface EInputImageProps {
  inputRef?: React.Ref<TextInput>;
  label?: string;
  errorMessage?: string;
  imageStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  showRequire?: boolean;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  onPickImage?: (data: string[]) => void;
  onBlur?: () => void;
  loading?: boolean;
  activityColor?: string;
  resizeMode?: ImageResizeMode;
}

export const EInputImage = React.memo(
  React.forwardRef(
    (
      {
        inputRef,
        label,
        errorMessage,
        showRequire,
        containerStyle,
        imageStyle,
        labelStyle,
        errorStyle,
        placeholder,
        disabled = false,
        onPickImage,
        value,
        onBlur,
        loading,
        activityColor = colors.primary,
        resizeMode = "cover",
      }: EInputImageProps,
      ref
    ) => {
      const [visibleImage, setVisibleImage] = useState(false);

      const handleAddImage = () => {
        setVisibleImage(true);
      };

      return (
        <>
          <View style={{ ...containerStyle }}>
            {!!label && (
              <Typography
                size14
                lineHeight={16}
                darkGrey
                style={{ marginBottom: 5, ...labelStyle }}
              >
                {label}
                {showRequire && (
                  <Typography size14 lineHeight={16} error>
                    {" "}
                    *
                  </Typography>
                )}
              </Typography>
            )}
            <Pressable
              disabled={disabled}
              onPress={handleAddImage}
              style={[
                {
                  borderWidth: 1,
                  borderColor: errorMessage
                    ? colors.error
                    : !!value
                    ? colors.mediumGrey
                    : colors.darkGrey,
                  borderRadius: 7,
                  width: "100%",
                  aspectRatio: 2 / 1,
                  overflow: "hidden",
                  ...alignJustify(),
                },
                disabled && {
                  opacity: 0.5,
                },
                { ...imageStyle },
              ]}
            >
              {!!value ? (
                <>
                  <EImage source={{ uri: value }} resizeMode={resizeMode} />
                  <View
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      ...alignJustify(),
                    }}
                  >
                    <EditSvg />
                  </View>
                </>
              ) : (
                <>
                  <AddPhotoSvg size={32} color={colors.mediumGrey} />
                  <Typography
                    size14
                    lineHeight={20}
                    medium
                    center
                    mediumGrey
                    style={{ marginTop: 10 }}
                  >
                    {placeholder}
                  </Typography>
                  <Button
                    onPress={handleAddImage}
                    title={"Chọn ảnh"}
                    style={{ marginTop: 10 }}
                    containerStyle={{ paddingVertical: 12 }}
                  />
                </>
              )}
              {loading && (
                <View
                  style={{
                    ...StyleSheet.absoluteFillObject,
                    ...alignJustify(),
                    backgroundColor: "rgba(255,255,255,0.5)",
                  }}
                >
                  <ActivityIndicator color={activityColor} />
                </View>
              )}
            </Pressable>

            {!!errorMessage && (
              <Typography
                size14
                error
                italic
                lineHeight={16}
                style={{ marginTop: 3, ...errorStyle }}
              >
                {errorMessage}
              </Typography>
            )}
          </View>
          <PickImage
            onGetImage={onPickImage}
            visible={visibleImage}
            onClose={() => {
              setVisibleImage(false);
              onBlur();
            }}
          />
        </>
      );
    }
  ),
  (prev, next) => isEqual(prev, next)
);
