import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    caption: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setCaption: (state, action) => {
      state.caption = action.payload;
    },
  },
});

export const { setUser, setCaption } = userSlice.actions;
export default userSlice.reducer;
