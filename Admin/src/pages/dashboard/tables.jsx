import {
  Card,
  CardBody,
  Typography,
  Avatar,
  Chip,
 Button,  Input, Textarea, Select, Option
} from "@material-tailwind/react";

import { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


export function Tables() {
  const [product, setProduct] = useState([]);
   const [open, setOpen] = useState(false);
const categories = ["Electronics", "Books", "Clothing", "Home", "Toys"];
  const handleAddProduct = () => {
    setOpen(true)
    console.log("Add Product Clicked");
    
  };

   const handleClose = () => {
    setOpen(false)
   }

  return (
    <div className="mt-5 mb-8 flex flex-col gap-6">
      {/* Add Product Button */}
      <div className="flex justify-end">
        <Button color="black" onClick={handleAddProduct}>
          Add Product
        </Button>
      </div>

      {/* Product Table Card */}
      <Card>
        <CardBody className="px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Product Name", "Category", "Price", "Images", "Action"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {product.length > 0 ? (
                product.map(({ img, name, email, job, online, date }, key) => {
                  const className = `py-3 px-5 ${
                    key === product.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={name}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar src={img} alt={name} size="sm" variant="rounded" />
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {name}
                            </Typography>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {job[0]}
                        </Typography>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {job[1]}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Chip
                          variant="gradient"
                          color={online ? "green" : "blue-gray"}
                          value={online ? "online" : "offline"}
                          className="py-0.5 px-2 text-[11px] font-medium w-fit"
                        />
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {date}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          as="a"
                          href="#"
                          className="text-xs font-semibold text-blue-gray-600"
                        >
                          Edit
                        </Typography>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="py-10">
                    <div className="flex flex-col items-center justify-center text-gray-600">
                      <img
                        src="https://www.svgrepo.com/show/87468/empty-box.svg"
                        alt="No Products"
                        className="w-24 h-24 mb-4 opacity-70"
                      />
                      <h2 className="text-xl font-semibold">No Products Found</h2>
                      <p className="text-sm text-gray-500 mt-1">
                        Please check back later or add new products.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>

      <Dialog
        open={open}
        onClose={handleClose}
         fullWidth="md"
        maxWidth="md"
        scroll="body"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        className="w-full"
      >
        <DialogTitle id="scroll-dialog-title">Product</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <div className="min-w-[700px]">
            <form className="space-y-4">
      <div>
        <Typography variant="h6" color="blue-gray">Product Name</Typography>
        <Input
          label="Product Name"
          name="name"
         
          size="lg"
        />
      </div>

      <div>
        <Typography variant="h6" color="blue-gray">Image URL</Typography>
        <Input
          label="Image URL"
          name="image"
         
          size="lg"
        />
      </div>

      <div>
        <Typography variant="h6" color="blue-gray">Description</Typography>
        <Textarea
          label="Description"
          name="description"
          
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Typography variant="h6" color="blue-gray">Brand</Typography>
          <Input
            label="Brand"
            name="brand"
           
            size="lg"
          />
        </div>
        <div>
          <Typography variant="h6" color="blue-gray">Category</Typography>
          <Select
            label="Select Category"
            name="category"
           
          >
            {categories.map((cat) => (
              <Option key={cat} value={cat}>{cat}</Option>
            ))}
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Typography variant="h6" color="blue-gray">Price</Typography>
          <Input
            label="Price"
            name="price"
            type="number"
            
            size="lg"
          />
        </div>
        <div>
          <Typography variant="h6" color="blue-gray">Old Price</Typography>
          <Input
            label="Old Price"
            name="oldPrice"
            type="number"
            
            size="lg"
          />
        </div>
        <div>
          <Typography variant="h6" color="blue-gray">Discount (%)</Typography>
          <Input
            label="Discount"
            name="discount"
            type="number"
            size="lg"
          />
        </div>
      </div>
            </form>
            </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button >Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Tables;
