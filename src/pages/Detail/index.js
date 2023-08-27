import { Button } from "../../components";
import { useEffect, useState } from "react";

import classNames from "classnames/bind";
import styles from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addItemIntoCart } from "../../redux/slice/cartSlice";
import { addNotify } from "../../redux/slice/notifySlice";
import { colors } from "../../components/Notify";
import Loading from "../../components/Loading/Loading";

const cx = classNames.bind(styles);
const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const products = useSelector((state) => {
    return state.product.listProducts;
  });
  const listCarts = useSelector((state) => state.cart.listCarts);
  const statusCart = useSelector((state) => state.cart.status);
  console.log(statusCart);
  const user = useSelector((state) => {
    return state.auth.user;
  });
  const product = products.filter((item) => {
    return item.id == id;
  })[0];
  const [sizeActivated, setSizeActivated] = useState({
    id: product.size[0].id,
    sizeName: product.size[0].sizeName,
  });
  const [colorActivated, setColorActivated] = useState({
    id: product.color[0].id,
    nameColor: product.color[0].nameColor,
    codeColor: product.color[0].codeColor,
  });

  const [imgIsActive, setImageIsActive] = useState(0);
  const listSize = product.size;
  const lisColor = product.color;
  const listImg = product.img;
  const handleImgActivated = (index) => {
    setImageIsActive(index);
  };
  const handleAddCart = () => {
    if (user) {
      const cartItem = {
        color: colorActivated,
        size: sizeActivated,
        quantity: 1,
        user_id: user.id,
        product_id: product.id,
        productName: product.name,
        productImg: product.img,
        productPrice: product.price,
      };
      if (
        listCarts.some((tmp) => {
          return tmp.product_id === product.id;
        })
      ) {
        dispatch(
          addNotify({
            title: "Thất bại",
            content: "Sản phẩm đã có trong giỏ hàng!",
            color: colors.warning,
          })
        );
      } else {
        dispatch(addItemIntoCart(cartItem));
      }
    } else {
      dispatch(
        addNotify({
          title: "Thất bại",
          content: "Vui lòng đăng nhập!",
          color: colors.error,
        })
      );
    }
  };

  return (
    <div className={cx("wrapper")}>
      {statusCart === "loading" ? <Loading /> : ""}
      <div>
        <p className="title">
          Detail<span className="title-bottom"></span>
        </p>
      </div>
      <div className={cx("container")}>
        <div className={cx("list-img")}>
          <img
            src={process.env.REACT_APP_HOST_SERVER + listImg[imgIsActive]}
            className={cx("img_main")}
          ></img>
          <div className={cx("line-height")}>
            <span
              className={cx("span-display-row")}
              style={{
                height: `${(imgIsActive + 1) * (100 / listImg.length)}%`,
                transition: "all 0.5s linear",
              }}
            ></span>
            <span
              className={cx("span-display-col")}
              style={{
                width: `${(imgIsActive + 1) * (100 / listImg.length)}%`,
                transition: "all 0.5s linear",
              }}
            ></span>
          </div>
          <div className={cx("list-sub-img")}>
            {listImg.map((e, index) => {
              return (
                <img
                  className={cx({
                    isActiveImg: imgIsActive == index,
                  })}
                  onClick={() => {
                    handleImgActivated(index);
                  }}
                  key={index}
                  src={process.env.REACT_APP_HOST_SERVER + e}
                  alt="error"
                ></img>
              );
            })}
          </div>
        </div>
        <div className={cx("info")}>
          <div className={cx("info-detail")}>
            <h4> {product.name}</h4>
            <p>SKU: O10423SW</p>
            <p className={cx("price highlight")}>{product.price}$</p>
            <p>Màu sác</p>
            <div className={cx("colors")}>
              {lisColor.map((item, index) => {
                if (item.id === colorActivated.id) {
                  return (
                    <div>
                      <span
                        onClick={() => {
                          setColorActivated(() => {
                            return {
                              id: item.id,
                              codeColor: item.codeColor,
                              nameColor: item.nameColor,
                            };
                          });
                        }}
                        style={{ backgroundColor: item.codeColor }}
                      ></span>
                      <span className={cx("line-color")}></span>
                    </div>
                  );
                }
                return (
                  <>
                    <span
                      onClick={() => {
                        setColorActivated(() => {
                          return {
                            id: item.id,
                            codeColor: item.codeColor,
                            nameColor: item.nameColor,
                          };
                        });
                      }}
                      style={{ backgroundColor: item.codeColor }}
                    ></span>
                  </>
                );
              })}
            </div>
            <p>Kích thước</p>
            <div className={cx("sizes")}>
              {listSize.map((item, index) => {
                return (
                  <>
                    <span
                      onClick={() => {
                        setSizeActivated(() => {
                          return {
                            id: item.id,
                            sizeName: item.sizeName,
                          };
                        });
                      }}
                      className={cx({
                        isActive: item.id == sizeActivated.id,
                      })}
                    >
                      {item.sizeName}
                    </span>
                  </>
                );
              })}
            </div>
            <Button className={cx("add-cart")} onClick={handleAddCart}>
              THÊM VÀO GIỎ
            </Button>
            <Button className={cx("buy-now")}>MUA NGAY</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
