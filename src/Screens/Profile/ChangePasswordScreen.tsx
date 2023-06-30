import {
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ToastAndroid,
    View,
    Dimensions,
    ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import React, {useState} from 'react';

import {ElInput} from '@/components/Input/ElInput';
import {colors, sizes} from '@/styles/theme';
import {REM} from '@/styles/dimensions';
import Button from '@/components/Button/MyButton';
import * as fetch from '@/api/auth.api';
import Validator from '@/utils/validate';
import {ButtonCustom} from '@/components/Button/Button';
import Typography from '@/components/Text/Typography';
import {ShadowCard} from '@/components/Card/ShadowCard';
import {Header} from '@/layouts/Header/Header';
import {userStore} from '@/store/UserStore';
import {observer} from 'mobx-react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LocalStorage} from '@/utils/LocalStorage';
import {NavigationScreens} from '@/utils/enum';

const ChangePasswordScreen = observer(({navigation}) => {
    const [form, setForm] = useState({oldPassword: '', newPassword: '', newPasswordConfirm: ''});
    const [errors, setErrors] = useState({});

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [titleAlert, setTitleAlert] = useState('');

    const signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
        } catch (error) {
            ToastAndroid.show(error, ToastAndroid.LONG);
        }
    };
    const isGoogleSignIn = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn();
        if (isSignedIn) {
            signOut();
        }
    };

    const handleLogout = async () => {
        isGoogleSignIn();

        LocalStorage.remove('token');
        LocalStorage.remove('info');
        LocalStorage.remove('cart');

        userStore.reset();

        navigation.navigate(NavigationScreens.Auth);
    };
    const handleBackModal = () => {
        setIsModalVisible(false);
        handleLogout();
    };

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

    const handleBlur = (name: string) => {
        const result = Validator({
            form: form,
            rules: [Validator.isRequired(name)],
        });
        setErrors((prev) => {
            return {...prev, [name]: result.error[name]};
        });
    };

    const handleSavePassword = () => {
        // Fetch api

        const fetchApi = async () => {
            //axois
            setLoading(true);
            setIsModalVisible(true);
            const result = await fetch.updatePassword(userStore.getToken, form.oldPassword, form.newPassword);
            const data = result.data;
            setLoading(false);

            if (result.status === 200) {
                setTitleAlert(data.message);
            } else if (result.status === 400) {
                setIsModalVisible(false);
                ToastAndroid.show(data.message + '', ToastAndroid.LONG);
            } else if (result.status === 401) {
                userStore.reset();
                setTitleAlert(data.message);
            }
        };

        const checkSave = async () => {
            const result = await Validator({
                form: form,
                rules: [
                    Validator.isRequired('oldPassword', 'Mật khẩu hiện tại'),
                    Validator.isRequired('newPassword', 'Mật khẩu mới'),
                    Validator.isLength('newPassword', 6, 'Mật khẩu mới'),
                    Validator.isRequired('newPasswordConfirm', 'xác nhận Mật khẩu mới'),
                    Validator.isConfirmed('newPasswordConfirm', form.newPassword, 'Mật khẩu xác nhận'),
                ],
            });
            setErrors(result.error);

            if (result.status) {
                fetchApi();
            }
        };

        checkSave();
    };
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{flex: 1, backgroundColor: colors.white}}>
            <Header onClickLeft={() => navigation.goBack()} back title="Đổi mật khẩu" />
            <ElInput
                label="Mật khẩu hiện tại"
                placeholder="Nhập mật khẩu hiện tại"
                containerStyle={styles.containerInputOldPassword}
                onChangeText={(value) => handleChangeValue('oldPassword', value)}
                onBlur={() => handleBlur('oldPassword')}
                showRequire
                secureTextEntry
                errorMessage={errors['oldPassword']}
            />
            <ElInput
                label="Mật khẩu mới"
                placeholder="Nhập Mật khẩu mới"
                containerStyle={styles.containerInputNewPassword}
                onChangeText={(value) => handleChangeValue('newPassword', value)}
                onBlur={() => handleBlur('newPassword')}
                secureTextEntry
                showRequire
                errorMessage={errors['newPassword']}
            />
            <ElInput
                label="Xác nhận lại mật khẩu mới"
                placeholder="Nhập lại mật khẩu mới"
                containerStyle={styles.containerInputConfirmPassword}
                onChangeText={(value) => handleChangeValue('newPasswordConfirm', value)}
                onBlur={() => handleBlur('newPasswordConfirm')}
                secureTextEntry
                showRequire
                errorMessage={errors['newPasswordConfirm']}
            />

            <Button
                title="Lưu"
                containerStyle={styles.containerBtnSave}
                titleStyle={styles.titleBtnSave}
                onPress={() => handleSavePassword()}
            />
            <Modal isVisible={isModalVisible}>
                <ShadowCard style={styles.containerModalAlert}>
                    {loading ? (
                        <View style={{flex: 1, marginVertical: 50, justifyContent: 'center', alignItems: 'center'}}>
                            <ActivityIndicator size="large" color={colors.primary} />
                        </View>
                    ) : (
                        <>
                            <Typography size16 center style={{margin: 15}}>
                                {titleAlert}. Bạn cần đăng nhập lại
                            </Typography>
                            <ButtonCustom
                                style={{
                                    marginTop: 30,
                                    marginBottom: 10,
                                    padding: 5,
                                    alignContent: 'flex-end',
                                    alignSelf: 'flex-end',
                                    width: 50,
                                }}
                                onPress={() => {
                                    handleBackModal();
                                }}>
                                <Typography size18 lineHeight={21} primary bold>
                                    OK
                                </Typography>
                            </ButtonCustom>
                        </>
                    )}
                </ShadowCard>
            </Modal>
        </KeyboardAvoidingView>
    );
});
const styles = StyleSheet.create({
    // Modal

    containerModalAlert: {
        width: '100%',
        height: Dimensions.get('window').height * 0.2,
        backgroundColor: 'white',
        borderRadius: 7,
        paddingHorizontal: 10,
        paddingVertical: 5,
        justifyContent: 'center',
    },
    //input

    containerInputOldPassword: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginRight: 5,

        padding: 0,
        position: 'absolute',
        width: REM * 374,
        height: 71,
        left: REM * 20,
        top: 90,
    },
    containerInputNewPassword: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginRight: 5,
        padding: 0,
        position: 'absolute',
        width: REM * 374,
        height: 71,
        left: REM * 20,
        top: 190,
    },
    containerInputConfirmPassword: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginRight: 5,
        padding: 0,
        position: 'absolute',
        width: REM * 374,
        height: 71,
        left: REM * 20,
        top: 290,
    },

    // Btn Save
    containerBtnSave: {
        flexDirection: 'column',
        paddingHorizontal: 20,
        paddingVertical: 23,
        position: 'absolute',
        width: REM * 200,
        height: 50,
        left: REM * 107,
        top: 350,
    },
    titleBtnSave: {
        width: 180,
        height: 24,
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: sizes.size16,
        lineHeight: 24,

        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center',

        color: '#FFFFFF',
        flexGrow: 0,
    },
});

export default ChangePasswordScreen;
