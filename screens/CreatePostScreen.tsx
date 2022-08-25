import {StyleSheet, Text, View} from "react-native";
import SimpleHeader from "../components/UI/navigations/SimpleHeader";
import MainLayout from "../layouts/MainLayout";
import BaseInput from "../components/UI/inputs/BaseInput";
import BaseButton from "../components/UI/buttons/BaseButton";
import useApi from "../composables/useApi";
import {useMemo, useState} from "react";
import useUser from "../composables/useUser";
import {useNavigation} from "@react-navigation/native";
import Toast from "react-native-toast-message";

export default function CreatePostScreen() {
    const api = useApi();
    const user = useUser();
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({
        title: '',
        text: '',
        imageUrl: 'https://spoiledhounds.com/wp-content/uploads/2021/06/Dehydrated-Chicken-Jerky-Dogs-Recipe-Photo.jpg',
        category: '62ff868fde1c516b6fc8785a',
        tags: ["chicken", "degidrator", "spicy"]
    });

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const create = () => {
        setIsLoading(true)
        setErrorMessage(null)

        api().post('/posts', form)
            .then(({data}) => {
                Toast.show({
                    type: 'success',
                    text1: 'Додавання рецепту',
                    text2: 'Ви успішно створили рецепт',
                    visibilityTime: 6000,
                    position: 'bottom',
                    bottomOffset: 100
                });

                // @ts-ignore
                return navigation.navigate('Post', { postId: data.id });
            })
            .catch(({response}) => {
                setErrorMessage(response.data.message)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const isValidForm = useMemo(() => {
        return form.title.length >= 6 && form.text.length >= 10;
    }, [form.title, form.text]);

    const errorMessageContent = errorMessage ? (
        <View style={styles.errorMessage}>
            <Text style={styles.errorMessageText}>
                { errorMessage }
            </Text>
        </View>
    ) : null;

    return (
        <MainLayout>
            <SimpleHeader>
                Додавання рецепту
            </SimpleHeader>

            <View style={styles.formWrapper}>
                {errorMessageContent}

                <View style={styles.form}>
                    <View style={styles.formField}>
                        <BaseInput
                            label="Назва"
                            value={form.title}
                            onChangeValue={(value) => {
                                setForm({...form, title: value})
                            }}
                            editable
                            keyboardType="default"
                            multiline={false}
                            secureTextEntry={false}
                            placeholder="Курячі джерки у соусі тереякі"
                            mask={undefined}
                        />
                    </View>

                    <View style={styles.formField}>
                        <BaseInput
                            label="Текст рецепту"
                            value={form.text}
                            onChangeValue={(value) => {
                                setForm({...form, text: value})
                            }}
                            editable
                            keyboardType="default"
                            multiline={true}
                            secureTextEntry={false}
                            placeholder="Опишіть у подробицях рецепт..."
                            mask={undefined}
                            inputStyle={{ height: 60 }}
                        />
                    </View>

                    <View style={styles.actions}>
                        <BaseButton
                            disabled={!isValidForm || isLoading}
                            onPress={create}
                        >
                            Додати рецепт
                        </BaseButton>
                    </View>
                </View>
            </View>
        </MainLayout>
    )
}

const styles = StyleSheet.create({
    formWrapper: {
        flex: 1,
        paddingTop: 30,
    },
    form: {},
    errorMessage: {
        backgroundColor: '#eccdcd',
        borderRadius: 8,
        padding: 14,
        marginBottom: 18,
    },
    errorMessageText: {
        fontWeight: '600',
    },
    formField: {
        marginBottom: 12,
    },
    actions: {
        marginTop: 14
    }
})

