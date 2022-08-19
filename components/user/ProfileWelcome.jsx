import {Image, Text, View, StyleSheet} from "react-native";

export default function ProfileWelcome() {
    return (
        <View style={styles.welcomeContainer}>
            <View style={styles.welcomeTextContainer}>
                <Text style={styles.welcomeText}>З поверненням</Text>
                <Text style={styles.welcomeNickname}>Kirill Tkachenko</Text>
            </View>

            <Image
                style={styles.userAvatar}
                source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnZHkBJOOGkGDDX7EqF82DrhV72cnIJdCppA&usqp=CAU'}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    welcomeContainer: {
        backgroundColor: '#2BC169',
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingHorizontal: 10,
        paddingVertical: 14,
        borderRadius: 12
    },
    welcomeTextContainer: {
        justifyContent: 'center'
    },
    welcomeText: {
        color: '#CCEDD8',
        fontWeight: '600',
        fontSize: 18,
        marginBottom: 4
    },
    welcomeNickname: {
        color: '#fff',
        fontWeight: '400',
        fontSize: 13,
    },
    userAvatar: {
        width: 50,
        height: 50,
        borderRadius: 50/2
    }
})
