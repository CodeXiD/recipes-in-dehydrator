import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import ProfileWelcome from '../components/user/ProfileWelcome';
import CategoriesRowList from '../components/categories/CategoriesRowList';
import PostColumnList from '../components/posts/PostColumnList';
import SimpleLoader from '../components/UI/general/SimpleLoader';
import useApi from '../composables/useApi';
import MainLayout from '../layouts/MainLayout';
import BaseButton from '../components/UI/buttons/BaseButton';
import useUser from '../composables/useUser';

const styles = StyleSheet.create({
  profileBlock: {
    marginBottom: 24,
  },
  createPostButtonWrapper: {
    marginBottom: 24,
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 12,
  },
  createPostButtonHint: {
    textAlign: 'center',
    color: '#b7b7b7',
    marginTop: 6,
  },
  categoriesBlock: {
    marginBottom: 24,
  },
  categoriesBlockTitle: {
    marginBottom: 12,
    fontSize: 16,
    fontWeight: '800',
  },
});

export default function HomeScreen() {
  const api = useApi();
  const user = useUser();
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [popularRecipes, setPopularRecipes] = useState([]);

  const fetchCategories = async () => {
    setLoading(true);
    return api()
      .get('/categories')
      .then(({ data }) => {
        setCategories(data);
      })
      .catch(() => {
        alert('Не вдалось завантажити категорії');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchPopularRecipes = async () => {
    setLoading(true);
    return api()
      .get('/posts')
      .then(({ data }) => {
        setPopularRecipes(data);
      })
      .catch(() => {
        alert('Не вдалось завантажити популярні рецепти');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    (() =>
      new Promise(() => {
        fetchCategories();
        fetchPopularRecipes();
      }))();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const categoriesContent = categories.length ? (
    <CategoriesRowList categories={categories} />
  ) : null;

  const popularRecipesContent = <PostColumnList posts={popularRecipes} />;

  return (
    <MainLayout>
      <ScrollView>
        <View style={styles.profileBlock}>
          <ProfileWelcome />
        </View>

        <View style={styles.createPostButtonWrapper}>
          <BaseButton
            disabled={!user.isLoggedIn}
            onPress={() => navigation.navigate('CreatePost' as never) as never}
          >
            Додати власний рецепт
          </BaseButton>
          {!user.isLoggedIn ? (
            <Text style={styles.createPostButtonHint}>
              Стане доступно після входу до профілю
            </Text>
          ) : (
            <Text style={styles.createPostButtonHint}>
              Поділіться своїми рецептами з іншими користувачами
            </Text>
          )}
        </View>

        <View style={styles.categoriesBlock}>
          <Text style={styles.categoriesBlockTitle}>Категорії</Text>

          {isLoading ? <SimpleLoader /> : categoriesContent}
        </View>

        <View>
          <Text style={styles.categoriesBlockTitle}>Популярні рецепти</Text>

          {isLoading ? <SimpleLoader /> : popularRecipesContent}
        </View>
      </ScrollView>
    </MainLayout>
  );
}
