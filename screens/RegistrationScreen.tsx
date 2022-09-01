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

export default function RegistrationScreen() {
  const api = useApi();
  const user = useUser();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    phone: '+38 (0',
    password: '',
  });
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

  const register = (): any => {
    setIsLoading(true);
    setErrorMessage(null);

    api()
      .post('/auth/register', {
        ...form,
        phone: `+${form.phone.replace(/[^0-9.]/g, '')}`,
      })
      .then(() => {
        return navigation.navigate('Authorization' as never);
      })
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Реєстрація',
          text2: 'Ви успішно створили профіль, авторизуйтесь',
          visibilityTime: 6000,
          position: 'bottom',
          bottomOffset: 100,
        });
      })
      .catch(() => {
        setErrorMessage('Можливо такой номер вже був вказанний');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const isValidForm = useMemo(() => {
    return (
      form.fullName.length >= 3 &&
      form.phone.length === 19 &&
      form.password.length >= 6
    );
  }, [form.fullName, form.phone, form.password]);

  const errorMessageContent = errorMessage ? (
    <View style={styles.errorMessage}>
      <Text style={styles.errorMessageText}>{errorMessage}</Text>
    </View>
  ) : null;

  return (
    <MainLayout>
      <SimpleHeader>Створення профілю</SimpleHeader>
      <View style={styles.formWrapper}>
        {errorMessageContent}

        <View style={styles.form}>
          <View style={styles.formField}>
            <BaseInput
              label="ПІБ"
              value={form.fullName}
              onChangeValue={value => {
                setForm({ ...form, fullName: value });
              }}
              placeholder="Іванов Іван Іванович"
            />
          </View>

          <View style={styles.formField}>
            <BaseInput
              label="Номер телефону"
              value={form.phone}
              onChangeValue={value => {
                setForm({ ...form, phone: value });
              }}
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
              secureTextEntry
            />
          </View>

          <View style={styles.actions}>
            <BaseButton disabled={!isValidForm || isLoading} onPress={register}>
              Створити профиль
            </BaseButton>
          </View>
        </View>
      </View>
    </MainLayout>
  );
}
