import Sidebar from "../components/Sidebar/Sidebar";
import ProductItem from "../components/ProductItem/ProductItem";
import ProductItemList from "../components/ProductItem/ProductItemList";
import { Button } from "@mui/material";
import { IoGridSharp, IoOptionsOutline } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";
import { useEffect, useState, forwardRef } from "react";
import axiosInstance from "../utils/axiosInstance";
import ProductItemSkeleton from "../components/Skeleton/ProductItemSkeleton";
import ProductNotFound from "../components/ProductNotFound";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { MdClose } from "react-icons/md";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useParams } from "react-router-dom";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProductListing = () => {
  const [itemView, setItemView] = useState("grid");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));

  const [filters, setFilters] = useState({
    categories: [],
    minPrice: 0,
    maxPrice: 5000,
    keyword: "",
    rating: "",
  });

  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");
  console.log("type", type);
  const { id } = useParams();
  const fetchFilteredProducts = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (filters.categories.length)
        query.append("catName", filters.categories.join(","));
      if (filters.minPrice) query.append("minPrice", filters.minPrice);
      if (filters.maxPrice) query.append("maxPrice", filters.maxPrice);
      if (filters.keyword) query.append("keyword", filters.keyword);
      if (filters.rating) query.append("rating", filters.rating);

      const res = await axiosInstance.get(
        `/product/filter?${query.toString()}`
      );
      setProducts(res.data.products);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilteredProducts();
  }, [filters]);
  const fetchProductbyCatId = async (productId) => {
    setLoading(true);
    setProducts([]);
    try {
      let res;
      if (type === "cat") {
        res = await axiosInstance.get(
          `/product/getProductBycatId/${productId}`
        );
      } else if (type === "subcat") {
        res = await axiosInstance.get(
          `/product/getProductBySubcatId/${productId}`
        );
      } else if (type === "thirdsubcat") {
        res = await axiosInstance.get(
          `/product/getProductBythirdsubcatId/${productId}`
        );
      }
      setProducts(res?.data?.products || []);
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (id && type) {
      fetchProductbyCatId(id);
    }
  }, [id, type]);

  return (
    <section className="bg-[#efefef] min-h-screen">
      <div className="bg-white p-2 mt-4">
        <div className="container mx-auto px-3 sm:px-4 flex flex-col lg:flex-row gap-3">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-full lg:w-[20%]">
            <Sidebar filters={filters} setFilters={setFilters} />
          </div>

          {/* Products */}
          <div className="w-full lg:w-[80%]">
            <div className="bg-[#f1f1f1] p-4 rounded-md mb-4 flex flex-wrap gap-2 items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  className={`!w-[36px] !h-[36px] !rounded-full shadow ${
                    itemView === "list"
                      ? "!bg-[#35ac75] !text-white"
                      : "!bg-gray-200 !text-black"
                  }`}
                  onClick={() => setItemView("list")}
                >
                  <FiMenu />
                </Button>
                <Button
                  className={`!w-[36px] !h-[36px] !rounded-full shadow ${
                    itemView === "grid"
                      ? "!bg-[#35ac75] !text-white"
                      : "!bg-gray-200 !text-black"
                  }`}
                  onClick={() => setItemView("grid")}
                >
                  <IoGridSharp />
                </Button>
                <span className="text-sm ml-2">
                  {products.length} products found
                </span>
              </div>
            </div>

            <div
              className={`grid gap-4 ${
                itemView === "list"
                  ? "grid-cols-1"
                  : "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              }`}
            >
              {loading ? (
                [...Array(8)].map((_, i) => <ProductItemSkeleton key={i} />)
              ) : products.length > 0 ? (
                itemView === "grid" ? (
                  products.map((item) => (
                    <ProductItem key={item._id} product={item} />
                  ))
                ) : (
                  products.map((item) => (
                    <ProductItemList key={item._id} product={item} />
                  ))
                )
              ) : (
                <div className="col-span-full flex justify-center py-10">
                  <ProductNotFound />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter */}
      <button
        onClick={() => setFilterOpen(true)}
        className="lg:hidden fixed bottom-[80px] right-4 z-50 bg-[#35ac75] text-white px-4 py-2 rounded-full text-sm shadow-lg flex items-center gap-2"
      >
        <IoOptionsOutline size={18} /> Filter
      </button>

      <Dialog
        fullScreen={fullScreen}
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        TransitionComponent={Transition}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Filters1</h2>
          <Button
            onClick={() => setFilterOpen(false)}
            className="!p-1 !text-black"
          >
            <MdClose className="text-black rounded-full" size={24} />
          </Button>
        </div>
        <div className="p-4">
          <Sidebar filters={filters} setFilters={setFilters} />
          <Button className="btn-org " onClick={() => setFilterOpen(false)}>
            Apply
          </Button>
        </div>
      </Dialog>
    </section>
  );
};

export default ProductListing;
