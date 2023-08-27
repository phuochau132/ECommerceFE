import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  listOrders: [],
  error: null,
  status: "",
  linkTo: "/",
};
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomDeliveryDate() {
  var currentDate = new Date();
  var deliveryDays = getRandomNumber(1, 10);
  var deliveryDate = new Date(
    currentDate.getTime() + deliveryDays * 24 * 60 * 60 * 1000
  );
  return deliveryDate;
}
export const loadOrder = createAsyncThunk("auth/loadOrder", async (userId) => {
  const response = await axios.get(
    `${process.env.REACT_APP_HOST_SERVER}/order/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`,
      },
    }
  );
  const rs = response.data;
  return {
    rs,
  };
});
export const addOrder = createAsyncThunk("auth/addOrder", async (item) => {
  let response;
  let response2;
  const now = new Date();
  const day = now.getDate().toString().padStart(2, "0");
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const year = now.getFullYear();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  let dateExp = getRandomDeliveryDate();
  const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  response = await axios.post(
    `${process.env.REACT_APP_HOST_SERVER}/order`,
    {
      idUser: item.idUser,
      totalAmount: item.totalAmount,
      orderDate: formattedDateTime,
      deliveryDate: dateExp,
      phoneNumber: item.phone,
      address: item.address,
      listCart: item.listCart,
      idTransport: item.type ? item.type : 1,
    },
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`,
      },
    }
  );
  //cash
  let data = response.data;
  return {
    id: data.id,
    idUser: item.idUser,
    totalAmount: item.totalAmount,
    orderDate: formattedDateTime,
  };
});

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addOrder.pending, (state) => {
        state.status = "loading";
        state.status = "";
        state.error = "";
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.status = "addOrderSucceeded";
        state.listOrders = [...state.listOrders, action.payload];
        state.error = null;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.status = "addOrderFailed";
        state.user = null;
        state.error = action.error.message;
      })
      .addCase(loadOrder.pending, (state) => {
        state.status = "loading";
        state.status = "";
        state.error = "";
      })
      .addCase(loadOrder.fulfilled, (state, action) => {
        state.status = "loadOrderSucceeded";
        state.listOrders = action.payload.rs.data;
        state.error = null;
      })
      .addCase(loadOrder.rejected, (state, action) => {
        state.status = "loadOrderFailed";
        state.user = null;
        state.error = action.error.message;
      });
  },
});

export const { removeItemFromCart } = orderSlice.actions;
export default orderSlice.reducer;
