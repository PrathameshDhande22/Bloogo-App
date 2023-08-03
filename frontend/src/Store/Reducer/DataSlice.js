import { createSlice } from "@reduxjs/toolkit";

const DataSlice = createSlice({
  name: "data",
  initialState: { userData: {} },
  reducers: {
    setData: (state, action) => {
      state.userData = action.payload;
    },
    removeData: (state) => {
      state.userData = {};
    },
  },
});

export const { removeData, setData } = DataSlice.actions;
export default DataSlice.reducer;
