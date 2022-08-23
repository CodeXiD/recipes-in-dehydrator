import {Image, Text, View, StyleSheet} from "react-native";

export default function PostColumnItem({ post }) {
    const tagsContent = (
        <View style={styles.hashtags}>
        {
            post.tags.map((tag) => (
                    <View
                        key={tag}
                        style={styles.hashtagItem}
                    >
                        <Text style={styles.hashtagItemText}>#{tag}</Text>
                    </View>
            ))
        }
        </View>
    );

    return (
        <View style={styles.postWrapper}>
            <Image
                style={styles.postImage}
                source={{ uri: post.imageUrl }}
            />

            <View style={styles.postDetails}>
                <Text
                    style={styles.postTitle}
                    numberOfLines={1}
                >
                    { post.title }
                </Text>

                <Text style={styles.postAuthor}>
                    { post.author.fullName }
                </Text>

                { tagsContent }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    postWrapper: {
        flex: 1,
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
        flex: 1,
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
