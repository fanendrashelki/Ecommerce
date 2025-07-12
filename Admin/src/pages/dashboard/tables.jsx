import {
  Card,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Button,
  Input,
  Textarea,
  Select,
  Option,
} from "@material-tailwind/react";

import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ProductSkeleton from "../../Components/ProductSkeleton";
import NotFound from "../../Components/NotFound";

export function Tables() {
  const [product, setProduct] = useState([]);
  const [open, setOpen] = useState(false);
  const [skeletonloading, setSkeletonLoading] = useState(false);

  const categories = ["Electronics", "Books", "Clothing", "Home", "Toys"];

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    brand: "",
    category: "",
    price: "",
    oldPrice: "",
    discount: "",
  });

  const handleAddProduct = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      name: "",
      image: "",
      description: "",
      brand: "",
      category: "",
      price: "",
      oldPrice: "",
      discount: "",
    });
  };

  const handleSubmit = () => {
    const newProduct = {
      img: formData.image,
      name: formData.name,
      email: `${formData.brand.toLowerCase()}@example.com`,
      job: [formData.category, formData.brand],
      online: true,
      date: new Date().toISOString().slice(0, 10),
    };

    setProduct([...product, newProduct]);
    handleClose();
  };

  useEffect(() => {
    setSkeletonLoading(true);
    setTimeout(() => {
      setSkeletonLoading(false);
      setProduct([
        {
          img: "https://via.placeholder.com/40",
          name: "Smartphone",
          email: "electronics@store.com",
          job: ["Electronics", "Samsung"],
          online: true,
          date: "2025-07-08",
        },
      ]);
    }, 500);
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-5 mb-10 flex flex-col gap-6">
      {/* Add Product Button */}
      <div className="flex justify-end">
        <Button color="black" onClick={handleAddProduct}>
          Add Product
        </Button>
      </div>

      {/* Table or Skeleton */}
      {skeletonloading ? (
        <ProductSkeleton row={10}/>
      ) : product.length === 0 ? (
        <NotFound title={"Test"}/>
      ) : (
        <Card>
          <CardBody className="px-0 pt-0 pb-2">
            <div className="w-full overflow-x-auto">
              <table className="min-w-[640px] w-full table-auto">
                <thead>
                  <tr>
                    {[
                      "Product Name",
                      "Category",
                      "Price",
                      "Status",
                      "Date",
                      "Action",
                    ].map((el) => (
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
                  {product.map(
                    ({ img, name, email, job, online, date }, key) => {
                      const className = `py-3 px-5 ${
                        key === product.length - 1
                          ? ""
                          : "border-b border-blue-gray-50"
                      }`;

                      return (
                        <tr key={name}>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              <Avatar
                                src={img}
                                alt={name}
                                size="sm"
                                variant="rounded"
                              />
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
                            <Typography className="text-xs font-medium text-blue-gray-600">
                              ₹{formData.price || 999}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Chip
                              variant="gradient"
                              color={online ? "green" : "blue-gray"}
                              value={online ? "Online" : "Offline"}
                              className="py-0.5 px-2 text-[11px] font-medium w-fit"
                            />
                          </td>
                          <td className={className}>
                            <Typography className="text-xs text-blue-gray-600">
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
                    }
                  )}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Add Product Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        scroll="body"
      >
        <DialogTitle>Product</DialogTitle>
        <DialogContent dividers>
          <form className="space-y-5 w-full max-w-3xl mx-auto px-2 sm:px-4">
            <div>
              <Typography variant="h6" color="blue-gray">
                Product Name
              </Typography>
              <Input
                label="Product Name"
                name="name"
                size="lg"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div>
              <Typography variant="h6" color="blue-gray">
                Image URL
              </Typography>
              <Input
                label="Image URL"
                name="image"
                size="lg"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
              />
            </div>

            <div>
              <Typography variant="h6" color="blue-gray">
                Description
              </Typography>
              <Textarea
                label="Description"
                name="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Typography variant="h6" color="blue-gray">
                  Brand
                </Typography>
                <Input
                  label="Brand"
                  name="brand"
                  size="lg"
                  value={formData.brand}
                  onChange={(e) =>
                    setFormData({ ...formData, brand: e.target.value })
                  }
                />
              </div>
              <div>
                <Typography variant="h6" color="blue-gray">
                  Category
                </Typography>
                <Select
                  label="Select Category"
                  name="category"
                  value={formData.category}
                  onChange={(val) =>
                    setFormData({ ...formData, category: val })
                  }
                >
                  {categories.map((cat) => (
                    <Option key={cat} value={cat}>
                      {cat}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <Typography variant="h6" color="blue-gray">
                  Price
                </Typography>
                <Input
                  label="Price"
                  name="price"
                  type="number"
                  size="lg"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </div>
              <div>
                <Typography variant="h6" color="blue-gray">
                  Old Price
                </Typography>
                <Input
                  label="Old Price"
                  name="oldPrice"
                  type="number"
                  size="lg"
                  value={formData.oldPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, oldPrice: e.target.value })
                  }
                />
              </div>
              <div>
                <Typography variant="h6" color="blue-gray">
                  Discount (%)
                </Typography>
                <Input
                  label="Discount"
                  name="discount"
                  type="number"
                  size="lg"
                  value={formData.discount}
                  onChange={(e) =>
                    setFormData({ ...formData, discount: e.target.value })
                  }
                />
              </div>
            </div>
          </form>
        </DialogContent>
        <DialogActions className="px-4 pb-4">
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Tables;
