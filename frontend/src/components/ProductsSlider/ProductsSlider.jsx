import React from "react";
import { Link } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import ProductItem from "../ProductItem/ProductItem";

const ProductsSlider = ({ items, productByCat }) => {
  return (
    <div className="productdSlider py-3">
      <Swiper
        slidesPerView={items}
        spaceBetween={10}
        navigation={true}
        centeredSlides={false}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation]}
        className="mySwiper"
        breakpoints={{
          320: {
            slidesPerView: 1.2,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2.5,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1280: {
            slidesPerView: items || 6,
            spaceBetween: 10,
          },
        }}
      >
        {(Array.isArray(productByCat) ? productByCat : []).map(
          (item, index) => (
            <SwiperSlide key={index}>
              <ProductItem product={item} />
            </SwiperSlide>
          )
        )}
      </Swiper>
    </div>
  );
};

export default ProductsSlider;
