import { createSlice } from '@reduxjs/toolkit';

type ThemeAppearance = 'light' | 'dark';

interface AppState {
  theme: ThemeAppearance;
  isLoading: boolean;
}

const initialState: AppState = {
  theme: 'light',
  isLoading: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { toggleTheme, setLoading } = appSlice.actions;
export default appSlice.reducer;
