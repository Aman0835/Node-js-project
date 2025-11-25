import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connection";
import RequestSlice from "./requestsSlice";



const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connection: connectionReducer,
    request : RequestSlice
  },
});

export default appStore;
