import "./style.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import { Button } from "../../../components/";
import {
  filterProductByPrice,
  filterProductBySize,
  filterProductByType,
} from "../../../redux/slice/productSlice";
export const Filter = ({ setSearch, search }) => {
  const dispatch = useDispatch();
  const [typeCheck, setTypeCheck] = useState(0);
  const [price, setPrice] = useState({
    price: null,
    min: null,
    max: null,
  });
  const products = useSelector((state) => {
    return state.product.listProducts;
  });
  const filter = (action, type) => {
    console.log(type);

    if (action === 1) {
      dispatch(filterProductByType({ type }));
    } else {
      if (action === 2) {
        dispatch(filterProductByPrice({ type }));
      } else {
        if (action === 3) {
          dispatch(filterProductBySize({ type }));
        }
      }
    }
  };
  const countProductByType = () => {
    const arr = [0, 0, 0, 0, 0];
    products.forEach((tmp) => {
      switch (tmp.type) {
        case 1:
          arr[0]++;
          break;
        case 2:
          arr[1]++;
          break;
        case 3:
          arr[2]++;
          break;
        case 4:
          arr[3]++;
          break;
        case 5:
          arr[4]++;
          break;
      }
    });
    return arr;
  };
  return (
    <div className="wrapper_filter">
      <aside className="col-md-12">
        <div className="card">
          <article className="filter-group">
            <header className="card-header">
              <a
                href="#"
                data-toggle="collapse"
                data-target="#collapse_1"
                aria-expanded="true"
              >
                <p className="title">FILTER</p>
              </a>
            </header>
            <div className="filter-content collapse show" id="collapse_1">
              <div className="card-body">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-dark" type="button">
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>
          <article className="filter-group">
            <div className="filter-content collapse show" id="collapse_2">
              <div className="card-body">
                <label className="custom-control custom-checkbox">
                  <input
                    onChange={() => {
                      filter(1, 1);
                    }}
                    type="radio"
                    name="type"
                    className="custom-control-input"
                  />
                  <div className="custom-control-label">
                    Tops
                    <b className="badge badge-pill badge-dark float-right">
                      {countProductByType()[0]}
                    </b>{" "}
                  </div>
                </label>
                <label className="custom-control custom-checkbox">
                  <input
                    type="radio"
                    name="type"
                    onChange={() => {
                      filter(1, 2);
                    }}
                    className="custom-control-input"
                  />
                  <div className="custom-control-label">
                    Bottoms
                    <b className="badge badge-pill badge-dark float-right">
                      {countProductByType()[1]}
                    </b>{" "}
                  </div>
                </label>
                <label className="custom-control custom-checkbox">
                  <input
                    type="radio"
                    name="type"
                    onChange={() => {
                      filter(1, 3);
                    }}
                    className="custom-control-input"
                  />
                  <div className="custom-control-label">
                    Outerwear
                    <b className="badge badge-pill badge-dark float-right">
                      {countProductByType()[2]}
                    </b>{" "}
                  </div>
                </label>
                <label
                  htmlFor="filter_footwear"
                  className="custom-control custom-checkbox"
                >
                  <input
                    id="filter_footwear"
                    type="radio"
                    name="type"
                    onChange={() => {
                      filter(1, 4);
                    }}
                    className="custom-control-input"
                  />
                  <div className="custom-control-label">
                    Footwear
                    <b className="badge badge-pill badge-dark float-right">
                      {countProductByType()[3]}
                    </b>{" "}
                  </div>
                </label>
                <label className="custom-control custom-checkbox">
                  <input
                    type="radio"
                    name="type"
                    onChange={() => {
                      filter(1, 5);
                    }}
                    className="custom-control-input"
                  />
                  <div className="custom-control-label">
                    Hat
                    <b className="badge badge-pill badge-dark float-right">
                      {countProductByType()[4]}
                    </b>{" "}
                  </div>
                </label>
              </div>
            </div>
          </article>
          <article className="filter-group">
            <header className="card-header">
              <a
                href="#"
                data-toggle="collapse"
                data-target="#collapse_3"
                aria-expanded="true"
                className=""
              >
                <p className="title">Price range </p>
              </a>
            </header>
            <div className="filter-content collapse show" id="collapse_3">
              <div className="card-body">
                <input
                  type="range"
                  onChange={async (e) => {
                    await setPrice((prev) => {
                      return {
                        ...prev,
                        price: e.target.value,
                      };
                    });
                    dispatch(filter(2, price));
                  }}
                  className="custom-range"
                  min="0"
                  max="100"
                  name=""
                />
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Min</label>
                    <input
                      onChange={(e) => {
                        setPrice((prev) => {
                          return {
                            ...prev,
                            min: e.target.value,
                          };
                        });
                      }}
                      className="form-control"
                      placeholder="$0"
                      type="number"
                    />
                  </div>
                  <div className="form-group text-right col-md-6">
                    <label>Max</label>
                    <input
                      onChange={(e) => {
                        setPrice((prev) => {
                          return {
                            ...prev,
                            max: e.target.value,
                          };
                        });
                      }}
                      className="form-control"
                      placeholder="$1,0000"
                      type="number"
                    />
                  </div>
                </div>
                <Button
                  onClick={() => {
                    filter(2, price);
                  }}
                  className="filter_btn_apply"
                >
                  {" "}
                  Apply
                </Button>
              </div>
            </div>
          </article>
          <article className="filter-group">
            <header className="card-header">
              <a
                href="#"
                data-toggle="collapse"
                data-target="#collapse_4"
                aria-expanded="true"
                className=""
              >
                <p className="title">Sizes </p>
              </a>
            </header>
            <div className="filter-content collapse show" id="collapse_4">
              <div className="card-body">
                <label className="checkbox-btn">
                  <input
                    type="radio"
                    onChange={() => {
                      filter(3, "S");
                    }}
                    name="size"
                  />

                  <span className="btn btn-dark"> S </span>
                </label>

                <label className="checkbox-btn">
                  <input
                    type="radio"
                    onChange={() => {
                      filter(3, "M");
                    }}
                    name="size"
                  />
                  <span className="btn btn-dark"> M </span>
                </label>

                <label className="checkbox-btn">
                  <input
                    type="radio"
                    onChange={() => {
                      filter(3, "X");
                    }}
                    name="size"
                  />
                  <span className="btn btn-dark"> X </span>
                </label>

                <label className="checkbox-btn">
                  <input
                    type="radio"
                    onChange={() => {
                      filter(3, "XL");
                    }}
                    name="size"
                  />
                  <span className="btn btn-dark"> XL </span>
                </label>
              </div>
            </div>
          </article>
        </div>
      </aside>
      <div className="header_search">
        <div className="filter-content collapse show" id="collapse_1">
          <div className="card-body">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
              />
              <div className="input-group-append">
                <button className="btn btn-dark" type="button">
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
