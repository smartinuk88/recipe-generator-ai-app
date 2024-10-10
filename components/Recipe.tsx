"use client";

import { useState } from "react";
import StarRating from "./StarRating";
import { Button } from "./ui/button";

function Recipe() {
  const [rating, setRating] = useState(4);
  return (
    <div className="max-w-2xl mx-auto m-5 rounded-md border border-mango-600">
      <div className="bg-white text-center p-5 rounded-t-md">
        <h2 className="font-bold text-4xl text-mango-600 mb-2">
          Vegan Roasted Sweet Potatoes
        </h2>
        <p className="text-gray-900-400 mb-4">
          These Vegan Roasted Sweet Potatoes are glazed with maple butter and
          roasted until caramelised and crispy, making them the perfect
          Thanksgiving side dish.
        </p>
        <StarRating rating={rating} />

        <div className="flex justify-center items-center space-x-2">
          <Button>Print</Button>
          <Button>Edit</Button>
          <Button>Save</Button>
        </div>
      </div>
    </div>
  );
}
export default Recipe;
