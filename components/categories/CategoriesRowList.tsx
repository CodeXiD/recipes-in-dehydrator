import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CategoryRowItem from './CategoryRowItem';
import { Category } from '../../types/category';

const styles = StyleSheet.create({
  categoriesList: {
    flexDirection: 'row',
  },
  categoryItem: {
    marginRight: 25,
  },
});

export default function CategoriesRowList({
  categories,
}: {
  categories: Category[];
}) {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.categoriesList} horizontal>
      {categories.map(category => {
        return (
          <TouchableOpacity
            key={category.id}
            activeOpacity={0.5}
            style={styles.categoryItem}
            onPress={() =>
              navigation.navigate(
                'Category' as never,
                { categoryId: category.id } as never,
              )
            }
          >
            <CategoryRowItem category={category} />
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
