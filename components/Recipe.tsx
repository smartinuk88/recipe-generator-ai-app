"use client";

import { useState } from "react";
import StarRating from "./StarRating";
import { Button } from "./ui/button";
import { Pencil, Printer, Save } from "lucide-react";

function Recipe() {
  const [rating, setRating] = useState(4);
  return (
    <div className="max-w-2xl mx-auto m-5 rounded-xl border border-mango-600">
      <div className="bg-mango-200 text-center p-5 rounded-t-xl">
        <h2 className="font-bold text-4xl text-bluegreen-500 mb-2">
          Vegan Roasted Sweet Potatoes
        </h2>
        <p className="text-gray-900-400 mb-4">
          These Vegan Roasted Sweet Potatoes are glazed with maple butter and
          roasted until caramelised and crispy, making them the perfect
          Thanksgiving side dish.
        </p>
        <StarRating rating={rating} />

        {/* Buttons */}
        <div className="flex justify-center items-center space-x-2 mb-4">
          <Button className="flex items-center space-x-1">
            <Printer />
            <span>Print</span>
          </Button>
          <Button className="flex items-center space-x-1">
            <Pencil />
            <span>Edit</span>
          </Button>
          <Button className="flex items-center space-x-1">
            <Save />
            <span>Save</span>
          </Button>
        </div>

        {/* Timing and Serving Information */}
        <div className="flex flex-wrap justify-center space-x-4 mb-8">
          <p className="text-lg text-black">
            Prep Time:{" "}
            <span className="text-gray-900">
              10 <span className="text-base">minutes</span>
            </span>
          </p>
          <p className="text-lg text-black">
            Cook Time:{" "}
            <span className="text-gray-900">
              30 <span className="text-base">minutes</span>
            </span>
          </p>
          <p className="text-lg text-black">
            Total Time:{" "}
            <span className="text-gray-900">
              40 <span className="text-base">minutes</span>
            </span>
          </p>
          <p className="text-lg text-black">
            Servings: <span className="text-gray-900">4</span>
          </p>
        </div>
        <p className="text-xs font-light">
          Created on 10/10/2024 by{" "}
          <span className="text-mango-600">Scott Martin</span>
        </p>
      </div>

      <div className="py-5 px-10 text-lg">
        <h3 className="font-bold text-mango-600 text-2xl">Equipment</h3>
        <ul className="mb-8">
          <li>Large Bowl</li>
          <li>Sheet Pan</li>
          <li>Parchment Paper</li>
        </ul>
        <h3 className="font-bold text-mango-600 text-2xl">Ingredients</h3>
        <ul className="mb-8 list-disc">
          <li>
            85g unsalted vegan butter at room temperature, or sub for olive oil
          </li>
          <li>2 tablespoon maple syrup</li>
          <li>1/2 teaspoon ground cinnamon</li>
          <li>1/4 teaspoon fine sea salt</li>
          <li>
            700g sweet potatoes, around 4 medium sized sweet potatoes, peeled
            and cut into 1-inch cubes
          </li>
          <li>Flaky sea salt</li>
        </ul>
        <h3 className="font-bold text-mango-600 text-2xl">Instructions</h3>
        <ol className="mb-8 list-decimal">
          <li>Preheat your oven to 400°F (200°C).</li>
          <li>
            <p>
              Place the vegan butter, maple syrup, ground cinnamon and fine sea
              salt in a medium bowl and whisk until smooth and combined.
              Alternatively use a stand mixer.
            </p>

            <p className="text-gray-500 mt-1">
              85 g unsalted vegan butter,2 tablespoon maple syrup,½ teaspoon
              ground cinnamon,¼ teaspoon fine sea salt
            </p>
          </li>
        </ol>
      </div>
    </div>
  );
}
export default Recipe;
