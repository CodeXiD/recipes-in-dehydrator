import {StyleSheet, Text} from 'react-native';
import MainLayout from "../layouts/MainLayout";
import SimpleHeader from "../components/UI/navigations/SimpleHeader";
import NotificationColumnList from "../components/notifications/NotificationColumnList";

export default function NotificationsScreen() {
    const notifications = [
        {
            imageUrl: 'https://icon-library.com/images/moderation-icon/moderation-icon-2.jpg',
            title: 'Рецепт промодеровано',
            text: 'Ваш рецепт "Медово гіричні джерки" успішно промодеровано, та доступний для перегляду.',
        },
        {
            imageUrl: 'http://cdn.onlinewebfonts.com/svg/img_369356.png',
            title: 'Оновлення додатку',
            text: 'Ми оновили додаток до версії 0.0.2. Перегляньте що нового у цьому оновленні.',
        },
    ]

    return (
        <MainLayout>
            <SimpleHeader withBackButton={false}>
                Повідомлення
            </SimpleHeader>

            <NotificationColumnList
                notifications={notifications}
            />
        </MainLayout>
    );
}

const styles = StyleSheet.create({

});
