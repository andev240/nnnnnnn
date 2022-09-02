import React, {useEffect} from 'react';
import {Button} from 'react-native';
import PushNotification from 'react-native-push-notification';
import PushController from './PushController';
import {
  requestUserPermission,
  notificationListiner,
} from './src/util/notification-helper';

const App = () => {
  const createChannel = () => {
    PushNotification.createChannel({channelId: 'test', channelName: 'Test'});
  };
  useEffect(() => {
    createChannel();
  }, []);

  const handleNotification = () => {
    PushNotification.localNotification({
      channelId: 'test',
      title: 'Test notification',
      message: 'This is message',
      bigText: 'This is big text',
      color: 'red',
    });
    PushNotification.localNotificationSchedule({
      channelId: 'test',
      title: 'Test notification',
      message: 'This is message',
      bigText: 'This is big text',
      color: 'green',
      date: new Date(Date.now() + 10 * 1000),
      allowWhileIdle: true,
    });
  };

  useEffect(() => {
    requestUserPermission();
    notificationListiner();
  }, []);
  return (
    <>
      <Button title="Notification" onPress={handleNotification} />
      {/* <PushController /> */}
    </>
  );
};

export default App;
