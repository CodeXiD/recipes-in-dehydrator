import axios from "axios";
import Constants from 'expo-constants';
import {useStore} from "react-redux";
import {RootState} from "../store";

export default function useApi() {
    const store = useStore();
    return () => {
        const state = store.getState() as RootState;
        const accessToken = state.user.accessToken;

        return axios.create({
            baseURL: Constants.manifest!.extra!.apiUrl,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken ? `Bearer ${accessToken}`: false,
            },
        });
    }
}
