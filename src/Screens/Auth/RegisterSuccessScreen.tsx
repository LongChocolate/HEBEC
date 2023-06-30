import {StyleSheet, View} from 'react-native';
import React from 'react';

import {sizes} from '@/styles/theme';
import {WaterMarkBackView} from '@/components/View/WaterMarkBackView';
import Typography from '@/components/Text/Typography';
import {REM} from '@/styles/dimensions';
import Button from '@/components/Button/MyButton';
import {RegisterSuccessSvg} from '@/assets/svg/RegisterSuccessSvg';
import {NavigationScreens} from '@/utils/enum';

const RegisterSuccessScreen = ({navigation}) => {
    return (
        <>
            <WaterMarkBackView />
            <View style={{marginVertical: 50, marginHorizontal: 20, justifyContent: 'center', alignItems: 'center'}}>
                <View style={styles.containerIconSuccess}>
                    <RegisterSuccessSvg size={100} />
                </View>
                <Typography bold size18 lineHeight={25} uppercase primary style={styles.titleRegisterSuccess}>
                    tạo tài khoản thành công
                </Typography>

                <Typography lineHeight={16} size14 center darkGrey bold>
                    Cảm ơn bạn đã đăng ký tài khoản. Bạn có thể đặt mua hàng ngay bây giờ.
                </Typography>

                <Button
                    title="Trở lại đăng nhập"
                    containerStyle={styles.containerBtnGoBackLogin}
                    onPress={() => navigation.navigate(NavigationScreens.Login)}
                />
            </View>
        </>
    );
};
const styles = StyleSheet.create({
    // Icon
    containerIconSuccess: {
        marginBottom: 20,
    },

    //title
    titleRegisterSuccess: {
        marginVertical: 10,
    },

    // Btn goBack Login
    containerBtnGoBackLogin: {
        width: 200,
        borderRadius: 7,
        marginTop: 20,
    },
});

export default RegisterSuccessScreen;
