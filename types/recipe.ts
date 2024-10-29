export interface Ingredient {
  ingredient: string;
  quantity: string;
  unit: string;
}

export interface Recipe {
  title: string;
  summary: string;
  servings: number;
  prepTime: string;
  cookTime: string;
  totalTime: string;
  ingredients: Ingredient[];
  instructions: {
    description: string;
    ingredientsUsed: Ingredient[];
  }[];
  prompt?: string;
  createdBy?: string;
  public?: boolean;
}
