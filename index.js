/**
 * @format
 */
 import 'expo-asset';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {pushNotification} from './src/store/NotificationCustomer';
import messaging from '@react-native-firebase/messaging';

const messageBackground = messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    pushNotification.triggerLocalNotification(remoteMessage);
});

pushNotification.config();
AppRegistry.registerComponent(appName, () => App);
