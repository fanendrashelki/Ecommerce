import React from "react";
import { Link } from "react-router-dom";
import { RiShoppingBag4Line } from "react-icons/ri";
const BannerBoxAd = (props) => {
  return (
    <>
      <div className=" w-full overflow-hidden rounded-md group relative">
        <img
          src={props.img}
          alt=""
          className=" w-full h-[100%]  transition-all group-hover:scale-125"
        />
        <div
          className={`info absolute top-0  flex justify-center flex-col w-[80%] h-[100%] ${
            props.info === "left" ? "left-0 max-sm:pl-3 p-7 " : "right-0 "
          }  ${props.info === "left" ? "" : " max-sm:pl-10 pl-20  "}`}
        >
          <h2 className="w-full text-[22px] font-[600] max-sm:text-[9px] mt-1 ">
            Buy Men's Footwear with low price
          </h2>
          <span className="text-[#35ac75]  font-[700] text-[25px] py-2 max-sm:text-[12px]">
            $1500
          </span>
          <div className="w-full">
            <Link
              to="/"
              className="flex items-center gap-1 capitalize font-[600] mt-2 max-sm:text-[10px] max-sm:mt-1 text-[#35ac75]  animate-bounce"
            >
              Shop Now
              <span className="inline-block animate-bounce">
                <RiShoppingBag4Line />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default BannerBoxAd;
