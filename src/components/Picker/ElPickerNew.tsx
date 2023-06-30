import React, { useState } from "react";
import {
  View,
  Text,
  ViewStyle,
  TextStyle,
  NativeSyntheticEvent,
  TargetedEvent,
  TouchableOpacity,
} from "react-native";
import RNPickerSelect, { Item } from "react-native-picker-select";
import { colors } from "@/styles/theme";
import Typography from "../Text/Typography";
import { RowView } from "../View/RowView";
import PickerModal from "react-native-picker-modal-view";
import { IModalListInDto } from "react-native-picker-modal-view/dist/Interfaces";
import { isEmpty } from "lodash";

interface Props<T> {
  items: IModalListInDto<T>[];
  value?: any;
  onPicker: (value: any) => void;
  placeholder?: string;
  defaultValue?: string;
  label?: string;
  errorMessage?: string;
  inputStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  showRequire?: boolean;
  componentRight?: React.ReactNode;
  componentLeft?: React.ReactNode;
  editable?: boolean;
  onBlur?: () => void;
}

export function ElPicker<T>({
  items,
  value,
  placeholder,
  defaultValue = null,
  label,
  errorMessage,
  showRequire,
  componentRight,
  componentLeft,
  containerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  editable = true,
  onPicker,
  onBlur,
}: Props<T>) {
  type ListType<T = any> = IModalListInDto<T>[];

  const newItems: ListType = items;
  const newSelected = newItems.find((e) => e.Value == value);

  const onValueChange = (selected: IModalListInDto): IModalListInDto => {
    onPicker(selected.Value);

    return selected;
  };

  return (
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
              * (bắt buộc)
            </Typography>
          )}
        </Typography>
      )}

      <PickerModal
        renderSelectView={(disabled, selected, showModal) => (
          <TouchableOpacity
            onPress={showModal}
            activeOpacity={0.8}
            onBlur={onBlur}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 8,
              paddingHorizontal: 16,
              backgroundColor: "#fff",
              borderWidth: !editable ? 0 : 1,
              borderColor: errorMessage
                ? colors.error
                : isEmpty(newSelected)
                ? colors.mediumGrey
                : colors.darkGrey,
              borderRadius: 7,
              height: 50,
              maxHeight: 50,
              ...inputStyle,
            }}
          >
            {componentLeft}

            <Typography
              style={{
                marginLeft: componentLeft && 10,
                marginRight: componentRight && 10,
              }}
            >
              {isEmpty(newSelected) ? placeholder : newSelected.Name}
            </Typography>

            {componentRight}
          </TouchableOpacity>
        )}
        onClosed={() => {}}
        onBackButtonPressed={() => {}}
        onEndReached={() => {}}
        onSelected={onValueChange}
        items={newItems}
        showToTopButton={true}
        showAlphabeticalIndex={true}
        autoGenerateAlphabeticalIndex={true}
        searchPlaceholderText={"Tìm kiếm"}
        requireSelection={false}
        selected={newSelected}
        autoSort
      />

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
  );
}
