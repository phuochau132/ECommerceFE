import { Route, BrowserRouter, Routes } from "react-router-dom";
import { authRoutes, privateRoutes, publicRoutes } from "./routes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Notify, Header, PrivateRoute, Footer } from "./components";
import { SidebarCart } from "./components";
import { loadProducts } from "./redux/slice/productSlice";
import logo from "./logo.svg";
import "./App.css";
import Loading from "./components/Loading/Loading";
import { addNotify } from "./redux/slice/notifySlice";
import { colors } from "./components/Notify";
import { loadCarts } from "./redux/slice/cartSlice";
import { loadOrder } from "./redux/slice/orderSlice";
function App() {
  const dispatch = useDispatch();
  const [check, setCheck] = useState(false);
  const notify = useSelector((state) => {
    return state.notify;
  });
  const auth = useSelector((state) => {
    return state.auth;
  });
  useEffect(() => {
    if (auth.user) {
      dispatch(loadCarts(auth.user.id));
      dispatch(loadOrder(auth.user.id));
    }
  }, [auth]);
  const statusCart = useSelector((state) => {
    return state.cart.status;
  });
  const statusOrder = useSelector((state) => {
    return state.order.status;
  });
  const statusProduct = useSelector((state) => {
    return state.product.status;
  });
  //cart
  useEffect(() => {
    if (statusCart != null) {
      switch (statusCart) {
        case "addCartSucceeded":
          dispatch(
            addNotify({
              title: "Thành công",
              content: "Đã thêm sản phẩm vào giỏ hàng",
              color: colors.success,
            })
          );
          break;
        case "addCartFailed":
          dispatch(
            addNotify({
              title: "Thất bại",
              content: "Thêm sản phẩm không thành công",
              color: colors.error,
            })
          );
          break;
        case "delSucceeded":
          dispatch(
            addNotify({
              title: "Thành công",
              content: "Xóa sản phẩm thành công",
              color: colors.success,
            })
          );
          break;
        case "delFailed":
          dispatch(
            addNotify({
              title: "Thất bại",
              content: "Xóa sản phẩm không thành công",
              color: colors.error,
            })
          );
          break;
        default:
          break;
      }
    }
  }, [statusCart]);
  useEffect(() => {
    if (statusOrder != null) {
      console.log(statusOrder);
      switch (statusOrder) {
        case "addOrderFailed":
          dispatch(
            addNotify({
              title: "Thất bại",
              content: "Thanh toán không thành công",
              color: colors.error,
            })
          );
          break;
        case "addOrderSucceeded":
          dispatch(
            addNotify({
              title: "Thành công",
              content: "Thanh toán thành công",
              color: colors.success,
            })
          );
          break;
        default:
          break;
      }
    }
  }, [statusOrder]);
  useEffect(() => {
    if (check != 0) {
      if (auth.status === "logout") {
        dispatch(
          addNotify({
            title: "Đăng xuất thành công",
            content: "Bạn đã đăng xuất",
            color: colors.success,
          })
        );
      }
      if (auth.status === "changeAvatarSucceeded") {
        dispatch(
          addNotify({
            title: "Thành công",
            content: "Thay đổi avatar thành công",
            color: colors.success,
          })
        );
      } else {
        if (auth.status === "changeAvatarFailed") {
          dispatch(
            addNotify({
              title: "Thất bại",
              content: "Thay đổi avatar không thành công",
              color: colors.error,
            })
          );
        } else {
          if (auth.status === "changeInfoSucceeded") {
            dispatch(
              addNotify({
                title: "Thành công",
                content: "Thay đổi thông tin thành công",
                color: colors.success,
              })
            );
          } else {
            if (auth.status === "changeInfoFailed") {
              dispatch(
                addNotify({
                  title: "Thất bại",
                  content: "Thay đổi thông tin không thành công",
                  color: colors.error,
                })
              );
            }
          }
        }
      }
    }
  }, [auth]);

  return (
    <BrowserRouter>
      <div>
        {notify.content !== "" ? (
          <Notify
            color={notify.color}
            title={notify.title}
            content={notify.content}
          />
        ) : (
          ""
        )}
        <Header />
        <SidebarCart />
        <Routes>
          {publicRoutes.map((tmp) => {
            const Page = tmp.component;
            return <Route path={tmp.path} element={<Page />} />;
          })}
          {privateRoutes.map((tmp) => {
            const Page = tmp.component;
            return (
              <Route
                path={tmp.path}
                element={<PrivateRoute path={tmp.path} Page={<Page />} />}
              />
            );
          })}
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
