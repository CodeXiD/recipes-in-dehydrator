import {Text, View, StyleSheet, Image} from "react-native";

export default function CategoryRowItem({ category }) {
    return (
        <View style={styles.categoryItem}>
            <View style={styles.categoryIconWrapper}>
                <Image
                    style={styles.categoryIconImage}
                    source={{ uri: category.imageUrl }}
                />
            </View>
            <Text style={styles.categoryName}>{ category.name }</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    categoryItem: {
        backgroundColor: "#fff",
        justifyContent: 'center',
        alignItems: 'center',
        height: 180,
        width: 120,
        borderRadius: 12,
        paddingHorizontal: 12,
    },
    categoryIconWrapper: {
        width: 50,
        height: 50,
        borderRadius: '50%',
        backgroundColor: '#2BC169',
        marginBottom: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryIconImage: {
      width: 30,
      height: 30,
    },
    categoryName: {
        fontWeight: '600',
        textAlign: 'center'
    }
})
