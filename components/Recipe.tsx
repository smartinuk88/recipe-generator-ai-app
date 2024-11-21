"use client";

import StarRating from "./StarRating";
import { Button } from "./ui/button";
import { Pencil, Printer, Save } from "lucide-react";
import { Recipe as RecipeType } from "@/types/recipe";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { handleRateRecipe } from "@/lib/handleRateRecipe";

function Recipe({ recipe }: { recipe: RecipeType }) {
  const { user } = useUser();
  const [recipeData, setRecipeData] = useState<RecipeType>(recipe);

  return (
    <div className="max-w-5xl mx-auto rounded-xl shadow-md border border-mango-600">
      <div className="bg-mango-100 text-center p-5 py-10 rounded-t-xl">
        <h2 className="font-bold text-5xl text-bluegreen-500 mb-2">
          {recipe.title}
        </h2>
        <p className="text-gray-900-400 mb-4">{recipe.summary}</p>

        {recipe.ratingCount !== undefined && recipe.ratingSum !== undefined && (
          <StarRating
            ratingCount={recipe.ratingCount}
            ratingSum={recipe.ratingSum}
            onRate={(rating) =>
              handleRateRecipe(recipe, rating, setRecipeData, user)
            }
          />
        )}

        {/* Timing and Serving Information */}
        <div className="flex flex-wrap justify-center space-x-4 mb-8">
          <p className="text-black">
            <span className="font-semibold text-xl">Prep Time:</span>{" "}
            <span className="text-gray-900">
              {recipe.prepTime.time}{" "}
              <span className="text-base">{recipe.prepTime.unit}</span>
            </span>
          </p>
          <p className="text-lg text-black">
            Cook Time:{" "}
            <span className="text-gray-900">
              {recipe.cookTime.time}{" "}
              <span className="text-base">{recipe.cookTime.unit}</span>
            </span>
          </p>
          <p className="text-lg text-black">
            Total Time:{" "}
            <span className="text-gray-900">
              {recipe.totalTime.time}{" "}
              <span className="text-base">{recipe.totalTime.unit}</span>
            </span>
          </p>
          <p className="text-lg text-black">
            Servings: <span className="text-gray-900">{recipe.servings}</span>
          </p>
        </div>
        {recipe.createdBy && (
          <p className="text-xs font-light mb-4">
            Created by{" "}
            <span className="text-mango-600">{recipe.createdBy.fullName}</span>
          </p>
        )}

        {/* Buttons */}
        <div className="flex justify-center items-center space-x-2">
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
      </div>

      <div className="py-5 px-10 text-lg">
        <h3 className="font-bold text-mango-600 text-3xl">Equipment</h3>
        <ul className="mb-8">
          {recipe.equipment.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <h3 className="font-bold text-mango-600 text-3xl">Ingredients</h3>
        <ul className="mb-8 list-disc">
          {recipe.ingredients.map((ingredient) => (
            <li key={ingredient.ingredient}>
              {ingredient.quantity} {ingredient.unit} {ingredient.ingredient}
            </li>
          ))}
        </ul>
        <h3 className="font-bold text-mango-600 text-3xl">Instructions</h3>
        <ol className="mb-8 list-decimal flex flex-col space-y-2">
          {recipe.instructions.map((instruction, i) => (
            <li key={i}>
              <p>{instruction.description}</p>
              <p className="text-gray-500">
                {instruction.ingredientsUsed
                  .map(
                    (ingredient) =>
                      `${ingredient.quantity} ${ingredient.unit} ${ingredient.ingredient}`
                  )
                  .join(", ")}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
export default Recipe;
