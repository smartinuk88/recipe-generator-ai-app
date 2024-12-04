import { Recipe as RecipeType } from "@/types/recipe";
import AdUnit from "./AdUnit";
import Recipe from "./Recipe";
import Image from "next/image";
import RecipePlaceholder from "@/assets/images/recipe-placeholder.webp";

function FullRecipe({ recipe }: { recipe: RecipeType }) {
  return (
    <div>
      <h2 className="text-4xl font-bold py-5 text-center">{recipe.title}</h2>
      <AdUnit />
      <div className="max-w-7xl mx-auto p-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="md:col-span-1 bg-mango-100 rounded-xl shadow-md border border-mango-600">
            <div className="aspect-square relative rounded-lg overflow-hidden">
              <Image
                src={recipe.image || RecipePlaceholder}
                alt={recipe.title}
                fill
                className="object-cover rounded-t-xl"
                priority
              />
            </div>
            <div className="p-5 flex flex-col space-y-8 text-center md:text-left text-xl md:text-base">
              <div className="text-center">
                <p className="font-semibold">"{recipe.prompt}"</p>
              </div>
              <hr />
              <div>
                <ul className="space-y-2">
                  <li>
                    <span className="font-semibold">Date Created:</span>{" "}
                    {recipe.createdAt &&
                      (typeof recipe.createdAt === "object"
                        ? recipe.createdAt.toDate().toLocaleDateString()
                        : new Date(recipe.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          ))}
                  </li>
                  <li>
                    <span className="font-semibold">Created By:</span>{" "}
                    {recipe.createdBy?.fullName || "Unknown"}
                  </li>
                </ul>
              </div>

              <hr />
            </div>
          </aside>

          {/* Main Content */}
          <div className="md:col-span-3 rounded-xl">
            <Recipe recipe={recipe} />
          </div>
        </div>
      </div>
      <AdUnit />;
    </div>
  );
}
export default FullRecipe;
