import classNames from "classnames/bind";
import styles from "./style.module.scss";

const cx = classNames.bind(styles);
function Contact() {
  return <div className={cx("wrapper")}></div>;
}

export default Contact;
