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
  prompt?: string;
  createdBy?: string;
  public?: boolean;
}
