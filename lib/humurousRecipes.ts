import { Recipe } from "@/types/recipe";

export const humorousRecipes: Recipe[] = [
  {
    title: "Recipe for Disaster",
    summary: "A perfectly chaotic meal for when you're feeling adventurous.",
    servings: 1,
    prepTime: { time: 0, unit: "minutes" },
    cookTime: { time: 0, unit: "minutes" },
    totalTime: { time: 0, unit: "minutes" },
    equipment: ["A sense of humor", "Chaos", "An unbreakable will"],
    ingredients: [
      { ingredient: "Confusion", quantity: "1", unit: "cup" },
      { ingredient: "Mischief", quantity: "2", unit: "tablespoons" },
      { ingredient: "Absurdity", quantity: "1", unit: "pinch" },
    ],
    instructions: [
      {
        description: "Mix the confusion and mischief thoroughly.",
        ingredientsUsed: [
          { ingredient: "Confusion", quantity: "1", unit: "cup" },
          { ingredient: "Mischief", quantity: "2", unit: "tablespoons" },
        ],
      },
      {
        description: "Sprinkle in a pinch of absurdity and stir vigorously.",
        ingredientsUsed: [
          { ingredient: "Absurdity", quantity: "1", unit: "pinch" },
        ],
      },
      {
        description: "Serve with a side of laughter and enjoy the chaos.",
        ingredientsUsed: [],
      },
    ],
  },
  {
    title: "Invisible Soup",
    summary: "A meal so light, you'll wonder if you ever made it.",
    servings: 4,
    prepTime: { time: 5, unit: "minutes" },
    cookTime: { time: 0, unit: "minutes" },
    totalTime: { time: 5, unit: "minutes" },
    equipment: ["Imaginary pot", "Imaginary ladle"],
    ingredients: [
      { ingredient: "Air", quantity: "3", unit: "liters" },
      { ingredient: "Nothing", quantity: "1", unit: "pinch" },
    ],
    instructions: [
      {
        description: "Fill the imaginary pot with air.",
        ingredientsUsed: [{ ingredient: "Air", quantity: "3", unit: "liters" }],
      },
      {
        description: "Add a pinch of nothing and stir until well mixed.",
        ingredientsUsed: [
          { ingredient: "Nothing", quantity: "1", unit: "pinch" },
        ],
      },
      {
        description: "Serve in invisible bowls and enjoy the weightlessness.",
        ingredientsUsed: [],
      },
    ],
  },
  {
    title: "Mystical Toast",
    summary: "A slice of bread transformed by pure imagination and magic.",
    servings: 1,
    prepTime: { time: 2, unit: "minutes" },
    cookTime: { time: 1, unit: "minute" },
    totalTime: { time: 3, unit: "minutes" },
    equipment: ["Magic wand", "Toaster (optional)"],
    ingredients: [
      { ingredient: "Slice of bread", quantity: "1", unit: "slice" },
      { ingredient: "Fairy dust", quantity: "1", unit: "sprinkle" },
    ],
    instructions: [
      {
        description: "Wave the magic wand over the slice of bread.",
        ingredientsUsed: [
          { ingredient: "Slice of bread", quantity: "1", unit: "slice" },
        ],
      },
      {
        description: "Sprinkle fairy dust for flavor.",
        ingredientsUsed: [
          { ingredient: "Fairy dust", quantity: "1", unit: "sprinkle" },
        ],
      },
      {
        description:
          "Toast in an imaginary toaster if desired, and savor the magic.",
        ingredientsUsed: [],
      },
    ],
  },
  {
    title: "Salad of Indecision",
    summary:
      "A salad for when you can't make up your mind, featuring an eclectic mix of nothing.",
    servings: 2,
    prepTime: { time: 10, unit: "minutes" },
    cookTime: { time: 0, unit: "minutes" },
    totalTime: { time: 10, unit: "minutes" },
    equipment: ["Bowl of uncertainty", "Fork of doubt"],
    ingredients: [
      { ingredient: "A dash of hesitation", quantity: "1", unit: "dash" },
      {
        ingredient: "A sprinkle of confusion",
        quantity: "1",
        unit: "sprinkle",
      },
    ],
    instructions: [
      {
        description:
          "Place the dash of hesitation into the bowl of uncertainty.",
        ingredientsUsed: [
          { ingredient: "A dash of hesitation", quantity: "1", unit: "dash" },
        ],
      },
      {
        description: "Add a sprinkle of confusion and toss aimlessly.",
        ingredientsUsed: [
          {
            ingredient: "A sprinkle of confusion",
            quantity: "1",
            unit: "sprinkle",
          },
        ],
      },
      {
        description: "Serve immediately or keep debating whether to serve it.",
        ingredientsUsed: [],
      },
    ],
  },
  {
    "title": "Quantum Cake",
    "summary": "A cake that exists in multiple states until observed (or eaten).",
    "servings": 1,
    "prepTime": { "time": 15, "unit": "minutes" },
    "cookTime": { "time": 20, "unit": "minutes" },
    "totalTime": { "time": 35, "unit": "minutes" },
    "equipment": ["Quantum oven", "Philosopher's whisk"],
    "ingredients": [
      { "ingredient": "Particles of flour", "quantity": "200", "unit": "grams" },
      { "ingredient": "Schrödinger’s sugar", "quantity": "100", "unit": "grams" },
      { "ingredient": "Wavefunction eggs", "quantity": "2", "unit": "whole" }
    ],
    "instructions": [
      {
        "description": "Combine particles of flour and Schrödinger’s sugar in a bowl.",
        "ingredientsUsed": [
          { "ingredient": "Particles of flour", "quantity": "200", "unit": "grams" },
          { "ingredient": "Schrödinger’s sugar", "quantity": "100", "unit": "grams" }
        ]
      },
      {
        "description": "Add wavefunction eggs and whisk until the mixture collapses into batter.",
        "ingredientsUsed": [{ "ingredient": "Wavefunction eggs", "quantity": "2", "unit": "whole" }]
      },
      {
        "description": "Bake in the quantum oven at 180°C until you observe it as fully cooked.",
        "ingredientsUsed": []
      }
    ]
  }
  
];
