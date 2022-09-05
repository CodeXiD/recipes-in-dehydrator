import { ScrollView, View, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import { __waitForEmptyLogQueueAsync } from 'expo/build/logs/RemoteLogging';
import MainLayout from '../layouts/MainLayout';
import SimpleHeader from '../components/UI/navigations/SimpleHeader';
import SimpleLoader from '../components/UI/general/SimpleLoader';
import PostColumnList from '../components/posts/PostColumnList';
import useApi from '../composables/useApi';
import useUser from '../composables/useUser';
import EmptyNotification from '../components/UI/general/EmptyNotification';
import BaseButton from '../components/UI/buttons/BaseButton';
import { setFavorites } from '../store/favorites/favoritesSlice';

const styles = StyleSheet.create({
  guestActionButtons: {
    flexDirection: 'row',
  },
  guestActionButton: {
    flex: 1,
  },
});

export default function FavoritesScreen() {
  const api = useApi();
  const navigation = useNavigation();
  const user = useUser();
  const [isLoading, setLoading] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const dispatch = useDispatch();

  const fetchFavoriteRecipes = async () => {
    setLoading(true);
    return api()
      .get('/users/favorites')
      .then(({ data }) => {
        dispatch(setFavorites(data));
        console.log('### data', data);
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
    if (user.isLoggedIn) {
      fetchFavoriteRecipes();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.isLoggedIn]);

  if (!user.isLoggedIn) {
    return (
      <MainLayout>
        <SimpleHeader withBackButton={false}>Збережені рецепти</SimpleHeader>

        <EmptyNotification>
          Щоб зберігати рецепти необхідно авторизуватись
        </EmptyNotification>

        <View style={styles.guestActionButtons}>
          <View style={[styles.guestActionButton, { marginRight: 8 }]}>
            <BaseButton
              onPress={() => navigation.navigate('Authorization' as never)}
            >
              Увійти
            </BaseButton>
          </View>

          <View style={styles.guestActionButton}>
            <BaseButton
              buttonStyles={{ backgroundColor: '#2b8a9f' }}
              onPress={() => navigation.navigate('Registration' as never)}
            >
              Створити профіль
            </BaseButton>
          </View>
        </View>
      </MainLayout>
    );
  }
  const favoriteRecipesContent = (
    <ScrollView>
      {favoriteRecipes.length ? (
        <PostColumnList posts={favoriteRecipes.map(recipe => recipe.post)} />
      ) : (
        <EmptyNotification>Жодного рецепту щє не додано...</EmptyNotification>
      )}
    </ScrollView>
  );

  return (
    <MainLayout>
      <SimpleHeader withBackButton={false}>Збережені рецепти</SimpleHeader>

      {isLoading ? <SimpleLoader /> : favoriteRecipesContent}
    </MainLayout>
  );
}
