import Sidebar from "../components/Sidebar/Sidebar";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import ProductItem from "../components/ProductItem/ProductItem";
import ProductItemList from "../components/ProductItem/ProductItemList";
import { Button } from "@mui/material";
import { IoGridSharp } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useLocation, useParams } from "react-router-dom";
import ProductItemSkeleton from "../components/Skeleton/ProductItemSkeleton";
import ProductNotFound from "../components/ProductNotFound";

const ProductListing = () => {
  const { id } = useParams();
  const [itemView, setItemView] = useState("grid");
  const [anchorEl, setAnchorEl] = useState(null);
  const [productByCat, setProductByCat] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");

  const fetchProductbyCatId = async (productId) => {
    setLoading(true);
    setProductByCat([]);
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
      setProductByCat(res?.data?.products || []);
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

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <section className="py-5 pb-0 bg-[#efefef] min-h-screen">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Breadcrumbs */}
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            color="inherit"
            className="link transition"
            href="/"
          >
            Home
          </Link>
          <Link
            underline="hover"
            color="inherit"
            className="link transition"
            href="/products"
          >
            Product List
          </Link>
        </Breadcrumbs>
      </div>

      <div className="bg-white p-2 mt-4">
        <div className="container mx-auto px-3 sm:px-4 flex flex-col lg:flex-row gap-3">
          {/* Sidebar */}
          <div className="w-full lg:w-[25%]">
            <Sidebar />
          </div>

          {/* Product Area */}
          <div className="w-full lg:w-[75%]">
            {/* Header Controls */}
            <div className="bg-[#f1f1f1] p-2 mb-3 rounded-md flex flex-col sm:flex-row gap-3 sm:gap-0 items-start sm:items-center justify-between">
              <div className="flex items-center gap-2 flex-wrap">
                <Button
                  className={`!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000] ${
                    itemView === "list" ? "active" : ""
                  }`}
                  onClick={() => setItemView("list")}
                >
                  <FiMenu className="text-[rgba(0,0,0,0.7)]" />
                </Button>
                <Button
                  className={`!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000] ${
                    itemView === "grid" ? "active" : ""
                  }`}
                  onClick={() => setItemView("grid")}
                >
                  <IoGridSharp className="text-[rgba(0,0,0,0.7)]" />
                </Button>
                <span className="text-sm font-medium text-[rgba(0,0,0,0.7)]">
                  {productByCat?.length ?? 0} products found.
                </span>
              </div>

              <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
                <span className="text-sm font-medium text-[rgba(0,0,0,0.7)]">
                  Sort By:
                </span>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  className="!bg-white !text-sm !text-[#000] !capitalize !border !border-[rgba(0,0,0,0.4)] !px-3 !py-1"
                >
                  Name, A to Z
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem
                    onClick={handleClose}
                    className="!text-sm !text-[#000] !capitalize"
                  >
                    1
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    className="!text-sm !text-[#000] !capitalize"
                  >
                    2
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    className="!text-sm !text-[#000] !capitalize"
                  >
                    3
                  </MenuItem>
                </Menu>
              </div>
            </div>

            {/* Product List/Grid */}
            <div
              className={`grid gap-4 ${
                itemView === "list"
                  ? "grid-cols-1"
                  : "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              }`}
            >
              {loading ? (
                [...Array(8)].map((_, index) => (
                  <ProductItemSkeleton key={index} />
                ))
              ) : productByCat?.length > 0 ? (
                itemView === "grid" ? (
                  productByCat.map((item) => (
                    <ProductItem key={item._id} product={item} />
                  ))
                ) : (
                  productByCat.map((item) => (
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
    </section>
  );
};

export default ProductListing;
