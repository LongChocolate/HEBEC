import React, {useCallback, useState} from 'react';
import {createStackNavigator, HeaderStyleInterpolators, TransitionSpecs} from '@react-navigation/stack';

// import appStore from "@/store/appStore";

// import * as Notifications from "expo-notifications";
import {AuthStack} from './AuthStack';
import {NavigationScreens} from '@/utils/enum';
import {HomeTabbar} from '../Tabbar/HomeTabbar';
import {ProfileStack} from './ProfileStack';
import ProfileScreen from '@/Screens/Profile/ProfileScreen';
import ChangePasswordScreen from '@/Screens/Profile/ChangePasswordScreen';

import {colors} from '@/styles/theme';
import {ButtonCustom} from '@/components/Button/Button';
import {REM} from '@/styles/dimensions';
import ProductDetailScreen from '@/Screens/Product/ProductDetailScreen';
import {ShopSvg} from '@/assets/svg/ShopSvg';
import SearchScreen from '@/Screens/Product/SearchScreen';
import CartScreen from '@/Screens/HebecShopManagement/CartScreen';
import {PaymentStack} from './PaymentStack';
import HistoryOrderScreen from '@/Screens/HebecShopManagement/HistoryOrderScreen';
import DetailOrderHistoryScreen from '@/Screens/HebecShopManagement/DetailOrderHistoryScreen';
import DetailNewsScreen from '@/Screens/Media/DetailNews';
import DetailNotificationScreen from '@/Screens/Media/DetailNotificationScreen';
const Stack = createStackNavigator();

const MyTransition = {
    gestureDirection: 'horizontal',
    transitionSpec: {
        open: TransitionSpecs.TransitionIOSSpec,
        close: TransitionSpecs.TransitionIOSSpec,
    },
    headerStyleInterpolator: HeaderStyleInterpolators.forFade,
    cardStyleInterpolator: ({current, next, layouts}) => {
        return {
            cardStyle: {
                transform: [
                    {
                        translateX: current.progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [layouts.screen.width, 0],
                        }),
                    },

                    {
                        scale: next
                            ? next.progress.interpolate({
                                  inputRange: [0, 1],
                                  outputRange: [1, 0.9],
                              })
                            : 1,
                    },
                ],
            },
            overlayStyle: {
                opacity: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 0.5],
                }),
            },
        };
    },
};
export const HomeStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                ...MyTransition,
            }}>
            <Stack.Screen name={NavigationScreens.Tabbar} component={HomeTabbar} />
            <Stack.Screen name={NavigationScreens.Auth} component={AuthStack} />
            <Stack.Screen name={NavigationScreens.Profile} component={ProfileStack} />
            <Stack.Screen name={NavigationScreens.PersonalInformation} component={ProfileScreen} />
            <Stack.Screen name={NavigationScreens.ChangePass} component={ChangePasswordScreen} />
            <Stack.Screen
                name={NavigationScreens.DetailProduct}
                component={ProductDetailScreen}
                options={{
                    headerTitle: 'Thông tin sách',
                    headerStyle: {
                        height: 70,
                        backgroundColor: colors.primary,
                    },
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        height: 24,
                        color: colors.white,
                    },

                    headerLeftContainerStyle: {
                        left: REM * 20,
                    },
                    headerRight: () => {
                        return (
                            <ButtonCustom>
                                <ShopSvg />
                            </ButtonCustom>
                        );
                    },
                    headerRightContainerStyle: {
                        left: REM * -10,
                    },
                }}
            />
            <Stack.Screen name={NavigationScreens.Search} component={SearchScreen} initialParams={{search: ''}} />
            <Stack.Screen name={NavigationScreens.CartOrderBook} component={CartScreen} />
            <Stack.Screen name={NavigationScreens.PaymentProcess} component={PaymentStack} />
            <Stack.Screen name={NavigationScreens.History} component={HistoryOrderScreen} />
            <Stack.Screen name={NavigationScreens.DetailHistoryShop} component={DetailOrderHistoryScreen} />
            <Stack.Screen name={NavigationScreens.DetailNewsFeed} component={DetailNewsScreen} />
            <Stack.Screen name={NavigationScreens.DetailNotification} component={DetailNotificationScreen} />
        </Stack.Navigator>
    );
};
