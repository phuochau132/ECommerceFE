import { Link } from "react-router-dom";
import { useState } from "react";
import SlideBottom from "./SlideBottom";
import SlideTop from "./SlideTop";
import Item from "./Item";

import classNames from "classnames/bind";
import styles from "./style.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const cx = classNames.bind(styles);
function Home() {
  const [product, setProduct] = useState([]);
  const [event, setEvent] = useState([
    {
      img: "https://file.hstatic.net/1000306633/article/blog1_34f17ec315f84ac5986dd663c509666a_large.jpg",
      title:
        "https://file.hstatic.net/1000306633/article/blog2_a408af0a74e345288398890b15519188_large.jpg",
      metaItem: "Thứ Ba 16-03-2021",
      title:
        'Hades - Một Trong Những "Phát Súng Đầu Tiên" của Vietnamese Streetwear',
      content:
        "Ra đời từ những năm cuối thế kỷ 20, streetwear là phong cách thời trang phổ biến của cộng đồng đam mê bộ môn skateboard. Dù mới “bén duyên” với giới...",
    },
  ]);
  const settings = {
    dots: true,
    infinite: true,
    centerMode: false,
    speed: 15000,
    cssEase: "linear",
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 1,
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("slideTop")}>
        <SlideTop />
      </div>

      <div className={cx("section1")}>
        <Link>
          <img
            className={cx("img")}
            src="https://theme.hstatic.net/1000306633/1000891824/14/block_home_category1_new.png?v=151"
          />
        </Link>
        <Link>
          <img
            className={cx("img")}
            src="https://theme.hstatic.net/1000306633/1000891824/14/block_home_category2_new.png?v=151"
          />
        </Link>
        <Link>
          <img
            className={cx("img")}
            src="https://theme.hstatic.net/1000306633/1000891824/14/block_home_category3_new.png?v=151"
          />
        </Link>
      </div>
      <div className={cx("section2")}>
        <Link>
          <img
            className={cx("img1")}
            src="https://theme.hstatic.net/1000306633/1000891824/14/show_block_home_category_image_3_new.png?v=151"
          />
        </Link>
      </div>
      <SlideBottom />
      <div className={cx("product")}>{/* <Product item/> */}</div>
      <div className={cx("event")}>
        {event.map((item, index) => {
          return <Item key={index} data={item}></Item>;
        })}
      </div>
    </div>
  );
}

export default Home;
