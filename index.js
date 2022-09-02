/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

// PushNotification.configure({
//   onNotification: function (notification) {
//     console.log('NOTIFICATION --:', notification);
//     PushNotification.localNotification({
//       channelId: 'test',
//       title: notification.title,
//       message: notification.message,
//     });
//   },
//   requestPermissions: Platform.OS === 'ios',
// });

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);

  const {body, title, android} = remoteMessage.notification || {};
  PushNotification.localNotification({
    channelId: 'test',
    title,
    message: body,
    bigPictureUrl: android?.imageUrl,
  });
});
AppRegistry.registerComponent(appName, () => App);
