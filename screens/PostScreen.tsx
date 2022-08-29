import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import SimpleHeader from '../components/UI/navigations/SimpleHeader';
import SimpleLoader from '../components/UI/general/SimpleLoader';
import MainLayout from '../layouts/MainLayout';
import useApi from '../composables/useApi';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
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
    fontWeight: '600',
    marginBottom: 14,
  },
  postDetailsText: {},
  authorWrapper: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  authorName: {
    color: '#2BC169',
    fontSize: 16,
  },
  createdDate: {
    color: '#a8a8a8',
    fontSize: 14,
  },
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function PostScreen({
  route: {
    params: { postId = '' },
  },
}) {
  const api = useApi();
  const [isLoading, setLoading] = useState(false);
  const [post, setPost] = useState<null | any>(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      return api()
        .get(`/posts/${postId}`)
        .then(({ data }) => {
          setPost(data);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchPost();
  }, [api, postId]);

  if (!post) {
    return (
      <MainLayout>
        <SimpleHeader>Завантаження рецепта</SimpleHeader>
      </MainLayout>
    );
  }

  const headerTitle = () =>
    post.title.length > 20 ? `${post.title.substring(0, 20)}...` : post.title;

  const postContent = (
    <ScrollView>
      <View style={styles.postImageWrapper}>
        <Image style={styles.postImage} source={{ uri: post.imageUrl }} />
      </View>

      <View style={styles.postDetails}>
        <Text style={styles.postDetailsTitle}>{post.title}</Text>

        <Text style={styles.postDetailsText}>{post.text}</Text>
      </View>

      <View style={styles.authorWrapper}>
        <Text style={styles.authorName}>{post.author.fullName}</Text>

        <Text style={styles.createdDate}>
          {new Date(post.createdAt).toLocaleDateString()}
        </Text>
      </View>
    </ScrollView>
  );

  return (
    <MainLayout>
      <SimpleHeader>Рецепт &quot;{headerTitle()}&quot;</SimpleHeader>

      {isLoading ? <SimpleLoader /> : postContent}
    </MainLayout>
  );
}
