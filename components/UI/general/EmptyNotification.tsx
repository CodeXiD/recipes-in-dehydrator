import {View, Text, StyleSheet} from "react-native";
import { AntDesign } from '@expo/vector-icons';

// @ts-ignore
export default function EmptyNotification({ children }) {
    return (
        <View style={styles.emptyPostsBlock}>
            <AntDesign
                name='frowno'
                size={100}
                color="#7fc19d"
            />
            <Text style={styles.emptyText}>
                { children }
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    emptyPostsBlock: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 18,
    },
    emptyText: {
        color: '#575757',
        textAlign: 'center',
        marginTop: 14,
    }
})
