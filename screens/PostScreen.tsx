import {Image, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import SimpleHeader from "../components/UI/navigations/SimpleHeader";
import PostColumnList from "../components/posts/PostColumnList";

export default function PostScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <SimpleHeader>
                Рецепт "Курячі джерки"
            </SimpleHeader>

            <View style={styles.postImageWrapper}>
                <Image
                    style={styles.postImage}
                    source={{ uri: 'https://spoiledhounds.com/wp-content/uploads/2021/06/Dehydrated-Chicken-Jerky-Dogs-Recipe-Photo.jpg' }}
                />
            </View>

            <View style={styles.postDetails}>
                <Text style={styles.postDetailsTitle}>
                    Курячі джерки
                </Text>

                <Text style={styles.postDetailsText}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 14
    },
    postImageWrapper: {
        marginTop: 24,
    },
    postImage: {
        width: '100%',
        height: 250,
        borderRadius: 12,
    },
    postDetails: {
        marginTop: 14,
    },
    postDetailsTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 14
    },
    postDetailsText: {

    },
});
