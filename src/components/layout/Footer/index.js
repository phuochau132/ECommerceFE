import { Link } from "react-router-dom";

import classNames from "classnames/bind";
import styles from "./style.module.scss";
import SlideFooter from "./SlideFooter";
import { SvgFb, SvgIns } from "../../../images/svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function Footer() {
  return (
    <div className={cx("wrapper")}>
      <SlideFooter />
      <div className={cx("footer-content")}>
        <div className={cx("items")}>
          <h4 className={cx("item-h4")}>HỆ THỐNG CỬA HÀNG HADES</h4>
          <p className={cx("item-p")}>
            Hades FLAGSHIP STORE: 69 QUANG TRUNG STREET, GO VAP DISTRICT,
            HOCHIMINH. Store 2: 26 LY TU TRONG STREET, DISTRICT 1, HOCHIMINH
            (THE NEW PLAYROUND). Store 3: 350 DIEN BIEN PHU STREET, WARD 7, BINH
            THANH DISTRICT, HOCHIMINH (G-TOWN). Store 4: 4 PHAM NGU LAO STREET,
            DISTRICT 1, HOCHIMINH. Store 5: 136 NGUYEN HONG DAO STREET, TAN BINH
            DISTRICT, HOCHIMINH. Store 6: VINCOM SHOPHOUSE, BIEN HOA. Store 7:
            FLOOR 7 - BLOCK B2 - VINCOM BA TRIEU, HANOI. Store 8: 56 MAU THAN,
            NINH KIEU DISTRICT, CANTHO.
          </p>
        </div>
        <div className={cx("items")}>
          <h4 className={cx("item-h4")}>CHÍNH SÁCH</h4>
          <Link className={cx("link")}>- Chính sách sử dụng website</Link>
          <br />
          <Link className={cx("link")}>- Phương thức thanh toán</Link>
          <br />
          <Link className={cx("link")}>- Chính sách đổi trả</Link>
          <br />
          <Link className={cx("link")}>
            - Chính sách giao nhận - vận chuyển
          </Link>
          <br />
          <Link className={cx("link")}>- Điều khoản dịch vụ</Link>
          <br />
          <Link className={cx("link")}>- Hướng dẫn mua hàng</Link>
          <br />
          <Link className={cx("link")}>- Chính sách bảo mật</Link>
        </div>
        <div className={cx("items")}>
          <h4 className={cx("item-h4")}>THÔNG TIN LIÊN HỆ</h4>
          <p className={cx("item-p")}>
            - CÔNG TY TNHH HADES Địa chỉ: 45 Phan Chu Trinh, P. Bến Thành, Quận
            1, TP. Hồ Chí Minh
            <br />
            - SỐ CSKH: 02873011021 (10h -18h)
            <br />
            - Ngày cấp: 20/07/2020
            <br />
            - Tuyển dụng: hr@hades.vn
            <br />
            - Website: hades.vn
            <br />
            - Liên hệ CSKH: support@hades.vn
            <br />- For business: contact@hades.vn
          </p>
        </div>
        <div className={cx("items")}>
          <h4 className={cx("item-h4")}>FOLLOW US ON SOCIAL MEDIA</h4>
          <div className={cx("footer-icon")}>
            <a
              href="https://www.facebook.com/hau.phuoc.1293575/"
              className={cx("icon-fb")}
            >
              <SvgFb />
            </a>
            <a
              href="https://www.instagram.com/ph_hau56/"
              className={cx("icon-ins")}
            >
              <SvgIns />
            </a>
          </div>
          <div>
            <img
              className={cx("footer-img")}
              src="https://file.hstatic.net/1000306633/file/logo_bct_img_3c1bf699d3004ef2887fee1c4eb20afd.png?v=150"
            />
          </div>
        </div>
      </div>
      <div className={cx("footer-extra")}>
        <div className={cx("footer-extra-item")}>
          <h4 className={cx("item-h4")}>HỆ THỐNG CỬA HÀNG HADES</h4>
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
        <div className={cx("footer-extra-item")}>
          <h4 className={cx("item-h4")}>CHÍNH SÁCH</h4>
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
        <div className={cx("footer-extra-item")}>
          <h4 className={cx("item-h4")}>THÔNG TIN LIÊN HỆ</h4>
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
        <div className={cx("footer-extra-item")}>
          <h4 className={cx("item-h4")}>FOLLOW US ON</h4>
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
      </div>
    </div>
  );
}

export default Footer;
