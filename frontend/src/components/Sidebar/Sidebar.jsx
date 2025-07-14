import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { Collapse } from "react-collapse";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

import "../Sidebar/style.css";
import { Button } from "@mui/material";
import { useState } from "react";

const Sidebar = () => {
  const [isOpenCategory, SetIsOpenCategory] = useState(true);
  const [isOpenAvailable, SetIsOpenAvailable] = useState(true);
  const [isOpenSize, SetIsOpenSize] = useState(true);
  return (
    <aside className="sidebar py-5">
      <div className="box flex justify-center flex-col ">
        <h3 className="mb-3 text-[16] font-[600] capitalize flex items-center pr-5">
          Shop by Category1
          <Button
            className="!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto !text-[#000]"
            onClick={() => SetIsOpenCategory(!isOpenCategory)}
          >
            {isOpenCategory === true ? <FaAngleUp /> : <FaAngleDown />}
          </Button>
        </h3>
        <Collapse isOpened={isOpenCategory}>
          <div className="scroll relative px-3 -left-[10px]">
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Fashion"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Electronics"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Bags"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Footware"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Groceries"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Beuty"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Wellness"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Jewellery"
              className="w-full"
            />
          </div>
        </Collapse>
      </div>
      <div className="box mt-3 flex justify-center flex-col ">
        <h3 className="mb-3 text-[16] font-[600] capitalize flex items-center pr-5">
          Availability
          <Button
            className="!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto !text-[#000]"
            onClick={() => SetIsOpenAvailable(!isOpenAvailable)}
          >
            {isOpenAvailable === true ? <FaAngleUp /> : <FaAngleDown />}
          </Button>
        </h3>
        <Collapse isOpened={isOpenAvailable}>
          <div className="scroll relative px-3 -left-[10px]">
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Available (18)"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label=" Not Available (10)"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="In Stock (1)"
              className="w-full"
            />
          </div>
        </Collapse>
      </div>
      <div className="box mt-3 flex justify-center flex-col ">
        <h3 className="mb-3 text-[16] font-[600] capitalize flex items-center pr-5">
          Availability
          <Button
            className="!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto !text-[#000]"
            onClick={() => SetIsOpenSize(!isOpenSize)}
          >
            {isOpenSize === true ? <FaAngleUp /> : <FaAngleDown />}
          </Button>
        </h3>
        <Collapse isOpened={isOpenSize}>
          <div className="scroll relative px-3 -left-[10px]">
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Small (18)"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label=" Medium (10)"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Large (1)"
              className="w-full"
            />
          </div>
        </Collapse>
      </div>
      <div className="box flex mt-3 justify-center flex-col ">
        <h3 className="mb-5 text-[16] font-[600] capitalize flex items-center pr-5">
          Filter By Price
        </h3>
        <RangeSlider />
        <div className="flex pt-4 pb-2 priceRange">
          <span className="text-[13px]">
            From : <strong className="text-black">Rs:{100}</strong>
          </span>
          <span className=" ml-auto text-[13px]">
            From : <strong className="text-black">Rs:{5000}</strong>
          </span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
