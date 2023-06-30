import {
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ToastAndroid,
    View,
    ActivityIndicator,
    Dimensions,
} from 'react-native';
import React, {useCallback, useState} from 'react';

import {ElInput} from '@/components/Input/ElInput';
import {colors, sizes} from '@/styles/theme';
import {WaterMarkBackView} from '@/components/View/WaterMarkBackView';
import Typography from '@/components/Text/Typography';
import {REM} from '@/styles/dimensions';
import Button from '@/components/Button/MyButton';
import {NavigationScreens} from '@/utils/enum';
import {RowView} from '@/components/View/RowView';
import {ButtonCustom} from '@/components/Button/Button';
import {BackSvg} from '@/assets/svg/BackSvg';
import * as fetch from '@/api/auth.api';
import Validator from '@/utils/validate';

import CustomModal from '@/components/Modal/CustomModal';

const RegisterScreen = ({navigation, route}) => {
    const [form, setForm] = useState({username: '', name: '', password: '', passwordConfirm: ''});
    const [errors, setErrors] = useState({});

    const [loadingSubbmit, setLoadingSubbmit] = useState(false);

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

    const handleRegister = useCallback(() => {
        // Fetch api

        const fetchApi = async () => {
            //axois
            setLoadingSubbmit(true);
            const result = await fetch.registerApi(form, route?.params?.type);
            const data = result.data;

            if (result.status === 200) {
                setLoadingSubbmit(false);
                navigation.navigate(NavigationScreens.RegisterSuccess);
            } else {
                setLoadingSubbmit(false);
                ToastAndroid.show(data.message + '', ToastAndroid.LONG);
            }
        };

        const checkSubmit = async () => {
            const checkPassword = [
                Validator.isRequired('password', 'Mật khẩu'),
                Validator.isLength('password', 6, 'Mật khẩu'),
                Validator.isRequired('passwordConfirm', 'Mật khẩu xác nhận'),
                Validator.isConfirmed('passwordConfirm', form.password, 'Mật khẩu xác nhận'),
            ];

            const checkAccount = [
                Validator.isRequired('username', 'Số điện thoại'),
                Validator.isRequired('name', 'Họ tên'),
                Validator.isChar('name', 'Họ tên'),
            ];

            const result = await Validator({
                form: form,
                rules: !route?.params?.type ? [...checkAccount, ...checkPassword] : [...checkAccount],
            });
            setErrors(result.error);
            if (result.status) {
                fetchApi();
            }
        };
        checkSubmit();
    }, [form]);

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{flex: 1}}>
            <RowView justifyContent="space-around" style={styles.titleRegister}>
                <ButtonCustom containerStyle={styles.containerBtnBack} onPress={() => navigation.goBack()}>
                    <BackSvg size={24} color={colors.darkGrey} />
                </ButtonCustom>
                <Typography size25 lineHeight={29} uppercase primary>
                    Đăng ký
                </Typography>
                <View style={styles.containerBtnBack}></View>
            </RowView>
            <View style={{paddingHorizontal: 20}}>
                <ElInput
                    label="Số điện thoại (tên đăng nhập)"
                    placeholder="Nhập SĐT"
                    containerStyle={styles.containerInput}
                    onChangeText={(value) => handleChangeValue('username', value)}
                    onBlur={() => handleBlur('username')}
                    showRequire
                    keyboardType="phone-pad"
                    maxLength={10}
                    errorMessage={errors['username']}
                    value={form.username}
                />
                <ElInput
                    label="Họ và tên"
                    placeholder="Nhập họ tên "
                    containerStyle={styles.containerInput}
                    onChangeText={(value) => handleChangeValue('name', value)}
                    onBlur={() => handleBlur('name')}
                    showRequire
                    errorMessage={errors['name']}
                    value={form.name}
                />
                {!route?.params?.type && (
                    <>
                        <ElInput
                            label="Mật khẩu"
                            placeholder="Mật khẩu"
                            containerStyle={styles.containerInput}
                            onChangeText={(value) => handleChangeValue('password', value)}
                            onBlur={() => handleBlur('password')}
                            secureTextEntry
                            showRequire
                            errorMessage={errors['password']}
                            value={form.password}
                        />
                        <ElInput
                            label="Nhập lại mật khẩu"
                            placeholder="Mật khẩu xác nhận"
                            containerStyle={styles.containerInput}
                            onChangeText={(value) => handleChangeValue('passwordConfirm', value)}
                            onBlur={() => handleBlur('passwordConfirm')}
                            secureTextEntry
                            showRequire
                            errorMessage={errors['passwordConfirm']}
                            value={form.passwordConfirm}
                        />
                    </>
                )}

                <CustomModal isVisible={loadingSubbmit}>
                    <Typography size16 transform="uppercase" center style={{margin: 15}}>
                        Đang đăng ký....
                    </Typography>
                    <View style={{flex: 1, marginVertical: 50, justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator size="large" color={colors.primary} />
                    </View>
                </CustomModal>
                <Button title="Đăng ký" containerStyle={styles.containerBtnRegister} onPress={() => handleRegister()} />

                <RowView style={styles.containerLogin}>
                    <Typography center lineHeight={16.41} size14 mediumGrey>
                        Bạn đã có tài khoản?
                    </Typography>
                    <ButtonCustom onPress={() => navigation.navigate(NavigationScreens.Login)}>
                        <Typography center lineHeight={16.41} size14 primary>
                            Đăng nhập ngay
                        </Typography>
                    </ButtonCustom>
                </RowView>
            </View>
        </KeyboardAvoidingView>
    );
};
const styles = StyleSheet.create({
    //title
    titleRegister: {
        marginVertical: 20,
    },
    containerBtnBack: {
        width: 50,
    },

    //input
    containerInput: {
        marginBottom: 15,
    },

    // Btn Register
    containerBtnRegister: {
        alignSelf: 'center',
        width: 200,
        marginVertical: 20,
    },

    // Login

    containerLogin: {
        justifyContent: 'center',
    },
});

export default RegisterScreen;
