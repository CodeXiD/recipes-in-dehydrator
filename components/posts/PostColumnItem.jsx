import {Image, Text, View, StyleSheet} from "react-native";

export default function PostColumnItem() {
    return (
        <View style={styles.postWrapper}>
            <Image
                style={styles.postImage}
                source={{ uri: 'https://spoiledhounds.com/wp-content/uploads/2021/06/Dehydrated-Chicken-Jerky-Dogs-Recipe-Photo.jpg' }}
            />

            <View style={styles.postDetails}>
                <Text style={styles.postTitle}>
                    Some post title text, for this block
                </Text>

                <Text style={styles.postAuthor}>
                    Kirill Tkachenko
                </Text>

                <View style={styles.hashtags}>
                    <View style={styles.hashtagItem}>
                        <Text style={styles.hashtagItemText}>#chicken</Text>
                    </View>
                    <View style={styles.hashtagItem}>
                        <Text style={styles.hashtagItemText}>#degidrator</Text>
                    </View>
                    <View style={styles.hashtagItem}>
                        <Text style={styles.hashtagItemText}>#spicy</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    postWrapper: {
      height: 100,
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 5,
        borderRadius: 12,
    },
    postImage: {
        width: 90,
        height: 90,
        borderRadius: 12,
        marginRight: 12
    },
    postDetails: {
        paddingTop: 14
    },
    postTitle: {
        fontWeight: "600",
        fontSize: 14,
        marginBottom: 6
    },
    postAuthor: {
        color: "#2BC169",
        marginBottom: 6
    },
    hashtags: {
        flexDirection:'row',
        flexWrap:'wrap'
    },
    hashtagItem: {
        backgroundColor: "#e5e5e5",
        padding: 3,
        borderRadius: 4,
        marginRight: 6,
    },
    hashtagItemText: {
        fontSize: 12
    }
})
