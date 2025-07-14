import React from "react";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
const ProductNotFound = () => {
  return (
    <div className=" w-full flex flex-col items-center justify-center h-full mt-5 p-8 border border-dashed border-gray-300 rounded-2xl shadow-sm max-w-lg mx-auto text-center animate-fade-in">
      <MdOutlineRemoveShoppingCart className="w-24 h-24 animate-bounce-slow text-[#35ac75]" />
      <h2 className="text-xl font-semibold text-[#35ac75]">
        No Products Available
      </h2>
      <p className="text-sm text-gray-500">
        Try exploring another category or come back later.
      </p>
    </div>
  );
};

export default ProductNotFound;
