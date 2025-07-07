import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { FaRegPlusSquare } from "react-icons/fa";
import { FaRegMinusSquare } from "react-icons/fa";

const CategoryCollapse = () => {
  const [subMenuIndex, setsubMenuIndex] = useState(null);
  const [innerSubMenuIndex, setInnersSubMenuIndex] = useState(null);

  const opensubmenu = (index) => {
    if (subMenuIndex === index) {
      setsubMenuIndex(null);
    } else {
      setsubMenuIndex(index);
    }
  };
  const openinnersubmenu = (index) => {
    console.log(index);

    if (innerSubMenuIndex === index) {
      setInnersSubMenuIndex(null);
    } else {
      setInnersSubMenuIndex(index);
    }
  };
  return (
    <>
      <div className="scroll">
        <ul className="w-full">
          <li className="list-none flex items-center relative flex-col">
            <Link to="/" className="w-full">
              <Button className="w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]">
                Fashion
              </Button>
            </Link>
            {subMenuIndex === 0 ? (
              <FaRegMinusSquare
                className=" absolute top-[10px] right-[15px] cursor-pointer"
                onClick={() => opensubmenu(0)}
              />
            ) : (
              <FaRegPlusSquare
                className=" absolute top-[10px] right-[15px] cursor-pointer"
                onClick={() => opensubmenu(0)}
              />
            )}

            {subMenuIndex === 0 && (
              <ul className="submenu  w-full pl-3">
                <li className="list-none relative ">
                  <Link to="/" className="w-full">
                    <Button className="w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]">
                      Apparel
                    </Button>
                  </Link>
                  {innerSubMenuIndex === 0 ? (
                    <FaRegMinusSquare
                      className=" absolute top-[10px] right-[15px] cursor-pointer"
                      onClick={() => openinnersubmenu(0)}
                    />
                  ) : (
                    <FaRegPlusSquare
                      className=" absolute top-[10px] right-[15px] cursor-pointer"
                      onClick={() => openinnersubmenu(0)}
                    />
                  )}

                  {innerSubMenuIndex === 0 && (
                    <ul className="innersubmenu   w-full pl-3">
                      <li className="list-none relative mb-2">
                        <Link
                          to="/"
                          className=" link transition w-full !text-left !justify-start !px-3  text-[14px]"
                        >
                          T-Shirts
                        </Link>
                      </li>
                      <li className="list-none relative mb-2">
                        <Link
                          to="/"
                          className=" link transition w-full !text-left !justify-start !px-3  text-[14px]"
                        >
                          Casual Shirts
                        </Link>
                      </li>
                      <li className="list-none relative mb-2">
                        <Link
                          to="/"
                          className=" link transition w-full !text-left !justify-start !px-3  text-[14px]"
                        >
                          Blazers & Coats
                        </Link>
                      </li>
                      <li className="list-none relative mb-2">
                        <Link
                          to="/"
                          className=" link transition w-full !text-left !justify-start !px-3  text-[14px]"
                        >
                          Jeans
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            )}
          </li>

          <li className="list-none flex items-center relative flex-col">
            <Link to="/" className="w-full">
              <Button className="w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]">
                Electronics
              </Button>
            </Link>
            {subMenuIndex === 1 ? (
              <FaRegMinusSquare
                className=" absolute top-[10px] right-[15px] cursor-pointer"
                onClick={() => opensubmenu(1)}
              />
            ) : (
              <FaRegPlusSquare
                className=" absolute top-[10px] right-[15px] cursor-pointer"
                onClick={() => opensubmenu(1)}
              />
            )}

            {subMenuIndex === 1 && (
              <ul className="submenu  w-full pl-3">
                <li className="list-none relative ">
                  <Link to="/" className="w-full">
                    <Button className="w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]">
                      Apparel
                    </Button>
                  </Link>
                  {innerSubMenuIndex === 1 ? (
                    <FaRegMinusSquare
                      className=" absolute top-[10px] right-[15px] cursor-pointer"
                      onClick={() => openinnersubmenu(1)}
                    />
                  ) : (
                    <FaRegPlusSquare
                      className=" absolute top-[10px] right-[15px] cursor-pointer"
                      onClick={() => openinnersubmenu(1)}
                    />
                  )}

                  {innerSubMenuIndex === 1 && (
                    <ul className="innersubmenu   w-full pl-3">
                      <li className="list-none relative mb-2">
                        <Link
                          to="/"
                          className=" link transition w-full !text-left !justify-start !px-3  text-[14px]"
                        >
                          T-Shirts
                        </Link>
                      </li>
                      <li className="list-none relative mb-2">
                        <Link
                          to="/"
                          className=" link transition w-full !text-left !justify-start !px-3  text-[14px]"
                        >
                          Casual Shirts
                        </Link>
                      </li>
                      <li className="list-none relative mb-2">
                        <Link
                          to="/"
                          className=" link transition w-full !text-left !justify-start !px-3  text-[14px]"
                        >
                          Blazers & Coats
                        </Link>
                      </li>
                      <li className="list-none relative mb-2">
                        <Link
                          to="/"
                          className=" link transition w-full !text-left !justify-start !px-3  text-[14px]"
                        >
                          Jeans
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </>
  );
};

export default CategoryCollapse;
