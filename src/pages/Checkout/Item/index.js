import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classNames from "classnames/bind";
import styles from "./style.module.scss";

const cx = classNames.bind(styles);
function Item({ item }) {
  return (
    <a className={cx("wrapper", "border-bottom")}>
      <div className={cx("img-item")}>
        <img
          src={process.env.REACT_APP_HOST_SERVER + item.productImg[0]}
          alt="err"
        />
        <span>{item.quantity}</span>
      </div>
      <div className={cx("item-info")}>
        <p className={cx("item-info-name")}>{item.productName}</p>
        <p className={cx("item-info-size")}>
          {item.color.nameColor} / {item.size.sizeName}
        </p>
      </div>
      <div className={cx("item-price")}></div>
      <div class="item-total-price">
        <p className={cx("highlight")}>${item.productPrice}</p>
      </div>
    </a>
  );
}

export default Item;
