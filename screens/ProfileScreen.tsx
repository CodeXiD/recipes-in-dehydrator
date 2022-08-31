import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import {
  MaterialCommunityIcons,
  Ionicons,
  AntDesign,
  Octicons,
  FontAwesome5,
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MainLayout from '../layouts/MainLayout';
import SimpleHeader from '../components/UI/navigations/SimpleHeader';
import useUser from '../composables/useUser';

const styles = StyleSheet.create({
  minifyProfileInformationContainer: {
    alignItems: 'center',
  },
  avatarImage: {
    width: 75,
    height: 75,
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 124 / 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  minifyProfileInformation: {
    alignItems: 'center',
    marginTop: 8,
  },
  fullName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
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
    borderRadius: 8,
  },
  menuItemImage: {},
  menuItemTitle: {
    fontSize: 15,
    fontWeight: '500',
  },
  guestActions: {
    marginTop: 14,
  },
  guestActionButton: {
    marginBottom: 8,
  },
});

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
        additionalIconStyles: { marginLeft: 4 },
      },
      {
        IconComponent: AntDesign,
        icon: 'adduser',
        title: 'Створити профіль',
        size: 20,
        path: 'Registration',
        additionalIconStyles: {},
      },
    ],
    [
      {
        IconComponent: Ionicons,
        icon: 'md-help-circle-outline',
        iconBgColor: '#68a4ce',
        title: 'Допомога',
        size: 22,
        path: '',
        additionalIconStyles: {},
      },
      {
        IconComponent: MaterialCommunityIcons,
        icon: 'message-question-outline',
        iconBgColor: '#68a4ce',
        title: 'Питання щодо застосунку',
        size: 18,
        path: '',
        additionalIconStyles: { marginLeft: 1 },
      },
    ],
  ];

  const menu = [
    [
      {
        IconComponent: MaterialCommunityIcons,
        icon: 'account-edit-outline',
        title: 'Редагувати профіль',
        size: 20,
        path: '',
        additionalIconStyles: { marginLeft: 4 },
      },
      {
        IconComponent: Ionicons,
        icon: 'md-notifications-outline',
        title: 'Повідомлення та звуки',
        size: 20,
        path: '',
        additionalIconStyles: {},
      },
    ],
    [
      {
        IconComponent: Ionicons,
        icon: 'md-help-circle-outline',
        iconBgColor: '#68a4ce',
        title: 'Допомога',
        size: 22,
        path: '',
        additionalIconStyles: {},
      },
      {
        IconComponent: MaterialCommunityIcons,
        icon: 'message-question-outline',
        iconBgColor: '#68a4ce',
        title: 'Питання щодо застосунку',
        size: 18,
        path: '',
        additionalIconStyles: { marginLeft: 1 },
      },
    ],
    [
      {
        IconComponent: MaterialCommunityIcons,
        icon: 'location-exit',
        iconBgColor: '#ce6868',
        title: 'Вийти з профілю',
        size: 18,
        path: 'LogOut',
        additionalIconStyles: { marginLeft: 2 },
      },
    ],
  ];

  const menuItemsContent = (groupItems: any[]) => {
    return groupItems.map((item, idx) => {
      const randomNumber = Math.floor(Math.random() * 1000);
      return (
        <TouchableOpacity
          key={randomNumber}
          style={[
            styles.menuItem,
            idx + 1 < groupItems.length
              ? {
                  borderBottomColor: '#efefef',
                  borderBottomWidth: 1,
                  borderStyle: 'solid',
                }
              : {},
          ]}
          activeOpacity={0.3}
          onPress={() => item.path && navigation.navigate(item.path)}
        >
          <View
            style={[
              styles.menuItemImageWrapper,
              { backgroundColor: item.iconBgColor || '#2BC169' },
            ]}
          >
            <item.IconComponent
              name={item.icon}
              size={item.size}
              color="#fff"
              style={[styles.menuItemImage, item.additionalIconStyles]}
            />
          </View>

          <Text style={styles.menuItemTitle}>{item.title}</Text>
        </TouchableOpacity>
      );
    });
  };

  const menuContent = (menuGroups: any[]) => {
    return menuGroups.map(groupItems => {
      const randomNumber = Math.floor(Math.random() * 1000);
      return (
        <View style={styles.menuGroup} key={randomNumber}>
          {menuItemsContent(groupItems)}
        </View>
      );
    });
  };

  if (!user.isLoggedIn) {
    return (
      <MainLayout>
        <SimpleHeader withBackButton={false}>Профіль</SimpleHeader>

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

        <View style={styles.menuContainer}>{menuContent(guestMenu)}</View>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <SimpleHeader withBackButton={false}>Профіль</SimpleHeader>

      <View style={styles.minifyProfileInformationContainer}>
        <View style={styles.avatar}>
          {user.userData.avatarFile ? (
            <Image
              style={styles.avatarImage}
              source={{ uri: user.userData.avatarFile.downloadUrl }}
            />
          ) : (
            <FontAwesome5 name="user-circle" size={100} color="#2BC169" />
          )}
        </View>

        <View style={styles.minifyProfileInformation}>
          <Text style={styles.fullName}>{user.userData.fullName}</Text>
          <Text style={styles.phone}>{user.userData.phone}</Text>
        </View>
      </View>

      <View style={styles.menuContainer}>{menuContent(menu)}</View>
    </MainLayout>
  );
}
