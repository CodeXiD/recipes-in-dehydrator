import {View, StyleSheet, ScrollView} from "react-native";
import CategoryRowItem from "./CategoryRowItem";

export default function CategoriesRowList() {
    return (
        <ScrollView
            style={styles.categoriesList}
            horizontal={true}
        >
            <View style={styles.categoryItem}>
                <CategoryRowItem />
            </View>

            <View style={styles.categoryItem}>
                <CategoryRowItem />
            </View>

            <View style={styles.categoryItem}>
                <CategoryRowItem />
            </View>
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
