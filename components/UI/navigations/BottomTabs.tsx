import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Icon } from '@expo/webpack-config/webpack/plugins/PwaManifestWebpackPlugin';

const styles = StyleSheet.create({
  tabsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginHorizontal: 14,
    borderRadius: 12,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
});

type Tab = {
  icon: any;
  size: number;
  path: string;
};

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
  ] as Tab[];

  return (
    <View style={styles.tabsWrapper}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab.path}
          style={styles.tab}
          activeOpacity={0.3}
          onPress={() => navigation.navigate(tab.path as never)}
        >
          <AntDesign
            name={tab.icon}
            size={tab.size}
            color={route.name === tab.path ? '#2BC169' : 'black'}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}
