import {View, StyleSheet, ScrollView, Pressable, TouchableOpacity} from "react-native";
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
                        <TouchableOpacity
                            key={category.id}
                            activeOpacity={0.5}
                            style={styles.categoryItem}
                            onPress={() => navigation.navigate('Category', { categoryId: category.id })}
                        >
                            <CategoryRowItem category={category} />
                        </TouchableOpacity>
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
