import {View, StyleSheet, Pressable} from "react-native";
import PostColumnItem from "./PostColumnItem";
import {Touchable} from "react-native-web";
import {useNavigation} from "@react-navigation/native";

export default function PostColumnList() {
    const navigation = useNavigation();

    return (
        <View>
            <Pressable
                style={styles.postBlock}
                onPress={() => navigation.navigate('Post')}
            >
                <PostColumnItem />
            </Pressable>

            <Pressable
                style={styles.postBlock}
                onPress={() => navigation.navigate('Post')}
            >
                <PostColumnItem />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    postBlock: {
        marginBottom: 10,
    }
})
