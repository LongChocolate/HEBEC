/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState, type PropsWithChildren, useRef} from 'react';
import {StatusBar, StyleSheet, Text, useColorScheme, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RootNavigator} from '@/router';
import {colors} from '@/styles/theme';
import messaging from '@react-native-firebase/messaging';
import {pushNotification} from '@/store/NotificationCustomer';
import {notiStore} from '@/store/NotifcationStore';
import {userStore} from '@/store/UserStore';
import {observer} from 'mobx-react';
import {Navigation} from '@/utils/Navigation';
import {NavigationScreens, NotificationCustomerType} from '@/utils/enum';
import {LocalStorage} from '@/utils/LocalStorage';

const Section: React.FC<
    PropsWithChildren<{
        title: string;
    }>
> = ({children, title}) => {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <View style={styles.sectionContainer}>
            <Text
                style={[
                    styles.sectionTitle,
                    {
                        color: isDarkMode ? Colors.white : Colors.black,
                    },
                ]}>
                {title}
            </Text>
            <Text
                style={[
                    styles.sectionDescription,
                    {
                        color: isDarkMode ? Colors.light : Colors.dark,
                    },
                ]}>
                {children}
            </Text>
        </View>
    );
};

const messageOpenApp = messaging().onNotificationOpenedApp(async (remoteMessage) => {
    switch (remoteMessage.data.type) {
        case NotificationCustomerType.News:
            Navigation.navigate(NavigationScreens.DetailNewsFeed, {newsId: remoteMessage.data.newsId});
            break;
        case NotificationCustomerType.Notification:
            if (await LocalStorage.get('token')) {
                Navigation.navigate(NavigationScreens.Notification);
            }
            break;
        case NotificationCustomerType.Order:
            if (await LocalStorage.get('token')) {
                Navigation.navigate(NavigationScreens.History);
            }
            break;
        default:
            break;
    }
});
const App = observer(() => {
    const isDarkMode = useColorScheme() === 'dark';

    const messageListener = async () => {
        const messListen = messaging().onMessage((message) => {
            pushNotification.triggerLocalNotification(message);
        });
    };

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    useEffect(() => {
        messageListener();
    }, [messaging]);
    
    return (
        <SafeAreaProvider>
            <StatusBar backgroundColor={colors.primary} />
            <RootNavigator />
        </SafeAreaProvider>
    );
});

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});

export default App;
