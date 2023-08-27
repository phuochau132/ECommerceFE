import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import logo from "../../../images/logo.png";
import classNames from "classnames/bind";
import styles from "./style.module.scss";
import { changeStatus } from "../../../redux/slice/modalSlice";
import { colors } from "../../Notify";
import { addNotify } from "../../../redux/slice/notifySlice";

const cx = classNames.bind(styles);
function Header(props) {
  const user = useSelector((state) => state.auth.user);
  const carts = useSelector((state) => state.cart.listCarts);
  const [active, setActive] = useState(window.location.pathname);
  const [openNav, setOpenNav] = useState(false);
  const dispatch = useDispatch();

  const handleNav = (elm) => {
    setActive(elm);
    setOpenNav(false);
  };
  const openNavMobile = () => {
    setOpenNav(!openNav);
  };
  const onModal = (status) => {
    console.log(123);
    dispatch(changeStatus({ status }));
  };
  const handleViewCart = () => {
    if (user) {
      onModal(false);
      return;
    }
    dispatch(
      addNotify({
        title: "Thất bại",
        content: "Vui lòng đăng nhập",
        color: colors.error,
      })
    );
  };
  return (
    <nav className={cx("nav_main")}>
      <img src={logo} />
      <ul>
        <li>
          <Link
            onClick={() => handleNav("/")}
            to={"/"}
            className={cx(active === "/" ? "active" : "")}
          >
            Trang chủ
          </Link>
        </li>
        <li>
          <Link
            onClick={() => handleNav("/product/1")}
            to={"/product/1"}
            className={cx(active === "/product/1" ? "active" : "")}
          >
            Sản phẩm
          </Link>
        </li>
        <li>
          <Link
            onClick={() => handleNav("/recruitment")}
            to={"/recruitment"}
            className={cx(active === "/recruitment" ? "active" : "")}
          >
            Tuyển dụng
          </Link>
        </li>
        <li>
          <Link
            onClick={() => handleNav("/contact")}
            to={"/contact"}
            className={cx(active === "/contact" ? "active" : "")}
          >
            Liên hệ
          </Link>
        </li>
      </ul>
      <div className={cx("navbar-user")}>
        <div onClick={handleViewCart} className={cx("cart_icon")}>
          <i class="fa fa-shopping-cart"></i>
          {user && <span className={cx("quantity_cart")}>{carts.length}</span>}
        </div>
        {user ? (
          <Link to={"/profile"}>
            <i class="fa fa-user"></i>
          </Link>
        ) : (
          <Link to={"/login"}>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </Link>
        )}

        <Link className={cx("hide menu_mobile")} onClick={openNavMobile}>
          <i class="fa fa-bars"></i>
        </Link>
      </div>
      <div
        className={cx("menu_item_mobile")}
        style={openNav ? { display: "flex" } : { display: "none" }}
      >
        <Link
          onClick={() => handleNav("/")}
          to={"/"}
          className={cx(active === "/" ? "active" : "")}
        >
          Trang chủ
        </Link>
        <Link
          onClick={() => handleNav("/product/1")}
          to={"/product/1"}
          className={cx(active === "/product/1" ? "active" : "")}
        >
          Sản phẩm
        </Link>
        <Link
          onClick={() => handleNav("/recruitment")}
          to={"/recruitment"}
          className={cx(active === "/recruitment" ? "active" : "")}
        >
          Tuyển dụng
        </Link>
        <Link
          onClick={() => handleNav("/contact")}
          to={"/contact"}
          className={cx(active === "/contact" ? "active" : "")}
        >
          Liên hệ
        </Link>
      </div>
    </nav>
  );
}

export default Header;
