import {ScrollView, StyleSheet, Text, View} from 'react-native';
import ProfileWelcome from "../components/user/ProfileWelcome";
import CategoriesRowList from "../components/categories/CategoriesRowList";
import PostColumnList from "../components/posts/PostColumnList";
import {useEffect, useState} from "react";
import axios from "axios";
import SimpleLoader from "../components/UI/general/SimpleLoader";
import useApi from "../composables/useApi";
import MainLayout from "../layouts/MainLayout";

export default function HomeScreen() {
    const api = useApi();
    const [isLoading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [popularRecipes, setPopularRecipes] = useState([]);

    const fetchCategories = async () => {
        setLoading(true);
        return api.get('/categories')
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
    }, []);

    const categoriesContent = categories.length ? (
        <CategoriesRowList
            categories={categories}
        />
    ) : null;

    const popularRecipesContent = (
        <PostColumnList
            posts={popularRecipes}
        />
    );

    return (
        <MainLayout>
            <ScrollView>
                <View style={styles.profileBlock}>
                    <ProfileWelcome />
                </View>

                <View style={styles.categoriesBlock}>
                    <Text style={styles.categoriesBlockTitle}>
                        Категорії
                    </Text>

                    {isLoading ? <SimpleLoader /> : categoriesContent}
                </View>

                <View>
                    <Text style={styles.categoriesBlockTitle}>
                        Популярні рецепти
                    </Text>

                    {isLoading ? <SimpleLoader /> : popularRecipesContent}
                </View>
            </ScrollView>
        </MainLayout>
    );
}

const styles = StyleSheet.create({
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
