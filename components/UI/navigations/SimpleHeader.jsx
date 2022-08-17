import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import {useNavigation} from "@react-navigation/native";

export default function SimpleHeader({ withBackButton = true, children }) {
    const navigation = useNavigation();
    return (
        <View style={styles.headerWrapper}>
            {
                withBackButton ? (
                    <Pressable onPress={() => navigation.goBack()}>
                        <Image
                            style={styles.backImage}
                            source={require('../../../assets/icons/left-arrow.png')}
                        />
                    </Pressable>
                ) : null
            }

            <Text style={styles.screenTitle}>
                { children }
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    headerWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    backImage: {
        width: 20,
        height: 20,
        marginRight: 14
    },
    screenTitle: {
        fontSize: 18,
        fontWeight: "600",
    }
});
