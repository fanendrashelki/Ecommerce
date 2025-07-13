import BlogItem from "./BlogItem";
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
const Bloglist = () => {
  return (
    <section className="py-5 pb-8 pt-0 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-[22px] font-semibold mb-4">From the Blog</h2>

        <Swiper
          spaceBetween={20}
          navigation
          modules={[Navigation]}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {[...Array(6)].map((_, index) => (
            <SwiperSlide key={index}>
              <BlogItem />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Bloglist;
