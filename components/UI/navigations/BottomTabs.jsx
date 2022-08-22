import {View, StyleSheet, TouchableOpacity} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import {useNavigation, useRoute} from "@react-navigation/native";

export default function BottomTabs() {
    const route = useRoute();
    const navigation = useNavigation();

    const tabs = [
        {
            icon: 'home',
            size: 24,
            path: 'Home',
        },
        {
            icon: 'hearto',
            size: 24,
            path: 'Favorites',
        },
        {
            icon: 'notification',
            size: 24,
            path: 'Notifications',
        },
        {
            icon: 'user',
            size: 24,
            path: 'Profile',
        },
    ];

    return (
        <View style={styles.tabsWrapper}>
            {
                tabs.map((tab, idx) => (
                    <TouchableOpacity
                        key={idx}
                        style={styles.tab}
                        activeOpacity={0.3}
                        onPress={() => navigation.navigate(tab.path)}
                    >
                        <AntDesign
                            name={tab.icon}
                            size={tab.size}
                            color={ route.name === tab.path ? '#2BC169' : 'black' }
                        />
                    </TouchableOpacity>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    tabsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        marginHorizontal: 14,
        borderRadius: 12
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
    },
})
