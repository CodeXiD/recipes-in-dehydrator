import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  userData: any | null;
  accessToken: string | null;
}

const initialState = {
  userData: null,
  accessToken: null,
} as UserState;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserState['userData']>) => {
      state.userData = action.payload;
    },
    setAccessToken: (
      state,
      action: PayloadAction<UserState['accessToken']>,
    ) => {
      state.accessToken = action.payload;
    },
  },
});

export const { setUserData, setAccessToken } = userSlice.actions;

export default userSlice.reducer;
