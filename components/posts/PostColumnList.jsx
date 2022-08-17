import {View, StyleSheet} from "react-native";
import PostColumnItem from "./PostColumnItem";

export default function PostColumnList() {
    return (
        <View>
            <View style={styles.postBlock}>
                <PostColumnItem />
            </View>

            <View style={styles.postBlock}>
                <PostColumnItem />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    postBlock: {
        marginBottom: 10,
    }
})
