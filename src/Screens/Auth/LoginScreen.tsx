import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    View,
    Platform,
    ToastAndroid,
    ActivityIndicator,
    Animated,
    Easing,
} from 'react-native';

import {LogoHebecSchoolSvg} from '@/assets/svg/LogoHebecSchool';
import {ElInput} from '@/components/Input/ElInput';
import {colors, sizes} from '@/styles/theme';
import {WaterMarkBackView} from '@/components/View/WaterMarkBackView';
import Typography from '@/components/Text/Typography';
import {CloseSvg} from '@/assets/svg/CloseSvg';
import Button from '@/components/Button/MyButton';
import {NavigationScreens} from '@/utils/enum';
import {RowView} from '@/components/View/RowView';
import {ButtonCustom} from '@/components/Button/Button';
import * as fetch from '@/api/auth.api';
import Validator from '@/utils/validate';
import {LocalStorage} from '@/utils/LocalStorage';
import {userStore} from '@/store/UserStore';
import {observer} from 'mobx-react';
import CustomModal from '@/components/Modal/CustomModal';
import {cartStore} from '@/store/CartStore';

import messaging from '@react-native-firebase/messaging';
import {useNavigation} from '@react-navigation/native';

import {GoogleSignin, GoogleSigninButton, statusCodes} from '@react-native-google-signin/google-signin';
import {AccessToken, LoginButton} from 'react-native-fbsdk-next';

// import { Header } from 'react-navigation-stack';

