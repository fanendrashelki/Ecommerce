import axios from "axios";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import ProductsSlider from "./ProductsSlider/ProductsSlider";

const Feature = () => {
  const [isFeature, setIsFeature] = useState([]);
  useEffect(() => {
    const getFeature = async () => {
      try {
        const res = await axiosInstance.get("/product/featured-product");

        setIsFeature(res?.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getFeature();
  }, []);
  return (
    <section className="py-5 pt-0 bg-white">
      <div className="container">
        <h2 className="text-[22px] font-semibold">Feature Products</h2>
        <ProductsSlider items={6} productData={isFeature} />
      </div>
    </section>
  );
};

export default Feature;
