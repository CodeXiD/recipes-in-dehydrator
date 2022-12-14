import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

export default function usePushNotifications() {
  const getPushToken = () => {
    if (!Device.isDevice) {
      throw Error('Додаток не запущений на реальному пристрої');
    }

    try {
      return Notifications.getPermissionsAsync()
        .then(result => {
          return result.status === 'granted'
            ? result
            : Notifications.requestPermissionsAsync();
        })
        .then(result => {
          if (result.status === 'granted') {
            return Notifications.getExpoPushTokenAsync();
          }

          throw Error('Помилка отримання ключу для push повідомлень');
        })
        .then(tokenData => tokenData.data);
    } catch (e) {
      throw Error('Необхідно дозволити додатку отримувати повідомлення');
    }
  };

  const setNotificationHandler = () => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
  };

  return {
    getPushToken,
    setNotificationHandler,
  };
}
