import {ScrollView, View, StyleSheet, Image, ToastAndroid} from 'react-native';
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';

import {colors, fonts} from '@/styles/theme';
import {Header} from '@/layouts/Header/Header';
import {observer} from 'mobx-react';
import {RowView} from '@/components/View/RowView';
import Typography from '@/components/Text/Typography';
import {cartStore} from '@/store/CartStore';
import {ElInput} from '@/components/Input/ElInput';
import Validator from '@/utils/validate';
import {REM, SCREEN_WIDTH} from '@/styles/dimensions';
import Button from '@/components/Button/MyButton';
import {NavigationScreens} from '@/utils/enum';
import {DropDown} from '@/components/DropDown/DropDownItem';
import * as fetchAddress from '@/api/address.api';
import * as fetchOrder from '@/api/order.api';
import {userStore} from '@/store/UserStore';
import {orderStore} from '@/store/OrderStore';

const PaymentScreenStep1 = observer(({navigation}) => {
    const [form, setForm] = useState({name: '', phone: '', address: '', idCity: '', idWard: '', idDistrict: ''});
    const [errors, setErrors] = useState({});

    const [city, setCity] = useState([]);
    const [district, setDistrict] = useState([]);
    const [ward, setWard] = useState([]);

    const [codeAddress, setCodeAddress] = useState({city: '', ward: '', district: ''});

    const handleChangeValue = (name: string, value: string): any => {
        if (!!value) {
            setErrors((prev) => {
                return {...prev, [name]: null};
            });
            setForm((prev) => {
                return {...prev, [name]: value};
            });
        } else {
            setForm((prev) => {
                return {...prev, [name]: ''};
            });
        }
    };

    const handleBlur = useCallback(
        (name: string) => {
            const result = Validator({
                form: form,
                rules: [Validator.isRequired(name)],
            });
            setErrors((prev) => {
                return {...prev, [name]: result.error[name]};
            });
        },
        [form],
    );

    const handleSubmit = async () => {
        const result = await Validator({
            form: form,
            rules: [
                Validator.isRequired('name', 'Họ tên'),
                Validator.isChar('name', 'Họ tên'),
                Validator.isRequired('phone', 'Số điện thoại'),
                Validator.isLength('phone', 10, 'Số điện thoại'),
                Validator.isRequired('idCity', 'Tỉnh / Thành phố'),
                Validator.isRequired('idDistrict', 'Quận / Huyện'),
                Validator.isRequired('idWard', 'Phường / Xã'),
                Validator.isRequired('address', 'Địa chỉ'),
            ],
        });
        setErrors(result.error);
        if (result.status) {
            orderStore.updateForm(form, cartStore.getProduct);

            navigation.navigate(NavigationScreens.PaymentProcessStep2);
        }
    };

    useLayoutEffect(() => {
        const fetchAddressDistrict = async () => {
            const result = await fetchAddress.getAddressDistrict(userStore.getToken, codeAddress.city);
            const data = result.data.data;
            if (result.status === 200) {
                setDistrict(data.data);
            }
        };
        const fetchAddressWard = async () => {
            const result = await fetchAddress.getAddressWard(userStore.getToken, codeAddress.district);
            const data = result.data.data;
            if (result.status === 200) {
                setWard(data.data);
            }
        };
        if (form.idCity) {
            fetchAddressDistrict();
        }
        if (form.idDistrict) {
            fetchAddressWard();
        }
    }, [form.idCity, form.idDistrict]);

    useEffect(() => {
        const fetchAddressCity = async () => {
            const result = await fetchAddress.getAddressCity(userStore.getToken);
            const data = result.data.data;
            if (result.status === 200) {
                setCity(data.data);
            } else {
                ToastAndroid.show('Vui lòng kiểm tra kết nối mạng', ToastAndroid.LONG);
            }
        };
        fetchAddressCity();
    }, []);
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: colors.white,
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}>
            <Header onClickLeft={() => navigation.goBack()} back title="Thanh toán" />
            <ScrollView style={{padding: 20}} showsVerticalScrollIndicator={false}>
                <Typography size16 lineHeight={24} bold darkGrey center>
                    Địa chỉ giao hàng
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
                        <Typography size18 bold white>
                            1
                        </Typography>
                    </View>
                    <View
                        style={{
                            height: 3,
                            width: 50,
                            backgroundColor: colors.grey,
                        }}
                    />
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
                <View style={{marginVertical: 20}}>
                    <ElInput
                        label="Họ tên người nhận"
                        containerStyle={{marginVertical: 10}}
                        placeholder="Nhập họ tên người nhận hàng"
                        errorMessage={errors['name']}
                        onChangeText={(value) => handleChangeValue('name', value)}
                        onBlur={() => handleBlur('name')}
                        value={form.name}
                        showRequire
                    />
                    <ElInput
                        label="Số điện thoại"
                        containerStyle={{marginVertical: 10}}
                        placeholder="Nhập số điện thoại người nhận hàng"
                        errorMessage={errors['phone']}
                        onChangeText={(value) => handleChangeValue('phone', value)}
                        onBlur={() => handleBlur('phone')}
                        keyboardType="phone-pad"
                        value={form.phone}
                        showRequire
                        maxLength={10}
                    />
                    <DropDown
                        label={'Tỉnh / Thành phố'}
                        showRequire
                        placeholder={'Chọn tỉnh / thành phố'}
                        data={city}
                        containerStyle={{marginVertical: 10}}
                        buttonTextAfterSelection={(selectedItem) => {
                            return selectedItem.name;
                        }}
                        rowTextForSelection={(item) => {
                            return item.name;
                        }}
                        onSelect={(selectedItem) => {
                            handleChangeValue('idCity', selectedItem.id + '');
                            setDistrict([]);
                            setWard([]);
                            setCodeAddress((prev) => {
                                return {...prev, ['city']: selectedItem.code};
                            });
                        }}
                        errorMessage={errors['idCity']}
                    />
                    <DropDown
                        label={'Quận / Huyện'}
                        showRequire
                        placeholder={'Chọn quận / huyện'}
                        data={district}
                        containerStyle={{marginVertical: 10}}
                        disabled={form.idCity ? false : true}
                        buttonTextAfterSelection={(selectedItem) => {
                            return selectedItem.nameWithType;
                        }}
                        rowTextForSelection={(item) => {
                            return item.nameWithType;
                        }}
                        onSelect={(selectedItem) => {
                            handleChangeValue('idDistrict', selectedItem.id + '');
                            setWard([]);
                            setCodeAddress((prev) => {
                                return {...prev, ['district']: selectedItem.code};
                            });
                        }}
                        errorMessage={errors['idDistrict']}
                    />
                    <DropDown
                        label={'Phường / Xã'}
                        showRequire
                        placeholder={'Chọn phường / xã'}
                        data={ward}
                        containerStyle={{marginVertical: 10}}
                        disabled={form.idDistrict ? false : true}
                        buttonTextAfterSelection={(selectedItem) => {
                            return selectedItem.nameWithType;
                        }}
                        rowTextForSelection={(item) => {
                            return item.nameWithType;
                        }}
                        onSelect={(selectedItem) => {
                            handleChangeValue('idWard', selectedItem.id + '');
                            setCodeAddress((prev) => {
                                return {...prev, ['ward']: selectedItem.code};
                            });
                        }}
                        errorMessage={errors['idWard']}
                    />
                    <ElInput
                        label="Địa chỉ"
                        containerStyle={{marginVertical: 10}}
                        placeholder="VD: 1 Đường Bạch Đằng"
                        errorMessage={errors['address']}
                        onChangeText={(value) => handleChangeValue('address', value)}
                        onBlur={() => handleBlur('address')}
                        value={form.address}
                        showRequire
                    />
                </View>
                <View style={{alignItems: 'center', marginBottom: 40}}>
                    <Button title="Tiếp theo" style={{width: SCREEN_WIDTH / 2}} onPress={() => handleSubmit()} />
                </View>
            </ScrollView>
        </View>
    );
});

export default PaymentScreenStep1;
