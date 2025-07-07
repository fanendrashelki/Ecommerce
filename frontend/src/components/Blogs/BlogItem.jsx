import { IoMdTime } from "react-icons/io";
import { Link } from "react-router-dom";
import { MdOutlineArrowForwardIos } from "react-icons/md";

const BlogItem = () => {
  return (
    <div className="blogItem group">
      <div className="imgWrapper w-full overflow-hidden rounded-md cursor-pointer relative">
        <img
          src="https://serviceapi.spicezgold.com/download/1741759053899_5-2.jpg"
          alt=""
          className="w-full transition-all group-hover:scale-105 group-hover:rotate-1 "
        />
        <span
          className="flex
        items-center justify-center text-white absolute bottom-[15px] right-[15px] z-50 bg-[#35ac75] rounded-md text-[12px] font-[500] p-1 gap-1"
        >
          <IoMdTime className=" text-[16px]" /> 5 APRIL 2020
        </span>
      </div>
      <div className="info py-4 ">
        <h2 className="text-[15px] font-[600] text-black">
          <Link to="/" className="link transition">
            Lorem Ipsum
          </Link>
        </h2>
        <p className="text-[13px] fornt-[600] text-[rgba(0,0,0,0.8)] mb-4">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.....
        </p>
        <Link
          to="/"
          className="link transition font-[500] text-[14px] flex items-center gap-1"
        >
          Read More <MdOutlineArrowForwardIos />
        </Link>
      </div>
    </div>
  );
};

export default BlogItem;
