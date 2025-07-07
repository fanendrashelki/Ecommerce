import toast from "react-hot-toast";

export const TOAST_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  DEFAULT: "default",
};

const alertBox = (type, msg) => {
  switch (type) {
    case TOAST_TYPES.SUCCESS:
      toast.success(msg);
      break;
    case TOAST_TYPES.ERROR:
      toast.error(msg);
      break;
    default:
      toast(msg);
  }
};

export default alertBox;
