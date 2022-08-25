import {useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import { setUserData as _setUserData, setAccessToken as _setAccessToken } from "../store/user/userSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootState} from "../store";

export default function useUser() {
    const dispatch = useDispatch();
    const userState = useSelector((state: RootState) => state.user);

    const isLoggedIn = useMemo(() => userState.accessToken && userState.userData, [userState.accessToken, userState.userData])

    const setAccessToken = (token: string | null) => {
        dispatch(_setAccessToken(token));
        if(token) {
            AsyncStorage.setItem('@user/accessToken', token);
        } else {
            AsyncStorage.removeItem('@user/accessToken');
            dispatch(_setUserData(null));
        }
    }

    const setUserData = (user: any | null) => {
        dispatch(_setUserData(user));
    }

    const clearAuth = () => {
        AsyncStorage.removeItem('@user/accessToken');
        dispatch(_setAccessToken(null));
        dispatch(_setUserData(null));
    }

    return {
        isLoggedIn,
        accessToken: userState.accessToken,
        setAccessToken,
        userData: userState.userData,
        setUserData,
        clearAuth,
    }
}
