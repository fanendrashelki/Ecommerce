import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useContext, useEffect, useState } from "react";
import { MyProductContext } from "../../context/AppContext";

const HomeCatSlider = () => {
  const [catList, setCatList] = useState([]);
  const context = useContext(MyProductContext);
  useEffect(() => {
    if (context?.category) {
      setCatList(context.category);
    }
  }, [context.category]);

  return (
    <div className="homecatslider py-6 bg-gray-100">
      <div className="px-3 sm:px-6 md:px-12 lg:px-20">
        <Swiper
          loop={catList.length >= 8}
          navigation={true}
          centeredSlides={false}
          spaceBetween={10}
          modules={[Navigation]}
          className="mySwiper"
          breakpoints={{
            320: { slidesPerView: 2.5, spaceBetween: 10 },
            480: { slidesPerView: 3.5, spaceBetween: 12 },
            640: { slidesPerView: 4.5, spaceBetween: 14 },
            768: { slidesPerView: 5.5, spaceBetween: 16 },
            1024: { slidesPerView: 6.5, spaceBetween: 18 },
            1280: { slidesPerView: 8, spaceBetween: 20 },
          }}
        >
          {catList.map((cat, index) => (
            <SwiperSlide key={cat._id || index}>
              <Link to={`/product/${cat._id}?type=cat`} className="block">
                <div className="py-4 px-2 sm:py-5 sm:px-4 bg-white rounded-lg text-center flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-transform duration-200 transform hover:scale-105">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-full border border-gray-300"
                  />
                  <h3 className="font-medium text-[13px] sm:text-[15px] mt-2 sm:mt-3 capitalize text-gray-800 text-center truncate w-full">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HomeCatSlider;
