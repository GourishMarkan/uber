// import { configureStore } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userslice";
import socketSlice from "./slices/socketSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    socketio: socketSlice,
  },
});
export default store;
