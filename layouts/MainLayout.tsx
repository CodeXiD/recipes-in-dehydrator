import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import BottomTabs from '../components/UI/navigations/BottomTabs';

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 14,
    paddingLeft: 14,
    paddingRight: 14,
  },
  pageContentContainer: {
    flex: 1,
    paddingBottom: 12,
  },
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function MainLayout({ children }) {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />

        <View style={styles.pageContentContainer}>{children}</View>
      </View>

      <BottomTabs />
    </SafeAreaView>
  );
}
