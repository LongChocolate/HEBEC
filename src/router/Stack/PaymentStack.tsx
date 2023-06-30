import React from 'react';
import {NavigationScreens} from '@/utils/enum';
import PaymentScreenStep1 from '@/Screens/Payment/PaymentScreenStep1';
import PaymentScreenStep2 from '@/Screens/Payment/PaymentScreenStep2';
import PaymentScreenStep3 from '@/Screens/Payment/PaymentScreenStep3';
import PaymentSuccessScreen from '@/Screens/Payment/PaymentSuccessScreen';
import HistoryOrderScreen from '@/Screens/HebecShopManagement/HistoryOrderScreen';
import {createStackNavigator, HeaderStyleInterpolators, TransitionSpecs} from '@react-navigation/stack';

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

export const PaymentStack = () => {
    return (
        <Stack.Navigator screenOptions={{header: () => null, ...MyTransition}}>
            <Stack.Screen name={NavigationScreens.PaymentProcessFirst} component={PaymentScreenStep1} />
            <Stack.Screen name={NavigationScreens.PaymentProcessStep2} component={PaymentScreenStep2} />
            <Stack.Screen name={NavigationScreens.PaymentProcessFinal} component={PaymentScreenStep3} />
            <Stack.Screen name={NavigationScreens.OrderBookSuccess} component={PaymentSuccessScreen} />
            <Stack.Screen name={NavigationScreens.History} component={HistoryOrderScreen} />
        </Stack.Navigator>
    );
};
