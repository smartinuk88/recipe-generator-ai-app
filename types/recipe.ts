import { Timestamp } from "firebase/firestore";

export interface Ingredient {
  ingredient: string;
  quantity: string;
  unit: string;
}

export interface Recipe {
  id: string;
  title: string;
  summary: string;
  servings: number;
  humorous?: boolean;
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
  createdBy?: {
    userId: string;
    fullName: string;
  };
  createdAt?: Timestamp | string;
  prompt?: string;
  ratingCount?: number;
  ratingSum?: number;
  userRatings?: {
    [userId: string]: number;
  };
  public?: boolean;
}
