import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  status: true,
};
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    changeStatus: (state, action) => {
      state.status = action.payload.status;
    },
  },
});

export const { changeStatus } = modalSlice.actions;
export default modalSlice.reducer;
