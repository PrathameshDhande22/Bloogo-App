import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLogin: false,
  },
  reducers: {
    setLogin: (state) => {
      state.isLogin = true;
    },
    removeLogin: (state) => {
      state.isLogin = false;
    },
  },
});

export const { setLogin, removeLogin } = loginSlice.actions;
export default loginSlice.reducer;
