import Item from "./ItemProduct";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import TabItems from "./TabItems";
import { Filter } from "./Filter";
import classNames from "classnames/bind";
import styles from "./style.module.scss";
import { loadProducts } from "../../redux/slice/productSlice";

const cx = classNames.bind(styles);
function Product() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadProducts());
  }, []);
  const products = useSelector((state) => {
    return state.product.filterProducts;
  });
  const dataNew = [];
  let { idPage } = useParams();
  const query = Number(idPage);
  const total = 4;
  const separatePage = () => {
    if (query != Math.ceil(products.length / total)) {
      for (let i = (query - 1) * total; i <= query * total - 1; i++) {
        if (products[i] != null) {
          dataNew.push(products[i]);
        }
      }
    } else {
      for (let i = (query - 1) * total; i <= products.length - 1; i++) {
        if (products[i] != null) {
          dataNew.push(products[i]);
        }
      }
    }
  };
  separatePage();
  const location = useLocation();

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <p className="title">
          PRODUCT<span className="title-bottom"></span>
        </p>
      </div>
      <div className={cx("products")}>
        <div className={cx("products_left")}>
          <Filter />
        </div>
        <div className={cx("products_right")}>
          <div className={cx("product")}>
            {dataNew.map((item, index) => {
              return <Item row={4} total={total} data={item} key={index} />;
            })}
          </div>
          <TabItems items={products} query={query} total={total} />
        </div>
      </div>
    </div>
  );
}

export default Product;
