"use server";

import OpenAI from "openai";

const openai = new OpenAI();

const isHarmful = async (prompt: string) => {
  const moderation = await openai.moderations.create({
    model: "omni-moderation-latest",
    input: prompt,
  });

  return moderation.results[0].flagged;
};

const isFoodRelated = async (prompt: string) => {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `Determine if the following text is related to food or cooking: "${prompt}". Respond with 'Y' or 'N'.`,
      },
    ],
  });

  return completion.choices[0].message.content?.toLowerCase() === "y";
};

export async function generateRecipe(
  prompt: string,
  userId: string,
  fullName: string
) {
  const harmful = await isHarmful(prompt);
  if (harmful) return null;

  const isRelatedToFood = await isFoodRelated(prompt);
  if (!isRelatedToFood) return false;

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
              type: "object",
              properties: {
                time: {
                  type: "integer",
                  description: "The amount of preparation time",
                },
                unit: {
                  type: "string",
                  description:
                    "Unit of time for preparation (e.g., minutes, hours)",
                },
              },
              required: ["time", "unit"],
              description: "Preparation time as separate time and unit fields",
            },
            cookTime: {
              type: "object",
              properties: {
                time: {
                  type: "integer",
                  description: "The amount of cooking time",
                },
                unit: {
                  type: "string",
                  description:
                    "Unit of time for cooking (e.g., minutes, hours)",
                },
              },
              required: ["time", "unit"],
              description: "Cooking time as separate time and unit fields",
            },
            totalTime: {
              type: "object",
              properties: {
                time: {
                  type: "integer",
                  description: "The total amount of time (prep + cook)",
                },
                unit: {
                  type: "string",
                  description:
                    "Unit of time for total time (e.g., minutes, hours)",
                },
              },
              required: ["time", "unit"],
              description: "Total time as separate time and unit fields",
            },
            equipment: {
              type: "array",
              items: {
                type: "string",
                description: "name of the piece of equipment",
              },
              description: "List of equipment used in the recipe",
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
    const parsedRecipe = JSON.parse(recipe);
    const recipeWithMetaData = {
      ...parsedRecipe,
      createdBy: {
        fullName: fullName,
        userId: userId,
      },
      createdAt: new Date().toISOString(),
      prompt,
      ratingCount: 0,
      ratingSum: 0,
      public: false,
    };
    return recipeWithMetaData;
  } else {
    throw new Error("Recipe content is null");
  }
}
