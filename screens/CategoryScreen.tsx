import {Image, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import SimpleHeader from "../components/UI/navigations/SimpleHeader";
import PostColumnList from "../components/posts/PostColumnList";
import axios from "axios";
import {useEffect, useState} from "react";

// @ts-ignore
export default function CategoryScreen({ route }) {
    const [isLoading, setLoading] = useState(false);
    const [category, setCategory] = useState<null | any>(null)
    const [posts, setPosts] = useState([]);

    const fetchCategory = async () => {
        setLoading(true);
        return axios.get(`https://62fce4786e617f88dea06a4e.mockapi.io/api/v1/categories/${route.params.categoryId}`)
            .then(({ data }) => {
                setCategory(data);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    const fetchPosts = async () => {
        setLoading(true);
        return axios.get('https://62fce4786e617f88dea06a4e.mockapi.io/api/v1/posts')
            .then(({ data }) => {
                setPosts(data);
            })
            .catch((err) => {
                alert('Не вдалось завантажити рецепти')
            })
            .finally(() => {
                setLoading(false);
            })
    }

    useEffect(() => {
        fetchCategory()
            .then(fetchPosts)
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <SimpleHeader>
                {category ? `Категорія "${category.name}"` : 'Категорія'}
            </SimpleHeader>

            {
                posts.length ? (
                    <ScrollView style={styles.postListWrapper}>
                        <PostColumnList posts={posts} />
                    </ScrollView>
                ) : null
            }
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
