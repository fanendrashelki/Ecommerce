import Sidebar from "../components/Sidebar/Sidebar";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import ProductItem from "../components/ProductItem/ProductItem";
import ProductItemList from "../components/ProductItem/ProductItemList";
import { Button } from "@mui/material";
import { IoGridSharp, IoOptionsOutline } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState, forwardRef } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useLocation, useParams } from "react-router-dom";
import ProductItemSkeleton from "../components/Skeleton/ProductItemSkeleton";
import ProductNotFound from "../components/ProductNotFound";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { MdClose } from "react-icons/md";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProductListing = () => {
  const { id } = useParams();
  const [itemView, setItemView] = useState("grid");
  const [anchorEl, setAnchorEl] = useState(null);
  const [productByCat, setProductByCat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));

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
    <section className="py-5 pb-24 bg-[#efefef] min-h-screen">
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
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-full lg:w-[20%]">
            <Sidebar />
          </div>

          {/* Product Area */}
          <div className="w-full lg:w-[80%]">
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
      <div>
        <button
          onClick={() => setFilterOpen(true)}
          className="lg:hidden fixed bottom-[80px] right-4 z-50 bg-[#35ac75] text-white px-4 py-2 rounded-full text-sm shadow-lg flex items-center gap-2"
        >
          <IoOptionsOutline size={18} />
          Filter
        </button>
      </div>

      {/* Mobile Filter Drawer */}
      <Dialog
        fullScreen={fullScreen}
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        TransitionComponent={Transition}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Filters</h2>
          <Button
            onClick={() => setFilterOpen(false)}
            className="!min-w-[auto] !p-1 !text-black"
          >
            <MdClose size={24} />
          </Button>
        </div>
        <div className="p-4">
          <Sidebar />
        </div>
      </Dialog>
    </section>
  );
};

export default ProductListing;
