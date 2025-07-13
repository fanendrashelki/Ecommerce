import HomeSlider from "../../components/HomeSlider/HomeSlider";
import HomeCatSlider from "../../components/CatSlider/HomeCatSlider";
import { LiaShippingFastSolid } from "react-icons/lia";

import AdsBannerSlider from "../../components/AdsBannerSlider/AdsBannerSlider";
import AdsBannerSliderV2 from "../../components/AdsBannerSlider/AdsBanerSliderV2";
import BannerBoxAd from "../../components/AdsBannerSlider/BannerBoxAd";
import ProductsSlider from "../../components/ProductsSlider/ProductsSlider";

import "swiper/css";
import "swiper/css/navigation";

import ProductTab from "../../components/ProductTab";
import Bloglist from "../../components/Blogs/Bloglist";
import Feature from "../../components/Feature";
import Latest from "../../components/Latest";

const Home = () => {
  return (
    <div>
      <HomeSlider />
      <HomeCatSlider />
      <ProductTab />
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
            <p className="text-xl font-bold text-[#35ac75]"> Only $200</p>
          </div>

          <AdsBannerSlider item={4} />
        </div>
      </section>

      {/* Latest & Featured Products */}
      <Latest />

      <Feature />

      {/* Blog Section */}
      <Bloglist />
    </div>
  );
};

export default Home;
