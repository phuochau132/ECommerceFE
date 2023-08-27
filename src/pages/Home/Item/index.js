import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import styles from "./style.module.scss";

const cx = classNames.bind(styles);
function Item({ data }) {
  console.log(data.img);

  return (
    <div className={cx("wrapper")}>
      <img className={cx("img")} src={data.img} alt="ERR" />
      <div className={cx("meta-item")}>{data.metaItem}</div>
      <div className={cx("title")}>{data.title}</div>
      <div className={cx("content")}>{data.content}</div>
      <Link to="/" className={cx("link")}>
        Xem thêm
      </Link>
    </div>
  );
}

export default Item;
