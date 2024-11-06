"use client";

import { FormEvent, useTransition, useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { generateRecipe } from "@/actions/generateRecipe";
import { saveRecipeToFirestore } from "@/lib/saveRecipeToFirestore";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Recipe } from "@/types/recipe";
import { useToast } from "@/hooks/use-toast";
import { humorousRecipes } from "@/lib/humurousRecipes";

function RecipeGenerator({
  setRecipe,
}: {
  setRecipe: (recipe: Recipe) => void;
}) {
  const { user } = useUser();
  const [prompt, setPrompt] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // Load saved prompt from localStorage on component mount
  useEffect(() => {
    const savedPrompt = localStorage.getItem("savedPrompt");
    const savedRecipe = localStorage.getItem("savedRecipe");
    if (savedPrompt) {
      setPrompt(savedPrompt);
      localStorage.removeItem("savedPrompt"); // Clear after loading
    }
    if (savedRecipe) {
      setRecipe(JSON.parse(savedRecipe));
    }
  }, []);

  const validatePrompt = (prompt: string): boolean => {
    // Check if the prompt is empty
    if (!prompt.trim()) {
      setError("Please enter a recipe request");

      setTimeout(() => {
        setError(null);
      }, 3000);
      return false;
    }

    // Check if the prompt has at least 3 words
    if (prompt.trim().split(" ").length < 3) {
      setError(
        "Please add more detail (at least 3 words). More detailed prompts provide a better response."
      );

      setTimeout(() => {
        setError(null);
      }, 3000);
      return false;
    }

    // Clear any previous errors if the prompt is valid
    setError(null);
    return true;
  };

  const setTemporaryError = (message: string, duration: number = 3000) => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, duration);
  };

  const handleGenerateRecipe = (e: FormEvent) => {
    e.preventDefault();
    if (!validatePrompt(prompt)) return;

    if (!user) {
      localStorage.setItem("savedPrompt", prompt);
      router.push("/sign-in");
      return;
    }

    const userId = user.id;

    if (prompt.trim()) {
      console.log("Generating recipe for:", prompt);
    }

    startTransition(async () => {
      try {
        const generatedRecipe = await generateRecipe(prompt);

        if (generatedRecipe === false) {
          // Prompt not food related: Set recipe to a random humorous recipe
          const randomHumorousRecipe =
            humorousRecipes[Math.floor(Math.random() * humorousRecipes.length)];
          setRecipe(randomHumorousRecipe);
          localStorage.setItem(
            "savedRecipe",
            JSON.stringify(randomHumorousRecipe)
          );
        } else if (generatedRecipe === null) {
          // Prompt harmful: Set an error message
          setTemporaryError("Harmful content is not accepted");
        } else {
          // Genuine prompt: Save the recipe and update state and local storage
          await saveRecipeToFirestore(generatedRecipe, prompt, userId);
          setRecipe(generatedRecipe);
          localStorage.setItem("savedRecipe", JSON.stringify(generatedRecipe));
        }
        setPrompt("");
      } catch {
        console.error("Error generating recipe:", error);
        setTemporaryError("An unexpected error occurred. Please try again.");
      }
    });
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
          />
        </div>
        <Button
          disabled={isPending}
          className="bg-mango-600 hover:bg-mango-700 w-full rounded-xl text-lg font-bold mb-2"
        >
          {user
            ? isPending
              ? "Generating..."
              : "Generate Recipe"
            : "Sign in to generate recipe"}
        </Button>
      </form>
      <p className="h-5 text-mango-100">{error}</p>
    </div>
  );
}
export default RecipeGenerator;
