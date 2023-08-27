import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";

import { colors } from "../../components/Notify";
import { register } from "../../redux/slice/registerSlice";
import Loading from "../../components/Loading/Loading";
import styles from "./style.module.scss";
import Button from "../../components/Button";
import { addNotify } from "../../redux/slice/notifySlice";

const cx = classNames.bind(styles);
function Register() {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const registerState = useSelector((state) => {
    return state.register;
  });
  console.log(registerState);
  const validationSchema = Yup.object({
    name: Yup.string().required("Vui lòng nhập tên tài khoản !"),
    fullName: Yup.string().required("Vui lòng nhập tên đầy đủ !"),
    email: Yup.string()
      .email("Email không đúng định dạng !")
      .required("Vui lòng nhập email !"),
    phone: Yup.string().required("Vui lòng nhập số điện thoại !"),
    password: Yup.string().required("Vui lòng nhập mật khẩu !"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp !")
      .required("Confirm Password is required"),
    address: Yup.string().required("Vui lòng chọn địa chỉ !"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      address: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(register(values));
    },
  });
  useEffect(() => {
    if (registerState.error) {
      dispatch(
        addNotify({
          title: "Đăng ký thất bại",
          content: registerState.error,
          color: colors.error,
        })
      );
    }
    if (registerState.status === "succeeded") {
      dispatch(
        addNotify({
          title: "Đăng ký",
          content: "Đăng ký thành công",
          color: colors.success,
        })
      );
      navigator("/login");
    }
  }, [registerState]);

  return (
    <div className={cx("wrapper")}>
      {registerState.status === "loading" ? <Loading /> : ""}
      <form className={cx("content")} onSubmit={formik.handleSubmit}>
        <h2 className={cx("content_tile")}>Đăng Ký</h2>
        <div className={cx("content_form")}>
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
          <input
            className={cx("content_input", {
              error: formik.touched.password && formik.errors.password,
            })}
            id="password"
            type="password"
            name="password"
            placeholder="Mật Khẩu"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className={cx("form_error")}>{formik.errors.password}</div>
          ) : null}
        </div>
        <div className={cx("content_form")}>
          <input
            className={cx("content_input", {
              error:
                formik.touched.confirmPassword && formik.errors.confirmPassword,
            })}
            id="confirm_password"
            name="confirmPassword"
            type="password"
            placeholder="Xác nhận mật khẩu"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className={cx("form_error")}>
              {formik.errors.confirmPassword}
            </div>
          ) : null}
        </div>
        <div className={cx("content_form")}>
          <input
            className={cx("content_input", {
              error: formik.touched.fullName && formik.errors.fullName,
            })}
            name="fullName"
            id="fullName"
            type="text"
            placeholder="Tên đầy đủ"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.fullName}
          />
          {formik.touched.fullName && formik.errors.fullName ? (
            <div className={cx("form_error")}>{formik.errors.fullName}</div>
          ) : null}
        </div>
        <div className={cx("content_form")}>
          <input
            className={cx("content_input", {
              error: formik.touched.phone && formik.errors.phone,
            })}
            name="phone"
            id="phone"
            type="phone"
            placeholder="Số điện thoại"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div className={cx("form_error")}>{formik.errors.phone}</div>
          ) : null}
        </div>
        <div className={cx("content_form")}>
          <input
            className={cx("content_input", {
              error: formik.touched.address && formik.errors.address,
            })}
            name="address"
            id="address"
            type="text"
            placeholder="Địa chỉ"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
          />
          {formik.touched.address && formik.errors.address ? (
            <div className={cx("form_error")}>{formik.errors.address}</div>
          ) : null}
        </div>
        <div className={cx("content_form")}>
          <input
            required
            className={cx("content_input", {
              error: formik.touched.email && formik.errors.email,
            })}
            name="email"
            id="email"
            type="email"
            placeholder="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className={cx("form_error")}>{formik.errors.email}</div>
          ) : null}
        </div>
        <div className={cx("login_footer")}>
          <Button type="submit" className={cx("btn_res")}>
            ĐĂNG KÝ
          </Button>
          <div className={cx("footer_link")}>
            <Link className={cx("link")} to="/">
              <FontAwesomeIcon className={cx("icon")} icon={faArrowLeftLong} />
              <span className={cx("span")}>Quay lại trang chủ</span>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
