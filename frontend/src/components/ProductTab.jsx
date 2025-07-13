import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import ProductsSlider from "./ProductsSlider/ProductsSlider";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import axiosInstance from "../utils/axiosInstance";
import ProductItemSkeleton from "./Skeleton/ProductItemSkeleton";
const ProductTab = () => {
  const [selectedCatId, setSelectedCatId] = useState("");
  const [catList, setCatList] = useState([]);
  const [productByCat, setProductByCat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

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
    const fetchCategoriesAndProducts = async () => {
      try {
        const res = await axiosInstance.get("/categories");
        const categories = res.data?.data || [];

        if (categories.length > 0) {
          setCatList(categories);
          const firstCatId = categories[0]._id;
          setSelectedCatId(firstCatId);
          setLoading(true);

          const productRes = await axiosInstance.get(
            `/product/getProductBycatId/${firstCatId}`
          );
          setProductByCat(productRes.data?.products || []);
        }
      } catch (err) {
        setNotFound(true);
        console.error("Error fetching initial data:", err);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };

    fetchCategoriesAndProducts();
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
            <div className="flex flex-col items-center justify-center h-full mt-5 p-8 border border-dashed border-gray-300 rounded-2xl shadow-sm max-w-lg mx-auto text-center animate-fade-in">
              <MdOutlineRemoveShoppingCart className="w-24 h-24 animate-bounce-slow text-[#35ac75]" />
              <h2 className="text-xl font-semibold text-[#35ac75]">
                No Products Available
              </h2>
              <p className="text-sm text-gray-500">
                Try exploring another category or come back later.
              </p>
            </div>
          ) : (
            <div className="mt-6">
              {loading ? (
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <ProductItemSkeleton key={index} />
                  ))}
                </div>
              ) : (
                <ProductsSlider
                  items={6}
                  productByCat={productByCat}
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
