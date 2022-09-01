import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {
  MaterialCommunityIcons,
  Ionicons,
  AntDesign,
  Octicons,
  FontAwesome5,
  Entypo,
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';
import MainLayout from '../layouts/MainLayout';
import SimpleHeader from '../components/UI/navigations/SimpleHeader';
import useUser from '../composables/useUser';
import useUploadFile from '../composables/useUploadFile';
import useApi from '../composables/useApi';

const styles = StyleSheet.create({
  minifyProfileInformationContainer: {
    alignItems: 'center',
  },
  avatarImage: {
    width: 124,
    height: 124,
  },
  avatar: {
    position: 'relative',
    width: 124,
    height: 124,
    borderRadius: 124 / 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarChangeBlock: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 6,
    paddingBottom: 10,
  },
  avatarChangeBlockText: {
    textAlign: 'center',
    flex: 1,
    fontWeight: '600',
    color: '#fff',
    flexDirection: 'column',
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
  const api = useApi();
  const uploadFile = useUploadFile();

  const pickNewAvatar = async (): Promise<any> => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.3,
    });

    if (!result.cancelled) {
      const fileName = result.uri.split('/').pop();

      if (fileName) {
        const match = /\.(\w+)$/.exec(fileName);
        const type = match ? `image/${match[1]}` : `image`;
        const oldAvatarFile = user.userData.avatarFile;

        uploadFile
          .upload(result.uri, fileName, type)
          .then(({ data: { id } }) => {
            return api().post('/users/profile', {
              avatarFile: id,
            });
          })
          .then(() => {
            return api().get('/auth/profile');
          })
          .then(({ data }) => {
            if (oldAvatarFile) uploadFile.remove(oldAvatarFile.id);
            user.setUserData(data);
            Toast.show({
              type: 'success',
              text1: 'Зміна аватару',
              text2: 'Ви успішно змінили аватар',
              visibilityTime: 6000,
              position: 'bottom',
              bottomOffset: 100,
            });
          })
          .catch(() => {
            Toast.show({
              type: 'error',
              text1: 'Зміна аватару',
              text2: 'Під час зміни аватару сталася помилка, спробуйте пізніше',
              visibilityTime: 6000,
              position: 'bottom',
              bottomOffset: 100,
            });
          });
      }
    }
  };

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
              style={[styles.avatarImage, { width: 75, height: 75 }]}
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

          <Pressable style={styles.avatarChangeBlock} onPress={pickNewAvatar}>
            <Text style={styles.avatarChangeBlockText}>
              <Entypo name="edit" size={18} color="#fff" />
            </Text>
          </Pressable>
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
