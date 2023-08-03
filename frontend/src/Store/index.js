import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./Reducer/LoginSlice";
import dataReuducer from "./Reducer/DataSlice";

const Store = configureStore({
  reducer: {
    login: loginReducer,
    udata: dataReuducer,
  },
});

export default Store;
