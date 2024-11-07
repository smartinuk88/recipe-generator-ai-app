import { serverTimestamp } from "firebase/firestore";

export interface Ingredient {
  ingredient: string;
  quantity: string;
  unit: string;
}

export interface Recipe {
  title: string;
  summary: string;
  servings: number;
  prepTime: {
    time: number;
    unit: string;
  };
  cookTime: {
    time: number;
    unit: string;
  };
  totalTime: {
    time: number;
    unit: string;
  };
  equipment: string[];
  ingredients: Ingredient[];
  instructions: {
    description: string;
    ingredientsUsed: Ingredient[];
  }[];
}

export interface RecipeWithMetaData extends Recipe {
  createdBy: string;
  createdAt: typeof serverTimestamp;
  prompt: string;
  public: boolean;
}
