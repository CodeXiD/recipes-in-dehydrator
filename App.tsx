import * as Notifications from 'expo-notifications';
import { useRef, useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';
import Navigation from './screens/Navigation';
import usePushNotifications from './composables/usePushNotifications';
import store from './store';
import SetupUser from './components/hoc/SetupUser';

export default function App() {
  const pushNotifications = usePushNotifications();

  pushNotifications.setNotificationHandler();

  const [expoPushToken, setExpoPushToken] = useState<string>();
  const [notification, setNotification] =
    useState<Notifications.Notification>();
  const notificationListener = useRef<any>();
  const notificationResponseListener = useRef<any>();

  useEffect(() => {
    // setup push notifications
    pushNotifications.getPushToken().then(pushToken => {
      setExpoPushToken(pushToken);

      if (pushToken) {
        // підписка на повідомлення / запит на бєк зі збереженням токену
      }
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener(setNotification);
    notificationResponseListener.current =
      Notifications.addNotificationResponseReceivedListener(
        ({ notification: newNotification }) => setNotification(newNotification),
      );

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current,
        );
      }

      if (notificationResponseListener.current) {
        Notifications.removeNotificationSubscription(
          notificationResponseListener.current,
        );
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Provider store={store}>
      <SetupUser>
        <Navigation />
        <Toast />
      </SetupUser>
    </Provider>
  );
}
