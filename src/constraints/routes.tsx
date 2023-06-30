import React from 'react';
import {AccountSvg} from '@/assets/svg/AccountSvg';
import {DashboardSvg} from '@/assets/svg/DashboardSvg';
import {NewsSvg} from '@/assets/svg/NewsSvg';
import {NotificationSvg} from '@/assets/svg/NotificationSvg';
import AccountScreen from '@/Screens/Tabbar/AccountScreen';
import HomeScreen from '@/Screens/Tabbar/HomeScreen';
import NewsScreen from '@/Screens/Tabbar/NewsScreen';
import NotificationScreen from '@/Screens/Tabbar/NotificationScreen';
import {NavigationScreens} from '@/utils/enum';

export const HOME_ROUTES = [
    {
        name: NavigationScreens.Home,
        title: 'Trang chủ',
        component: HomeScreen,
        icon: <DashboardSvg />,
        selectIcon: <DashboardSvg selected />,
    },
    {
        name: NavigationScreens.News,
        title: 'Tin tức',
        component: NewsScreen,
        icon: <NewsSvg />,
        selectIcon: <NewsSvg selected />,
    },
    {
        name: NavigationScreens.Notification,
        title: 'Thông báo',
        component: NotificationScreen,
        icon: <NotificationSvg />,
        selectIcon: <NotificationSvg selected />,
    },
    {
        name: 'Account',
        title: 'Tài khoản',
        component: AccountScreen,
        icon: <AccountSvg />,
        selectIcon: <AccountSvg selected />,
    },
];
