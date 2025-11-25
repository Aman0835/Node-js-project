import { createSlice } from "@reduxjs/toolkit";

const RequestSlice =createSlice({
  name: "request",
  initialState: [],
  reducers: {
    addRequest: (state, action) => action.payload,}
});


export const {addRequest} = RequestSlice.actions;

export default RequestSlice.reducer;


