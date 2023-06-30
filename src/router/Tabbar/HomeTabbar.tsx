import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import {HOME_ROUTES} from '@/constraints/routes';
import {colors} from '@/styles/theme';
const Tabbar = createBottomTabNavigator();

export const HomeTabbar = () => {
    return (
        <Tabbar.Navigator screenOptions={{headerShown: false}}>
            {HOME_ROUTES.map((route, index) => {
                let activeColor = colors.primary;
                let inActiveColor = colors.mediumGrey;
                return (
                    <Tabbar.Screen
                        key={index}
                        name={route.name}
                        component={route.component}
                        options={{
                            tabBarLabel: route.title,
                            tabBarIcon: ({focused}) => {
                                return focused ? route.selectIcon : route.icon;
                            },
                            tabBarActiveTintColor: activeColor,
                            tabBarInactiveTintColor: inActiveColor,
                            tabBarLabelStyle: {
                                fontStyle: 'normal',
                                fontWeight: '700',
                                fontSize: 14,
                                lineHeight: 16,
                                textAlign: 'center',
                            },
                            tabBarStyle: {
                                height: 60,
                            },
                        }}
                    />
                );
            })}
        </Tabbar.Navigator>
    );
};
