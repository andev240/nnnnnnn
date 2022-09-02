import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    await getFCMToken();
  }
}

const getFCMToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmtoken');
  console.log(
    '🚀 ~ file: notification-helper.js ~ line 18 ~ getFCMToken ~ fcmToken',
    fcmToken,
  );
  if (!fcmToken) {
    try {
      let token = await messaging().getToken();
      if (token) {
        await AsyncStorage.setItem('fcmtoken', token);
      }
    } catch (error) {
      console.log(error, 'error in fcm token genration');
    }
  }
};

export const notificationListiner = async () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    // navigation.navigate(remoteMessage.data.type);
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
        // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
      }
      //   setLoading(false);
    });
  await messaging().onMessage(async remoteMessage => {
    console.log('Notification on forground ', remoteMessage);
    const {body, title, android} = remoteMessage.notification || {};
    PushNotification.localNotification({
      channelId: 'test',
      title,
      message: body,
      bigPictureUrl: android?.imageUrl,
    });
  });
};
