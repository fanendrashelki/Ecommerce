import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation, Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

function HomeSlider() {
  const [Banner, setBanner] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchBanner = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/banner");
      // const response = res?.data?.banner.filter((item) => item.active === true);
      const response = res?.data?.banner
        .filter((item) => item.active === true)
        .sort((a, b) => b._id.localeCompare(a._id));
      setBanner(response);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);
  return (
    <div className="homeslider py-6">
      <div className="">
        {loading ? (
          <div role="status" class=" roundedm animate-pulse  px-3">
            <div class="flex items-center justify-center w-[100%] !h-[380px] mb-4 bg-gray-300 rounded dark:bg-gray-700">
              <svg
                class="w-10 h-10 text-gray-200 dark:text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 20"
              >
                <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
              </svg>
            </div>
          </div>
        ) : (
          <Swiper
            loop={true}
            slidesPerView={1.1}
            spaceBetween={20}
            centeredSlides={true}
            navigation={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Navigation, Autoplay]}
            className="mySwiper"
          >
            {Banner.map((item, index) => (
              <SwiperSlide key={item._id || index}>
                <img className="w-full rounded-xl" src={item.banner} alt="" />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}

export default HomeSlider;
