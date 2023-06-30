import React from 'react';
import LoginScreen from '@/Screens/Auth/LoginScreen';
import RegisterScreen from '@/Screens/Auth/RegisterScreen';
import ForgotPasswordScreen from '@/Screens/Auth/ForgotPasswordScreen';
import {NavigationScreens} from '@/utils/enum';
import RegisterSuccessScreen from '@/Screens/Auth/RegisterSuccessScreen';
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

export const AuthStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                header: () => null,
                ...MyTransition,
            }}>
            <Stack.Screen name={NavigationScreens.Login} component={LoginScreen} />
            <Stack.Screen name={NavigationScreens.ForgotPassword} component={ForgotPasswordScreen} />
            <Stack.Screen name={NavigationScreens.Register} component={RegisterScreen} />
            <Stack.Screen name={NavigationScreens.RegisterSuccess} component={RegisterSuccessScreen} />
        </Stack.Navigator>
    );
};
