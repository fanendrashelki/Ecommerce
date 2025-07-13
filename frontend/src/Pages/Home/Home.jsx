import React, { useEffect, useState } from "react";
import HomeSlider from "../../components/HomeSlider/HomeSlider";
import HomeCatSlider from "../../components/CatSlider/HomeCatSlider";
import { LiaShippingFastSolid } from "react-icons/lia";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import AdsBannerSlider from "../../components/AdsBannerSlider/AdsBannerSlider";
import AdsBannerSliderV2 from "../../components/AdsBannerSlider/AdsBanerSliderV2";
import BannerBoxAd from "../../components/AdsBannerSlider/BannerBoxAd";
import ProductsSlider from "../../components/ProductsSlider/ProductsSlider";
import BlogItem from "../../components/Blogs/BlogItem";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import axiosInstance from "../../utils/axiosInstance";

const Home = () => {
  const [selectedCatId, setSelectedCatId] = useState("");
  const [catList, setCatList] = useState([]);
  const [productByCat, setProductByCat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleTabChange = async (event, newCatId) => {
    setSelectedCatId(newCatId);
    setLoading(true);
    setNotFound(false);
    setProductByCat([]);

    try {
      const res = await axiosInstance.get(
        `/product/getProductBycatId/${newCatId}`
      );
      const products = res.data?.products || [];

      if (products.length === 0) {
        setNotFound(true);
      }

      setProductByCat(products);
    } catch (err) {
      setNotFound(true);
      console.error("Failed to fetch products:", err);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      try {
        const res = await axiosInstance.get("/categories");
        const categories = res.data?.data || [];

        if (categories.length > 0) {
          setCatList(categories);
          const firstCatId = categories[0]._id;
          setSelectedCatId(firstCatId);
          setLoading(true);

          const productRes = await axiosInstance.get(
            `/product/getProductBycatId/${firstCatId}`
          );
          setProductByCat(productRes.data?.products || []);
        }
      } catch (err) {
        setNotFound(true);
        console.error("Error fetching initial data:", err);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };

    fetchCategoriesAndProducts();
  }, []);

  return (
    <div>
      <HomeSlider />
      <HomeCatSlider />

      {/* Product Tabs & Slider Section */}
      <section className="py-5 bg-white mt-5">
        <div className="container">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="text-center md:text-left">
              <h2 className="text-[22px] font-semibold">Popular Products</h2>
              <p className="text-sm font-medium">
                Do not miss the current offers until the end of March.
              </p>
            </div>

            <div className="w-full md:w-[60%]">
              <Box>
                <Tabs
                  value={selectedCatId}
                  onChange={handleTabChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="category tabs"
                >
                  {catList.map((cat) => (
                    <Tab
                      key={cat._id}
                      value={cat._id}
                      label={cat.name}
                      className="!capitalize"
                    />
                  ))}
                </Tabs>
              </Box>
            </div>
          </div>

          {notFound ? (
            <div className="flex flex-col items-center justify-center h-full mt-5 p-8 border border-dashed border-gray-300 rounded-2xl shadow-sm max-w-lg mx-auto text-center animate-fade-in">
              <MdOutlineRemoveShoppingCart className="w-24 h-24 animate-bounce-slow text-green-400" />
              <h2 className="text-xl font-semibold text-[#35ac75]">
                No Products Available
              </h2>
              <p className="text-sm text-gray-500">
                Try exploring another category or come back later.
              </p>
            </div>
          ) : (
            <div className="mt-6">
              <ProductsSlider
                items={6}
                productByCat={productByCat}
                skeletonloading={loading}
              />
            </div>
          )}
        </div>
      </section>

      {/* Ads Section */}
      <div className="py-6 bg-white">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-5">
          <div className="w-full lg:w-[70%]">
            <AdsBannerSliderV2 />
          </div>
          <div className="w-full lg:w-[30%] flex flex-col gap-5 max-sm:flex-row">
            <BannerBoxAd
              info="right"
              img="https://serviceapi.spicezgold.com/download/1741664665391_1741497254110_New_Project_50.jpg"
            />
            <BannerBoxAd
              info="left"
              img="https://serviceapi.spicezgold.com/download/1741664496923_1737020250515_New_Project_47.jpg"
            />
          </div>
        </div>
      </div>

      {/* Shipping Promo Banner + Ad Slider */}
      <section className="py-4 pt-2 bg-white">
        <div className="container mx-auto px-4">
          <div className="border-2 border-[#35ac75] rounded-sm mb-5 p-4 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex items-center gap-3">
              <LiaShippingFastSolid className="text-4xl text-[#35ac75]" />
              <span className="text-lg font-semibold uppercase">
                Free Shipping
              </span>
            </div>
            <p className="flex-1 text-sm font-medium">
              Free Delivery Now On Your First Order and over $200
            </p>
            <p className="text-xl font-bold text-[#35ac75]">- Only $200</p>
          </div>

          <AdsBannerSlider item={4} />
        </div>
      </section>

      {/* Latest & Featured Products */}
      <section className="py-5 pt-0 bg-white">
        <div className="container">
          <h2 className="text-[22px] font-semibold">Latest Products</h2>
          <ProductsSlider items={6} />
          <AdsBannerSlider item={3} />
        </div>
      </section>

      <section className="py-5 pt-0 bg-white">
        <div className="container">
          <h2 className="text-[22px] font-semibold">Feature Products</h2>
          <ProductsSlider items={6} />
        </div>
      </section>

      {/* Blog Section */}
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
    </div>
  );
};

export default Home;
