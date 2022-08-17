import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import ProfileWelcome from "../components/user/ProfileWelcome";
import CategoriesRowList from "../components/categories/CategoriesRowList";
import PostColumnList from "../components/posts/PostColumnList";

export default function HomeScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.profileBlock}>
                <ProfileWelcome />
            </View>

            <View style={styles.categoriesBlock}>
                <Text style={styles.categoriesBlockTitle}>
                    Категорії
                </Text>

                <CategoriesRowList />
            </View>

            <View>
                <Text style={styles.categoriesBlockTitle}>
                    Популярні рецепти
                </Text>

                <PostColumnList />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 14
    },
    profileBlock: {
        marginBottom: 24,
    },
    categoriesBlock: {
        marginBottom: 24,
    },
    categoriesBlockTitle: {
        marginBottom: 12,
        fontSize: 16,
        fontWeight: "800"
    },
});
