import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  listCarts: JSON.parse(localStorage.getItem("listCarts")) || [],
  error: null,
  status: "",
  linkTo: "/",
};
export const loadCarts = createAsyncThunk("auth/carts", async (id) => {
  const response = await axios.get(
    `${process.env.REACT_APP_HOST_SERVER}/cart/${id}`,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`,
      },
    }
  );
  let data = response.data;
  return data;
});
export const addItemIntoCart = createAsyncThunk(
  "auth/addCart",
  async (data) => {
    const response = await axios.post(
      `${process.env.REACT_APP_HOST_SERVER}/cart`,
      {
        user_id: data.user_id,
        product_id: data.product_id,
        color_id: data.color.id,
        size_id: data.size.id,
        quantity: data.quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("accessToken")
          )}`,
        },
      }
    );
    let result = response.data;
    result = result.data;
    delete result.color_id;
    delete result.size_id;
    return {
      ...result,
      color: {
        ...data.color,
      },
      size: {
        ...data.size,
      },
      productImg: data.productImg,
      productName: data.productName,
      productPrice: data.productPrice,
    };
  }
);

export const delItemCarts = createAsyncThunk("auth/delCart", async (item) => {
  const response = await axios.delete(
    process.env.REACT_APP_HOST_SERVER + `/cart/${item.id}`,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`,
      },
    }
  );
  let data = response.data;
  return item;
});
export const changeQuantityItemCarts = createAsyncThunk(
  "auth/changeQuantity",
  async (item) => {
    const quantity = item.type ? item.quantity + 1 : item.quantity - 1;
    const response = await axios.patch(
      `${process.env.REACT_APP_HOST_SERVER}/cart/${item.id}`,
      {
        quantity: quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("accessToken")
          )}`,
        },
      }
    );
    let data = response.data;
    return data;
  }
);
const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    changeStatusCart: (state, action) => {
      const tmp = action.payload;
      state.user = null;
      state.status = "change status";
      state.listCarts.forEach((item) => {
        if (item.id == tmp.id) {
          item.status = tmp.status;
        }
      });
      saveListCartIntoLs(state.listCarts);
    },
  },
  extraReducers: (builder) => {
    builder
      //load cart
      .addCase(loadCarts.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(loadCarts.fulfilled, (state, action) => {
        state.status = "succeeded";
        const listCartsLs = getListCartsIntoLs();
        if (listCartsLs) {
          action.payload.forEach((item) => {
            listCartsLs.forEach((tmp) => {
              if (item.id == tmp.id) {
                item.status = tmp.status;
              }
            });
          });
          saveListCartIntoLs(action.payload);
        }
        state.listCarts = action.payload;
        state.error = null;
      })
      .addCase(loadCarts.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.error = action.error.message;
      })
      //add Item into cart
      .addCase(addItemIntoCart.fulfilled, (state, action) => {
        state.status = "addCartSucceeded";
        const tmp = action.payload;
        state.listCarts = [...state.listCarts, tmp];
        state.error = null;
        saveListCartIntoLs(state.listCarts);
      })
      .addCase(addItemIntoCart.rejected, (state, action) => {
        state.status = "addCartFailed";
        state.user = null;
        state.error = action.error.message;
      })
      .addCase(addItemIntoCart.pending, (state) => {
        state.status = "loading";
        state.status = "";
        state.error = "";
      })
      //Delete item from cart

      .addCase(delItemCarts.pending, (state) => {
        state.status = "loading";
        state.status = "";
        state.error = "";
      })
      .addCase(delItemCarts.fulfilled, (state, action) => {
        state.status = "delSucceeded";
        state.listCarts = state.listCarts.filter((tmp) => {
          return tmp.id != action.payload.id;
        });
        saveListCartIntoLs(state.listCarts);
        state.error = null;
      })
      .addCase(delItemCarts.rejected, (state, action) => {
        state.status = "delFailed";
        state.user = null;
        state.error = action.error.message;
      })
      //change quantity item Carts
      .addCase(changeQuantityItemCarts.pending, (state) => {
        state.status = "loading";
        state.status = "";
        state.error = "";
      })
      .addCase(changeQuantityItemCarts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.listCarts.forEach((item) => {
          if (item.id == action.payload.id) {
            item.quantity = action.payload.quantity;
          }
        });
        saveListCartIntoLs(state.listCarts);
        state.error = null;
      })
      .addCase(changeQuantityItemCarts.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.error = action.error.message;
      });
  },
});

const saveListCartIntoLs = (listCarts) => {
  localStorage.setItem("listCarts", JSON.stringify(listCarts));
};
const getListCartsIntoLs = () => {
  return JSON.parse(localStorage.getItem("listCarts"));
};
export const { removeItemFromCart, changeStatusCart } = cartSlice.actions;
export default cartSlice.reducer;
