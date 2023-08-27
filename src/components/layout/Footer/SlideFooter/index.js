import classNames from "classnames/bind";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styles from "./style.module.scss";

const cx = classNames.bind(styles);
function SlideFixed() {
  const settings = {
    dots: true,
    infinite: true,
    centerMode: false,
    speed: 15000,
    cssEase: "linear",
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    autoplaySpeed: 1,
  };

  return (
    <Slider className={cx("slide")} {...settings}>
      <div>
        <span className={cx("slide-title")}>streetwear brand limited</span>
      </div>
      <div>
        <span className={cx("slide-title")}>streetwear brand limited</span>
      </div>
      <div>
        <span className={cx("slide-title")}>streetwear brand limited</span>
      </div>
      <div>
        <span className={cx("slide-title")}>streetwear brand limited</span>
      </div>
      <div>
        <span className={cx("slide-title")}>streetwear brand limited</span>
      </div>
      <div>
        <span className={cx("slide-title")}>streetwear brand limited</span>
      </div>
    </Slider>
  );
}

export default SlideFixed;
