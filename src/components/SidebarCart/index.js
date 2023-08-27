import Button from "../Button";
import Item from "./Item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { changeStatus } from "../../redux/slice/modalSlice";
import { useSelector, useDispatch } from "react-redux";

import classNames from "classnames/bind";
import styles from "./style.module.scss";

const cx = classNames.bind(styles);
function SideBarCart() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.modal.status);
  const listCart = useSelector((state) => state.cart.listCarts);
  const offModal = () => {
    dispatch(changeStatus({ status: true }));
  };

  const carts = listCart;
  return (
    <div
      className={cx("wrapper", {
        hidden: status,
      })}
    >
      <div className={cx("modal")}>
        <div>
          <h4 style={{ marginBottom: 40, fontWeight: 700 }}>GIỎ HÀNG</h4>
        </div>
        <div className={cx("modal-items")}>
          {carts.map((item, index) => {
            const itemIsLast = index == carts.length - 1 ? true : false;
            return <Item key={index} item={item} itemIsLast={itemIsLast} />;
          })}
        </div>
        <span></span>
        <div className={cx("modal-price")}>
          <p>TOTAL</p>
          <p className={cx("highlight")}>
            $
            {listCart.reduce((sum, item) => {
              return sum + item.productPrice * item.quantity;
            }, 0)}
          </p>
        </div>
        <div className={cx("modal-btn")}>
          <Button
            isLink
            onClick={offModal}
            className={cx("sub-btn")}
            to="/cart"
          >
            XEM GIỎ HÀNG
          </Button>
        </div>
      </div>
      <span
        onClick={() => {
          dispatch(changeStatus({ status: true }));
        }}
        className={cx("close-modal")}
      >
        <FontAwesomeIcon icon={faXmark} />
      </span>
    </div>
  );
}

export default SideBarCart;
