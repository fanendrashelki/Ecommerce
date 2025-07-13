import React, { useRef, useState } from "react";
import "react-inner-image-zoom/lib/styles.min.css";
import InnerImageZoom from "react-inner-image-zoom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

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
    <div className="flex flex-col gap-5">
      {/* Zoomable Main Image */}
      <div className="w-full max-w-2xl mx-auto bg-white p-4 rounded-xl shadow-md">
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
                className="rounded-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Thumbnail Slider with Custom Nav Buttons */}
      <div className="w-full max-w-2xl mx-auto relative">
        <Swiper
          ref={zoomSlidersmall}
          slidesPerView={4}
          spaceBetween={12}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          modules={[Navigation]}
          className="zoomimg"
        >
          {images?.map((img, index) => (
            <SwiperSlide key={index}>
              <div
                className={`border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${
                  sliderIndex === index
                    ? "border-[#35ac75] shadow-md"
                    : "border-gray-200"
                }`}
                onClick={() => goto(index)}
              >
                <img
                  src={img.url}
                  className="w-full h-20 object-cover hover:scale-105 transition-transform duration-300"
                  alt={`thumb-${index}`}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button className="custom-prev absolute -left-5 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow hover:bg-[#35ac75] hover:text-white transition">
          <MdArrowBackIosNew size={20} />
        </button>
        <button className="custom-next absolute -right-5 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow hover:bg-[#35ac75] hover:text-white transition">
          <MdArrowForwardIos size={20} />
        </button>
      </div>
    </div>
  );
};

export default ZoomImage;
