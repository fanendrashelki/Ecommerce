import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { FaRegPlusSquare, FaRegMinusSquare } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import { MyProductContext } from "../../AppWrapper";
import axiosInstance from "../../utils/axiosInstance"; // make sure this exists

const CategoryCollapse = () => {
  const [subMenuIndex, setSubMenuIndex] = useState(null);
  const [innerSubMenuIndex, setInnerSubMenuIndex] = useState(null);
  const [categories, setCategories] = useState([]);
  const context = useContext(MyProductContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (context?.category) {
      setCategories(context.category);
    }
  }, [context.category]);

  const toggleSubMenu = (index) => {
    setSubMenuIndex(subMenuIndex === index ? null : index);
    setInnerSubMenuIndex(null);
  };

  const toggleInnerSubMenu = (key) => {
    setInnerSubMenuIndex(innerSubMenuIndex === key ? null : key);
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        await axiosInstance.get("/user/logout", {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      localStorage.removeItem("token");
      context.setUser(null);
      context.setLogin(false);

      if (context?.clearWishlist) {
        context.clearWishlist(); // Only if exists
      }

      context.alertBox("success", "Logout successful");
      navigate("/login");
    } catch (error) {
      context.alertBox("error", "Logout failed. Please try again.");
    }
  };

  return (
    <div className="overflow-y-auto max-h-[80vh] pr-2">
      <ul className="w-full">
        {categories.map((cat, catIndex) => (
          <li key={cat._id} className="list-none flex flex-col relative">
            <div className="flex items-center w-full relative">
              <Link to={`/product/${cat._id}?type=cat`} className="w-full">
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
                {cat.children.map((subCat, subIndex) => {
                  const key = `${catIndex}-${subIndex}`;
                  return (
                    <li key={subCat._id} className="list-none relative">
                      <div className="flex items-center w-full relative">
                        <Link
                          to={`/product/${subCat._id}?type=subcat`}
                          className="w-full"
                        >
                          <Button className="w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]">
                            {subCat.name}
                          </Button>
                        </Link>
                        {innerSubMenuIndex === key ? (
                          <FaRegMinusSquare
                            className="absolute right-[15px] top-[10px] cursor-pointer"
                            onClick={() => toggleInnerSubMenu(key)}
                          />
                        ) : (
                          <FaRegPlusSquare
                            className="absolute right-[15px] top-[10px] cursor-pointer"
                            onClick={() => toggleInnerSubMenu(key)}
                          />
                        )}
                      </div>

                      {innerSubMenuIndex === key &&
                        subCat.children?.length > 0 && (
                          <ul className="innersubmenu w-full pl-3">
                            {subCat.children.map((innerSubCat) => (
                              <li
                                key={innerSubCat._id}
                                className="list-none relative mb-2"
                              >
                                <Link
                                  to={`/product/${innerSubCat._id}?type=thirdsubcat`}
                                  className="transition w-full block px-3 text-[14px]"
                                >
                                  {innerSubCat.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {context.isLogin && (
        <div
          onClick={handleLogout}
          className=" w-[80%] mx-auto mt-4 flex items-center p-3 rounded-xl bg-red-500 hover:bg-red-700 transition cursor-pointer"
        >
          <BiLogOutCircle className="text-[18px] sm:text-[20px] text-white mr-3" />
          <span className="text-white font-medium">Logout</span>
        </div>
      )}
    </div>
  );
};

export default CategoryCollapse;
