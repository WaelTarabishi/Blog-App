import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
const COMMENT_URL = "/api/comment";
const initialState = {
  likes: 0,
};
const likesSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    setLikes: (state, action) => {
      state.likes = action.payload;
    },
    getLikes: (state, action) => {
      return state.likes[action.payload.commentId];
    },
  },
});

export const { getLikes, setLikes } = likesSlice.actions;
export default likesSlice.reducer;
