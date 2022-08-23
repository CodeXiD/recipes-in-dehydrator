import axios from "axios";
import Constants from 'expo-constants';
import {useMemo} from "react";
import useUser from "./useUser";

export default function useApi() {
    const user = useUser();
    const axiosInstance = useMemo(() => {
        console.log('### user.accessToken', user.accessToken)
        return axios.create({
            baseURL: Constants.manifest!.extra!.apiUrl,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': user.accessToken.current ? `Bearer ${user.accessToken.current}`: false,
            },
        });
    }, [user.accessToken])

    return axiosInstance;
}
