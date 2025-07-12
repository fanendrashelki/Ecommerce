import {
  Card,
  CardBody,
  Typography,
  Avatar,
  Chip,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import ProductSkeleton from "../../Components/ProductSkeleton";
import NotFound from "../../Components/NotFound";

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [skeletonloading, setSkeletonLoading] = useState(false);

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    setSkeletonLoading(true);
    try {
      const res = await axiosInstance.get("user/get-all-User", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const response = res.data?.user.filter((item) => item.role === "User");
      setUsers(response || []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
      setTimeout(() => {
         setSkeletonLoading(false)
      }, 2000);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="mt-5 mb-8 flex flex-col gap-6">
      {skeletonloading  ? (
       <ProductSkeleton rows={10}/>
        
      ) : users.length === 0 ? (
        <NotFound title={"User"}/>
      ) : (
        <Card>
          <CardBody className="px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["Name", "Email", "Number", "Status"].map((el) => (
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
                {users.length > 0 &&
                  users.map((user, key) => {
                    const className = `py-3 px-5 ${
                      key === users.length - 1 ? "" : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr key={user._id || key}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            {user.avatar ? (
                              <Avatar
                                src={user.avatar || "https://via.placeholder.com/40"}
                                alt={user.name}
                                size="sm"
                                variant="rounded"
                              />
                            ) : (
                              <UserCircleIcon className="h-10 w-10 text-blue-gray-500" />
                            )}
                            <div>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold"
                              >
                                {user.name}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-normal text-blue-gray-600">
                            {user.email || "—"}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-normal text-blue-gray-600">
                            {user.mobile || "—"}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Chip
                            variant="gradient"
                            color={
                              user.status === "Active"
                                ? "green"
                                : user.status === "Inactive"
                                ? "blue-gray"
                                : "red"
                            }
                            value={user.status.toLowerCase()}
                            className="py-0.5 px-2 text-[11px] font-medium w-fit"
                          />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default User;