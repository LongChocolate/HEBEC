import {ActivityIndicator, ScrollView, View, StyleSheet, ToastAndroid} from 'react-native';
import React, {useState} from 'react';

import {colors} from '@/styles/theme';
import {Header} from '@/layouts/Header/Header';
import {observer} from 'mobx-react';
import {NavigationScreens, OrderStatus} from '@/utils/enum';

import * as fetchOrder from '@/api/order.api';
import {userStore} from '@/store/UserStore';
import {historyStore} from '@/store/HistoryStore';
import {RowView} from '@/components/View/RowView';
import {StatusOrderSvg} from '@/assets/svg/StatusOrderSvg';
import Typography from '@/components/Text/Typography';
import {formatPrice, formatToPhone, transferOrderStatus, transferPaymentMethod} from '@/utils/helper';
import {LocationSvg} from '@/assets/svg/LocationSvg';
import {BooksSvg} from '@/assets/svg/BooksSvg';
import {PromoSvg} from '@/assets/svg/PromoSvg';
import {PaymentMethodSvg} from '@/assets/svg/PaymentMethodSvg';
import Button from '@/components/Button/MyButton';
import {SCREEN_HEIGHT} from '@/styles/dimensions';
import CustomModal from '@/components/Modal/CustomModal';

const DetailOrderHistoryScreen = observer(({navigation, route}) => {
    const [order, setOrder] = useState(route.params.order);

    const [isVisible, setIsVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [titleModal, setTitleModal] = useState('Bạn có chắc muốn huỷ đơn hàng này?');
    const [isCancalOrder, setIsCancelOrder] = useState(false);

    const handleCancelOrder = async (orderId: number) => {
        setLoading(true);
        setIsCancelOrder(true);
        const result = await fetchOrder.postCancelOrder(userStore.getToken, orderId);
        const data = result.data;
        if (result.status === 200) {
            const interval = await setInterval(() => {
                setTitleModal('Bạn đã huỷ thành công đơn hàng!');

                setOrder((prev) => {
                    return {...prev, status: 'CANCEL'};
                });
                setLoading(false);
            }, 1000);
            setTimeout(() => clearInterval(interval), 2000);
        } else {
            setTitleModal(data.message);
        }
    };

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: colors.white,
            }}>
            <Header onClickLeft={() => navigation.goBack()} back title="Chi tiết đơn hàng" />
            <ScrollView style={{marginVertical: 20}} showsVerticalScrollIndicator={false}>
                <RowView
                    justifyContent="space-between"
                    style={{
                        paddingHorizontal: 20,
                        paddingBottom: 30,
                        borderBottomColor: colors.grey,
                        borderBottomWidth: 1,
                    }}>
                    <RowView>
                        <StatusOrderSvg />
                        <Typography size18 lineHeight={21} bold darkGrey style={{marginHorizontal: 10}}>
                            Trạng thái đơn
                        </Typography>
                    </RowView>
                    <Typography
                        size16
                        lineHeight={19}
                        bold
                        color={OrderStatus.Cancel == order.status ? colors.error : colors.primary}>
                        {transferOrderStatus(order.status)}
                    </Typography>
                </RowView>
                <View
                    style={{
                        paddingHorizontal: 20,
                        paddingVertical: 30,
                        borderBottomColor: colors.grey,
                        borderBottomWidth: 1,
                    }}>
                    <RowView>
                        <LocationSvg />
                        <Typography size18 lineHeight={21} bold darkGrey style={{marginHorizontal: 10}}>
                            Giao đến
                        </Typography>
                    </RowView>
                    <Typography primary size16 lineHeight={19} bold style={{marginVertical: 10}}>
                        {order.name} - {formatToPhone(order.phone)}
                    </Typography>
                    <Typography darkGrey size16 lineHeight={24}>
                        {order.address} , {order.addressWard.pathWithType}
                    </Typography>
                </View>

                <View
                    style={{
                        paddingVertical: 30,
                        borderBottomColor: colors.grey,
                        borderBottomWidth: 1,
                    }}>
                    <RowView style={{marginHorizontal: 20}}>
                        <BooksSvg />
                        <Typography size18 lineHeight={21} bold darkGrey style={{marginHorizontal: 10}}>
                            Sản phẩm đã chọn
                        </Typography>
                    </RowView>
                    <View
                        style={{
                            marginHorizontal: 20,
                            paddingBottom: 20,
                            borderBottomColor: colors.grey,
                            borderBottomWidth: 1,
                        }}>
                        {order.orderDetails.map((book, index) => {
                            return (
                                <RowView key={index} justifyContent="space-between">
                                    <View style={{flexDirection: 'column', marginVertical: 10, width: '70%'}}>
                                        <Typography darkGrey size16 lineHeight={19} style={{marginVertical: 3}}>
                                            {book.book.name}
                                        </Typography>
                                        <Typography mediumGrey size14 lineHeight={16}>
                                            {formatPrice(book.finalPrice)} x {book.quantity}
                                        </Typography>
                                    </View>
                                    <Typography right primary size14 lineHeight={16} style={{flex: 1}} bold>
                                        {formatPrice(book.finalPrice * book.quantity)}
                                    </Typography>
                                </RowView>
                            );
                        })}
                    </View>
                    <View
                        style={{
                            marginHorizontal: 20,
                        }}>
                        <RowView justifyContent="space-between" style={{marginVertical: 15}}>
                            <Typography size16 lineHeight={19} darkGrey>
                                Tổng tạm tính
                            </Typography>
                            <Typography size16 lineHeight={19} primary bold>
                                {formatPrice(order.moneyTotal)}
                            </Typography>
                        </RowView>
                        <RowView justifyContent="space-between">
                            <Typography size16 lineHeight={19} darkGrey>
                                Phí vận chuyển
                            </Typography>
                            <Typography size16 lineHeight={19} primary bold>
                                {formatPrice(order.moneyDistance)}
                            </Typography>
                        </RowView>
                    </View>
                </View>
                <View
                    style={{
                        paddingHorizontal: 20,
                        paddingVertical: 30,
                        borderBottomColor: colors.grey,
                        borderBottomWidth: 1,
                    }}>
                    <RowView justifyContent="space-between">
                        <RowView>
                            <PromoSvg />
                            <Typography size18 lineHeight={21} bold darkGrey style={{marginHorizontal: 10}}>
                                Mã khuyến mãi
                            </Typography>
                        </RowView>
                        <Typography size16 lineHeight={24}>
                            {order.promotion && order.promotion.code}
                        </Typography>
                    </RowView>
                    <RowView justifyContent="space-between" style={{marginVertical: 10}}>
                        <Typography size16 lineHeight={19}>
                            Tiền được khuyến mãi
                        </Typography>
                        <Typography size16 lineHeight={19} primary bold>
                            {formatPrice(order.moneyDiscount)}
                        </Typography>
                    </RowView>
                </View>
                <View
                    style={{
                        paddingHorizontal: 20,
                        paddingVertical: 30,
                    }}>
                    <RowView justifyContent="space-between">
                        <RowView>
                            <PaymentMethodSvg />
                            <Typography size18 lineHeight={21} bold darkGrey style={{marginHorizontal: 10}}>
                                Hình thức thanh toán
                            </Typography>
                        </RowView>
                        <Button
                            border
                            title={transferPaymentMethod(order.paymentType)}
                            titleStyle={{fontSize: 14, lineHeight: 16}}
                            containerStyle={{height: 30, borderRadius: 7, paddingHorizontal: 10, paddingVertical: 5}}
                        />
                    </RowView>
                </View>
                <View
                    style={{
                        paddingHorizontal: 20,
                        paddingTop: 20,
                    }}>
                    <RowView style={{}} justifyContent="space-between">
                        <Typography bold size={20} lineHeight={23} darkGrey transform="uppercase">
                            Tổng cộng
                        </Typography>
                        <Typography bold size={20} lineHeight={23} primary>
                            {formatPrice(order.moneyFinal)}
                        </Typography>
                    </RowView>

                    <Button
                        title="HUỶ ĐƠN"
                        containerStyle={{borderRadius: 7, marginTop: 20, backgroundColor: colors.error}}
                        onPress={() => setIsVisible(true)}
                        disabled={order.status !== OrderStatus.Pending}
                    />
                </View>
            </ScrollView>

            <CustomModal
                isVisible={isVisible}
                closeModal={setIsVisible}
                error
                message={loading ? null : titleModal}
                title={'Huỷ đơn'}
                notCloseWhenSubbmit={true}
                action={!isCancalOrder}
                funcAction={() => !isCancalOrder && handleCancelOrder(order.id)}
                animationInTiming={700}
                animationIn={'slideInDown'}
                animationOut={'slideOutDown'}
                animationOutTiming={500}>
                {loading ? (
                    <View style={{flex: 1, marginVertical: 50, justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator size="large" color={colors.primary} />
                    </View>
                ) : (
                    <></>
                )}
            </CustomModal>
        </View>
    );
});

const styles = StyleSheet.create({
    containerModalAlert: {
        flexDirection: 'column',
        width: '100%',
        height: SCREEN_HEIGHT * 0.2,
        backgroundColor: 'white',
        borderRadius: 7,
        paddingHorizontal: 10,
        paddingVertical: 5,
        justifyContent: 'center',
    },
});
export default DetailOrderHistoryScreen;
