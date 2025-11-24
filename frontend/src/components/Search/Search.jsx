import React from "react";
import "../Search/style.css";
import Button from "@mui/material/Button";
import { IoMdSearch } from "react-icons/io";
import { MyProductContext } from "../../context/AppContext";
import { useContext } from "react";

const Search = () => {
  const context = useContext(MyProductContext);
  const handleserch = () => {
    context.alertBox(
      "info",
      "🔍 Search is under development. It’s not working right now."
    );
  };
  return (
    <div className="searchBox w-[100%] h-[50px] bg-[#e5e5e5] rounded-[5px] relative p-2">
      <input
        type="search"
        placeholder="Search fro products ...."
        className=" w-full h-[35px] focus:outline-none bg-inherit p-2 text-[15px]"
      />
      <Button className="!absolute top-[5px] right-[5px] z-50 !w-[37px] !min-w-[37px] h-[35px] !rounded-full !text-black">
        <IoMdSearch
          onClick={handleserch}
          className="text-[#434343] text-[22px]"
        />
      </Button>
    </div>
  );
};

export default Search;
