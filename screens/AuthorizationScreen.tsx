import { View, Text, StyleSheet } from 'react-native';
import { useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import SimpleHeader from '../components/UI/navigations/SimpleHeader';
import MainLayout from '../layouts/MainLayout';
import BaseButton from '../components/UI/buttons/BaseButton';
import BaseInput from '../components/UI/inputs/BaseInput';
import useApi from '../composables/useApi';
import useUser from '../composables/useUser';

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
    marginTop: 14,
  },
});

export default function AuthorizationScreen() {
  const api = useApi();
  const user = useUser();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ phone: '+38 (0', password: '' });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const phoneMask = [
    '+',
    '3',
    '8',
    ' ',
    '(',
    '0',
    /\d/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
  ];

  const login = (): any => {
    setIsLoading(true);
    setErrorMessage(null);

    api()
      .post('/auth/login', {
        user: {
          ...form,
          phone: `+${form.phone.replace(/[^0-9.]/g, '')}`,
        },
      })
      .then(data => {
        user.setAccessToken(data.data.access_token);
      })
      .then(() => {
        return api().get('/auth/profile');
      })
      .then(({ data }) => {
        user.setUserData(data);
      })
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Авторизація',
          text2: 'Ви успішно увійшли у свій профіль',
          visibilityTime: 6000,
          position: 'bottom',
          bottomOffset: 100,
        });

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return navigation.navigate('Profile');
      })
      .catch(() => {
        setErrorMessage('Невірний логін або пароль');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const isValidForm = useMemo(() => {
    return form.phone.length === 19 && form.password.length >= 6;
  }, [form.phone, form.password]);

  const errorMessageContent = errorMessage ? (
    <View style={styles.errorMessage}>
      <Text style={styles.errorMessageText}>{errorMessage}</Text>
    </View>
  ) : null;

  return (
    <MainLayout>
      <SimpleHeader>Авторизація</SimpleHeader>
      <View style={styles.formWrapper}>
        {errorMessageContent}

        <View style={styles.form}>
          <View style={styles.formField}>
            <BaseInput
              label="Номер телефону"
              value={form.phone}
              onChangeValue={value => {
                setForm({ ...form, phone: value });
              }}
              editable
              keyboardType="default"
              multiline={false}
              secureTextEntry={false}
              placeholder="+38 (050) 123-45-67"
              mask={phoneMask}
            />
          </View>

          <View style={styles.formField}>
            <BaseInput
              label="Пароль"
              value={form.password}
              onChangeValue={value => {
                setForm({ ...form, password: value });
              }}
              editable
              keyboardType="default"
              multiline={false}
              secureTextEntry
              placeholder=""
              mask={undefined}
            />
          </View>

          <View style={styles.actions}>
            <BaseButton disabled={!isValidForm || isLoading} onPress={login}>
              Увійти
            </BaseButton>
          </View>
        </View>
      </View>
    </MainLayout>
  );
}
