"use client";

import { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

function RecipeGenerator() {
  const [input, setInput] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Placeholder for recipe generation logic
    if (input.trim()) {
      console.log("Generating recipe for:", input);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-5 md:p-10 bg-bluegreen-500 max-w-7xl mx-auto 2xl:rounded-md min-h-96 text-white text-center">
      <h2 className="text-5xl font-bold mb-2">Need a quick recipe?</h2>
      <p className="mb-12">
        Just enter a quick idea and we will do the rest for you!
      </p>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-4">
          <label htmlFor="recipe-input" className="sr-only">
            Recipe Idea
          </label>
          <Input
            id="recipe-input"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            className="bg-white text-black h-12"
            placeholder="Vegan snacks for a 5 year old's birthday party..."
            aria-label="Enter your recipe idea"
            required
          />
        </div>
        <Button className="bg-mango-600 hover:bg-mango-700 w-full text-lg font-bold">
          Generate Recipe
        </Button>
      </form>
    </div>
  );
}
export default RecipeGenerator;
