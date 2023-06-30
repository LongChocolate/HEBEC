import {View, StyleSheet, BackHandler} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';

import {colors} from '@/styles/theme';
import {observer} from 'mobx-react';
import Typography from '@/components/Text/Typography';
import Button from '@/components/Button/MyButton';
import {NavigationScreens} from '@/utils/enum';
import {OrderBookSuccessSvg} from '@/assets/svg/OrderBookSuccessSvg';

const PaymentSuccessScreen = observer(({navigation}) => {
    useEffect(() => {
        navigation.addListener('focus', () => {
            const back = BackHandler.removeEventListener('hardwareBackPress', function () {
                return true;
            });

            return () => back;
        });
    }, [navigation]);

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: colors.white,
                flexDirection: 'column',
                padding: 20,
                justifyContent: 'center',
            }}>
            <View
                style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginVertical: 20,
                }}>
                <OrderBookSuccessSvg />
                <Typography size18 lineHeight={21} bold darkGrey center style={{marginVertical: 20}}>
                    Đặt đơn hàng thành công
                </Typography>
                <Typography size16 lineHeight={24} darkGrey center>
                    Hệ thống đã lưu đơn của bạn.{'\n'} Cảm ơn bạn đã sử dụng dịch vụ của HEBEC.{'\n'} Để theo dõi trạng
                    thái đơn, bạn có thể xem tại trang lịch sử mua hàng
                </Typography>
            </View>
            <Button
                title="Về trang chủ"
                border
                containerStyle={{borderRadius: 7}}
                onPress={() => {
                    const back = BackHandler.addEventListener('hardwareBackPress', function () {
                        return true;
                    });

                    navigation.navigate(NavigationScreens.Home);
                    return () => back;
                }}
            />
            <Button
                style={{marginVertical: 20}}
                containerStyle={{borderRadius: 7}}
                title="Xem lịch sử mua hàng"
                onPress={() => {
                    navigation.navigate(NavigationScreens.History);
                }}
            />
        </View>
    );
});
export default PaymentSuccessScreen;
