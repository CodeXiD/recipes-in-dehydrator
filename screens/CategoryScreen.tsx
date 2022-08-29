import { ScrollView, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import SimpleHeader from '../components/UI/navigations/SimpleHeader';
import PostColumnList from '../components/posts/PostColumnList';
import SimpleLoader from '../components/UI/general/SimpleLoader';
import MainLayout from '../layouts/MainLayout';
import useApi from '../composables/useApi';
import EmptyNotification from '../components/UI/general/EmptyNotification';

const styles = StyleSheet.create({
  postListWrapper: {
    marginTop: 24,
  },
  emptyPostsBlock: {},
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function CategoryScreen({ route }) {
  const api = useApi();
  const [isLoading, setLoading] = useState(false);
  const [category, setCategory] = useState<null | any>(null);
  const [posts, setPosts] = useState([]);

  const fetchCategory = async () => {
    setLoading(true);
    return api()
      .get(`/categories/${route.params.categoryId}`)
      .then(({ data }) => {
        setCategory(data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchPosts = async () => {
    setLoading(true);
    return api()
      .get(`/categories/${route.params.categoryId}/posts`)
      .then(({ data }) => {
        setPosts(data);
      })
      .catch(() => {
        alert('Не вдалось завантажити рецепти');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCategory().then(fetchPosts);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const emptyPosts =
    !isLoading && posts && !posts.length ? (
      <EmptyNotification>Жодного рецепту щє не додано...</EmptyNotification>
    ) : null;

  const postsContent =
    !isLoading && posts && posts.length ? (
      <ScrollView style={styles.postListWrapper}>
        <PostColumnList posts={posts} />
      </ScrollView>
    ) : null;

  return (
    <MainLayout>
      <SimpleHeader>
        {category ? `Категорія "${category.name}"` : 'Категорія'}
      </SimpleHeader>
      {emptyPosts}
      {isLoading && <SimpleLoader />}
      {postsContent}
    </MainLayout>
  );
}
