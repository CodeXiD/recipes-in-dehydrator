import {View, StyleSheet, Pressable, TouchableOpacity} from "react-native";
import PostColumnItem from "./PostColumnItem";
import {Touchable} from "react-native-web";
import {useNavigation} from "@react-navigation/native";

export default function PostColumnList({ posts }) {
    const navigation = useNavigation();

    return (
        <View>
            {
                posts.map(post => (
                    <TouchableOpacity
                        key={post.id}
                        style={styles.postBlock}
                        activeOpacity={0.5}
                        onPress={() => navigation.navigate('Post', { postId: post.id })}
                    >
                        <PostColumnItem post={post} />
                    </TouchableOpacity>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    postBlock: {
        marginBottom: 10,
    }
})
