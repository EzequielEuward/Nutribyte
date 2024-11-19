import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isDarkMode: false  
  },
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;  
    }
  }
});

export const { toggleDarkMode } = uiSlice.actions;

export default uiSlice.reducer;
