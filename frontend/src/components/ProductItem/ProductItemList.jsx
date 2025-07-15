import "../ProductItem/style.css";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";

import { MdZoomOutMap } from "react-icons/md";
import { useContext, useState } from "react";
import { MyProductContext } from "../../AppWrapper";
import ProductDetailsDialog from "./ProductDetailsDialog";

const ProductItemList = ({ product }) => {
  const context = useContext(MyProductContext);
  const [OpenProductDetails, setOpenProductDetails] = useState(false);
  const [liked, setLiked] = useState(false);
  return (
    <div className="productItem flex flex-col md:flex-row shadow-lg rounded-md overflow-hidden border border-[rgba(0,0,0,0.1)]">
      {/* Image Section */}
      <div className="group imgWrapper w-full md:w-[30%] relative">
        <Link to={`/product-details/${product._id}`}>
          <div className="w-[80%] max-sm:w-full h-[220px] md:h-[250px] overflow-hidden">
            <img
              src={product?.images?.[0]?.url || ""}
              alt=""
              className="w-full h-full object-cover object-top rounded-t-lg transition-transform duration-500 group-hover:scale-105"
            />
            <img
              src={product?.images?.[1]?.url || ""}
              alt=""
              className="w-full h-full object-cover object-top rounded-lg absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            />
          </div>
        </Link>

        {product.discount !== 0 && (
          <span className="discount absolute top-2 left-2 z-50 bg-[#35ac75] text-white rounded-lg px-2 py-1 text-xs font-medium">
            {product.discount}%
          </span>
        )}

        {/* Action Buttons (hidden on desktop until hover) */}
        <div className="absolute top-2 right-2 z-10 flex flex-col items-center gap-2 w-[50px] md:top-[-200px] md:group-hover:top-4 md:opacity-0 md:group-hover:opacity-100 transition-all duration-700">
          {/* View Product - hidden on small (mobile) screens */}
          <Button
            className="!hidden md:!flex !w-[35px] !h-[35px] !min-w-[35px] shadow !text-black !rounded-full !bg-white hover:!bg-[#35ac75] hover:!text-white"
            onClick={() => setOpenProductDetails(true)}
          >
            <MdZoomOutMap className="text-[18px]" />
          </Button>

          {/* Like Button - visible on all screens */}
          <Button
            onClick={() => setLiked(!liked)}
            className="!w-[35px] !h-[35px] !min-w-[35px] shadow !text-black !rounded-full !bg-white hover:!bg-[#35ac75] hover:!text-white"
          >
            {liked ? (
              <FaHeart className="text-[20px] text-red-500" />
            ) : (
              <FaRegHeart className="text-[20px]" />
            )}
          </Button>
        </div>
      </div>

      {/* Info Section */}
      <div className="info w-full md:w-[70%] p-4 md:p-6 flex flex-col justify-between">
        <div>
          <h6 className="text-sm mb-1">
            <Link
              to={`/product-details/${product._id}`}
              className="text-gray-600 hover:text-[#35ac75] transition-all"
            >
              {product.brand}
            </Link>
          </h6>

          <h3 className="text-base md:text-lg font-medium mb-2 line-clamp-1 text-black">
            <Link
              to={`/product-details/${product._id}`}
              className="hover:text-[#35ac75] transition-all"
            >
              {product.name}
            </Link>
          </h3>

          <Rating
            name="product-rating"
            defaultValue={product.rating}
            size="small"
            readOnly
          />

          <div className="flex items-center gap-3 mt-2 mb-4">
            <span className="text-sm text-gray-500 line-through font-medium">
              ₹{product.oldPrice}
            </span>
            <span className="text-[#35ac75] font-semibold text-sm">
              ₹{product.price}
            </span>
          </div>
        </div>

        <div className="w-full md:w-[40%] lg:w-[25%]">
          <Button
            fullWidth
            variant="contained"
            className="!bg-[#35ac75] hover:!bg-[#2e9b66] !text-white !rounded-md !py-2 !text-sm sm:!text-xs md:!text-sm !capitalize"
          >
            Add to Cart
          </Button>
        </div>
      </div>
      <ProductDetailsDialog
        open={OpenProductDetails}
        product={product}
        onClose={() => setOpenProductDetails(false)}
      />
    </div>
  );
};

export default ProductItemList;
