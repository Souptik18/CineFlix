import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    darkModeEnabled: initialState,
  },
  reducers: {
    toggleDarkMode: (state) => {
      state.darkModeEnabled = !state.darkModeEnabled;
    },
  },
});

// Export the action creator
export const { toggleDarkMode } = themeSlice.actions;

// Export the reducer
export default themeSlice.reducer;
