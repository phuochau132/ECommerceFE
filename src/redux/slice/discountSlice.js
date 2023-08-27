import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  error: null,
  status: "",
  linkTo: "/",
};
export const getDiscount = createAsyncThunk("auth/discount", async () => {
  const response = await axios.get("http://localhost:3006/product/");
  let data = response.data;
  return data;
});

const discountSlice = createSlice({
  name: "discount",
  initialState,
  reducers: {
    changeStatus: (state, action) => {
      const tmp = action.payload;
      state.status = "change status";
      state.listProducts.forEach((item) => {
        if (item.id == tmp.id) {
          if (action.payload.type == 1) {
            item.status = true;
          } else {
            item.status = false;
          }
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDiscount.pending, (state) => {
        state.status = "loading";
        state.status = "";
        state.error = "";
      })
      .addCase(getDiscount.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.filterProducts = action.payload;
        state.listProducts = action.payload;
        state.error = null;
      })
      .addCase(getDiscount.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.error = action.error.message;
      });
  },
});
export default discountSlice.reducer;
