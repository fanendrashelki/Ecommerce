import mongoose from "mongoose";

const AdsBannerSchema = new mongoose.Schema({
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
const AdsBanner = mongoose.model("AdsBanner", AdsBannerSchema);
export default AdsBanner;
