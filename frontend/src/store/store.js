// import { configureStore } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userslice";
const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
export default store;
