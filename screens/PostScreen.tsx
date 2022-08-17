import {Image, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import SimpleHeader from "../components/UI/navigations/SimpleHeader";
import PostColumnList from "../components/posts/PostColumnList";
import {useEffect, useState} from "react";
import axios from "axios";
import SimpleLoader from "../components/UI/general/SimpleLoader";

// @ts-ignore
export default function PostScreen({ route: { params: { postId } } }) {
    const [isLoading, setLoading] = useState(false);
    const [post, setPost] = useState<null | any>(null)

    const fetchPost = async () => {
        setLoading(true);
        return axios.get(`https://62fce4786e617f88dea06a4e.mockapi.io/api/v1/posts/${postId}`)
            .then(({ data }) => {
                setPost(data);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    useEffect(() => {
        fetchPost()
    }, []);

    if(!post) {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" />
                <SimpleHeader>
                    Завантаження рецепта
                </SimpleHeader>
            </SafeAreaView>
        )
    }

    const headerTitle = () => post.title.length > 20 ? `${post.title.substring(0, 20)}...` : post.title;

    const postContent = (
        <ScrollView>
            <View style={styles.postImageWrapper}>
                <Image
                    style={styles.postImage}
                    source={{ uri: post.image }}
                />
            </View>

            <View style={styles.postDetails}>
                <Text style={styles.postDetailsTitle}>
                    { post.title }
                </Text>

                <Text style={styles.postDetailsText}>
                    { post.text }
                </Text>
            </View>

            <View style={styles.authorWrapper}>
                <Text style={styles.authorName}>
                    { post.author }
                </Text>

                <Text style={styles.createdDate}>
                    { new Date(post.createdAt).toLocaleDateString() }
                </Text>
            </View>
        </ScrollView>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <SimpleHeader>
                Рецепт "{ headerTitle() }"
            </SimpleHeader>

            { isLoading ? <SimpleLoader /> : postContent }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 14
    },
    postImageWrapper: {
        marginTop: 24,
    },
    postImage: {
        width: '100%',
        height: 250,
        borderRadius: 12,
    },
    postDetails: {
        marginTop: 14,
    },
    postDetailsTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 14
    },
    postDetailsText: {

    },
    authorWrapper: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    authorName: {
        color: "#2BC169",
        fontSize: 16
    },
    createdDate: {
        color: '#a8a8a8',
        fontSize: 14
    }
});
