import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useUser from '../../composables/useUser';
import useApi from '../../composables/useApi';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function SetupUser({ children }) {
  const user = useUser();
  const api = useApi();

  useEffect(() => {
    // get user access token from storage
    AsyncStorage.getItem('@user/accessToken')
      .then(accessToken => {
        user.setAccessToken(accessToken);
        return api().get('/auth/profile');
      })
      .then(({ data }) => {
        user.setUserData(data);
      })
      .catch(() => {
        user.setAccessToken(null);
        user.setUserData(null);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
}
