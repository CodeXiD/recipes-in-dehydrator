import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import ProfileWelcome from "../components/user/ProfileWelcome";
import CategoriesRowList from "../components/categories/CategoriesRowList";
import PostColumnList from "../components/posts/PostColumnList";
import {useEffect, useState} from "react";
import axios from "axios";

export default function HomeScreen() {
    const [isLoading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [popularRecipes, setPopularRecipes] = useState([]);

    const fetchCategories = async () => {
        setLoading(true);
        return axios.get('https://62fce4786e617f88dea06a4e.mockapi.io/api/v1/categories')
            .then(({ data }) => {
                setCategories(data);
            })
            .catch((err) => {
                alert('Не вдалось завантажити категорії')
            })
            .finally(() => {
                setLoading(false);
            })
    }

    const fetchPopularRecipes = async () => {
        setLoading(true);
        return axios.get('https://62fce4786e617f88dea06a4e.mockapi.io/api/v1/posts')
            .then(({ data }) => {
                setPopularRecipes(data);
            })
            .catch((err) => {
                alert('Не вдалось завантажити популярні рецепти')
            })
            .finally(() => {
                setLoading(false);
            })
    }



    useEffect(() => {
        new Promise(async () => {
            await fetchCategories();
            await fetchPopularRecipes();
        })
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <ScrollView>
                <View style={styles.profileBlock}>
                    <ProfileWelcome />
                </View>

                <View style={styles.categoriesBlock}>
                    <Text style={styles.categoriesBlockTitle}>
                        Категорії
                    </Text>

                    {
                        categories.length ? (
                            <CategoriesRowList
                                categories={categories}
                            />
                        ) : null
                    }
                </View>

                <View>
                    <Text style={styles.categoriesBlockTitle}>
                        Популярні рецепти
                    </Text>


                    <PostColumnList
                        posts={popularRecipes}
                    />
                </View>
            </ScrollView>
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
