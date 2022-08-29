import { ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import SimpleHeader from '../components/UI/navigations/SimpleHeader';
import SimpleLoader from '../components/UI/general/SimpleLoader';
import PostColumnList from '../components/posts/PostColumnList';
import useApi from '../composables/useApi';

export default function FavoritesScreen() {
  const api = useApi();
  const [isLoading, setLoading] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  const fetchFavoriteRecipes = async () => {
    setLoading(true);
    return api()
      .get('/posts')
      .then(({ data }) => {
        setFavoriteRecipes(data);
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
        fetchFavoriteRecipes();
      }))();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const favoriteRecipesContent = (
    <ScrollView>
      <PostColumnList posts={favoriteRecipes} />
    </ScrollView>
  );

  return (
    <MainLayout>
      <SimpleHeader withBackButton={false}>Збережені рецепти</SimpleHeader>

      {isLoading ? <SimpleLoader /> : favoriteRecipesContent}
    </MainLayout>
  );
}
