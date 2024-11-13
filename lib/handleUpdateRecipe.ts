import { updateDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";
import { Recipe } from "@/types/recipe";

export const handleUpdateRecipe = async (recipe: Recipe) => {
  if (!recipe || !recipe.id) {
    throw new Error("Invalid recipe data: Recipe or recipe ID is missing");
  }

  const recipeRef = doc(db, "recipes", recipe.id);

  const recipeData = { ...recipe };

  try {
    const updatedDoc = await updateDoc(recipeRef, recipeData);
    console.log(`Recipe ${recipe.id} successfully updated in Firestore`);
    return updatedDoc;
  } catch (err) {
    console.error(`Error updating recipe ${recipe.id} in Firestore`, err);
    throw err;
  }
};
