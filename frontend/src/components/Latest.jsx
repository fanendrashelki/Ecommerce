import React, { useEffect, useState } from "react";
import ProductsSlider from "./ProductsSlider/ProductsSlider";
import AdsBannerSlider from "./AdsBannerSlider/AdsBannerSlider";
import axiosInstance from "../utils/axiosInstance";

const Latest = () => {
  const [LatestProduct, setLatestProduct] = useState([]);
  useEffect(() => {
    const getLatestProduct = async () => {
      try {
        const res = await axiosInstance.get("/product");
        setLatestProduct(res?.data?.products);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getLatestProduct();
  }, []);
  return (
    <section className="py-5 pt-0 bg-white">
      <div className="container">
        <h2 className="text-[22px] font-semibold">Latest Products</h2>
        <ProductsSlider items={6} productData={LatestProduct} />
      </div>
    </section>
  );
};

export default Latest;
