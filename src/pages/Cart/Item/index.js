import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classNames from "classnames/bind";
import styles from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  changeQuantityItemCarts,
  changeStatusCart,
} from "../../../redux/slice/cartSlice";
import { colors } from "../../../components/Notify";
import { addNotify } from "../../../redux/slice/notifySlice";

const cx = classNames.bind(styles);
function Item({ item, index, size }) {
  const dispatch = useDispatch();
  const products = useSelector((state) => {
    return state.product.listProducts;
  });
  const [isActive, setIsActive] = useState(item.status);
  const getQuantityProductByColor = () => {
    for (let index = 0; index < products.length; index++) {
      const tmp = products[index];
      if (tmp.id === item.product_id) {
        for (const e of tmp.color) {
          if (e.id === item.color.id) {
            return e.quantity;
          }
        }
      }
    }
  };
  const handelIsActive = () => {
    setIsActive(!isActive);
    const id = item.id;
    const status = !isActive;
    dispatch(
      changeStatusCart({
        id,
        status,
      })
    );
  };
  const handleChangeQuantity = (item, type) => {
    if (!type) {
      dispatch(
        changeQuantityItemCarts({
          ...item,
          type,
        })
      );
    } else {
      const quantity = getQuantityProductByColor();
      console.log("hau");
      console.log(quantity);
      if (quantity > 0) {
        dispatch(
          changeQuantityItemCarts({
            ...item,
            type,
          })
        );
      } else {
        dispatch(
          addNotify({
            title: "Thất bại",
            content: "Số lượng đã quá giới hạn",
            color: colors.error,
          })
        );
      }
    }
  };
  return (
    <a className={cx("wrapper", { "border-bottom": !(index == size) })}>
      <input
        style={{ width: "30px" }}
        onChange={() => handelIsActive()}
        className="isActive"
        type="checkbox"
        checked={isActive}
      />
      <img
        className={cx("img")}
        src={process.env.REACT_APP_HOST_SERVER + item.productImg[0]}
        alt="err"
      />
      <div className={cx("item-info")}>
        <p className={cx("item-infor-name")}>{item.productName}</p>
        <p className={cx("item-infor-size")}>
          {item.color.nameColor} / {item.size.sizeName}
        </p>
      </div>
      <div className={cx("item-quan")}>
        <button
          onClick={() =>
            item.quantity !== 0 && handleChangeQuantity(item, false)
          }
          className={cx("btn-degree")}
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <input type="text" value={item.quantity} />
        <button
          className={cx("btn-increase")}
          onClick={() => handleChangeQuantity(item, true)}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <div className={cx("item-price", "highlight")}>${item.productPrice}</div>
      <div class="item-total-price">
        <a href="/cart/change?line=1&amp;quantity=0" class="cart">
          <FontAwesomeIcon icon={faTrash} />
        </a>
      </div>
    </a>
  );
}

export default Item;
