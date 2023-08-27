import classNames from "classnames/bind";

import styles from "./style.module.scss";

const cx = classNames.bind(styles);
function Loading() {
  return (
    <div className={cx("main_loading")}>
      <div className={cx("lds-hourglass")}></div>
    </div>
  );
}

export default Loading;
