import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import classNames from "classnames/bind";

import { addNotify, removeNotify } from "../../redux/slice/notifySlice";
import styles from "./style.module.scss";
const cx = classNames.bind(styles);
function Notify({ color, title, content }) {
  const [hide, setHide] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      setHide(true);
      dispatch(removeNotify());
    }, 1700);
  }, []);
  return (
    <div
      style={{ position: "fixed", top: "70px", right: "20px", zIndex: 1000000 }}
    >
      <div
        className={cx("main_notify")}
        style={hide ? { display: "none" } : {}}
      >
        <div
          className={cx("content_notify")}
          style={{ backgroundColor: color }}
        >
          <span className={cx("top")}></span>
          <div className={cx("text")}>
            <h6>{title}</h6>
            <p>{content}</p>
          </div>
          <div style={{ cursor: "pointer" }}>x</div>
        </div>
      </div>
    </div>
  );
}

export const colors = {
  success: "rgb(1, 102, 1)",
  error: "rgb(173, 26, 26)",
  warning: "rgb(182, 165, 15)",
};

export default Notify;
