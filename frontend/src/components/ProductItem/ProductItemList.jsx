import img from "../../assets/i-phone.png";
import img2 from "../../assets/i-phone-2.jpeg";
import "../ProductItem/style.css";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";
import { FaRegHeart } from "react-icons/fa";
import { IoGitCompareOutline } from "react-icons/io5";
import { MdZoomOutMap } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { useContext } from "react";
import { MyProductContext } from "../../AppWrapper";

const ProductItemList = () => {
  const context = useContext(MyProductContext);
  return (
    <div className="productItem flex items-center  shadow-lg rounded-md overflow-hidden border-1 border-[rgba(0,0,0,0.1)]">
      <div className=" group imgWrapper w-[25%]  rounded-md relative">
        <Link to="/">
          <div className="h-[220px] overflow-hidden ">
            <img src={img} alt="" className="w-full" />
            <img
              src={img2}
              alt=""
              className="w-auto absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-all duration-700"
            />
          </div>
        </Link>
        <span className="discount flex items-center absolute top-[10px] left-[10px] z-50 bg-[#35ac75] text-white rounded-lg p-1 text-[12px] font-[500]">
          10%
        </span>

        <div className="actions absolute top-[-200px] right-[5px] z-50 flex items-center gap-2 flex-col w-[50px] transition-all duration-700 group-hover:top-[15px] opacity-0 group-hover:opacity-100">
          <Button
            className="!w-[35px] !h-[35px] !min-w-[35px] text-black !rounded-full !bg-white hover:!bg-[#35ac75]
           hover:!text-white group"
            onClick={() => context.setOpenProductDetails(true)}
          >
            <MdZoomOutMap className="text-[18px] text-black hover:!text-white" />
          </Button>

          <Button
            className="!w-[35px] !h-[35px] !min-w-[35px] text-black !rounded-full !bg-white hover:!bg-[#35ac75]
           hover:!text-white group"
          >
            <FaRegHeart className="text-[18px] text-black hover:!text-white" />
          </Button>

          <Button
            className="!w-[35px] !h-[35px] !min-w-[35px] text-black !rounded-full !bg-white hover:!bg-[#35ac75]
           hover:!text-white group"
          >
            <IoGitCompareOutline className="text-[18px] text-black hover:!text-white " />
          </Button>
        </div>
      </div>
      <div className="info p-3 py-5 pl-5 w-[75%] ">
        <h6 className="text-[15px]">
          <Link to="/" className="link transition-all">
            iphone
          </Link>
        </h6>
        <h3 className="text-[18px] title mt-2 font-[500]  md-1 text-[#000]">
          <Link to="/" className="link transition-all">
            I-Phone
          </Link>
        </h3>
        <p className="text-[14px] mt-2">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s
        </p>
        <Rating name="size-medium" defaultValue={2} size="small" readOnly />

        <div className="flex items-center gap-4">
          <span className="oldPrice line-through text-gray-500   font-[500]">
            $54.00
          </span>
          <span className="Price text-[#35ac75] font-[600] text-[15px]">
            $50.00
          </span>
        </div>
        <div className="w-full mt-3 ">
          <Button className="btn-org flex gap-2">
            <IoCartOutline className="text-[18px]" /> Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductItemList;
