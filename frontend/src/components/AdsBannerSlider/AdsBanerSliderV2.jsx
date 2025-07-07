import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { Button } from "@mui/material";

function AdsBannerSliderV2() {
  return (
    <Swiper
      loop={false}
      spaceBetween={20}
      centeredSlides={true}
      navigation={false}
      pagination={{
        dynamicBullets: true,
      }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      modules={[Navigation, Autoplay, Pagination]}
      className="AdSlider"
    >
      <SwiperSlide>
        <div className="item w-full rounded-md overflow-hidden relative">
          <img
            className=""
            src="https://serviceapi.spicezgold.com/download/1742439896581_1737036773579_sample-1.jpg"
            alt=""
          />
          <div className="info absolute top-0 -right-[100%] opacity-0 w-[50%] h-[100%] z-50 p-8 flex items-center flex-col justify-center transition-all duration-600">
            <h2 className="text-[18px] font-[500] w-full text-left mb-3 relative -right-[100%] opacity-0 max-sm:text-[8px] max-sm:mb-1">
              Big saving days sale
            </h2>
            <h4 className="text-[35px] font-[700] w-full relative -right-[100%] opacity-0  max-sm:text-[10px]">
              Buy New Trend Women Black Cotton Blend
            </h4>
            <h3 className="flex items-center gap-3 text-[18px] font-[500] w-full text-left mt-3 mb-3 relative -right-[100%] opacity-0 max-sm:text-[9px] max-sm:mt-2 max-sm:mb-2">
              Starting At Only
              <span className="text-[#35ac75] text-[30px] font-[800] max-sm:text-[10px]">
                $59.00
              </span>
            </h3>
            <div className="shop-btn w-full relative -right-[100%] opacity-0">
              <Button className="btn-org max-sm:!text-[10px]">Shop Now</Button>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="item w-full rounded-md overflow-hidden relative">
          <img
            className=""
            src="https://serviceapi.spicezgold.com/download/1742441193376_1737037654953_New_Project_45.jpg"
            alt=""
          />
          <div className="info absolute top-0 -right-[100%] opacity-0 w-[50%] h-[100%] z-50 p-8 flex items-center flex-col justify-center transition-all duration-600">
            <h2 className="text-[18px] font-[500] w-full text-left mb-3 relative -right-[100%] opacity-0 max-sm:text-[8px] max-sm:mb-1">
              Big saving days sale
            </h2>
            <h4 className="text-[35px] font-[700] w-full relative -right-[100%] opacity-0 max-sm:text-[10px]">
              Apple iPhone 13 128 GB, Pink
            </h4>
            <h3 className="flex items-center gap-3 text-[18px] font-[500] w-full text-left mt-3 mb-3 relative -right-[100%] opacity-0  max-sm:text-[9px] max-sm:mt-2 max-sm:mb-2">
              Starting At Only
              <span className="text-[#35ac75] text-[30px] front-[700] max-sm:text-[10px]">
                $159.00
              </span>
            </h3>
            <div className="shop-btn w-full relative -right-[100%] opacity-0">
              <Button className="btn-org max-sm:!text-[10px]">Shop Now</Button>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}

export default AdsBannerSliderV2;
