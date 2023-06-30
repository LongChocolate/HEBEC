import {Animated, StyleSheet, ToastAndroid, View, Image} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import {SETTING_ACCOUNT_HAVELOGIN, SETTING_ACCOUNT_NOLOGIN} from '@/constraints/settingAccount';
import Typography from '@/components/Text/Typography';
import {ItemMenu} from '@/components/Item/ItemMenuSetting';
import {NavigationScreens} from '@/utils/enum';
import {ImageView} from '@/components/Image/ImageDefault';
import {LocalStorage} from '@/utils/LocalStorage';
import {Header} from '@/layouts/Header/Header';
import {ScrollView} from 'react-native-gesture-handler';
import {userStore} from '@/store/UserStore';
import {observer} from 'mobx-react';
import CustomModal from '@/components/Modal/CustomModal';
import {colors} from '@/styles/theme';
import {GoogleSignin} from '@react-native-google-signin/google-signin';


const sizeImage = 100;

const AccountScreen = observer(({navigation}) => {
    const [isVisible, setIsVisible] = useState(false);
    const menuSetting = userStore.getLogin ? SETTING_ACCOUNT_HAVELOGIN : SETTING_ACCOUNT_NOLOGIN;

    const handleLogin = () => {
        navigation.navigate(NavigationScreens.Auth);
    };

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
        setIsVisible(false);
        navigation.navigate(NavigationScreens.Auth);
    };
    const viewProfile = () => {
        navigation.navigate(NavigationScreens.Profile);
    };
    const changePassword = () => {
        navigation.navigate(NavigationScreens.ChangePass);
    };

    const viewHistory = () => {
        navigation.navigate(NavigationScreens.History);
    };
    const checkFunction = (type) => {
        switch (type) {
            case 'login':
                handleLogin();
                break;
            case 'logout':
                setIsVisible(true);
                break;
            case 'profile':
                viewProfile();
                break;
            case 'changePassword':
                changePassword();
                break;
            case 'historyShop':
                viewHistory();
                break;
            default:
                break;
        }
    };

    return (
        <Animated.View
            style={{
                flex: 1,
            }}>
            <Header cart title="Tài khoản" />
            <ScrollView showsVerticalScrollIndicator={false}>
                {userStore.getLogin && (
                    <View
                        style={{
                            paddingVertical: 20,
                            width: '100%',
                            alignItems: 'center',
                            backgroundColor: '#C0C0C0',
                        }}>
                        {userStore.getInfo.image ? (
                            <Image source={{uri: userStore.getInfo.image}} style={styles.image} />
                        ) : (
                            <ImageView size={sizeImage} containerStyle={styles.image} border />
                        )}
                        <View
                            style={{
                                width: '100%',
                                paddingVertical: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Typography bold lineHeight={23} size18 style={{paddingVertical: 2}}>
                                {userStore.getInfo.name}
                            </Typography>
                            <Typography size16 lineHeight={19}>
                                Lớp ?? - MS ??
                            </Typography>
                        </View>
                    </View>
                )}
                {menuSetting.map((item, index) => {
                    return (
                        <View key={index}>
                            {!!item.titleGroup && (
                                <Typography
                                    size16
                                    lineHeight={19}
                                    transform="uppercase"
                                    style={styles.titleGroup}
                                    medium>
                                    {item.titleGroup}
                                </Typography>
                            )}
                            {item.unit.map((itemMenu, itemIndex) => {
                                return (
                                    <ItemMenu
                                        chat={itemMenu.chat}
                                        key={itemIndex}
                                        icon={itemMenu.icon}
                                        title={itemMenu.title}
                                        access={itemMenu.access}
                                        split={itemMenu.split}
                                        primary={itemMenu.primary}
                                        onPress={async () => itemMenu.function && checkFunction(itemMenu.function)}
                                    />
                                );
                            })}
                        </View>
                    );
                })}
                <CustomModal
                    isVisible={isVisible}
                    title="Đăng xuất"
                    message="Bạn có chắc chắn muốn đăng xuất?"
                    closeModal={setIsVisible}
                    funcAction={handleLogout}
                    animationInTiming={750}
                    animationIn={'slideInDown'}
                    animationOutTiming={750}
                    animationOut={'slideOutDown'}
                    action
                />
            </ScrollView>
        </Animated.View>
    );
});

const styles = StyleSheet.create({
    image: {
        height: sizeImage,
        width: sizeImage,
        borderRadius: sizeImage / 2,

        borderWidth: sizeImage * 0.02,
        borderColor: colors.mediumGrey,
        justifyContent: 'center',
        alignItems: 'center',
    },

    titleGroup: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontWeight: 'bold',
        backgroundColor: '#C0C0C0',
    },
});

export default AccountScreen;
