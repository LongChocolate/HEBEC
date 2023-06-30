import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import Modal from "react-native-modal";
import Typography from "../Text/Typography";
import { colors } from "@/styles/theme";
import { Avatar } from "../Image/ImageDefault";
import { PhoneSvg } from "@/assets/svg/PhoneSvg";
import { TimeSvg } from "@/assets/svg/TimeSvg";
import { MotorBikeSvg } from "@/assets/svg/MotorBikeSvg";
import { observer } from "mobx-react";
import appStore from "@/store/appStore";
import { driverStore } from "@/store/driverStore";
import moment from "moment";

interface DriverModalProps {}

export const DriverModal = observer(({}: DriverModalProps) => {
  const onClose = () => {
    appStore.showModalDriver(false);
  };

  const contact = () => {
    Linking.openURL(`tel:${driverStore.driver.phone}`);
  };

  return (
    <View>
      <Modal
        isVisible={appStore.visibleModalDriver}
        onBackdropPress={onClose}
        style={{ bottom: 20, justifyContent: "flex-end" }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 7,
          }}
        >
          <View style={{ paddingTop: 20, paddingHorizontal: 20 }}>
            <View style={{ alignItems: "center", marginBottom: 20 }}>
              <Avatar image={""} size={80} />
              <Typography bold color={"#000"} style={{ marginTop: 10 }}>
                {driverStore.driver.name}
              </Typography>
            </View>

            <DriverModalItem
              title={"Số điện thoại"}
              subTitle={driverStore.driver.phone}
              content={"LIÊN HỆ"}
              contentColor={colors.primary}
              icon={<PhoneSvg />}
              onPress={contact}
            />
            <DriverModalItem
              title={"Sử dụng xe"}
              subTitle={driverStore.driver.vehicleName}
              content={driverStore.driver.licensePlate}
              icon={<MotorBikeSvg />}
            />
            <DriverModalItem
              title={"Nhận đơn lúc"}
              subTitle={moment(driverStore.acceptedAt * 1000).format(
                "HH:mm DD/MM/YYYY"
              )}
              icon={<TimeSvg />}
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onClose}
            style={{
              paddingVertical: 20,
              borderTopColor: colors.lightGray,
              borderTopWidth: 1,
            }}
          >
            <Typography bold primary center>
              Đóng
            </Typography>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
});

const DriverModalItem = ({
  icon,
  title,
  subTitle,
  content = "",
  onPress = () => {},
  contentColor = "#000",
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {icon}
        <View style={{ marginLeft: 10 }}>
          <Typography header lineHeight={17} color={"#000"}>
            {title}
          </Typography>
          <Typography medium color={"#000"} style={{ marginTop: 5 }}>
            {subTitle}
          </Typography>
        </View>
      </View>

      <Typography medium color={contentColor} onPress={onPress}>
        {content}
      </Typography>
    </View>
  );
};