const LoginScreen = observer(({navigation}) => {
    const {navigate} = useNavigation();
    const [form, setForm] = useState({username: '', password: ''});
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

    const checkToken = async () => {
        const fcmToken = await messaging().getToken();
        return fcmToken;
    };

    const fetchInfoApi = async (token: string) => {
        //axois
        const fcmToken = await checkToken();
        const result = await fetch.getInfoApi(token, fcmToken);
        const data = result.data.data;
        if (result.status === 200) {
            const profile = {
                phone: data.phone,
                name: data.name,
                address: data.address,
                email: data.email,
                gender: data.gender,
                image: data.thumbnail,
            };
            LocalStorage.set('info', JSON.stringify(profile));
            userStore.update(profile);
        }
    };

    const handleLogin = useCallback(() => {
        // Fetch api

        const fetchApiLogin = async () => {
            //axois
            setLoadingSubbmit(true);

            const result = await fetch.loginApi(form.username, form.password);
            const data = result.data;
            if (result.status == 200) {
                setLoadingSubbmit(false);

                LocalStorage.set('token', data.data.token);

                userStore.saveToken(data.data.token);

                fetchInfoApi(data.data.token);

                navigate(NavigationScreens.Home);
            } else {
                ToastAndroid.show(data.message + '', ToastAndroid.LONG);
            }
            setLoadingSubbmit(false);
        };

        const checkSubmit = async () => {
            const result = await Validator({
                form: form,
                rules: [
                    Validator.isRequired('username', 'Số điện thoại'),
                    Validator.isRequired('password', 'Mật khẩu'),
                ],
            });
            setErrors(result.error);
            if (result.status) {
                fetchApiLogin();
            }
        };
        checkSubmit();
    }, [form]);

    const fadeAnim = useRef(new Animated.Value(0)).current;

    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false,
        }).start();
    };

    navigation.addListener(
        'focus',
        () => {
            fadeIn();
        },
        [],
    );

    const GoogleSignUp = async () => {
        try {
            setLoadingSubbmit(true);
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const result = await fetch.googleLogin(userInfo.user.id);
            setLoadingSubbmit(false);

            const data = result.data;
            if (result.status == 200) {
                if (data.status) {
                    LocalStorage.set('token', data.data.token);

                    userStore.saveToken(data.data.token);
                    const cart = JSON.parse(await LocalStorage.get('cart'));
                    cartStore.setCart(cart);

                    fetchInfoApi(data.data.token);

                    setLoadingSubbmit(false);

                    navigate(NavigationScreens.Home);
                } else {
                    navigation.navigate(NavigationScreens.Register, {type: userInfo.user.id});
                }
            } else {
                ToastAndroid.show(result.data.message, ToastAndroid.LONG);
            }
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                alert('Huỷ đăng nhập !');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                alert('Đang đăng nhập...');
                // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                alert('Dịch vụ google không được hỗ trợ hoặc quá cũ !');
                // play services not available or outdated
            } else {
                console.log(error + ' Lỗi gì đó ');
            }
            setLoadingSubbmit(false);
        }
    };

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '843378072516-knr8f85rf8g52g9vplag66aed62f5o82.apps.googleusercontent.com',
            offlineAccess: true,
            forceCodeForRefreshToken: true,
        });
    }, []);
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{flex: 1}}>
            <Animated.View style={{flex: 1, opacity: fadeAnim}}>
                <WaterMarkBackView />
                <TouchableOpacity style={styles.containerCloseX} onPress={() => navigate(NavigationScreens.Home)}>
                    <CloseSvg size={30} />
                </TouchableOpacity>
                <View style={styles.containerLogoHeBec}>
                    <LogoHebecSchoolSvg size={250} />
                </View>
                <View style={{paddingHorizontal: 20}}>
                    <ElInput
                        label="Tên đăng nhập"
                        placeholder="Nhập tên đăng nhập"
                        containerStyle={styles.containerInput}
                        keyboardType="phone-pad"
                        maxLength={10}
                        errorMessage={errors['username']}
                        onChangeText={(value) => handleChangeValue('username', value)}
                        onBlur={() => handleBlur('username')}
                        value={form.username}
                    />
                    <ElInput
                        label="Mật khẩu"
                        placeholder="Nhập mật khẩu"
                        containerStyle={styles.containerInput}
                        secureTextEntry
                        errorMessage={errors['password']}
                        onChangeText={(value) => handleChangeValue('password', value)}
                        onBlur={() => handleBlur('password')}
                        value={form.password}
                    />
                    <CustomModal
                        isVisible={loadingSubbmit}
                        animationIn={'slideInDown'}
                        animationInTiming={700}
                        animationOutTiming={700}
                        animationOut={'slideOutDown'}
                        useNativeDriver={true}>
                        <Typography size16 transform="uppercase" center style={{margin: 15}}>
                            Đang đăng nhập....
                        </Typography>
                        <View style={{flex: 1, marginVertical: 50, justifyContent: 'center', alignItems: 'center'}}>
                            <ActivityIndicator size="large" color={colors.primary} />
                        </View>
                    </CustomModal>
                    <Button title="Đăng nhập" containerStyle={styles.containerBtnLogin} onPress={() => handleLogin()} />

                    {/* <LoginButton
                        onLoginFinished={(error, result) => {
                            if (error) {
                                console.log(error);
                            } else if (result.isCancelled) {
                                console.log('login is cancelled.');
                            } else {
                                AccessToken.getCurrentAccessToken().then((data) => {
                                    console.log(data.accessToken.toString());
                                });
                            }
                        }}
                        style={styles.containerFbLogin}
                    /> */}

                    <GoogleSigninButton
                        style={{borderWidth: 1, paddingVertical: 25, width: '100%'}}
                        size={GoogleSigninButton.Size.Wide}
                        color={GoogleSigninButton.Color.Light}
                        onPress={GoogleSignUp}
                    />

                    <RowView style={styles.containerRegister}>
                        <Typography center lineHeight={16.41} size14 mediumGrey>
                            Bạn chưa có tài khoản?
                        </Typography>
                        <ButtonCustom onPress={() => navigation.navigate(NavigationScreens.Register)}>
                            <Typography center lineHeight={16.41} size14 primary>
                                Đăng ký
                            </Typography>
                        </ButtonCustom>
                    </RowView>
                </View>
            </Animated.View>
        </KeyboardAvoidingView>
    );
});

const styles = StyleSheet.create({
    //icon
    containerCloseX: {
        marginTop: 20,
        marginBottom: 30,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginHorizontal: 20,
    },

    containerLogoHeBec: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
    },

    //input
    containerInput: {
        marginBottom: 15,
    },

    // ForgotPassword
    containerForgotPassword: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 40,
    },

    // Btn Login
    containerBtnLogin: {
        alignSelf: 'center',
        width: 200,
        borderRadius: 7,
        marginVertical: 20,
    },

    containerFbLogin: {
        borderRadius: 7,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: colors.darkBlue,
        height: 40,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        textAlignVertical: 'center',
    },

    containerGgLogin: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: colors.error,
    },

    // Register

    containerRegister: {
        justifyContent: 'center',
    },
});

export default LoginScreen;
