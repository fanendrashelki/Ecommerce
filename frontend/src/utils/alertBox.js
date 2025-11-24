import toast from "react-hot-toast";
export const alertBox = (type, msg) => {
  if (type === "success") {
    toast.success(msg);
  } else if (type === "error") {
    toast.error(msg);
  } else {
    toast(msg);
  }
};