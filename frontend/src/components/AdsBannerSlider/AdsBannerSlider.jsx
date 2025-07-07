import React from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { Navigation } from "swiper/modules";
import BannerBox from "./BannerBox";
import banner1 from "../../assets/banner1.webp";
import banner2 from "../../assets/banner2.webp";
import banner3 from "../../assets/banner3.webp";
import banner4 from "../../assets/banner4.webp";

const AdsBannerSlider = (props) => {
  return (
    <div className="py-5 w-full">
      <Swiper
        spaceBetween={10}
        navigation={true}
        centeredSlides={false}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation]}
        className="smlBtn"
        breakpoints={{
          // when window width is >= 640px
          640: {
            slidesPerView: 1,
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 2,
          },
          // when window width is >= 1024px
          1024: {
            slidesPerView: props.item || 3, // Default to props.item or 3 if not provided
          },
        }}
      >
        <SwiperSlide>
          <BannerBox img={banner1} link={"/"} />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox img={banner2} link={"/"} />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox img={banner3} link={"/"} />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox img={banner4} link={"/"} />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox img={banner1} link={"/"} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default AdsBannerSlider;
