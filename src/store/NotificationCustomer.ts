import {NavigationScreens, NotificationCustomerType} from '@/utils/enum';
import {StackActions, useNavigation} from '@react-navigation/native';
import {action, computed, makeObservable, observable} from 'mobx';
import {PushNotificationPermissions} from 'react-native';
import PushNotification from 'react-native-push-notification';
import {newsStore} from './NewsStore';
import {notiStore} from './NotifcationStore';
import {userStore} from './UserStore';
import {Navigation} from '@/utils/Navigation';
import {historyStore} from './HistoryStore';
class NotificationCustomer {
    @observable id: number = 0;

    constructor() {
        makeObservable(this);
        this.createDefaultChannels();
    }

    @action
    handleDirect = (notification) => {
        switch (notification.data.type) {
            case NotificationCustomerType.News:
                Navigation.navigate(NavigationScreens.DetailNewsFeed, {newsId: notification.data.newsId});
                break;
            case NotificationCustomerType.Notification:
                Navigation.navigate(NavigationScreens.Notification);
                break;
            case NotificationCustomerType.Order:
                Navigation.navigate(NavigationScreens.History);
                break;
            default:
                break;
        }
        
    };
    /**
     * Must be outside of any component LifeCycle (such as `componentDidMount`).
     */
    @action
    config = () => {
        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: (token: any) => {},

            // (required) Called when a remote is received or opened, or local notification is opened

            onNotification: function (notification) {},

            onAction: (notification: any) => {
                this.handleDirect(notification);
            },

            onRegistrationError: (err: any) => {
                console.error(err.message, err);
            },

            

            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },

            popInitialNotification: true,
            requestPermissions: true,
        });
    };

    @action
    createDefaultChannels() {
        PushNotification.createChannel(
            {
                channelId: 'default-channel-id', // (required)
                channelName: 'Default channel', // (required)
                channelDescription: 'A default channel', // (optional) default: undefined.
                soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
                vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
            },
            (created) => console.log(`createChannel returned '${created}'`),
        );
    }

    @action
    triggerLocalNotification = (data) => {
        this.id++;
        PushNotification.localNotification({
            id: this.id,
            channelId: 'default-channel-id',
            title: data.notification.title,
            message: data.notification.body, // (required)
            playSound: true,
            soundName: 'eventually.mp3',
            actions: ['Đọc thông báo'],
            invokeApp: false,
            data: data.data,
        });
        notiStore.fetch(1, 5, userStore.getToken, true);

        if (data.data.type == NotificationCustomerType.News) {
            newsStore.fetch(1, 5, true);
        } else if (data.data.type == NotificationCustomerType.Order) {
            historyStore.fetch(1, 5, true);
        }
    };

    @action
    checkPermissions = (cb: (permissions: PushNotificationPermissions) => void) => {
        return PushNotification.checkPermissions(cb);
    };

    @action
    requestPermissions = () => {
        return PushNotification.requestPermissions();
    };

    @action
    abandonPermissions = () => {
        PushNotification.abandonPermissions();
    };
}

export const pushNotification = new NotificationCustomer();
