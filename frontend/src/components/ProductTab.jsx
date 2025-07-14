import React, { useContext, useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import ProductsSlider from "./ProductsSlider/ProductsSlider";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import axiosInstance from "../utils/axiosInstance";
import ProductItemSkeleton from "./Skeleton/ProductItemSkeleton";
import { MyProductContext } from "../AppWrapper";
import ProductNotFound from "./ProductNotFound";
const ProductTab = () => {
  const [selectedCatId, setSelectedCatId] = useState("");
  const [catList, setCatList] = useState([]);
  const [productByCat, setProductByCat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [skeletonCount, setSkeletonCount] = useState(6);
  const context = useContext(MyProductContext);

  const handleTabChange = async (event, newCatId) => {
    setSelectedCatId(newCatId);
    setLoading(true);
    setNotFound(false);
    setProductByCat([]);

    try {
      const res = await axiosInstance.get(
        `/product/getProductBycatId/${newCatId}`
      );
      const products = res.data?.products || [];

      if (products.length === 0) {
        setNotFound(true);
      }

      setProductByCat(products);
    } catch (err) {
      setNotFound(true);
      console.error("Failed to fetch products:", err);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };
  useEffect(() => {
    if (context?.category?.length) {
      const categories = context.category;
      setCatList(categories);
      const firstCatId = categories[0]?._id;
      setSelectedCatId(firstCatId);

      const fetchProducts = async () => {
        setLoading(true);
        try {
          const res = await axiosInstance.get(
            `/product/getProductBycatId/${firstCatId}`
          );
          setProductByCat(res.data?.products || []);
        } catch (err) {
          console.error("Initial fetch failed:", err);
          setNotFound(true);
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    }
  }, [context?.category]);

  useEffect(() => {
    const updateSkeletonCount = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setSkeletonCount(2);
      } else if (width < 1000) {
        setSkeletonCount(3);
      } else {
        setSkeletonCount(6);
      }
    };

    updateSkeletonCount(); // Initial call
    window.addEventListener("resize", updateSkeletonCount);
    return () => window.removeEventListener("resize", updateSkeletonCount);
  }, []);
  return (
    <>
      {/* Product Tabs & Slider Section */}
      <section className="py-5 bg-white mt-5">
        <div className="container">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="text-center md:text-left">
              <h2 className="text-[22px] font-semibold">Popular Products</h2>
              <p className="text-sm font-medium">
                Do not miss the current offers until the end of March.
              </p>
            </div>

            <div className="w-full md:w-[60%]">
              <Box>
                <Tabs
                  value={selectedCatId}
                  onChange={handleTabChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="category tabs"
                >
                  {catList.map((cat) => (
                    <Tab
                      key={cat._id}
                      value={cat._id}
                      label={cat.name}
                      className="!capitalize"
                    />
                  ))}
                </Tabs>
              </Box>
            </div>
          </div>

          {notFound ? (
            <div className="w-full">
              <ProductNotFound />
            </div>
          ) : (
            <div className="mt-6">
              {loading ? (
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {Array.from({ length: skeletonCount }).map((_, index) => (
                    <ProductItemSkeleton key={index} />
                  ))}
                </div>
              ) : (
                <ProductsSlider
                  items={6}
                  productData={productByCat}
                  skeletonloading={loading}
                />
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ProductTab;
