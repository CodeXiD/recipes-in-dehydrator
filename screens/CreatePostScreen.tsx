import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
} from 'react-native';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SimpleHeader from '../components/UI/navigations/SimpleHeader';
import MainLayout from '../layouts/MainLayout';
import BaseInput from '../components/UI/inputs/BaseInput';
import BaseButton from '../components/UI/buttons/BaseButton';
import useApi from '../composables/useApi';
import TagsInput from '../components/UI/inputs/TagsInput';
import BaseSelect from '../components/UI/selects/BaseSelect';
import useUploadFile from '../composables/useUploadFile';

const styles = StyleSheet.create({
  formWrapper: {},
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
  postImageEmptyWrapper: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  postImageEmptyText: {
    marginTop: 8,
    color: '#939393',
  },
  postImage: {
    backgroundColor: '#fff',
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
  imageFile: any | null;
  category: string | null;
  tags: string[];
};

export default function CreatePostScreen() {
  const api = useApi();
  const navigation = useNavigation();
  const uploadFile = useUploadFile();
  const scrollRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState<Form>({
    title: '',
    text: '',
    imageFile: null,
    category: null,
    tags: [],
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const create = (): any => {
    setIsLoading(true);
    setErrorMessage(null);

    api()
      .post('/posts', { ...form, imageFile: form.imageFile.id })
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        scrollRef.current?.scrollTo({
          y: 0,
          animated: true,
        });
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
    return (
      form.title.length >= 6 &&
      form.text.length >= 10 &&
      form.imageFile &&
      form.category &&
      form.tags.length >= 1
    );
  }, [form.title, form.text, form.imageFile, form.category, form.tags]);

  const pickImage = async (): Promise<any> => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.3,
    });

    if (!result.cancelled) {
      try {
        const fileName = result.uri.split('/').pop();

        if (fileName) {
          const match = /\.(\w+)$/.exec(fileName);
          const type = match ? `image/${match[1]}` : `image`;

          const { imageFile: oldImageFile } = form;
          setForm({ ...form, imageFile: null });
          setIsUploadingImage(true);
          uploadFile
            .upload(result.uri, fileName, type)
            .then(({ data: imageFile }) => {
              setForm({ ...form, imageFile });
              if (oldImageFile) {
                uploadFile.remove(oldImageFile.id);
              }
            })
            .catch(err => {
              if (oldImageFile) {
                setForm({ ...form, imageFile: oldImageFile });
              }
            })
            .finally(() => {
              setIsUploadingImage(false);
            });
        }
      } catch {
        setIsUploadingImage(false);
      }
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

      <ScrollView ref={scrollRef} style={styles.formWrapper}>
        <KeyboardAwareScrollView>
          {errorMessageContent}

          <View style={styles.form}>
            <View style={styles.formField}>
              {form.imageFile ? (
                <Image
                  source={{ uri: form.imageFile.downloadUrl }}
                  style={styles.postImage}
                />
              ) : (
                <View style={[styles.postImage, styles.postImageEmptyWrapper]}>
                  {isUploadingImage ? (
                    <>
                      <Entypo
                        name="upload-to-cloud"
                        size={80}
                        color="#2BC169"
                      />
                      <Text style={styles.postImageEmptyText}>
                        Завантаження зображення...
                      </Text>
                    </>
                  ) : (
                    <>
                      <AntDesign name="scan1" size={80} color="#939393" />
                      <Text style={styles.postImageEmptyText}>
                        Зображення не обрано
                      </Text>
                    </>
                  )}
                </View>
              )}

              <BaseButton
                onPress={pickImage as never}
                disabled={isUploadingImage}
                buttonStyles={{
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                }}
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
              <BaseButton
                disabled={!isValidForm || isLoading || isUploadingImage}
                onPress={create}
              >
                Додати рецепт
              </BaseButton>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
    </MainLayout>
  );
}
