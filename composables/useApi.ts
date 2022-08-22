import axios from "axios";
// @ts-ignore
import { REACT_APP_API_URL } from '@env'

export default function useApi() {
    const axiosInstance = axios.create({
        baseURL: REACT_APP_API_URL,
    });

    return axiosInstance;
}
