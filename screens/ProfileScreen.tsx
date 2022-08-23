import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import { MaterialCommunityIcons, Ionicons, AntDesign, Octicons } from '@expo/vector-icons';
import MainLayout from "../layouts/MainLayout";
import SimpleHeader from "../components/UI/navigations/SimpleHeader";
import useUser from "../composables/useUser";
import {useNavigation} from "@react-navigation/native";

export default function ProfileScreen() {
    const navigation = useNavigation();
    const user = useUser();

    const guestMenu = [
        [
            {
                IconComponent: Octicons,
                icon: 'sign-in',
                title: 'Авторизація',
                size: 16,
                path: 'Authorization',
                additionalIconStyles:  { marginLeft: 4 },
            },
            {
                IconComponent: AntDesign,
                icon: 'adduser',
                title: 'Реєстрація',
                size: 20,
                path: 'Registration',
                additionalIconStyles:  { },
            }
        ],
        [
            {
                IconComponent: Ionicons,
                icon: 'md-help-circle-outline',
                title: 'Допомога',
                size: 22,
                path: '',
                additionalIconStyles:  { },
            },
            {
                IconComponent: MaterialCommunityIcons,
                icon: 'message-question-outline',
                title: 'Питання щодо застосунку',
                size: 18,
                path: '',
                additionalIconStyles:  { marginLeft: 1 },
            }
        ]
    ]

    const menu = [
        [
            {
                IconComponent: MaterialCommunityIcons,
                icon: 'account-edit-outline',
                title: 'Редагувати профіль',
                size: 20,
                path: '',
                additionalIconStyles:  { marginLeft: 4 },
            },
            {
                IconComponent: Ionicons,
                icon: 'md-notifications-outline',
                title: 'Повідомлення та звуки',
                size: 20,
                path: '',
                additionalIconStyles:  { },
            }
        ],
        [
            {
                IconComponent: Ionicons,
                icon: 'md-help-circle-outline',
                title: 'Допомога',
                size: 22,
                path: '',
                additionalIconStyles:  { },
            },
            {
                IconComponent: MaterialCommunityIcons,
                icon: 'message-question-outline',
                title: 'Питання щодо застосунку',
                size: 18,
                path: '',
                additionalIconStyles:  { marginLeft: 1 },
            }
        ]
    ]

    const menuItemsContent = (groupItems: any[]) => {
        return groupItems.map((item, idx) => (
                    <TouchableOpacity
                        key={idx}
                        style={[
                            styles.menuItem,
                            (idx+1) < groupItems.length ? { borderBottomColor: '#efefef', borderBottomWidth: 1, borderStyle: 'solid' } : {}
                        ]}
                        activeOpacity={0.3}
                        onPress={() => item.path && navigation.navigate(item.path)}
                    >
                        <View style={styles.menuItemImageWrapper}>
                            <item.IconComponent
                                name={item.icon}
                                size={item.size}
                                color="#fff"
                                style={[styles.menuItemImage, item.additionalIconStyles]}
                            />
                        </View>

                        <Text style={styles.menuItemTitle}>
                            { item.title }
                        </Text>
                    </TouchableOpacity>
                ))
    }

    const menuContent = (menuGroups: any[]) => {
       return menuGroups.map((groupItems, idx) => (
                <View style={styles.menuGroup} key={idx}>
                    { menuItemsContent(groupItems) }
                </View>
            ))
    }

    if(!user.isLoggedIn) {
        return (
            <MainLayout>
                <SimpleHeader withBackButton={false}>
                    Профіль
                </SimpleHeader>

                <View style={styles.minifyProfileInformationContainer}>
                    <View style={styles.avatar}>
                        <AntDesign
                            style={styles.avatarImage}
                            name="user"
                            size={75}
                            color="gray"
                        />
                    </View>

                    <View style={styles.minifyProfileInformation}>
                        <Text style={styles.fullName}>Гість</Text>
                    </View>
                </View>

                <View style={styles.menuContainer}>
                    { menuContent(guestMenu) }
                </View>
            </MainLayout>
        )
    }

    return (
        <MainLayout>
            <SimpleHeader withBackButton={false}>
                Профіль
            </SimpleHeader>

            <View style={styles.minifyProfileInformationContainer}>
                <View style={styles.avatar}>
                    <Image
                        style={styles.avatarImage}
                        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnZHkBJOOGkGDDX7EqF82DrhV72cnIJdCppA&usqp=CAU' }}
                    />
                </View>

                <View style={styles.minifyProfileInformation}>
                    <Text style={styles.fullName}>Ткаченко Кирило</Text>
                    <Text style={styles.phone}>+380 50 109 9684</Text>
                </View>
            </View>

            <View style={styles.menuContainer}>
                { menuContent(menu) }
            </View>
        </MainLayout>
    );
}

const styles = StyleSheet.create({
    minifyProfileInformationContainer: {
        alignItems: 'center'
    },
    avatarImage: {
        width: 75,
        height: 75
    },
    avatar: {
        width: 124,
        height: 124,
        borderRadius: 124/2,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    minifyProfileInformation: {
        alignItems: 'center',
        marginTop: 8
    },
    fullName: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 4
    },
    phone: {
        fontSize: 13,
        color: '#818181',
    },
    menuContainer: {
        marginTop: 14,
    },
    menuGroup: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 16,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 12,
    },
    menuItemImageWrapper: {
        marginRight: 12,
        backgroundColor: '#2BC169',
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    },
    menuItemImage: {

    },
    menuItemTitle: {
        fontSize: 15,
        fontWeight: '500',
    },
    guestActions: {
        marginTop: 14
    },
    guestActionButton: {
        marginBottom: 8
    }
});
