import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isDarkMode: false
  },
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    disableDarkMode: (state) => {
      state.isDarkMode = false;
    }
  }
});

export const { toggleDarkMode, disableDarkMode  } = uiSlice.actions;

export default uiSlice.reducer;
