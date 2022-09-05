import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
  favorites: any | null;
}

const initialState = {
  favorites: null,
} as FavoritesState;

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites: (
      state,
      action: PayloadAction<FavoritesState['favorites']>,
    ) => {
      state.favorites = action.payload;
    },
  },
});

export const { setFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
