import { TouchableOpacity, View, StyleSheet, FlatList } from 'react-native';
import NotificationColumnItem from './NotificationColumnItem';
import { Notification } from '../../types/notification';

const styles = StyleSheet.create({
  notificationsContainer: {
    height: '100%',
  },
  notification: {
    marginBottom: 8,
  },
});

export default function NotificationColumnList({
  notifications = [],
}: {
  notifications: Notification[];
}) {
  return (
    <View>
      <FlatList
        style={styles.notificationsContainer}
        data={notifications}
        renderItem={({ item: notification }) => (
          <TouchableOpacity
            key={notification.id}
            style={styles.notification}
            activeOpacity={0.5}
          >
            <NotificationColumnItem notification={notification} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
