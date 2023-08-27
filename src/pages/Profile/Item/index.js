import classNames from "classnames/bind";
import styles from "./style.module.scss";

const cx = classNames.bind(styles);
function Item({ item, index, size }) {
  console.log(987);
  console.log(item);
  return (
    <a className={cx("wrapper", { "border-bottom": !(index == size) })}>
      <div className={cx("container")}>
        <img
          className={cx("img")}
          src={process.env.REACT_APP_HOST_SERVER + item.productImg[0]}
          alt="err"
        />
        <div className={cx("item_info")}>
          <p className={cx("item_info_name")}>{item.productName}</p>
          <p className={cx("item_info_size")}>
            {item.color.nameColor} / {item.size.sizeName}
          </p>
        </div>
      </div>
      <div className={cx("item_quantity")}>
        <p>Số lượng: {item.quantity}</p>
        <p>Giá: ${item.price}/1</p>
      </div>
    </a>
  );
}

export default Item;
