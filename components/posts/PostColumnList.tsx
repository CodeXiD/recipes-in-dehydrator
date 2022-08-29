import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PostColumnItem from './PostColumnItem';
import { Post } from '../../types/post';

const styles = StyleSheet.create({
  postBlock: {
    marginBottom: 10,
  },
});

export default function PostColumnList({ posts }: { posts: Post[] }) {
  const navigation = useNavigation();

  return (
    <View>
      {posts.map(post => (
        <TouchableOpacity
          key={post.id}
          style={styles.postBlock}
          activeOpacity={0.5}
          onPress={() =>
            navigation.navigate('Post' as never, { postId: post.id } as never)
          }
        >
          <PostColumnItem post={post} />
        </TouchableOpacity>
      ))}
    </View>
  );
}
