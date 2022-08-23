import {Button, StyleSheet, Text, TouchableOpacity, View} from "react-native";

export default function BaseButton({ children = '', disabled = false, onPress = () => {} }) {
    return (
        <TouchableOpacity
            activeOpacity={0.3}
            onPress={() => !disabled && onPress()}
        >
            <View
                style={[styles.button, disabled && styles.disabled]}
            >
                <Text style={styles.buttonText}>
                    { children }
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#2BC169',
        padding: 12,
        borderRadius: 8,
    },
    disabled: {
        opacity: 0.5
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: '600',
    }
})
