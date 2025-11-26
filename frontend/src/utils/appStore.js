import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import connectionReducer from "./connection";
import feedReducer from "./feedSlice";
import RequestSlice from "./requestsSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connection: connectionReducer,
    request: RequestSlice,
  },
});

export default appStore;
