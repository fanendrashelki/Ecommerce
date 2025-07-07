import { Button } from "@mui/material";
import React, { useState } from "react";
import { RiMenu2Line } from "react-icons/ri";
import { TfiAngleDown } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { GoRocket } from "react-icons/go";
import CategoryPanel from "./CategoryPanel";

const Navigation = () => {
  const [isopenCatPanel, setIsOpenCatPanel] = useState(false);

  const toggleDrawer = (open) => () => {
    setIsOpenCatPanel(open);
  };

  return (
    <>
      <nav className="max-sm:hidden max-lg:hidden bg-white">
        <div className="container flex items-center justify-end gap-5">
          <div className="col_1 w-[20%]">
            <Button
              className="!text-black gap-2 w-full"
              onClick={toggleDrawer(true)}
            >
              <RiMenu2Line className="text-[18px]" />
              Shop By Categories
              <TfiAngleDown className="text-[13px] ml-auto font-bold" />
            </Button>
          </div>
          <div className="col_2 w-[60%]  lg:w-[80%]">
            <ul className=" flex items-center gap-3 nav">
              <li className="list-none">
                <Link
                  to="/"
                  className=" link transition text-[14px] font-[500]"
                >
                  <Button className="link transition !front-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#35ac75] !py-4">
                    Home
                  </Button>
                </Link>
              </li>
              <li className="list-none relative ">
                <Link
                  to="/productlist"
                  className=" link transition text-[14px] font-[500]"
                >
                  <Button className="link transition !front-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#35ac75] !py-4">
                    Fashion
                  </Button>
                </Link>
                <div className=" submenu absolute top-[120%] left-[0%] min-w-[150px] bg-white shadow-md opacity-0 transition-all">
                  <ul>
                    <li className="list-none w-full relative">
                      <Link to="/" className="w-full">
                        <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none hover:!text-[#35ac75]">
                          MenA
                        </Button>
                      </Link>
                      <div className=" submenu absolute top-[0%] left-[100%] min-w-[150px] bg-white shadow-md opacity-0 transition-all">
                        <ul>
                          <li className="list-none w-full">
                            <Link to="/" className="w-full">
                              <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none hover:!text-[#35ac75]">
                                T-Shirts
                              </Button>
                            </Link>
                          </li>
                          <li className="list-none w-full">
                            <Link to="/" className="w-full">
                              <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none hover:!text-[#35ac75]">
                                Casual Shirts
                              </Button>
                            </Link>
                          </li>
                          <li className="list-none w-full">
                            <Link to="/" className="w-full">
                              <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none hover:!text-[#35ac75]">
                                Blazers & Coats
                              </Button>
                            </Link>
                          </li>
                          <li className="list-none w-full">
                            <Link to="/" className="w-full">
                              <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none hover:!text-[#35ac75]">
                                Jeans
                              </Button>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="list-none w-full">
                      <Link to="/" className="w-full">
                        <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none hover:!text-[#35ac75]">
                          women
                        </Button>
                      </Link>
                    </li>
                    <li className="list-none w-full">
                      <Link to="/" className="w-full">
                        <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none hover:!text-[#35ac75]">
                          Boys
                        </Button>
                      </Link>
                    </li>
                    <li className="list-none w-full">
                      <Link to="/" className="w-full">
                        <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none hover:!text-[#35ac75]">
                          Girls
                        </Button>
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="list-none">
                <Link
                  to="/"
                  className=" link transition text-[14px] font-[500]"
                >
                  <Button className="link transition !front-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#35ac75] !py-4">
                    Electronics
                  </Button>
                </Link>
              </li>
              <li className="list-none">
                <Link
                  to="/"
                  className=" link transition text-[14px] font-[500]"
                >
                  <Button className="link transition !front-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#35ac75] !py-4">
                    Bags
                  </Button>
                </Link>
              </li>
              <li className="list-none">
                <Link
                  to="/"
                  className=" link transition text-[14px] font-[500]"
                >
                  <Button className="link transition !front-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#35ac75] !py-4">
                    Footwear
                  </Button>
                </Link>
              </li>
              <li className="list-none">
                <Link
                  to="/"
                  className=" link transition text-[14px] font-[500]"
                >
                  <Button className="link transition !front-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#35ac75] !py-4">
                    Groceries
                  </Button>
                </Link>
              </li>
              <li className="list-none">
                <Link
                  to="/"
                  className=" link transition text-[14px] font-[500]"
                >
                  <Button className="link transition !front-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#35ac75] !py-4">
                    Beauty
                  </Button>
                </Link>
              </li>
              <li className="list-none">
                <Link
                  to="/"
                  className=" link transition text-[14px] font-[500]"
                >
                  <Button className="link transition !front-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#35ac75] !py-4">
                    Wellness
                  </Button>
                </Link>
              </li>
              <li className="list-none">
                <Link
                  to="/"
                  className=" link transition text-[14px] font-[500]"
                >
                  <Button className="link transition !front-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#35ac75] !py-4">
                    Jewellery
                  </Button>
                </Link>
              </li>
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
