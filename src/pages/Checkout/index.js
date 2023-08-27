import { Button } from "../../components";
import Select from "react-select";
import cash from "../../images/cash.png";
import zalopay from "../../images/zalopay.png";
import classNames from "classnames/bind";
import styles from "./style.module.scss";
import Item from "./Item";
import { useEffect, useState } from "react";
import { MDBInput } from "mdbreact";

import "mdbreact/dist/css/mdb.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { faBox } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addOrder, loadOrder } from "../../redux/slice/orderSlice";
import { delItemCarts } from "../../redux/slice/cartSlice";

const options = [];

const cx = classNames.bind(styles);
function Checkout() {
  const dispatch = useDispatch();
  const [optionsDistrict, setOptionsDistrict] = useState([]);
  const [optionsWard, setOptionsWard] = useState([]);
  const user = useSelector((state) => {
    return state.auth.user;
  });
  const carts = useSelector((state) => state.cart.listCarts);
  const listCart = carts.filter((item) => {
    return item.status;
  });
  const [zaloPay, setZaloPay] = useState(false);
  const [city, setCity] = useState(null);
  const [district, setDistrict] = useState(null);
  const [ward, setWard] = useState(null);
  const [methodPayment, setMethodPayment] = useState(null);
  const totalPrice = () => {
    return listCart.reduce((sum, item) => {
      if (item.status) {
        return sum + item.productPrice * item.quantity;
      }
      return sum;
    }, 0);
  };

  const handleCheckboxChange = (e, index) => {
    setMethodPayment(index);
  };
  const handleCalDiscount = () => {};
  const calPriceUsedDiscount = () => {
    return 0;
  };
  const [data, setData] = useState({
    idUser: user.id,
    address: user.address,
    fullName: user.fullname,
    phone: user.phone,
    type: methodPayment,
    totalAmount: totalPrice() - calPriceUsedDiscount(),
    listCart: listCart.map((item) => {
      return {
        id: item.id,
        product_id: item.product_id,
        color_id: item.color.id,
        size_id: item.size.id,
        quantity: item.quantity,
        amount: item.quantity * item.productPrice,
      };
    }),
  });
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await axios.get(
  //       "https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1"
  //     );
  //     const results = response.data.data.data;
  //     results.forEach((tmp) => {
  //       options.push({
  //         value: tmp.code,
  //         label: tmp.name_with_type,
  //       });
  //     });
  //   };
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (city) {
  //       const option = [];
  //       const fetchData = async () => {
  //         const response = await axios.get(
  //           `https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=${city}&limit=-1`
  //         );
  //         const results = response.data.data.data;
  //         results.forEach((tmp) => {
  //           option.push({
  //             value: tmp.code,
  //             label: tmp.name_with_type,
  //           });
  //         });
  //         setOptionsDistrict(option);
  //       };

  //       fetchData();
  //     }
  //   }, 1);
  // }, [city]);
  // useEffect(() => {
  //   setTimeout(() => {
  //     if (district) {
  //       const option = [];
  //       const fetchData = async () => {
  //         const response = await axios.get(
  //           `https://vn-public-apis.fpo.vn/wards/getByDistrict?districtCode=${district}&limit=-1`
  //         );
  //         const results = response.data.data.data;
  //         results.forEach((tmp) => {
  //           option.push({
  //             value: tmp.code,
  //             label: tmp.name_with_type,
  //           });
  //         });
  //       };
  //       setOptionsWard(option);
  //       fetchData();
  //     }
  //   }, 1);
  // }, [district]);
  const handlePayment = () => {
    dispatch(addOrder(data));
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <p className="title">
          CHECK OUT<span className="title-bottom"></span>
        </p>
      </div>
      <div className={cx("content-checkout")}>
        <div className={cx("info-checkout")}>
          <h4>Thông tin giao hàng</h4>
          <div className={cx("row")}>
            <div className={cx("info")}>
              <img src="https://scontent.fsgn3-1.fna.fbcdn.net/v/t1.6435-1/141995787_512358293071430_1466381692630381917_n.jpg?stp=dst-jpg_s320x320&_nc_cat=111&ccb=1-7&_nc_sid=7206a8&_nc_ohc=ud7r0CvEB5kAX9Xn0hY&_nc_ht=scontent.fsgn3-1.fna&oh=00_AfBgSvinqM8Fuluo8nXOQ-_VKAQM_2VqMes9ydmKR6RfHw&oe=64990BCD" />
              <div className={cx("info-name")}>
                <p>hau phuoc ()</p>
                <a href="https://www.w3schools.com">Đăng xuất</a>
              </div>
            </div>
            <div className={cx("wrapper-input")}>
              <MDBInput
                label="Họ và tên"
                type="text"
                className={cx("input")}
                onChange={(e) => {
                  setData((prev) => {
                    return { ...prev, fullName: e.target.value };
                  });
                }}
                valueDefault={data.fullName}
              />
              <MDBInput
                label="Số điện thoại"
                type="text"
                className={cx("input")}
                onChange={(e) => {
                  setData((prev) => {
                    return { ...prev, phone: e.target.value };
                  });
                }}
                valueDefault={data.phone}
              />
              <MDBInput
                label="Địa chỉ"
                type="text"
                className={cx("input")}
                onChange={(e) => {
                  setData((prev) => {
                    return { ...prev, address: e.target.value };
                  });
                }}
                valueDefault={data.address}
              />
            </div>
            <div className={cx("address")}>
              <Select
                openMenuOnClick={true}
                className={cx("tag-select")}
                id={cx("city")}
                options={options}
                placeholder="Tỉnh / Thành"
                onChange={(city) => {
                  setCity(city.value);
                }}
              />
              <Select
                openMenuOnClick={true}
                className={cx("tag-select")}
                id={cx("city")}
                options={optionsDistrict}
                placeholder="Quận / Huyện "
                onChange={(district) => {
                  setDistrict(district.value);
                }}
              />
              <Select
                openMenuOnClick={true}
                className={cx("tag-select")}
                id={cx("city")}
                options={optionsWard}
                placeholder="Phường / Xã"
                onChange={(ward) => {
                  setWard(ward.value);
                }}
              />
            </div>
            <div className={cx("shipping-method")}>
              <h4>Phương thức vận chuyển</h4>
              <label
                className={cx("label-payment", {
                  hidden: methodPayment,
                })}
                htmlFor="type-payment"
              >
                <p>Vui lòng chọn phương thức thanh toán</p>
              </label>
              <label
                className={cx("label-payment", "cash", {
                  show: methodPayment == 1,
                })}
                htmlFor="type-payment"
              >
                <div>
                  <input
                    onChange={() => {}}
                    id="cash_payment"
                    type="radio"
                    name="type-payment"
                  />
                </div>
                <img src={cash} alt="" />
                Giao hàng tận nơi
              </label>
              <label
                className={cx("label-payment", "cash", {
                  show: methodPayment == 2,
                })}
                htmlFor="zalo_pay"
              >
                <div>
                  <input
                    onChange={() => {
                      setZaloPay(true);
                    }}
                    id="zalo_pay"
                    type="radio"
                    name="type-payment"
                  />
                </div>
                <img src={cash} alt="" />
                Thanh toán qua ZaloPay
              </label>
              <div />
            </div>
            <div className={cx("payment-method")}>
              <h4>Phương thức thanh toán</h4>
              <label className={cx("label-payment")} htmlFor="cash">
                <div>
                  <input
                    onChange={(e) => {
                      setZaloPay(false);
                      handleCheckboxChange(e, 1);
                    }}
                    id="cash"
                    type="radio"
                    name="payment"
                  />
                </div>
                <img src={cash} alt="" />
                Thanh toán khi giao hàng
              </label>
              <label className={cx("label-payment")} htmlFor="bank">
                <div>
                  <input
                    onChange={(e) => {
                      handleCheckboxChange(e, 2);
                    }}
                    id="bank"
                    type="radio"
                    name="payment"
                  />
                </div>
                <img src={zalopay} alt="" />
                Chuyển khoản qua ngân hàng
              </label>
              <div className={cx("blank_slate", { show: zaloPay })}>
                Tên Chủ Thẻ: Nguyễn Hà Phước Hậu
                <br />
                STK: 263470052 Ngân hàng: VPBank chi nhánh Bà Chiểu
                <br />
                Nội dung: Tên của bạn
                <br />
                Sau khi chuyển khoản, vui lòng chụp lại thông tin và gửi chúng
                mình qua Facebook hoặc Instagram để được xử lý nhanh hơn ạ.
              </div>
            </div>
          </div>
          <p style={{ marginTop: "20px", marginBottom: "20px" }}>
            Vui lòng nhấn nút bên dưới để hoàn tất đơn hàng
          </p>
          <Button onClick={handlePayment}>Hoàn tất đơn hàng</Button>
        </div>
        <div className={cx("checkout-items")}>
          <p className={cx("count-items")}>
            Bạn đang có {listCart.length} sản phẩm được chọn để thanh toán
          </p>
          {listCart.map((item, index) => {
            return <Item key={index} item={item} />;
          })}
          <div className={cx("row-between")}>
            <div className={cx("wrapper-discount")}>
              <MDBInput
                label="Mã giảm giá"
                type="text"
                className={cx("input-discount")}
              />
            </div>
            <Button onClick={handleCalDiscount}>Sử dụng</Button>
          </div>
          <div style={{ marginTop: "20px" }} className={cx("row-between")}>
            <p>Tạm tính</p>
            <span>${totalPrice()}</span>
          </div>
          <div className={cx("row-between")}>
            <p>Phí vận chuyển</p>
            <span>200</span>
          </div>
          <span className={cx("line")}></span>
          <div style={{ marginTop: "20px" }} className={cx("row-between")}>
            <p>Tổng cộng</p>
            <span className={cx("highlight total-price")}>
              ${totalPrice() - 200}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
