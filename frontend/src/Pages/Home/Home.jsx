import React, { useEffect, useState } from "react";
import HomeSlider from "../../components/HomeSlider/HomeSlider";
import HomeCatSlider from "../../components/CatSlider/HomeCatSlider";
import { LiaShippingFastSolid } from "react-icons/lia";
import AdsBannerSlider from "../../components/AdsBannerSlider/AdsBannerSlider";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ProductsSlider from "../../components/ProductsSlider/ProductsSlider";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";

import BlogItem from "../../components/Blogs/BlogItem";

import AdsBannerSliderV2 from "../../components/AdsBannerSlider/AdsBanerSliderV2";
import BannerBoxAd from "../../components/AdsBannerSlider/BannerBoxAd";
import axiosInstance from "../../utils/axiosInstance";

const Home = () => {
  const [value, setValue] = useState("");
  const [catList, setCatList] = useState([]);
  const [productByCat, setProductByCat] = useState([]);
  const handleChange = async (event, catId) => {
    try {
      const res = await axiosInstance.get(
        `/product/getProductBycatId/${catId}`
      );

      setProductByCat(res.data?.products);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setValue(catId);
    }
  };

  useEffect(() => {
    const fetchCatList = async () => {
      try {
        const res = await axiosInstance.get("/categories");
        const categories = res?.data?.data;

        if (categories && categories.length > 0) {
          setCatList(categories);
          setValue(categories[0]._id);

          // Fetch default products
          const productRes = await axiosInstance.get(
            `/product/getProductBycatId/${categories[0]._id}`
          );
          setProductByCat(productRes.data?.products);
        }
      } catch (error) {
        console.error("Error fetching category or products:", error);
      }
    };

    fetchCatList();
  }, []);

  return (
    <div>
      <HomeSlider />
      <HomeCatSlider />

      {/* Product slider */}
      <section className="py-5 bg-white mt-5">
        <div className="container">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="leftSec text-center md:text-left">
              <h2 className="text-[18px] sm:text-[20px] md:text-[22px] font-[600]">
                Popular Products
              </h2>
              <p className="text-[13px] sm:text-[14px] font-[500]">
                Do not miss the current offers until the end of March.
              </p>
            </div>

            <div className="rightSec w-full md:w-[60%]">
              <Box>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                  className="w-full"
                >
                  {catList.map((item) => (
                    <Tab
                      className="!capitalize"
                      key={item._id}
                      value={item._id}
                      label={item.name}
                    />
                  ))}
                </Tabs>
              </Box>
            </div>
          </div>

          {/* Product slider section */}
          <div className="mt-6">
            <ProductsSlider items={6} productByCat={productByCat} />
          </div>
        </div>
      </section>

      {/* ADs Section  */}
      <div className="py-6 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-5">
            {/* Left: Main Slider */}
            <div className="w-full lg:w-[70%]">
              <AdsBannerSliderV2 />
            </div>

            {/* Right: Two Stacked Banners */}
            <div className="w-full lg:w-[30%] flex lg:flex-col gap-5 max-sm:flex-row">
              <div className="w-full h-auto lg:h-[215px]">
                <BannerBoxAd
                  info="right"
                  img="https://serviceapi.spicezgold.com/download/1741664665391_1741497254110_New_Project_50.jpg"
                />
              </div>
              <div className="w-full h-auto lg:h-[215px]">
                <BannerBoxAd
                  info="left"
                  img="https://serviceapi.spicezgold.com/download/1741664496923_1737020250515_New_Project_47.jpg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ads slider */}
      <section className="py-4 pt-2 bg-white">
        <div className="container mx-auto px-4">
          {/* Free Shipping Banner */}
          <div className="freeShipping w-full sm:w-[90%] lg:w-[80%] mx-auto py-4 px-4 border-2 border-[#35ac75] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-sm mb-5">
            {/* Left - Icon + Title */}
            <div className="col1 flex items-center gap-3 mb-4 md:mb-0">
              <LiaShippingFastSolid className="text-[36px] sm:text-[40px] text-[#35ac75]" />
              <span className="text-[16px] sm:text-[20px] font-semibold uppercase">
                Free Shipping
              </span>
            </div>

            {/* Middle - Description */}
            <div className="col2 flex-1 mb-4 md:mb-0">
              <p className="text-sm sm:text-base font-medium">
                Free Delivery Now On Your First Order and over $200
              </p>
            </div>

            {/* Right - Highlighted Price */}
            <div className="col3">
              <p className="text-[18px] sm:text-[24px] font-bold text-[#35ac75]">
                - Only $200
              </p>
            </div>
          </div>

          {/* Ad Slider Component */}
          <AdsBannerSlider item={4} />
        </div>
      </section>

      <section className="py-5 pt-0 bg-white">
        <div className="container">
          <h2 className="text-[22px] font-[600]">Latest Products</h2>
          <ProductsSlider items={6} />
          <AdsBannerSlider item={3} />
        </div>
      </section>

      <section className="py-5 pt-0 bg-white">
        <div className="container">
          <h2 className="text-[22px] font-[600]">Feature Products</h2>
          <ProductsSlider items={6} />
        </div>
      </section>

      {/* blog  */}

      <section className="py-5 pb-8 pt-0 bg-white blogSection">
        <div className="container mx-auto px-4">
          <h2 className="text-[22px] font-[600] mb-4">From the Blog</h2>

          <Swiper
            spaceBetween={20}
            navigation={true}
            pagination={{ clickable: true }}
            modules={[Navigation]}
            className="blogSlider"
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
    </div>
  );
};

export default Home;
