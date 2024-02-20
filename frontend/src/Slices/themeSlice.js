import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  //Check if user are exists then use his theme else return  to the default theme "Light"
  theme:
    localStorage.getItem("usertheme") && localStorage.getItem("userInfo")
      ? localStorage.getItem("usertheme")
      : "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggelTheme: (state, action) => {
      state.theme = action.payload === "light" ? "dark" : "light";
      localStorage.setItem("usertheme", state.theme);
    },
  },
});
export const { toggelTheme } = themeSlice.actions;

export default themeSlice.reducer;
