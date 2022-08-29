import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { useEffect, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import * as ImagePicker from 'expo-image-picker';
import SimpleHeader from '../components/UI/navigations/SimpleHeader';
import MainLayout from '../layouts/MainLayout';
import BaseInput from '../components/UI/inputs/BaseInput';
import BaseButton from '../components/UI/buttons/BaseButton';
import useApi from '../composables/useApi';
import TagsInput from '../components/UI/inputs/TagsInput';
import BaseSelect from '../components/UI/selects/BaseSelect';

const styles = StyleSheet.create({
  formWrapper: {
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
  postImage: {
    width: '100%',
    height: 240,
    borderRadius: 12,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  tag: {
    backgroundColor: '#fff',
    padding: 4,
    borderRadius: 4,
    fontSize: 12,
    marginRight: 4,
  },
  actions: {
    marginTop: 14,
  },
});

type Form = {
  title: string;
  text: string;
  imageUrl: string;
  category: string | null;
  tags: string[];
};

export default function CreatePostScreen() {
  const api = useApi();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState<Form>({
    title: '',
    text: '',
    imageUrl:
      'https://spoiledhounds.com/wp-content/uploads/2021/06/Dehydrated-Chicken-Jerky-Dogs-Recipe-Photo.jpg',
    category: null,
    tags: ['chicken', 'degidrator', 'spicy'],
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const create = (): any => {
    setIsLoading(true);
    setErrorMessage(null);

    api()
      .post('/posts', form)
      .then(({ data }) => {
        Toast.show({
          type: 'success',
          text1: 'Додавання рецепту',
          text2: 'Ви успішно створили рецепт',
          visibilityTime: 6000,
          position: 'bottom',
          bottomOffset: 100,
        });

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return navigation.navigate('Post', { postId: data.id });
      })
      .catch(({ response }) => {
        setErrorMessage(response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const fetchCategories = () => {
    setIsLoading(true);
    api()
      .get('/categories')
      .then(({ data }) => {
        setCategories(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchCategories();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isValidForm = useMemo(() => {
    return form.title.length >= 6 && form.text.length >= 10;
  }, [form.title, form.text]);

  const pickImage = async (): Promise<any> => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      setForm({ ...form, imageUrl: result.uri });
    }
  };

  const errorMessageContent = errorMessage ? (
    <View style={styles.errorMessage}>
      <Text style={styles.errorMessageText}>{errorMessage}</Text>
    </View>
  ) : null;

  return (
    <MainLayout>
      <SimpleHeader>Додавання рецепту</SimpleHeader>

      <ScrollView style={styles.formWrapper}>
        {errorMessageContent}

        <View style={styles.form}>
          <View style={styles.formField}>
            {form.imageUrl && (
              <Image source={{ uri: form.imageUrl }} style={styles.postImage} />
            )}

            <BaseButton
              onPress={pickImage as never}
              buttonStyles={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
            >
              Обрати зображення рецепту
            </BaseButton>
          </View>

          <View style={styles.formField}>
            <BaseInput
              label="Назва"
              value={form.title}
              onChangeValue={value => {
                setForm({ ...form, title: value });
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
              onChangeValue={value => {
                setForm({ ...form, text: value });
              }}
              editable
              keyboardType="default"
              multiline
              secureTextEntry={false}
              placeholder="Опишіть у подробицях рецепт..."
              mask={undefined}
              inputStyle={{ height: 100 }}
            />
          </View>

          <BaseSelect
            value={form.category}
            label="Категорія"
            onValueChange={(itemValue: string) =>
              setForm({ ...form, category: itemValue })
            }
            items={categories.map((c: { name: string; id: string }) => ({
              label: c.name,
              value: c.id,
            }))}
          />

          <View style={styles.formField}>
            <TagsInput
              label="Хештеги"
              tags={form.tags}
              placeholder="Наприклад: курка/свинина/гостре"
              onChangeTags={(tags: string[]) => {
                setForm({ ...form, tags });
              }}
            />
          </View>

          <View style={styles.actions}>
            <BaseButton disabled={!isValidForm || isLoading} onPress={create}>
              Додати рецепт
            </BaseButton>
          </View>
        </View>
      </ScrollView>
    </MainLayout>
  );
}
