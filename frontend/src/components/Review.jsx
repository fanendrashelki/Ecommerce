import { Button, Rating, TextField } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { MyProductContext } from "../AppWrapper";
import axiosInstance from "../utils/axiosInstance";

const Review = ({ productId, userId }) => {
  const context = useContext(MyProductContext);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const getRating = async () => {
    try {
      const res = await axiosInstance.get(`product/${productId}/ratings`);
      setReviews(res?.data.reviews || []);
    } catch (error) {
      context.alertBox("error", error.message);
      console.error(error);
    }
  };

  useEffect(() => {
    getRating();
  }, []);

  const submitRating = async (e) => {
    e.preventDefault(); // prevent page reload
    if (!rating) {
      return context.alertBox("error", "Please provide a star rating.");
    }
    try {
      const res = await axiosInstance.put(`/product/${productId}/rating`, {
        userId,
        star: rating,
        comment,
      });

      context.alertBox("success", "Review submitted!");
      setRating(0);
      setComment("");
      getRating(); // Refresh reviews
    } catch (error) {
      context.alertBox("error", error.message);
      console.error(error);
    }
  };

  return (
    <div className="w-full shadow-md p-5 rounded-md">
      <h5 className="text-xl font-bold mb-4 text-gray-900">
        Latest Customer Reviews
      </h5>
      <ul className="divide-y divide-gray-200">
        {reviews.length === 0 ? (
          <div className="w-full p-4 flex flex-col items-center justify-center bg-[#f9f9f9] rounded-lg border border-dashed border-gray-300">
            <div className="text-gray-400 text-4xl mb-2">📝</div>
            <p className="text-gray-700 text-base font-medium">
              No reviews yet
            </p>
            <p className="text-gray-500 text-sm mt-1">
              Be the first to share your thoughts.
            </p>
          </div>
        ) : (
          reviews.map((review, idx) => (
            <li key={idx} className="py-4 flex gap-4">
              <img
                src={review?.user?.avatar || "/default-avatar.png"}
                className="w-14 h-14 rounded-full shadow-md"
                alt={review?.user?.name}
              />
              <div className="flex-1">
                <p className="text-[16px] font-semibold text-gray-900">
                  {review?.user?.name}
                </p>

                <p className="text-gray-700 text-sm mt-1">{review.comment}</p>
                <Rating value={review.star} size="small" readOnly />
              </div>
            </li>
          ))
        )}
      </ul>

      {/* Add Review Form */}
      {context?.isLogin && (
        <div className="mt-6">
          <h6 className="mb-2 text-[17px] font-semibold">Add Review</h6>
          <form className="space-y-4" onSubmit={submitRating}>
            <TextField
              required
              label="Your Review"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              fullWidth
              multiline
              minRows={3}
              sx={{
                "& label": { color: "#35ac75" },
                "& label.Mui-focused": { color: "#ff1744" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#35ac75" },
                  "&:hover fieldset": { borderColor: "#ff8a80" },
                  "&.Mui-focused fieldset": { borderColor: "#ff1744" },
                },
              }}
            />
            <div className="flex items-center gap-3">
              <label className="text-gray-700">Rating:</label>
              <Rating
                name="review-rating"
                size="medium"
                value={rating}
                onChange={(e, newValue) => setRating(newValue)}
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              className="!bg-[#35ac75] hover:!bg-[#000000]"
            >
              Submit
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Review;
