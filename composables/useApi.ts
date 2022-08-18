import axios from "axios";

export default function useApi() {
    const axiosInstance = axios.create({
        baseURL: "https://recipes-b292.restdb.io/rest",
        headers: {
            'x-apikey': 'cfa0832360930a60969b991e572360b2321a6'
        }
    });

    return axiosInstance;
}
