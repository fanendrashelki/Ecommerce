import { Link } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

const HomeCatSlider = () => {
  const [catList, setCatList] = useState([]);

  const fetchCatList = async () => {
    try {
      const res = await axiosInstance.get("/categories");
      setCatList(res?.data?.data);
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  useEffect(() => {
    fetchCatList();
  }, []);

  return (
    <div className="homecatslider pt-4 py-8 bg-gray-100">
      <div className="container mx-auto">
        <Swiper
          loop={true}
          navigation={true}
          centeredSlides={false}
          spaceBetween={10}
          modules={[Navigation]}
          className="mySwiper"
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            480: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 10,
            },
            1280: {
              slidesPerView: 8,
              spaceBetween: 10,
            },
          }}
        >
          {catList.map((cat, index) => (
            <SwiperSlide key={cat._id || index}>
              <Link to="/" className="block">
                <div className="item py-5 px-2 sm:py-6 sm:px-3 bg-white rounded-lg text-center flex flex-col items-center justify-center shadow-sm hover:shadow-lg transition-shadow duration-200 transform hover:scale-105">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-[60px] h-[60px] object-cover rounded-full border border-gray-200"
                  />
                  <h3 className="font-medium text-[14px] sm:text-[16px] mt-2 sm:mt-3 capitalize text-gray-800">
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
