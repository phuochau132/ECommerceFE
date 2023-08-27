import classNames from "classnames/bind";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

import styles from "./style.module.scss";

const cx = classNames.bind(styles);
function SlideHomeTop() {
  const settings = {
    dots: true,
    infinite: true,
    centerMode: false,
    speed: 3000,
    cssEase: "ease",
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <Slider className={cx("slide")} {...settings}>
      <Link>
        <img
          className={cx("img")}
          src="https://theme.hstatic.net/1000306633/1000891824/14/slideshow_3.jpg?v=151"
        />
      </Link>
      <Link>
        <img
          className={cx("img")}
          src="https://theme.hstatic.net/1000306633/1000891824/14/slideshow_2.jpg?v=151"
        />
      </Link>
      <Link>
        <img
          className={cx("img")}
          src="https://theme.hstatic.net/1000306633/1000891824/14/slideshow_3.jpg?v=151"
        />
      </Link>
    </Slider>
  );
}

export default SlideHomeTop;
