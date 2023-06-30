import React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { Button } from "native-base";
import { SFTextRegular, SFTextBold } from "@/components/Text";
import { orange, placeholder, info, primary, light } from '@/styles/color';
import { REM, SCREEN_HEIGHT, SCREEN_WIDTH } from '@/styles/dimensions';
import { WarningImage } from "@/components/Constants/Image";
import Modal, { SlideAnimation } from 'react-native-modals';
// const BORDER_WIDTH = 2;
// const IMAGE_SIZE = BOTTOM_SHEET_IMAGE_SIZE + BORDER_WIDTH;
// export const BOTTOM_SHEET_CONTENT_MAX_HEIGHT =
//   BOTTOM_SHEET_MAX_HEIGHT - IMAGE_SIZE / 2 - 20 / 2;

interface IAppProps {
  // renderImage?: any;
  visible: boolean;
  title?: any;
  children?: any;
  onDismiss?: any;
  buttonLeft: any;
  buttonRight: any;
  onPressLeft: any;
  onPressRight: any;
}

const BottomSheet = ({
  // renderImage,
  visible,
  title,
  children,
  onDismiss,
  buttonLeft,
  buttonRight,
  onPressLeft,
  onPressRight
}: IAppProps) => {
  return (
    <Modal.BottomModal
      visible={visible}
      overlayOpacity={0.8}
      onTouchOutside={onDismiss}
      modalAnimation={new SlideAnimation({
        slideFrom: 'bottom',
      })}
      animationDuration={500}
      swipeDirection={'down'}
      swipeThreshold={200}
      onSwipeOut={onDismiss}
      modalStyle={{
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}
    >
      <View style={{
        padding: 20,
        width: SCREEN_WIDTH,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center'
      }}>
        <View style={{ width: 70, height: 5, borderRadius: 100, backgroundColor: '#E9EDF6' }} />
        <Image source={WarningImage} />
        <SFTextBold style={{ fontSize: 17, color: placeholder }}>{title}</SFTextBold>
        <SFTextRegular style={{
          fontSize: 13,
          color: info,
          marginVertical: 10,
          lineHeight: 21,
          textAlign: 'center'
        }}>
          {children}
        </SFTextRegular>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: (SCREEN_WIDTH * 90) / 100,
          marginBottom: 10
        }}>
          <Button onPress={onPressLeft} style={{
            backgroundColor: orange,
            width: (SCREEN_WIDTH * 43) / 100,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <SFTextRegular style={{ fontSize: 13, color: light }}>{buttonLeft}</SFTextRegular>
          </Button>
          <Button onPress={onPressRight} style={{
            backgroundColor: primary,
            width: (SCREEN_WIDTH * 43) / 100,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <SFTextRegular style={{ fontSize: 13, color: light }}>{buttonRight}</SFTextRegular>
          </Button>
        </View>

      </View>

    </Modal.BottomModal>
  )
};

export default React.memo(BottomSheet);
