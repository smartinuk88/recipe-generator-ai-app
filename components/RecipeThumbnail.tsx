import { Recipe } from "@/types/recipe";
import Link from "next/link";
import Image from "next/image";
import StarRating from "./StarRating";
import { handleRateRecipe } from "@/lib/handleRateRecipe";
import { useState } from "react";

function RecipeThumbnail({ recipe }: { recipe: Recipe }) {
  const [recipeData, setRecipeData] = useState<Recipe>(recipe);
  return (
    <Link href={`/recipes/${recipe.id}`}>
      <div className="relative h-96 w-96 bg-teal-600 overflow-hidden group">
        {recipe.image && (
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            className="object-cover"
          />
        )}

        {/* Title overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="px-4 py-2 bg-white/90 font-bold text-xl text-center">
            {recipe.title}
          </h2>
        </div>

        {/* Bottom info bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/90 p-2 flex justify-between items-center">
          {recipe.ratingCount !== undefined &&
            recipe.ratingSum !== undefined && (
              <StarRating
                ratingCount={recipe.ratingCount}
                ratingSum={recipe.ratingSum}
                onRate={(rating) =>
                  handleRateRecipe(recipe, rating, setRecipeData)
                }
              />
            )}
          {recipe.createdBy && (
            <span className="text-sm">{recipe.createdBy.fullName}</span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default RecipeThumbnail;
