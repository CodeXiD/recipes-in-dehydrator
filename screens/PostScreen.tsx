import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useEffect, useMemo, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import SimpleHeader from '../components/UI/navigations/SimpleHeader';
import SimpleLoader from '../components/UI/general/SimpleLoader';
import MainLayout from '../layouts/MainLayout';
import useApi from '../composables/useApi';
import { setFavorites } from '../store/favorites/favoritesSlice';
import { RootState } from '../store';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
  },
  postImageWrapper: {
    marginTop: 24,
    position: 'relative',
  },
  postImage: {
    width: '100%',
    height: 250,
    borderRadius: 12,
  },
  favoriteControlButton: {
    position: 'absolute',
    top: 14,
    right: 14,
    backgroundColor: '#fff',
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    alignItems: 'center',
    justifyContent: 'center',
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
  const dispatch = useDispatch();
  const favoritesState = useSelector((state: RootState) => state.favorites);

  const existFavoritePostItem = useMemo(() => {
    return favoritesState.favorites.find(
      (favoriteItem: any) => favoriteItem.post.id === postId,
    );
  }, [postId, favoritesState.favorites]);

  const addToFavorites = () => {
    api()
      .post('/users/favorites/', { postId })
      .then(() => {
        return api().get('/users/favorites');
      })
      .then(({ data }) => {
        dispatch(setFavorites(data));
        Toast.show({
          type: 'success',
          text1: 'Збережені рецепти',
          text2: 'Ви успішно зберегли рецепт',
          visibilityTime: 6000,
          position: 'bottom',
          bottomOffset: 100,
        });
      })
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: 'Збережені рецепти',
          text2:
            'Під час додавання рецепту до збережених сталася помилка, спробуйте пізніше',
          visibilityTime: 6000,
          position: 'bottom',
          bottomOffset: 100,
        });
      });
  };

  const removeFromFavorites = () => {
    api()
      .delete(`/users/favorites/${existFavoritePostItem.id}`)
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Збережені рецепти',
          text2: 'Ви успішно видалили збережений рецепт',
          visibilityTime: 6000,
          position: 'bottom',
          bottomOffset: 100,
        });
        return api().get('/users/favorites');
      })
      .then(({ data }) => {
        dispatch(setFavorites(data));
      })
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: 'Збережені рецепти',
          text2:
            'Під час додавання рецепту до збережених сталася помилка, спробуйте пізніше',
          visibilityTime: 6000,
          position: 'bottom',
          bottomOffset: 100,
        });
      });
  };

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <Image
          style={styles.postImage}
          source={{ uri: post.imageFile.downloadUrl }}
        />

        <TouchableOpacity
          style={styles.favoriteControlButton}
          onPress={() =>
            existFavoritePostItem ? removeFromFavorites() : addToFavorites()
          }
        >
          <MaterialIcons
            name={existFavoritePostItem ? 'favorite' : 'favorite-outline'}
            size={24}
            color={existFavoritePostItem ? '#ef9f40' : '#000'}
          />
        </TouchableOpacity>
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
