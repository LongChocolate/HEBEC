import {View, StyleSheet, ToastAndroid, BackHandler, ActivityIndicator} from 'react-native';
import React, {useCallback, useState} from 'react';

import {colors} from '@/styles/theme';
import {Header} from '@/layouts/Header/Header';
import {observer} from 'mobx-react';
import {RowView} from '@/components/View/RowView';
import Typography from '@/components/Text/Typography';
import {SCREEN_WIDTH} from '@/styles/dimensions';
import Button from '@/components/Button/MyButton';
import {CheckSvg} from '@/assets/svg/CheckSvg';
import {PaymentMethodSvg} from '@/assets/svg/PaymentMethodSvg';
import {orderStore} from '@/store/OrderStore';
import * as fetchOrder from '@/api/order.api';

import RadioForm from 'react-native-simple-radio-button';
import {userStore} from '@/store/UserStore';
import {NavigationScreens} from '@/utils/enum';
import {cartStore} from '@/store/CartStore';
import CustomModal from '@/components/Modal/CustomModal';
import {historyStore} from '@/store/HistoryStore';

var radio_props = [
    {label: 'Tiền mặt', value: 'CASH'},
    {label: 'Ví Viettel Pay', value: 'VIETTELPAY'},
];
const PaymentScreenStep3 = observer(({navigation}) => {
    const [payMethod, setPayMethod] = useState('CASH');

    const [isVisible, setIsVisible] = useState(false);

    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const handleSubmit = async () => {
        setLoadingSubmit(true);
        orderStore.setPaymentMethod(payMethod);
        const result = await fetchOrder.postOrder(userStore.getToken, orderStore.getOrder);
        const data = result.data;
        if (result.status === 200) {
            cartStore.deleteAll();
            orderStore.success();
            historyStore.fetch(1, 5, true);
            navigation.navigate(NavigationScreens.OrderBookSuccess);
        } else {
            ToastAndroid.show(data.message, ToastAndroid.LONG);
        }
    };

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: colors.white,
                flexDirection: 'column',
            }}>
            <Header onClickLeft={() => navigation.goBack()} back title="Thanh toán" />
            <View style={{padding: 20, flex: 1}}>
                <Typography size16 lineHeight={24} bold darkGrey center>
                    Vận chuyển
                </Typography>
                <RowView justifyContent="center" style={{marginTop: 10}}>
                    <View
                        style={{
                            borderRadius: 50,
                            backgroundColor: colors.primary,
                            width: 30,
                            height: 30,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <CheckSvg />
                    </View>
                    <View
                        style={{
                            height: 3,
                            width: 50,
                            backgroundColor: colors.primary,
                        }}
                    />
                    <View
                        style={{
                            borderRadius: 50,
                            backgroundColor: colors.primary,
                            width: 30,
                            height: 30,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <CheckSvg />
                    </View>
                    <View style={{height: 3, width: 50, backgroundColor: colors.primary}} />
                    <View
                        style={{
                            borderRadius: 50,
                            backgroundColor: colors.primary,
                            width: 30,
                            height: 30,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Typography size18 bold white>
                            3
                        </Typography>
                    </View>
                </RowView>
                <RowView style={{paddingVertical: 20}}>
                    <PaymentMethodSvg />
                    <Typography bold darkGrey size18 lineHeight={24} style={{paddingHorizontal: 10}}>
                        Hình thức thanh toán
                    </Typography>
                </RowView>

                <RadioForm
                    radio_props={radio_props}
                    initial={0}
                    buttonColor={colors.primary}
                    selectedButtonColor={colors.primary}
                    onPress={(value) => setPayMethod(value)}
                />
            </View>
            <RowView style={{paddingBottom: 20, paddingHorizontal: 20}} justifyContent="space-between">
                <Button
                    title="Trở về"
                    style={{width: (SCREEN_WIDTH * 3) / 7}}
                    border
                    onPress={() => {
                        navigation.goBack();
                    }}
                />
                {loadingSubmit ? (
                    <View
                        style={{
                            flex: 1,
                            marginVertical: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <ActivityIndicator size="large" color={colors.primary} />
                    </View>
                ) : (
                    <Button
                        title="Thanh toán"
                        style={{width: (SCREEN_WIDTH * 3) / 7}}
                        onPress={() => setIsVisible(true)}
                    />
                )}
            </RowView>
            <CustomModal
                isVisible={isVisible}
                message={'Bạn có chắc muốn thanh toán?'}
                title={'Thanh toán'}
                closeModal={setIsVisible}
                funcAction={() => handleSubmit()}
                action
            />
        </View>
    );
});
export default PaymentScreenStep3;
