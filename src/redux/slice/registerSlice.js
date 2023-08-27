import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";

const initialState = {
  error: null,
  status: "",
};

export const register = createAsyncThunk("auth/register", async (params) => {
  const responseCheck = await axios.get("http://localhost:3006/account/");
  let dataCheck = responseCheck.data;
  let user;
  user = dataCheck.filter((tmp) => {
    return tmp.userName === params.name;
  });
  if (user.length !== 0) {
    return { type: 0, data: null };
  } else {
    const response = await axios.post(
      "http://localhost:3006/account/register",
      params
    );
    let data = response.data;
    return { type: 1, data };
  }
});
const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        if (action.payload.type === 1) {
          state.status = "succeeded";
        } else {
          state.status = "error";
          state.error = "Tên đăng nhập đã tồn tại hệ thống";
        }
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.error = action.error.message;
      });
  },
});

export const { setError } = registerSlice.actions;

export default registerSlice.reducer;
