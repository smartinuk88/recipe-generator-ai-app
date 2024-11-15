"use client";

import Header from "@/components/Header";
import { db } from "@/firebase";
import { useUser } from "@clerk/nextjs";
import { collection, doc, getDoc } from "firebase/firestore";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { Recipe as RecipeType } from "@/types/recipe";
import Recipe from "@/components/Recipe";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import RecipeThumbnail from "@/components/RecipeThumbnail";

function MyRecipesPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  // Redirect if not signed in
  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/sign-in");
    }
  }, [isLoaded, user, router]);

  // Listen to the user document to get recipe references
  const [userSnapshot, userLoading, userError] = useDocument(
    user && doc(db, "users", user.id)
  );

  // Listen to all recipes in the recipes collection
  const [recipesSnapshot, recipesLoading, recipesError] = useCollection(
    collection(db, "recipes")
  );

  if (!isLoaded || userLoading || recipesLoading) {
    return (
      <>
        <Header />
        <main className="flex-1 mt-20 overflow-scroll bg-floral-500">
          <div className="max-w-7xl mx-auto p-5">
            <h1 className="text-3xl font-bold mb-5">Loading recipes...</h1>
          </div>
        </main>
      </>
    );
  }

  if (userError || recipesError) {
    return (
      <>
        <Header />
        <main className="flex-1 mt-20 overflow-scroll bg-floral-500">
          <div className="max-w-7xl mx-auto p-5">
            <h1 className="text-3xl font-bold mb-5">Error loading recipes</h1>
          </div>
        </main>
      </>
    );
  }

  // Get user's recipe IDs from their document
  const userRecipeIds = userSnapshot?.data()?.recipes || [];

  // Filter all recipes to only include user's recipes
  const userRecipes = recipesSnapshot?.docs
    .filter((doc) => userRecipeIds.includes(doc.id))
    .map((doc) => ({ ...doc.data(), id: doc.id })) as RecipeType[];

  return (
    <>
      <Header />
      <main className="flex-1 mt-20 overflow-scroll bg-floral-500">
        <div className="max-w-7xl mx-auto p-5">
          <h1 className="text-3xl font-bold mb-5">My Recipes</h1>

          {userRecipes?.length === 0 ? (
            <>
              <p className="text-center text-gray-500 mb-2">
                You haven't saved or created any recipes yet.
              </p>
              <div className="mt-4 flex flex-col items-center space-y-4">
                <p className="text-gray-600">
                  Ready to start your culinary journey? You can:
                </p>
                <div className="flex gap-4">
                  <Button className="bg-bluegreen-500 text-white rounded-md hover:bg-bluegreen-600 transition-colors">
                    <Link href="/dashboard">Generate a Recipe</Link>
                  </Button>
                  <Button className="bg-mango-500 text-white rounded-md hover:bg-mango-600 transition-colors">
                    <Link href="/dashboard/explore">Explore Recipes</Link>
                  </Button>
                </div>
              </div>
              <div className="grid gap-8">
                {userRecipes?.map((recipe) => (
                  <Recipe key={recipe.id} recipe={recipe} />
                ))}
              </div>
            </>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {userRecipes?.map((recipe) => (
                <RecipeThumbnail key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default MyRecipesPage;
