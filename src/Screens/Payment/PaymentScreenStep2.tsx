import {ScrollView, View, StyleSheet, ToastAndroid, ActivityIndicator} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';

import {colors} from '@/styles/theme';
import {Header} from '@/layouts/Header/Header';
import {observer} from 'mobx-react';
import {RowView} from '@/components/View/RowView';
import Typography from '@/components/Text/Typography';
import {ElInput} from '@/components/Input/ElInput';
import {REM, SCREEN_WIDTH} from '@/styles/dimensions';
import Button from '@/components/Button/MyButton';
import {CheckSvg} from '@/assets/svg/CheckSvg';
import {DeliverySvg} from '@/assets/svg/DeliverySvg';
import {PromoSvg} from '@/assets/svg/PromoSvg';
import {TotalCostSvg} from '@/assets/svg/TotalCostSvg';
import {formatPrice} from '@/utils/helper';
import {NavigationScreens} from '@/utils/enum';
import * as fetchOrder from '@/api/order.api';

import {userStore} from '@/store/UserStore';
import {orderStore} from '@/store/OrderStore';
const PaymentScreenStep2 = observer(({navigation}) => {
    const [promoCost, setPromocost] = useState('');

    const form = orderStore.getOrder;

    const [loading, setLoading] = useState(true);

    const handleSubmit = async () => {
        orderStore.setPromoCode(promoCost);

        const result = await fetchOrder.postOrderEstimate(userStore.getToken, orderStore.getOrder);
        const data = result.data;
        if (result.status === 200) {
            orderStore.updateDelivery(data.data);
            navigation.navigate(NavigationScreens.PaymentProcessFinal);
        } else {
            ToastAndroid.show(data.message, ToastAndroid.LONG);
        }
    };

    useEffect(() => {
        const fetchEstimate = async () => {
            const result = await fetchOrder.postOrderEstimate(userStore.getToken, orderStore.getOrder);
            const data = result.data;
            if (result.status === 200) {
                orderStore.updateDelivery(data.data);
            } else {
                ToastAndroid.show(data.message, ToastAndroid.LONG);
            }
            setLoading(false);
        };
        fetchEstimate();
    }, []);

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: colors.white,
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}>
            {loading ? (
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
                <View>
                    <Header onClickLeft={() => navigation.goBack()} back title="Thanh toán" />
                    <View style={{padding: 20}}>
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
                                <Typography size18 bold white>
                                    2
                                </Typography>
                            </View>
                            <View style={{height: 3, width: 50, backgroundColor: colors.grey}} />
                            <View
                                style={{
                                    borderRadius: 50,
                                    backgroundColor: colors.grey,
                                    width: 30,
                                    height: 30,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <Typography size18 bold mediumGrey>
                                    3
                                </Typography>
                            </View>
                        </RowView>
                        <RowView
                            style={{paddingVertical: 20, borderBottomColor: colors.grey, borderBottomWidth: 1}}
                            justifyContent="space-between">
                            <RowView>
                                <DeliverySvg />
                                <Typography bold darkGrey size18 lineHeight={24} style={{paddingHorizontal: 10}}>
                                    Phí vận chuyển ({})
                                </Typography>
                            </RowView>
                            <Typography primary size18 bold>
                                ({formatPrice(form.order.moneyDistance)})
                            </Typography>
                        </RowView>
                        <View style={{paddingVertical: 20, borderBottomColor: colors.grey, borderBottomWidth: 1}}>
                            <RowView style={{marginBottom: 15}} justifyContent="space-between">
                                <RowView>
                                    <PromoSvg />
                                    <Typography bold darkGrey size18 lineHeight={24} style={{paddingHorizontal: 10}}>
                                        Mã khuyến mãi
                                    </Typography>
                                </RowView>
                                <ElInput
                                    inputStyle={{width: 125, borderRadius: 7, borderColor: colors.grey}}
                                    onChangeText={(value) => setPromocost(value)}
                                />
                            </RowView>
                            <RowView justifyContent="space-between">
                                <Typography darkGrey size16 lineHeight={19}>
                                    Tiền được khuyến mãi
                                </Typography>
                                <Typography primary size16 bold center>
                                    {formatPrice(form.order.moneyDiscount)}
                                </Typography>
                            </RowView>
                        </View>
                        <RowView style={{marginTop: 15}} justifyContent="space-between">
                            <RowView>
                                <TotalCostSvg />
                                <Typography
                                    bold
                                    darkGrey
                                    size18
                                    lineHeight={24}
                                    style={{paddingHorizontal: 10}}
                                    transform="uppercase">
                                    tổng cộng
                                </Typography>
                            </RowView>
                            <Typography bold size18 primary>
                                {formatPrice(form.order.moneyFinal)}
                            </Typography>
                        </RowView>
                    </View>
                </View>
            )}

            <RowView
                style={{
                    paddingBottom: 20,
                    paddingHorizontal: 20,
                }}
                justifyContent="space-between">
                <Button
                    title="Trở về"
                    style={{width: (SCREEN_WIDTH * 3) / 7}}
                    border
                    onPress={() => {
                        navigation.goBack();
                    }}
                />
                <Button
                    title="Tiếp theo"
                    style={{width: (SCREEN_WIDTH * 3) / 7}}
                    onPress={() => {
                        handleSubmit();
                    }}
                />
            </RowView>
        </View>
    );
});
export default PaymentScreenStep2;
