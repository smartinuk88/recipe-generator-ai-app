import { Recipe } from "@/types/recipe";
import { db } from "@/firebase";
import {
  collection,
  updateDoc,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

export const saveRecipeToFirestore = async (recipe: Recipe, userId: string) => {
  try {
    // Generate a document reference with an ID but don’t write yet
    const recipeRef = doc(collection(db, "recipes"));

    // Set id
    const recipeWithId = {
      ...recipe,
      id: recipeRef.id,
    };

    // Set the document with the generated ID included in the data
    await setDoc(recipeRef, {
      ...recipeWithId,
      createdAt: serverTimestamp(),
    });

    // Update user's recipes array to reference new recipe
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    const existingRecipes = userDoc.exists()
      ? userDoc.data().recipes || []
      : [];

    await updateDoc(userRef, {
      recipes: [...existingRecipes, recipeRef.id],
    });

    console.log("Recipe added successfully:", recipeWithId);
    return recipeWithId;
  } catch (err) {
    console.error("Error adding recipe", err);
  }
};
