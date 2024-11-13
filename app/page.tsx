"use client";

import Header from "@/components/Header";
import Recipe from "@/components/Recipe";
import RecipeGenerator from "@/components/RecipeGenerator";
import { Recipe as RecipeType } from "@/types/recipe";
import {
  Refrigerator,
  Clock,
  Brain,
  Lightbulb,
  ListChecks,
  Star,
} from "lucide-react";
import { useState } from "react";

const features = [
  {
    icon: Refrigerator,
    title: "Reduce Waste",
    description:
      "Use the ingredients in your fridge to create delicious meals and reduce food waste.",
  },
  {
    icon: Clock,
    title: "Save Time",
    description:
      "Generate quick and easy recipes tailored to your schedule, so you spend less time deciding what to cook.",
  },
  {
    icon: Brain,
    title: "Save Mental Load",
    description:
      "No more stressing about meal ideas. Let the app suggest recipes so you can focus on other things.",
  },
  {
    icon: Lightbulb,
    title: "Increase Creativity",
    description:
      "Break out of the routine and try new recipes with the ingredients you already have on hand.",
  },
  {
    icon: ListChecks,
    title: "Personalized Recipes",
    description:
      "Get recipes tailored to your dietary preferences and the number of people you're cooking for.",
  },
  {
    icon: Star,
    title: "Favorites & Reviews",
    description:
      "Save your favorite recipes and leave reviews to help others find their next meal inspiration.",
  },
];

export default function Home() {
  const [recipe, setRecipe] = useState<RecipeType | undefined>(undefined);

  return (
    <>
      <Header />
      <main className="flex-1 mt-20 overflow-scroll bg-floral-500">
        <section>
          <RecipeGenerator setRecipe={setRecipe} />
        </section>

        <section>{recipe && <Recipe recipe={recipe} />}</section>

        {/* Features */}
        <section className="mx-auto mt-16 mb-16 max-w-7xl px-5 sm:mt-20 md:mt-24">
          <dl className="mx-auto grid max-w-3xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.title} className="relative pl-12">
                <dt className="inline font-semibold text-bluegreen-500">
                  <feature.icon
                    aria-hidden="true"
                    className="absolute left-1 top-1 h-8 w-8"
                  />
                  <span className="text-lg text-gray-900">{feature.title}</span>
                </dt>

                <dd>{feature.description}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Pricing */}
        <section></section>
      </main>
    </>
  );
}
