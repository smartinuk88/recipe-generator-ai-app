"use server";

import OpenAI from "openai";

const openai = new OpenAI();

export async function generateRecipe(prompt: string) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You generate delicious recipes based on user input in a structured JSON format.",
      },
      {
        role: "user",
        content: `Generate a recipe for ${prompt}`,
      },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "recipe_schema",
        schema: {
          type: "object",
          properties: {
            title: { type: "string", description: "The title of the recipe" },
            summary: {
              type: "string",
              description: "A brief and enticing summary of the recipe",
            },
            servings: {
              type: "integer",
              description: "The number of servings the recipe makes",
            },
            prepTime: {
              type: "string",
              description: "Preparation time in a human-readable format",
            },
            cookTime: {
              type: "string",
              description: "Cooking time in a human-readable format",
            },
            totalTime: {
              type: "string",
              description:
                "Total time (preparation time + cooking time) in a human-readable format",
            },
            ingredients: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  ingredient: {
                    type: "string",
                    description: "Name of the ingredient",
                  },
                  quantity: {
                    type: "string",
                    description: "Quantity of the ingredient",
                  },
                  unit: {
                    type: "string",
                    description:
                      "Unit of measurement for the ingredient using the metric system where applicable",
                  },
                },
                required: ["ingredient", "quantity", "unit"],
              },
              description: "List of ingredients used in the recipe",
            },
            instructions: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  description: {
                    type: "string",
                    description: "Detailed instructions for the step",
                  },
                  ingredientsUsed: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        ingredient: {
                          type: "string",
                          description:
                            "Name of the ingredient used in the step",
                        },
                        quantity: {
                          type: "string",
                          description:
                            "Quantity of the ingredient used in the step",
                        },
                        unit: {
                          type: "string",
                          description:
                            "Unit of measurement for the ingredient using the metric system where applicable",
                        },
                      },
                      required: ["ingredient", "quantity", "unit"],
                    },
                    description: "Ingredients used in this step",
                  },
                },
                required: ["step", "description", "ingredientsUsed"],
              },
              description: "List of instructions for the recipe",
            },
          },
          required: [
            "title",
            "summary",
            "servings",
            "prepTime",
            "cookTime",
            "ingredients",
            "instructions",
          ],
        },
      },
    },
  });

  const recipe = completion.choices[0].message.content;

  if (recipe) {
    return JSON.parse(recipe);
  } else {
    throw new Error("Recipe content is null");
  }
}
