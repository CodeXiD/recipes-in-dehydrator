import {Image, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import SimpleHeader from "../components/UI/navigations/SimpleHeader";
import PostColumnList from "../components/posts/PostColumnList";

export default function CategoryScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <SimpleHeader />

            <ScrollView style={styles.postListWrapper}>
                <PostColumnList />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 14
    },
    postListWrapper: {
      marginTop: 24,
    },
});
