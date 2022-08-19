import * as Notifications from 'expo-notifications';
import Navigation from "./screens/Navigation";
import {useRef, useState} from "react";
import { useEffect } from 'react';
import usePushNotifications from "./composables/usePushNotifications";

export default function App() {
  const pushNotifications = usePushNotifications();

  pushNotifications.setNotificationHandler();

  const [expoPushToken, setExpoPushToken] = useState<string>();
  const [notification, setNotification] = useState<Notifications.Notification>();
  const notificationListener = useRef<any>();
  const notificationResponseListener = useRef<any>();

  useEffect(() => {
    pushNotifications.getPushToken()
        .then((pushToken) => {
          setExpoPushToken(pushToken);

          if(pushToken) {
            // підписка на повідомлення / запит на бєк зі збереженням токену
          }
        });

    notificationListener.current = Notifications.addNotificationReceivedListener(setNotification);
    notificationResponseListener.current = Notifications.addNotificationResponseReceivedListener(
        ({ notification }) => setNotification(notification)
    );

    return () => {
      if(notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }

      if(notificationResponseListener.current) {
        Notifications.removeNotificationSubscription(notificationResponseListener.current);
      }
    }
  }, [])

  return <Navigation />;

}
