import { Recipe } from "@/types/recipe";
import { handleUpdateRecipe } from "./handleUpdateRecipe";
import { UserResource } from "@clerk/types";

export const handleRateRecipe = async (
  recipeData: Recipe,
  selectedRating: number,
  setRecipeData: (recipe: Recipe) => void,
  user: UserResource | null | undefined
) => {
  if (!user) return;
  const previousUserRating = recipeData.userRatings?.[user.id] || 0;
  const isNewRating = previousUserRating === 0;

  // Set default values if ratingCount or ratingSum are undefined
  const currentRatingCount = recipeData.ratingCount ?? 0;
  const currentRatingSum = recipeData.ratingSum ?? 0;

  // Calculate new rating count and sum
  const newRatingCount = isNewRating
    ? currentRatingCount + 1
    : recipeData.ratingCount;

  const newRatingSum = currentRatingSum - previousUserRating + selectedRating;

  // Update user rating in metadata
  const updatedUserRatings = {
    ...recipeData.userRatings,
    [user.id]: selectedRating,
  };

  // Update recipe data locally
  const updatedRecipeData = {
    ...recipeData,
    ratingCount: newRatingCount,
    ratingSum: newRatingSum,
    userRatings: updatedUserRatings,
  };

  setRecipeData(updatedRecipeData);
  localStorage.setItem("savedRecipe", JSON.stringify(updatedRecipeData));

  try {
    await handleUpdateRecipe(updatedRecipeData);
  } catch (err) {
    console.error("Error updating recipe", err);
  }
};
