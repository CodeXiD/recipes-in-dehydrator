import {ScrollView, StyleSheet} from 'react-native';
import SimpleHeader from "../components/UI/navigations/SimpleHeader";
import PostColumnList from "../components/posts/PostColumnList";
import axios from "axios";
import {useEffect, useState} from "react";
import SimpleLoader from "../components/UI/general/SimpleLoader";
import MainLayout from "../layouts/MainLayout";

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

    const postsContent = posts.length ? (
        <ScrollView style={styles.postListWrapper}>
            <PostColumnList posts={posts} />
        </ScrollView>
    ) : null;

    return (
        <MainLayout>
            <SimpleHeader>
                {category ? `Категорія "${category.name}"` : 'Категорія'}
            </SimpleHeader>

            {isLoading ? <SimpleLoader /> : postsContent}
        </MainLayout>
    );
}

const styles = StyleSheet.create({
    postListWrapper: {
      marginTop: 24,
    },
});
