import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { FaRegPlusSquare, FaRegMinusSquare } from "react-icons/fa";
import { MyProductContext } from "../../AppWrapper";

const CategoryCollapse = () => {
  const [subMenuIndex, setSubMenuIndex] = useState(null);
  const [innerSubMenuIndex, setInnerSubMenuIndex] = useState(null);
  const [categories, setCategories] = useState([]);
  const context = useContext(MyProductContext);
  useEffect(() => {
    if (context?.category) {
      setCategories(context.category);
    }
  }, [context.category]);

  const toggleSubMenu = (index) => {
    setSubMenuIndex(subMenuIndex === index ? null : index);
    setInnerSubMenuIndex(null);
  };

  const toggleInnerSubMenu = (index) => {
    setInnerSubMenuIndex(innerSubMenuIndex === index ? null : index);
  };

  return (
    <div className="scroll">
      <ul className="w-full">
        {categories.map((cat, catIndex) => (
          <li key={cat._id} className="list-none flex flex-col relative">
            <div className="flex items-center w-full relative">
              <Link to={`/product/${cat._id}`} className="w-full">
                <Button className="w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]">
                  {cat.name}
                </Button>
              </Link>
              {subMenuIndex === catIndex ? (
                <FaRegMinusSquare
                  className="absolute right-[15px] top-[10px] cursor-pointer"
                  onClick={() => toggleSubMenu(catIndex)}
                />
              ) : (
                <FaRegPlusSquare
                  className="absolute right-[15px] top-[10px] cursor-pointer"
                  onClick={() => toggleSubMenu(catIndex)}
                />
              )}
            </div>

            {subMenuIndex === catIndex && cat.children?.length > 0 && (
              <ul className="submenu w-full pl-3">
                {cat.children.map((subCat, subIndex) => (
                  <li key={subCat._id} className="list-none relative">
                    <div className="flex items-center w-full relative">
                      <Link to={`/product/${subCat._id}`} className="w-full">
                        <Button
                          onClick={() => toggleInnerSubMenu(subIndex)}
                          className="w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]"
                        >
                          {subCat.name}
                        </Button>
                      </Link>
                      {innerSubMenuIndex === subIndex ? (
                        <FaRegMinusSquare
                          className="absolute right-[15px] top-[10px] cursor-pointer"
                          onClick={() => toggleInnerSubMenu(subIndex)}
                        />
                      ) : (
                        <FaRegPlusSquare
                          className="absolute right-[15px] top-[10px] cursor-pointer"
                          onClick={() => toggleInnerSubMenu(subIndex)}
                        />
                      )}
                    </div>

                    {innerSubMenuIndex === subIndex &&
                      subCat.children?.length > 0 && (
                        <ul className="innersubmenu w-full pl-3">
                          {subCat.children.map((innerSubCat) => (
                            <li
                              key={innerSubCat._id}
                              className="list-none relative mb-2"
                            >
                              <Link
                                to={`/product/${innerSubCat._id}`}
                                className="transition w-full block px-3 text-[14px]"
                              >
                                {innerSubCat.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryCollapse;
