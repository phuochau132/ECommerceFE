import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

import { login } from "../../redux/slice/authSlice";
import styles from "./style.module.scss";
import Button from "../../components/Button";
import { addNotify } from "../../redux/slice/notifySlice";
import { colors } from "../../components/Notify";

const cx = classNames.bind(styles);
function Login() {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const { check, setCheck } = useState(0);
  const loginState = useSelector((state) => {
    return state.auth;
  });
  const validationSchema = Yup.object({
    name: Yup.string().required("Vui lòng nhập tên tài khoản !"),
    password: Yup.string().required("Vui lòng nhập mật khẩu !"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(login(values));
      setCheck((prev) => {
        return prev + 1;
      });
    },
  });
  console.log(loginState.user);
  useEffect(() => {
    if (check !== 0) {
      if (loginState.user) {
        navigator("/");
      }
      if (loginState.error) {
        dispatch(
          addNotify({
            title: "Đăng nhập thất bại",
            content: loginState.error,
            color: colors.error,
          })
        );
      }
      if (loginState.status === "succeeded") {
        dispatch(
          addNotify({
            title: "Đăng nhập",
            content: "Đăng nhập thành công",
            color: colors.success,
          })
        );
      }
    }
  }, [loginState]);

  return (
    <div className={cx("wrapper")}>
      {/* {loginState.status === "loading" ? <Loading /> : ""} */}
      <div className={cx("content")}>
        <h2 className={cx("content_tile")}>Đăng nhập</h2>
        <div className={cx("content_form")}>
          <div className={cx("content_label")}>
            <label htmlFor="email">EMAIL_ID</label>
          </div>
          <input
            className={cx("content_input", {
              error: formik.touched.name && formik.errors.name,
            })}
            name="name"
            id="userName"
            type="text"
            placeholder="Tên tài khoản"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className={cx("form_error")}>{formik.errors.name}</div>
          ) : null}
        </div>
        <div className={cx("content_form")}>
          <div className={cx("content_label")}>
            {" "}
            <label htmlFor="password">PASSWORDS</label>
          </div>
          <input
            className={cx("content_input", {
              error: formik.touched.password && formik.errors.password,
            })}
            name="password"
            id="password"
            type="password"
            placeholder="Tên tài khoản"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className={cx("form_error")}>{formik.errors.password}</div>
          ) : null}
        </div>
        <div className={cx("login_footer")}>
          <div>
            <Button
              type="submit"
              onClick={formik.handleSubmit}
              className={cx("btn_login")}
            >
              đăng nhập
            </Button>
          </div>
          <div className={cx("footer_right")}>
            <Link path="/register" className={cx("link")}>
              Quên mật khẩu?
            </Link>
            <br />
            <span className={cx("span")}>hoặc</span>
            <Link to="/register" className={cx("link")}>
              Đăng ký
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
