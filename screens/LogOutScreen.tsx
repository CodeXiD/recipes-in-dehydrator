import {View, Text, StyleSheet} from "react-native";
import SimpleHeader from "../components/UI/navigations/SimpleHeader";
import MainLayout from "../layouts/MainLayout";
import BaseButton from "../components/UI/buttons/BaseButton";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import useUser from "../composables/useUser";
import {useNavigation} from "@react-navigation/native";

export default function LogOutScreen() {
    const user = useUser();
    const navigation = useNavigation();
    const agree = () => {
        user.clearAuth();
        navigation.goBack();
    }
    const disagree = () => {
        navigation.goBack();
    }

    return (
        <MainLayout>
            <SimpleHeader>
                Вийти з профілю
            </SimpleHeader>

            <View>
                <View style={styles.actionIconWrapper}>
                    <MaterialCommunityIcons
                        name="emoticon-sad-outline"
                        size={90}
                        style={styles.actionIcon}
                    />
                </View>


                <Text style={styles.actionText}>
                    Ви дійсно хочете вийти з профілю ?
                </Text>

                <View style={styles.actionButtons}>
                    <View style={styles.actionButtonWrapper}>
                        <BaseButton
                            onPress={agree}
                            buttonStyles={{backgroundColor: '#c47b7b'}}
                        >
                            Так, вийти
                        </BaseButton>
                    </View>

                    <View style={styles.actionButtonWrapper}>
                        <BaseButton onPress={disagree}>
                            Ні, відмінити
                        </BaseButton>
                    </View>
                </View>
            </View>
        </MainLayout>
    )
}

const styles = StyleSheet.create({
    actionIconWrapper: {
        alignItems: 'center',
        marginTop: 18,
    },
    actionIcon: {
        color: '#cbcbcb',
    },
    actionText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 16,
        marginTop: 16,
    },
    actionButtons: {

    },
    actionButtonWrapper: {
        marginBottom: 8,
    }
})
