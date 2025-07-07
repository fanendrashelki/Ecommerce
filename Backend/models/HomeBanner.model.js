import mongoose from "mongoose";

const HomeBannerSchema = new mongoose.Schema({
  banner: {
    type: String,
    required: true,
  },
  bannerPublicId: {
    type: String,
    default: "",
  },
  active: {
    type: Boolean,
    default: false,
  },
});
const HomeBanner = mongoose.model("HomeBanner", HomeBannerSchema);
export default HomeBanner;
