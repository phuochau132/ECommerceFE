import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import classNames from "classnames/bind";
import styles from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { delItemCarts } from "../../../redux/slice/cartSlice";

const cx = classNames.bind(styles);
function Item({ item, itemIsLast }) {
  const dispatch = useDispatch();
  console.log(item);
  const handleDelItem = () => {
    dispatch(delItemCarts(item));
  };
  return (
    <div
      className={cx("wrapper", {
        "border-bottom": !itemIsLast,
      })}
    >
      <img
        className={cx("img")}
        src={process.env.REACT_APP_HOST_SERVER + item.productImg[0]}
      />
      <div className={cx("content")}>
        <h4 className={cx("name")}>{item.productName}</h4>
        <p className={cx("color")}>{item.productName}</p>
        <div className={cx("count-price")}>
          <span>{item.quantity}</span>
          <p className={cx("price highlight")}>{item.productPrice}$</p>
        </div>
      </div>
      <span className={cx("del-item")}>
        <FontAwesomeIcon onClick={handleDelItem} icon={faXmark} />
      </span>
    </div>
  );
}

export default Item;
