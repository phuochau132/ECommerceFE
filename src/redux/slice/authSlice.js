import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  error: null,
  status: "",
  linkTo: "/",
};
export const login = createAsyncThunk(
  "auth/login",
  async ({ name, password }) => {
    const response = await axios.post("http://localhost:3006/account/login", {
      userName: name,
      password,
    });
    console.log(response);
    let data = response.data;
    return data;
  }
);
export const changeAvatar = createAsyncThunk(
  "auth/changeAvatar",
  async (formData) => {
    const response = await axios.post(
      `${process.env.REACT_APP_HOST_SERVER}/account/profile/changeAvatar`,
      formData,
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
export const changeInfo = createAsyncThunk(
  "auth/changeInfo",
  async ({ id, fullName, phone, address }) => {
    const response = await axios.post(
      `http://localhost:3006/account/profile/changeInfoAccount`,
      { id, fullName, phone, address },
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
export const getInfoUser = createAsyncThunk(
  "auth/changeInfo",
  async ({ id }) => {
    const response = await axios.get(
      `http://localhost:3006/account/getAllUser`,
      {
        id,
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
    const user = data.filter((item) => {
      return item.id === id;
    });
    return user;
  }
);
const profileSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.user = null;
      state.status = "logout";
      localStorage.setItem("user", null);
      localStorage.setItem("accessToken", null);
    },
    setLinkTo: (state, action) => {
      state.linkTo = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.status = "";
        state.error = "";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.error = null;
        localStorage.setItem(
          "accessToken",
          JSON.stringify(action.payload.token)
        );
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.error = action.error.message;
      })
      .addCase(changeAvatar.pending, (state) => {
        state.status = "loading";
        state.status = "";
        state.error = "";
      })
      .addCase(changeAvatar.fulfilled, (state, action) => {
        state.status = "changeAvatarSucceeded";
        state.user.avatar = action.payload.pathAvatar;
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...state.user,
            avatar: action.payload.pathAvatar,
          })
        );
        state.error = null;
      })
      .addCase(changeAvatar.rejected, (state, action) => {
        state.status = "changeAvatarFailed";
        state.user = null;
        state.error = action.error.message;
      })
      .addCase(changeInfo.pending, (state) => {
        state.status = "loading";
        state.status = "";
        state.error = "";
      })
      .addCase(changeInfo.fulfilled, (state, action) => {
        state.status = "changeInfoSucceeded";
        state.user = {
          ...state.user,
          ...action.payload.user,
        };
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...state.user,
            ...action.payload.user,
          })
        );
        state.error = null;
      })
      .addCase(changeInfo.rejected, (state, action) => {
        state.status = "changeInfoFailed";
        state.user = null;
        state.error = action.error.message;
      });
  },
});

export const { logout, setLinkTo, setError } = profileSlice.actions;

export default profileSlice.reducer;
