import {ActivityIndicator, Text, View, StyleSheet} from "react-native";

export default function SimpleLoader() {
    return (
        <View style={styles.loaderContainer}>
            <ActivityIndicator
                size="large"
                color="#2BC169"
            />

            <Text style={styles.loaderText}>
                Завантаження, почекайте...
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    loaderContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 24,
        paddingHorizontal: 12,
    },
    loaderText: {
        color: '#b0b0b0',
        marginTop: 12
    }
})
