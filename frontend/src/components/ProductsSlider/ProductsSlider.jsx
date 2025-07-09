import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import ProductItem from "../ProductItem/ProductItem";

const ProductsSlider = ({ items = 6, productByCat = [] }) => {
  return (
    <div className="productSlider py-3 px-2 sm:px-4">
      <Swiper
        navigation
        spaceBetween={12}
        modules={[Navigation]}
        className="mySwiper"
        breakpoints={{
          0: {
            slidesPerView: 1.2,
            spaceBetween: 8,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2.5,
            spaceBetween: 12,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 14,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 16,
          },
          1280: {
            slidesPerView: items,
            spaceBetween: 20,
          },
        }}
      >
        {productByCat.map((item, index) => (
          <SwiperSlide key={index}>
            <ProductItem product={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductsSlider;
