import { Link } from "react-router-dom";

import styles from "./style.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
function Button({ children, className, isLink, ...props }) {
  return (
    <div
      className={cx({
        [className]: className,
      })}
    >
      <div>
        {!isLink ? (
          <button {...props} className={cx("button")}>
            {children}
          </button>
        ) : (
          <Link {...props} className={cx("link")}>
            {children}
          </Link>
        )}
      </div>
    </div>
  );
}

export default Button;
