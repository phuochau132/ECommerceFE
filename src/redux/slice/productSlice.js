import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  listProducts: JSON.parse(localStorage.getItem("listProducts")) || [],
  filterProducts: [],
  error: null,
  status: "",
  linkTo: "/",
};
export const loadProducts = createAsyncThunk("auth/products", async () => {
  const response = await axios.get("http://localhost:3006/product/");
  let data = response.data;
  return data;
});
export const changeQuantity = createAsyncThunk(
  "auth/changeQuantity",
  async (item) => {
    let quantity;
    if (item.type == 0) {
      quantity = item.quantity + item.count;
    } else {
      quantity = item.quantity - item.count;
    }
    const response = await axios.patch(
      `http://localhost:3000/products/${item.id}`,
      {
        quantity,
      }
    );
    let data = response.data;
    return {
      id: item.id,
      quantity: quantity,
    };
  }
);
const productSlice = createSlice({
  name: "products",
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
    filterProductByType: (state, action) => {
      const productNew = state.listProducts.filter((tmp) => {
        return action.payload.type === tmp.type;
      });
      state.filterProducts = productNew;
    },
    filterProductByPrice: (state, action) => {
      state.filterProducts = state.listProducts.filter((tmp) => {
        if (action.payload.type.price !== null) {
          return tmp.price <= action.payload.type.price;
        }
        return (
          tmp.price <= action.payload.type.max &&
          tmp.price <= action.payload.type.min
        );
      });
    },
    filterProductBySize: (state, action) => {
      const productNew = state.listProducts.filter((tmp) => {
        return tmp.size.includes(action.payload.type);
      });
      state.filterProducts = productNew;
    },
    getQuantityColorById: (state, action) => {
      state.listProducts.map((item) => {
        if (
          item.id === action.payload.idProduct &&
          item.color.quantity > 0 &&
          item.color.id === action.payload.id
        ) {
          return {
            quantity: item.color.quantity,
          };
        }
      });
    },
    getQuantitySizeById: (state, action) => {
      state.listProducts.map((item) => {
        if (
          item.id === action.payload.idProduct &&
          item.size.quantity > 0 &&
          item.size.id === action.payload.id
        ) {
          return {
            quantity: item.size.quantity,
          };
        }
      });
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.status = "loading";
        state.status = "";
        state.error = "";
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.filterProducts = action.payload;
        state.listProducts = action.payload;
        state.error = null;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.error = action.error.message;
      });
  },
});

export const {
  changeStatus,
  filterProductByType,
  filterProductByPrice,
  filterProductBySize,
  getQuantityColorById,
  getQuantitySizeById,
} = productSlice.actions;
export default productSlice.reducer;
