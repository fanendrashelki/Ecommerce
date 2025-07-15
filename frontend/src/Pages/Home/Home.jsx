import HomeSlider from "../../components/HomeSlider/HomeSlider";
import HomeCatSlider from "../../components/CatSlider/HomeCatSlider";
import { LiaShippingFastSolid } from "react-icons/lia";

import AdsBannerSlider from "../../components/AdsBannerSlider/AdsBannerSlider";

import "swiper/css";
import "swiper/css/navigation";

import ProductTab from "../../components/ProductTab";
import Bloglist from "../../components/Blogs/Bloglist";
import Feature from "../../components/Feature";
import Latest from "../../components/Latest";
import AdsSection from "../../components/AdsSection";

const Home = () => {
  return (
    <div>
      <HomeSlider />
      <HomeCatSlider />
      <ProductTab />

      {/* Ads Section */}
      <AdsSection />

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
            <p className="text-xl font-bold text-[#35ac75]"> Only $200</p>
          </div>
        </div>
      </section>

      {/* Latest & Featured Products */}
      <Latest />
      <div className="container mx-auto ">
        <AdsBannerSlider item={4} />
      </div>

      <Feature />

      {/* Blog Section */}
      {/* <Bloglist /> */}
    </div>
  );
};

export default Home;
