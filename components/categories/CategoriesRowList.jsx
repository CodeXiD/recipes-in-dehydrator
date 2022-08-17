import {View, StyleSheet, ScrollView, Pressable} from "react-native";
import CategoryRowItem from "./CategoryRowItem";
import {useNavigation} from "@react-navigation/native";

export default function CategoriesRowList() {
    const navigation = useNavigation();

    return (
        <ScrollView
            style={styles.categoriesList}
            horizontal={true}
        >
            <Pressable
                style={styles.categoryItem}
                onPress={() => navigation.navigate('Category')}
            >
                <CategoryRowItem />
            </Pressable>

            <Pressable
                style={styles.categoryItem}
                onPress={() => navigation.navigate('Category')}
            >
                <CategoryRowItem />
            </Pressable>

            <Pressable
                style={styles.categoryItem}
                onPress={() => navigation.navigate('Category')}
            >
                <CategoryRowItem />
            </Pressable>
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
