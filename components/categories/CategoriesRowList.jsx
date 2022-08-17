import {View, StyleSheet, ScrollView, Pressable} from "react-native";
import CategoryRowItem from "./CategoryRowItem";
import {useNavigation} from "@react-navigation/native";

export default function CategoriesRowList({ categories }) {
    const navigation = useNavigation();

    return (
        <ScrollView
            style={styles.categoriesList}
            horizontal={true}
        >
            {
                categories.map((category) => {
                    return (
                        <Pressable
                            key={category.id}
                            style={styles.categoryItem}
                            onPress={() => navigation.navigate('Category', { categoryId: category.id })}
                        >
                            <CategoryRowItem category={category} />
                        </Pressable>
                    )
                })
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    categoriesList: {
        flexDirection: 'row'
    },
    categoryItem: {
        marginRight: 25,
    }
})
