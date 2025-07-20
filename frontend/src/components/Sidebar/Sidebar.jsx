import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { Collapse } from "react-collapse";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { MyProductContext } from "../../AppWrapper";

const Sidebar = ({ filters, setFilters }) => {
  const [isOpenCategory, setIsOpenCategory] = useState(true);
  const context = useContext(MyProductContext);

  const handleCategoryChange = (name) => {
    setFilters((prev) => {
      const categories = prev.categories.includes(name)
        ? prev.categories.filter((cat) => cat !== name)
        : [...prev.categories, name];
      return { ...prev, categories };
    });
  };

  const handlePriceChange = (range) => {
    setFilters((prev) => ({ ...prev, minPrice: range[0], maxPrice: range[1] }));
  };

  return (
    <aside className="sidebar py-5">
      <div className="box flex flex-col">
        <h3 className="mb-3 text-[16px] font-[600] flex items-center">
          Shop by Category
          <Button
            className="!ml-auto !w-[30px] !h-[30px]"
            onClick={() => setIsOpenCategory(!isOpenCategory)}
          >
            {isOpenCategory ? <FaAngleUp /> : <FaAngleDown />}
          </Button>
        </h3>
        <Collapse isOpened={isOpenCategory}>
          <div className="scroll relative px-3 -left-[10px]">
            {context.category.map((item) => (
              <FormControlLabel
                key={item._id}
                className="w-full"
                control={
                  <Checkbox
                    size="small"
                    checked={filters.categories.includes(item.name)}
                    onChange={() => handleCategoryChange(item.name)}
                  />
                }
                label={item.name}
              />
            ))}
          </div>
        </Collapse>
      </div>

      <div className="box mt-3 flex flex-col">
        <h3 className="mb-5 text-[16px] font-[600]">Filter By Price1</h3>
        <RangeSlider
          min={0}
          max={5000}
          step={50}
          defaultValue={[filters.minPrice, filters.maxPrice]}
          onInput={handlePriceChange}
        />
        <div className="flex pt-4 pb-2 priceRange">
          <span className="text-[13px]">
            From: <strong>₹{filters.minPrice}</strong>
          </span>
          <span className="ml-auto text-[13px]">
            To: <strong>₹{filters.maxPrice}</strong>
          </span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
