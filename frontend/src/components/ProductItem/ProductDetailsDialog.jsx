import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import ProductDetailsBox from "../ProductItem/ProductDetailsBox";
import ZoomImage from "../ZoomImage/ZoomImage";
import Button from "@mui/material/Button";
import { IoMdClose } from "react-icons/io";

function ProductDetailsDialog({ open, onClose, product }) {
  return (
    <Dialog fullWidth maxWidth="lg" open={open} onClose={onClose}>
      <DialogContent>
        <section className="bg-white py-4 relative">
          {/* Responsive layout: column on mobile, row on larger screens */}
          <div className="container flex flex-col lg:flex-row gap-4">
            <div className="w-full lg:w-[30%]">
              <ZoomImage images={product.images} />
            </div>
            <div className="w-full lg:w-[70%] space-y-2 py-4 px-4 lg:px-10">
              <ProductDetailsBox productDetails={product} />
            </div>
          </div>

          {/* Close button */}
          <div className="absolute top-2 right-2 z-10">
            <Button
              onClick={onClose}
              className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000]"
            >
              <IoMdClose className="text-[20px] text-[rgba(0,0,0,0.7)]" />
            </Button>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
