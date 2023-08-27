import { Button } from "../../components";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import classNames from "classnames/bind";
import styles from "./style.module.scss";
import Item from "./Item";
import { addNotify } from "../../redux/slice/notifySlice";
import { colors } from "../../components/Notify";

const cx = classNames.bind(styles);
function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const listCart = useSelector((state) => state.cart.listCarts);
  const handelPayment = () => {
    if (listCart.some((tmp) => tmp.status)) {
      navigate("/checkout");
      return;
    }
    dispatch(
      addNotify({
        title: "Thất bại",
        content: "Chưa có sản phẩm nào để thanh toán!",
        color: colors.error,
      })
    );
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <p className="title">
          Cart<span className="title-bottom"></span>
        </p>
      </div>
      <div className={cx("cart-content")}>
        <div className={cx("cart-items")}>
          <p className={cx("count-items")}>
            Bạn đang có sẵn 2 sản phẩm trong giỏ hàng
          </p>
          {listCart.map((item, index) => {
            return <Item key={index} item={item} />;
          })}
        </div>
        <div className={cx("cart-payment")}>
          <h4>Thông tin đơn hàng</h4>
          <div className={cx("total-price")}>
            <span>Tổng tiền</span>
            <span className={cx("highlight")}>
              $
              {listCart.reduce((sum, item) => {
                if (item.status) {
                  return sum + item.productPrice * item.quantity;
                }
                return sum;
              }, 0)}
            </span>
          </div>
          <p>Vui lòng nhấn nút thanh toán để đến trang thanh toán</p>
          <Button onClick={handelPayment}>Thanh toán</Button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
