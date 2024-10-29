"use client";

import { FormEvent, useTransition, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { generateRecipe } from "@/actions/generateRecipe";
import { saveRecipeToFirestore } from "@/lib/saveRecipeToFirestore";
import { useUser } from "@clerk/nextjs";
import { Recipe } from "@/types/recipe";
import { useRouter } from "next/navigation";

function RecipeGenerator() {
  const { user } = useUser();
  const [prompt, setPrompt] = useState<string>("");
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleGenerateRecipe = (e: FormEvent) => {
    e.preventDefault();
    if (!user) {
      router.push("/sign-in");
      return;
    }

    const userId = user.id;

    if (prompt.trim()) {
      console.log("Generating recipe for:", prompt);
    }

    startTransition(async () => {
      const generatedRecipe = await generateRecipe(prompt);
      await saveRecipeToFirestore(generatedRecipe, prompt, userId);
      setRecipe(generatedRecipe);
    });

    console.log(recipe);
  };

  return (
    <div className="flex flex-col items-center justify-center p-5 md:p-10 bg-bluegreen-500 max-w-7xl mx-auto 2xl:rounded-xl min-h-96 text-white text-center">
      <h2 className="text-5xl font-bold mb-2">Need a quick recipe?</h2>
      <p className="mb-12">Just enter a quick idea and we will do the rest!</p>
      <form onSubmit={handleGenerateRecipe} className="w-full">
        <div className="mb-4">
          <label htmlFor="recipe-input" className="sr-only">
            Recipe Idea
          </label>
          <Input
            id="recipe-input"
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
            className="bg-white text-black text-center h-12 text-lg rounded-xl font-semibold placeholder:text-base placeholder:font-light"
            placeholder="Generate a recipe for..."
            aria-label="Enter your recipe idea"
            required
          />
        </div>
        <Button
          disabled={!user || isPending}
          className="bg-mango-600 hover:bg-mango-700 w-full rounded-xl text-lg font-bold"
        >
          {user
            ? isPending
              ? "Generating..."
              : "Generate Recipe"
            : "Sign in to generate recipe"}
        </Button>
      </form>
    </div>
  );
}
export default RecipeGenerator;
