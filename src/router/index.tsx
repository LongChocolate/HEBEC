import React, {useEffect, useLayoutEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {observer, Provider} from 'mobx-react';
import {HomeStack} from './Stack/HomeStack';
// import { SplashScreen } from "@/Screens/Splash/SplashScreen";
import {enableScreens} from 'react-native-screens';
import * as NetInfo from '@react-native-community/netinfo';

import messaging from '@react-native-firebase/messaging';
import {Splash} from '@/Screens/Splash';
import {userStore} from '@/store/UserStore';
import {bannerStore} from '@/store/BannerStore';
import {newsStore} from '@/store/NewsStore';
import {LocalStorage} from '@/utils/LocalStorage';
import {cartStore} from '@/store/CartStore';
import {cateStore} from '@/store/CategoriesStore';
import {notiStore} from '@/store/NotifcationStore';
import {Navigation} from '@/utils/Navigation';
import {historyStore} from '@/store/HistoryStore';
import Modal from 'react-native-modal/dist/modal';
import {ActivityIndicator, View, StyleSheet, Text} from 'react-native';
import {ButtonCustom} from '@/components/Button/Button';
import Typography from '@/components/Text/Typography';
import {colors} from '@/styles/theme';

enableScreens(false);

// const linking: LinkingOptions<ReactNavigation.RootParamList> = {
//   prefixes: ["hebecschool://"],
//   config: {
//     initialRouteName: "BottomTabNavigator",
//     screens: {
//       BottomTabNavigator: {
//         screens: {
//           HebecShopScreen: "shop",
//           OrderBookSuccessScreen: {
//             path: "/order/success",
//           },
//         },
//       },
//     },
//   },
// };

export const RootNavigator = observer((ref) => {
    const [splash, setSplash] = useState(true);

    const [isOffline, setOfflineStatus] = useState(false);
    const [loadingPage, setLoadingPage] = useState(false);
    const [loadingNetwork, setLoadingNetwork] = useState(false);

    const getSession = async () => {
        const userToken = await LocalStorage.get('token');
        const cart = JSON.parse(await LocalStorage.get('cart'));
        const userInfo = JSON.parse(await LocalStorage.get('info'));

        bannerStore.fetch();
        newsStore.fetch(1, 5, true);

        if (!userStore.getToken && userToken) {
            userStore.saveToken(userToken);
        }
        if (userToken && !userStore.getLogin) {
            userStore.loginUser();
            userStore.update(userInfo);
            cartStore.setCart(cart);
        }
        if (userToken) {
            cateStore.fetch(userToken);
            notiStore.fetch(1, 5, userToken, true);
            historyStore.fetch(1, 5, true);
        }
    };

    useEffect(() => {
        const myTimeOut = setTimeout(() => {
            setSplash(false);
        }, 2000);

        return () => clearTimeout(myTimeOut);
    }, []);

    const checkNetwork = () => {
        setLoadingNetwork(true);

        const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
            const offline = !(state.isConnected && state.isInternetReachable);
            setOfflineStatus(offline);

            if (!offline) {
                if (!userStore.getLogin) {
                    getSession();
                }
                setLoadingPage(false);
            } else {
                setLoadingPage(true);
            }
            const myTimeOut = setTimeout(() => {
                setLoadingNetwork(false);
            }, 2000);
        });

        return () => removeNetInfoSubscription();
    };

    useLayoutEffect(() => {
        checkNetwork();
    }, [userStore.getToken]);

    return (
        <NavigationContainer
            ref={(r) => {
                Navigation.setTopLevelNavigator(r);
            }}>
            {splash ? (
                <Splash />
            ) : (
                <>
                    {loadingPage ? (
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
                        <HomeStack />
                    )}
                    <Modal
                        isVisible={isOffline}
                        style={styles.modal}
                        animationInTiming={1500}
                        animationIn={'slideInUp'}
                        animationOutTiming={1000}
                        animationOut={'slideOutDown'}
                        hideModalContentWhileAnimating={true}>
                        <View style={styles.modalContainer}>
                            <Typography primary transform="uppercase" size18 bold style={{paddingVertical: 10}}>
                                Lỗi kết nối
                            </Typography>
                            <Typography bold darkGrey size16 center style={{paddingBottom: 10}}>
                                Hãy kiểm tra lại kết nối mạng thiết bị của bạn!
                            </Typography>
                            
                        </View>
                    </Modal>
                </>
            )}
        </NavigationContainer>
    );
});
const styles = StyleSheet.create({
    // ...
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContainer: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 40,
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#000',
        paddingVertical: 12,
        paddingHorizontal: 16,
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
    },
});
