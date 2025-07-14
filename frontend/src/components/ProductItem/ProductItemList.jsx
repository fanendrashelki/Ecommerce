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

const ProductItemList = ({ product }) => {
  const context = useContext(MyProductContext);
  return (
    <div className="productItem flex items-center  shadow-lg rounded-md overflow-hidden border-1 border-[rgba(0,0,0,0.1)]">
      <div className=" group imgWrapper w-[25%]  rounded-md relative">
        <Link to="/">
          <div className="h-[220px] overflow-hidden ">
            <img
              src={product?.images?.[0]?.url || ""}
              alt=""
              className="w-full"
            />
            <img
              src={product?.images?.[1]?.url || ""}
              alt=""
              className="w-auto absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-all duration-700"
            />
          </div>
        </Link>
        {product.discount !== 0 && (
          <span className="discount flex items-center absolute top-[10px] left-[10px] z-50 bg-[#35ac75] text-white rounded-lg p-1 text-[12px] font-[500]">
            {product.discount}%
          </span>
        )}

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
        <h6 className="text-[15px] mb-2">
          <Link to="/" className="link transition-all">
            {product.brand}
          </Link>
        </h6>
        <h3 className="text-[18px] title mt-2 font-[500]  mb-2 min-h-[20px]  text-[#000] line-clamp-1  ">
          <Link to="/" className="link transition-all">
            {product.name}
          </Link>
        </h3>
        {/* <p className="text-[14px] mt-2">{product.description}</p> */}
        <Rating
          name="size-medium"
          defaultValue={product.rating}
          size="small"
          readOnly
        />

        <div className="flex items-center gap-4  mb-2">
          <span className="oldPrice line-through text-gray-500   font-[500]">
            ₹{product.oldPrice}
          </span>
          <span className="Price text-[#35ac75] font-[600] text-[15px]">
            ₹{product.price}
          </span>
        </div>
        <div className="w-[25%] mt-3 ">
          <Button
            fullWidth
            variant="contained"
            className="!mt-auto  !bg-[#35ac75] hover:!bg-[#2e9b66] !text-white !rounded-md !py-2 !text-sm max-sm:!text-[10px] !capitalize"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductItemList;
