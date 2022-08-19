import {View, Text, Image, StyleSheet} from "react-native";

// @ts-ignore
export default function NotificationColumnItem({ notification }) {
    return (
        <View style={styles.notificationContainer}>
            <View style={styles.imageNotificationWrapper}>
                <Image
                    style={styles.imageNotification}
                    source={{ uri: notification.imageUrl }}
                />
            </View>

            <View style={styles.notificationDetails}>
                <Text
                    style={styles.notificationTitle}
                    numberOfLines={1}
                >
                    { notification.title }
                </Text>

                <Text
                    style={styles.notificationText}
                    numberOfLines={2}
                >
                    { notification.text }
                </Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    notificationContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
    },
    imageNotificationWrapper: {
        marginRight: 8,
    },
    imageNotification: {
        width: 50,
        height: 50,
        marginRight: 12,
    },
    notificationDetails: {
        flex: 1,
    },
    notificationTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 6,
    },
    notificationText: {
        color: '#575757'
    }
})
