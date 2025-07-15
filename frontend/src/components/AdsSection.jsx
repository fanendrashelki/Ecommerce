import AdsBannerSliderV2 from "./AdsBannerSlider/AdsBanerSliderV2";
import BannerBoxAd from "./AdsBannerSlider/BannerBoxAd";

const AdsSection = () => {
  return (
    <div className="py-6 bg-white">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-5 items-center">
        <div className="w-full lg:w-[70%] ">
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
  );
};

export default AdsSection;
