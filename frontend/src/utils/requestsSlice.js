import { createSlice } from "@reduxjs/toolkit";

const RequestSlice = createSlice({
  name: "request",
  initialState: [],
  reducers: {
    addRequest: (state, action) => action.payload,
    removeRequest: (state, action) => {
      const newArray = state.filter((r) => r._id !== action.payload);
      return newArray;
    },
  },
});

export const { addRequest, removeRequest } = RequestSlice.actions;

export default RequestSlice.reducer;
