import { Image, Text, View, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import useUser from '../../composables/useUser';

const styles = StyleSheet.create({
  welcomeContainer: {
    backgroundColor: '#2BC169',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 14,
    borderRadius: 12,
  },
  welcomeTextContainer: {
    justifyContent: 'center',
  },
  welcomeText: {
    color: '#CCEDD8',
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 4,
  },
  welcomeNickname: {
    color: '#fff',
    fontWeight: '400',
    fontSize: 13,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
});

export default function ProfileWelcome() {
  const user = useUser();

  return (
    <View style={styles.welcomeContainer}>
      <View style={styles.welcomeTextContainer}>
        <Text style={styles.welcomeText}>З поверненням</Text>
        <Text style={styles.welcomeNickname}>
          {user.isLoggedIn ? user.userData.fullName : 'Гість'}
        </Text>
      </View>

      {user.isLoggedIn && user.userData.avatarFile ? (
        <Image
          style={styles.userAvatar}
          source={{ uri: user.userData.avatarFile.downloadUrl }}
        />
      ) : (
        <AntDesign
          style={styles.userAvatar}
          name="user"
          size={50}
          color="gray"
        />
      )}
    </View>
  );
}
