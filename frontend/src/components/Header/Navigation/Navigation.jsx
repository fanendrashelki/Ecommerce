import { Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { RiMenu2Line } from "react-icons/ri";
import { TfiAngleDown } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { GoRocket } from "react-icons/go";
import CategoryPanel from "./CategoryPanel";
import { MyProductContext } from "../../../AppWrapper";
import { MdOutlineCategory } from "react-icons/md";
const Navigation = () => {
  const [isopenCatPanel, setIsOpenCatPanel] = useState(false);
  const [categories, setCategories] = useState([]);
  const context = useContext(MyProductContext);

  useEffect(() => {
    if (context?.category) {
      setCategories(context.category);
    }
  }, [context.category]);

  const toggleDrawer = (open) => () => {
    setIsOpenCatPanel(open);
  };

  return (
    <>
      <nav className="max-sm:hidden max-lg:hidden bg-white">
        <div className="container flex items-center justify-end gap-5">
          <div className="col_1 w-[20%]">
            <Button
              className="!text-black gap-2 w-full !capitalize"
              onClick={toggleDrawer(true)}
            >
              <MdOutlineCategory className="text-[18px] gap-2" />
              Categories
              <TfiAngleDown className="text-[13px] ml-auto font-bold" />
            </Button>
          </div>

          <div className="col_2 w-[60%] lg:w-[80%]">
            <ul className="flex items-center gap-3 nav">
              <li className="list-none">
                <Link to="/" className="link transition text-[14px] font-[500]">
                  <Button className="link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#35ac75] !py-4">
                    Home
                  </Button>
                </Link>
              </li>

              {categories.map((cat, catIndex) => (
                <li key={catIndex} className="list-none relative group">
                  <Link
                    to={`/product/${cat._id}?type=cat`}
                    className="link transition"
                  >
                    <Button className="!font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#35ac75] !py-4">
                      {cat.name}
                    </Button>
                  </Link>

                  {cat.children?.length > 0 && (
                    <div className="submenu absolute top-[120%] left-0 min-w-[150px] bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                      <ul>
                        {cat.children.map((subCat, subIndex) => (
                          <li
                            key={subIndex}
                            className="list-none relative group"
                          >
                            <Link
                              to={`/product/${subCat._id}?type=subcat`}
                              className="w-full block"
                            >
                              <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none hover:!text-[#35ac75]">
                                {subCat.name}
                              </Button>
                            </Link>

                            {subCat.children?.length > 0 && (
                              <div className="submenu absolute top-0 left-full min-w-[150px] bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                                <ul>
                                  {subCat.children.map(
                                    (thirdCat, thirdIndex) => (
                                      <li
                                        key={thirdIndex}
                                        className="list-none"
                                      >
                                        <Link
                                          to={`/product/${thirdCat._id}?type=thirdsubcat`}
                                          className="w-full block"
                                        >
                                          <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none hover:!text-[#35ac75]">
                                            {thirdCat.name}
                                          </Button>
                                        </Link>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="col_3 w-[20%] lg:hidden">
            <p className="text-[14px] font-[500] flex items-center gap-3 mb-0 mt-0">
              <GoRocket className="text-[18px]" />
              Free International Delivery
            </p>
          </div>
        </div>
      </nav>

      <hr className="border-t border-[rgba(0,0,0,0.1)]" />

      <CategoryPanel
        toggleDrawer={toggleDrawer}
        isopenCatPanel={isopenCatPanel}
      />
    </>
  );
};

export default Navigation;
