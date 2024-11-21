"use client";

import AdUnit from "@/components/AdUnit";
import FullRecipe from "@/components/FullRecipe";
import Header from "@/components/Header";
import Recipe from "@/components/Recipe";
import { db } from "@/firebase";
import { Recipe as RecipeType } from "@/types/recipe";
import { doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";

function FullRecipePage({ params }: { params: { id: string } }) {
  const [recipeSnapshot, recipeLoading, recipeError] = useDocument(
    doc(db, "recipes", params.id)
  );

  const recipe = recipeSnapshot?.data() as RecipeType;

  if (recipeLoading) {
    return (
      <>
        <Header />
        <main className="flex-1 mt-20 overflow-scroll bg-floral-500">
          <div className="max-w-7xl mx-auto p-5">
            <h1 className="text-3xl font-bold mb-5">Loading recipe...</h1>
          </div>
        </main>
      </>
    );
  }

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <>
      <Header />
      <main className="flex-1 mt-20 overflow-scroll bg-floral-500">
        <FullRecipe recipe={recipe} />
      </main>
    </>
  );
}
export default FullRecipePage;
