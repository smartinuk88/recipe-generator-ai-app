import { Recipe } from "@/types/recipe";
import { db } from "@/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";

export const saveRecipeToFirestore = async (
  recipe: Recipe,
  prompt: string,
  userId: string
) => {
  try {
    // Add the metadata
    const recipeWithMetadata = {
      ...recipe,
      prompt,
      createdBy: userId,
      createdAt: serverTimestamp(),
      public: false,
    };

    // Add recipe to global recipes collection
    const recipeRef = await addDoc(
      collection(db, "recipes"),
      recipeWithMetadata
    );

    // Update user's recipes array to reference new recipe
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    const existingRecipes = userDoc.exists()
      ? userDoc.data().recipes || []
      : [];

    await updateDoc(userRef, {
      recipes: [...existingRecipes, recipeRef.id],
    });

    console.log("Recipe added successfully");
  } catch (err) {
    console.error("Error adding recipe", err);
  }
};
