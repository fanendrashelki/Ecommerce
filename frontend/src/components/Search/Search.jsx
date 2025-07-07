import React from "react";
import "../Search/style.css";
import Button from "@mui/material/Button";
import { IoMdSearch } from "react-icons/io";

const Search = () => {
  return (
    <div className="searchBox w-[100%] h-[50px] bg-[#e5e5e5] rounded-[5px] relative p-2">
      <input
        type="search"
        placeholder="Search fro products ...."
        className=" w-full h-[35px] focus:outline-none bg-inherit p-2 text-[15px]"
      />{" "}
      <Button className="!absolute top-[5px] right-[5px] z-50 !w-[37px] !min-w-[37px] h-[35px] !rounded-full !text-black">
        <IoMdSearch className="text-[#434343] text-[22px]" />
      </Button>
    </div>
  );
};

export default Search;
