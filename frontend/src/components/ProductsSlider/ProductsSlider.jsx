import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductItem from "../ProductItem/ProductItem";

const ProductsSlider = ({ items = 6, productByCat = [] }) => {
  const shouldLoop = productByCat.length >= items;

  return (
    <div className="productSlider py-3">
      <Swiper
        loop={shouldLoop}
        navigation={true}
        slidesPerView={items}
        spaceBetween={10}
        modules={[Navigation]}
        className="mySwiper"
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 2.5,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3.5,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1280: {
            slidesPerView: items,
            spaceBetween: 10,
          },
        }}
      >
        {productByCat.map((item, index) => (
          <SwiperSlide key={item.id || index}>
            <ProductItem product={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductsSlider;
