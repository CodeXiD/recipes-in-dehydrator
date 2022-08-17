import {View, StyleSheet, Pressable} from "react-native";
import PostColumnItem from "./PostColumnItem";
import {Touchable} from "react-native-web";
import {useNavigation} from "@react-navigation/native";

export default function PostColumnList({ posts }) {
    const navigation = useNavigation();

    return (
        <View>
            {
                posts.map(post => (
                    <Pressable
                        key={post.id}
                        style={styles.postBlock}
                        onPress={() => navigation.navigate('Post')}
                    >
                        <PostColumnItem post={post} />
                    </Pressable>
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
