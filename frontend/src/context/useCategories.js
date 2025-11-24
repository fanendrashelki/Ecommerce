import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

export default function useCategories() {
  const [category, setCategories] = useState([]);

  const fetchCategories = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axiosInstance.get("categories", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCategories(res?.data?.data || []);
    } catch (err) {
      console.error("Category fetch failed:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { category };
}
