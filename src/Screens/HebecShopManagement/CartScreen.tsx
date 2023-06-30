import {ScrollView, View} from 'react-native';
import React, {useState} from 'react';

import {colors} from '@/styles/theme';
import {Header} from '@/layouts/Header/Header';
import {userStore} from '@/store/UserStore';
import {observer} from 'mobx-react';
import {RowView} from '@/components/View/RowView';
import {BooksSvg} from '@/assets/svg/BooksSvg';
import Typography from '@/components/Text/Typography';
import {cartStore} from '@/store/CartStore';
import {ButtonCustom} from '@/components/Button/Button';
import {MinusSvg} from '@/assets/svg/MinusSvg';
import {PlusCircleSvg} from '@/assets/svg/PlusCircleSvg';
import {formatPrice} from '@/utils/helper';
import Button from '@/components/Button/MyButton';
import {NavigationScreens} from '@/utils/enum';
import CustomModal from '@/components/Modal/CustomModal';

const CartScreen = observer(({navigation}) => {
    const [isVisibleOne, setIsVisibleOne] = useState(false);
    const [isVisibleAll, setIsVisibleAll] = useState(false);

    const [idTarget, setIdTarget] = useState(0);
    const handleIncrease = (id, amount) => {
        cartStore.update(id, amount + 1);
    };

    const handleDecrease = (id, amount) => {
        if (amount > 0) {
            cartStore.update(id, amount - 1);
        }
    };

    const handleDelete = (type, id = 0, amount = 0) => {
        setIdTarget(id);
        switch (type) {
            case 'one':
                if (amount == 1) {
                    setIsVisibleOne(true);
                } else {
                    handleDecrease(id, amount);
                }
                break;

            case 'all':
                setIsVisibleAll(true);
                break;

            default:
                break;
        }
    };

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: colors.white,
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}>
            <Header onClickLeft={() => navigation.goBack()} back title="Giỏ hàng" />
            {userStore.getLogin && (
                <>
                    <RowView style={{padding: 20}} justifyContent="space-between">
                        <RowView>
                            <BooksSvg />
                            <Typography darkGrey size18 lineHeight={24} style={{paddingHorizontal: 10}} bold>
                                Sản phẩm đã chọn
                            </Typography>
                        </RowView>
                        {cartStore.getCountAll > 0 && (
                            <Typography error size14 bold onPress={() => handleDelete('all')}>
                                Xoá tất cả
                            </Typography>
                        )}
                    </RowView>
                    <View style={{paddingHorizontal: 20, width: '100%', flex: 1}}>
                        {cartStore.getProduct.map((product, index) => {
                            return (
                                <RowView key={index} justifyContent="space-between" style={{marginVertical: 10}}>
                                    <View style={{width: '70%'}}>
                                        <Typography size16 lineHeight={19} style={{marginBottom: 3, flexGrow: 0}}>
                                            {product.name} {product.bookId}
                                        </Typography>
                                        <Typography size14 primary lineHeight={16.5}>
                                            {formatPrice(product.price)}
                                        </Typography>
                                    </View>
                                    <RowView justifyContent="space-around">
                                        <ButtonCustom
                                            onPress={() => handleDelete('one', product.bookId, product.quantity)}>
                                            <MinusSvg />
                                        </ButtonCustom>
                                        <Typography bold size14 lineHeight={16} style={{width: 30}} center>
                                            {product.quantity}
                                        </Typography>
                                        <ButtonCustom onPress={() => handleIncrease(product.bookId, product.quantity)}>
                                            <PlusCircleSvg />
                                        </ButtonCustom>
                                    </RowView>
                                </RowView>
                            );
                        })}
                    </View>
                    <View
                        style={{
                            padding: 20,
                        }}>
                        <RowView style={{}} justifyContent="space-between">
                            <Typography bold size={20} lineHeight={23} darkGrey>
                                Tổng tạm tính
                            </Typography>
                            <Typography bold size={20} lineHeight={23} primary>
                                {formatPrice(cartStore.getTotal)}
                            </Typography>
                        </RowView>
                        <Button
                            title="Đặt sách"
                            style={{borderRadius: 7, marginTop: 20}}
                            disabled={cartStore.getCountAll == 0}
                            onPress={() => navigation.navigate(NavigationScreens.PaymentProcess)}
                        />
                    </View>
                    <CustomModal
                        isVisible={isVisibleOne}
                        message={'Bạn có chắc muốn xoá sản phẩm'}
                        title={'Xoá sản phẩm'}
                        error
                        closeModal={setIsVisibleOne}
                        funcAction={() => cartStore.removeProduct(idTarget)}
                        action
                        animationInTiming={700}
                        animationIn={'slideInDown'}
                        animationOut={'slideOutDown'}
                        animationOutTiming={500}
                    />
                    <CustomModal
                        isVisible={isVisibleAll}
                        message={'Bạn co chắc muốn xoa tất cả sản phẩm?'}
                        title={'Xoá tất cả sản phẩm'}
                        error
                        closeModal={setIsVisibleAll}
                        funcAction={() => cartStore.deleteAll()}
                        action
                        animationInTiming={700}
                        animationIn={'slideInDown'}
                        animationOut={'slideOutDown'}
                        animationOutTiming={500}
                        hideModalContentWhileAnimating={true}
                    />
                </>
            )}
        </View>
    );
});

export default CartScreen;
