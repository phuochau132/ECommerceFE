import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MDBInput } from "mdbreact";
import { useState, useCallback, useRef, useEffect } from "react";
import { Transition } from "react-transition-group";
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";

import styles from "./style.module.scss";
import Item from "./Item";
import Button from "../../components/Button";
import { changeInfo, getInfoUser, logout } from "../../redux/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNotify } from "../../redux/slice/notifySlice";
import { colors } from "../../components/Notify";
import { changeAvatar } from "../../redux/slice/authSlice";
import Loading from "../../components/Loading/Loading";

const cx = classNames.bind(styles);

function Profile() {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const auth = useSelector((state) => {
    return state.auth;
  });
  const user = auth.user;
  const orders = useSelector((state) => state.order.listOrders);
  console.log(981);
  console.log(orders);
  const [file, setFile] = useState(null);
  const [check, setCheck] = useState(0);
  const [viewOrders, setViewOrders] = useState(false);
  const inputUserName = useRef(null);
  const inputPassword = useRef(null);
  const inputFullName = useRef(null);
  const inputEmail = useRef(null);
  const [infoUser, setInfoUser] = useState({
    address: user.address,
    phone: user.phone,
    fullName: user.fullname,
  });
  const handleImageUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (file && file.type.match("image.*")) {
      setFile(file);
    }
  }, []);
  useEffect(() => {
    // console.log(user.fullname === infoUser.fullName);
    if (file !== null) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("id", user.id);
      dispatch(changeAvatar(formData));
      setCheck((prev) => {
        return prev + 1;
      });
    }
  }, [file]);
  const logOut = useCallback(() => {
    dispatch(logout());
    navigator("/login");
  }, []);
  
  const handleSaveIfProfile = (event) => {
    event.preventDefault();
    dispatch(changeInfo({ ...infoUser, id: user.id }));
    setCheck((prev) => {
      return prev + 1;
    });
  };
  console.log(auth.status);
  return (
    <div className={cx("wrapper")}>
      {auth.status === "loading" && <Loading />}
      <div className={cx("container")}>
        <p className="title">
          PROFILE<span className="title-bottom"></span>
        </p>
      </div>
      <div className={cx("content")}>
        <div className={cx("profile_left")}>
          <div className={cx("profile_title")}>
            <p>Thông tin tài khoản</p>
          </div>
          <div className={cx("p_left_img")}>
            <div className={cx("header_img")}>
              <img
                src={
                  user.avatar
                    ? user.avatar
                    : "https://scontent.fsgn19-1.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=IpD62_lqMzoAX_Lzbfv&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfA245SABmrRaNd2FzZKdqBwYkewsfl69x54Gp6_KA_4fQ&oe=64A5F4F8"
                }
              ></img>
              <label htmlFor="img_upload">
                <FontAwesomeIcon
                  className={cx("change_img")}
                  icon={faCameraRetro}
                ></FontAwesomeIcon>
              </label>
            </div>
            <p className={cx("userName")}>Phước Hậu</p>
            <Button onClick={logOut} style={{ fontSize: "12px" }}>
              Đăng xuất
            </Button>

            <input
              style={{ display: "none" }}
              id="img_upload"
              type="file"
              onChange={(e) => {
                handleImageUpload(e);
              }}
            ></input>
          </div>
          <form className={cx("p_left_info")}>
            <MDBInput
              disabled
              ref={inputUserName}
              label="Tên tài khoản"
              name="userName"
              type="text"
              valueDefault={user !== null && user.userName}
              className={cx("input")}
            />
            <MDBInput
              disabled
              ref={inputPassword}
              label="Mật khẩu"
              name="password"
              type="password"
              valueDefault="hazdasd"
              className={cx("input")}
            />
            <MDBInput
              ref={inputFullName}
              label="Họ và tên"
              name="fullName"
              type="text"
              onChange={(e) => {
                setInfoUser((prev) => ({
                  ...prev,
                  fullName: e.target.value,
                }));
              }}
              valueDefault={user !== null && user.fullname}
              className={cx("input")}
            />
            <MDBInput
              label="Số điện thoại"
              name="phone"
              type="text"
              onChange={(e) => {
                setInfoUser((prev) => ({
                  ...prev,
                  phone: e.target.value,
                }));
              }}
              valueDefault={user !== null && user.phone}
              className={cx("input")}
            />
            <MDBInput
              label="Địa chỉ"
              name="address"
              type="text"
              onChange={(e) => {
                setInfoUser((prev) => ({
                  ...prev,
                  address: e.target.value,
                }));
              }}
              valueDefault={user !== null && user.address}
              className={cx("input")}
            />
            <MDBInput
              disabled
              ref={inputEmail}
              label="Email"
              name="email"
              type="text"
              valueDefault={user !== null && user.email}
              className={cx("input")}
            />
            <Button
              className={cx({
                disabled:
                  user.fullname === infoUser.fullName &&
                  user.address === infoUser.address &&
                  user.phone === infoUser.phone,
              })}
              disabled={
                user.fullname === infoUser.fullName &&
                user.address === infoUser.address &&
                user.phone === infoUser.phone
              }
              onClick={(e) => {
                handleSaveIfProfile(e);
              }}
            >
              Lưu
            </Button>
          </form>
        </div>
        <div className={cx("profile_right")}>
          <div className={cx("profile_title")}>
            <p>Đơn hàng</p>
          </div>
          <div className={cx("p_right_content")}>
            <div>
              <p
                onClick={() => {
                  setViewOrders((prev) => {
                    return !prev;
                  });
                }}
                style={{
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                {!viewOrders ? "Xem thêm" : "Ẩn bớt"}
              </p>
            </div>
            <div className={cx("content_order")}>
              {orders.map((item, index) => {
                if (viewOrders) {
                  return (
                    <div className={cx("order_items")}>
                      <p className={cx("title_order")}>Đơn hàng {index}</p>
                      {item.products.map((product, index) => (
                        <Item key={index} item={product} />
                      ))}
                      <div className={cx("row-between")}>
                        <p>Địa chỉ:</p>
                        <p>{item.order_address}</p>
                      </div>
                      <div className={cx("row-between")}>
                        <p>Tổng tiền:</p>
                        <p className={cx("highlight")}>${item.total_price}</p>
                      </div>
                    </div>
                  );
                } else {
                  if (index <= 2) {
                    return (
                      <div className={cx("order_items")}>
                        <p className={cx("title_order")}>Đơn hàng {index}</p>
                        {item.products.map((product, index) => (
                          <Item key={index} item={product} />
                        ))}
                        <div className={cx("row-between")}>
                          <p>Địa chỉ:</p>
                          <p>{item.order_address}</p>
                        </div>
                        <div className={cx("row-between")}>
                          <p>Tổng tiền:</p>
                          <p className={cx("highlight")}>${item.total_price}</p>
                        </div>
                      </div>
                    );
                  }
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
