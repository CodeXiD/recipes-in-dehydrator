import {useMemo, useRef, useState} from "react";

export default function useUser() {
    const accessToken = useRef<string>();
    const userData = useRef();

    const isLoggedIn = useMemo(() => accessToken.current && userData.current, [accessToken, userData])

    const setAccessToken = (token: string) => {
        accessToken.current = token;
        if(!token) userData.current = undefined;
    }

    const setUserData = (user: any | undefined) => {
        userData.current = user;
    }

    const clearAuth = () => {
        accessToken.current = undefined;
        userData.current = undefined;
    }

    return {
        isLoggedIn,
        accessToken,
        setAccessToken,
        userData,
        setUserData,
        clearAuth,
    }
}
