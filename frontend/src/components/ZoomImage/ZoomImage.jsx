import React, { useRef, useState } from "react";
import "react-inner-image-zoom/lib/styles.min.css";
import InnerImageZoom from "react-inner-image-zoom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const ZoomImage = ({ images }) => {
  const [sliderIndex, setSliderIndex] = useState(0);
  const zoomSliderBig = useRef();
  const zoomSlidersmall = useRef();

  const goto = (index) => {
    setSliderIndex(index);
    zoomSlidersmall.current.swiper.slideTo(index);
    zoomSliderBig.current.swiper.slideTo(index);
  };

  return (
    <div className="flex gap-3">
      {/* Thumbnail Vertical Slider */}
      <div className="slider w-[20%] !h-[400px] overflow-hidden">
        <Swiper
          ref={zoomSlidersmall}
          direction="vertical"
          slidesPerView={4}
          spaceBetween={10}
          navigation={true}
          modules={[Navigation]}
          className="zoomimg h-[400px]"
        >
          {images?.map((img, index) => (
            <SwiperSlide key={index}>
              <div
                className={`item rounded-md overflow-hidden cursor-pointer group ${
                  sliderIndex === index ? "opacity-100" : "opacity-40"
                }`}
                onClick={() => goto(index)}
              >
                <img
                  src={img.url}
                  className="w-full group-hover:scale-105 transition-all"
                  alt={`thumb-${index}`}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Zoomable Image Slider */}
      <div className="w-[80%] h-[400px] overflow-hidden">
        <Swiper
          ref={zoomSliderBig}
          loop={false}
          slidesPerView={1}
          spaceBetween={10}
          navigation={false}
          onSlideChange={(swiper) => setSliderIndex(swiper.activeIndex)}
        >
          {images?.map((img, index) => (
            <SwiperSlide key={index}>
              <InnerImageZoom
                src={img.url}
                zoomSrc={img.url}
                zoomType="hover"
                zoomScale={1.2}
                alt={`zoom-${index}`}
                hideCloseButton={true}
                className="object-contain w-full h-full"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ZoomImage;
