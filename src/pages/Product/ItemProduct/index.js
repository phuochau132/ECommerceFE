import classNames from "classnames/bind";

import styles from "./style.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
function Item({ data, row }) {
  const cssCoL = `col${row}`;
  return (
    <Link
      to={`http://localhost:3000/detail/${data.id}`}
      className={cx("wrapper", {
        [cssCoL]: true,
      })}
    >
      <div className={cx("wrapper-img")}>
        <img
          className={cx("img")}
          src={process.env.REACT_APP_HOST_SERVER + data.img[0]}
          alt="ERR"
        />
        <img
          className={cx("imgHover")}
          src={process.env.REACT_APP_HOST_SERVER + data.img[1]}
          alt="ERR"
        />
        <div className={cx("btn")}>
          <button className={cx("payment")}>Mua ngay</button>
          <button className={cx("addcart")}>Thêm vào giỏ</button>
        </div>
      </div>
      <div className={cx("color")}>
        {data.color.map((color) => {
          return (
            <div
              style={{ backgroundColor: color.codeColor }}
              className={cx("item-color")}
            ></div>
          );
        })}
      </div>
      <div className={cx("name")}>{data.name}</div>
      <div className={cx("price highlight")}>{data.price}$</div>
    </Link>
  );
}

export default Item;
