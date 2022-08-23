import {View, StyleSheet} from "react-native";
import SimpleHeader from "../components/UI/navigations/SimpleHeader";
import MainLayout from "../layouts/MainLayout";
import BaseButton from "../components/UI/buttons/BaseButton";
import BaseInput from "../components/UI/inputs/BaseInput";
import {useMemo, useState} from "react";
import useApi from "../composables/useApi";
import useUser from "../composables/useUser";
import {useNavigation} from "@react-navigation/native";

export default function AuthorizationScreen() {
    const api = useApi();
    const user = useUser();
    const navigation = useNavigation();
    const [form, setForm] = useState({ phone: '+38 (050) 109-96-32', password: '123456' });
    const phoneMask = ['+', '3', '8', ' ', '(', '0', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];

    const login = () => {
        api.post('/auth/login',
            {
                user: {
                    ...form,
                    phone: '+'+form.phone.replace(/[^0-9.]/g, "")
                } }
        )
            .then((data) => {
                console.log('### data', data.data.access_token)
                user.setAccessToken(data.data.access_token)
            })
            .then(() => {
                console.log('### 123', user.accessToken)
                return api.get('/auth/profile')
            })
            .then(({ data }) => {
                user.setUserData(data);
            })
            .then(() => {
                navigation.navigate('Profile');
            })
            .catch((error) => {
                console.log('### error', error)
            })
    }

    const isValidForm = useMemo(() => {
        return form.phone.length === 19 && form.password.length >= 6;
    }, [form.phone, form.password])


    return (
        <MainLayout>
            <SimpleHeader>
                Авторизація
            </SimpleHeader>
            <View style={styles.formWrapper}>
                <View style={styles.form}>
                    <View style={styles.formField}>
                        <BaseInput
                            label="Номер телефону"
                            value={form.phone}
                            onChangeValue={(value) => { setForm({ ...form, phone: value }) }}
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
                            onChangeValue={(value) => { setForm({ ...form, password: value }) }}
                            editable
                            keyboardType="default"
                            multiline={false}
                            secureTextEntry={true}
                            placeholder=""
                            mask={undefined}
                        />
                    </View>

                    <View style={styles.actions}>
                        <BaseButton
                            disabled={!isValidForm}
                            onPress={login}
                        >
                            Увійти
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
    form: {

    },
    formField: {
        marginBottom: 12,
    },
    actions: {
        marginTop: 14
    }
})
