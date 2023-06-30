import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {NavigationScreens} from '@/utils/enum';
import ProfileScreen from '@/Screens/Profile/ProfileScreen';
import {colors} from '@/styles/theme';
import {BackSvg} from '@/assets/svg/BackSvg';
import {ButtonCustom} from '@/components/Button/Button';
import {REM} from '@/styles/dimensions';
import ChangePasswordScreen from '@/Screens/Profile/ChangePasswordScreen';
const Stack = createStackNavigator();

export const ProfileStack = ({navigation}) => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name={NavigationScreens.PersonalInformation} component={ProfileScreen} />
            <Stack.Screen name={NavigationScreens.ChangePass} component={ChangePasswordScreen} />
        </Stack.Navigator>
    );
};
