"use client";

import AdUnit from "@/components/AdUnit";
import Header from "@/components/Header";
import { db } from "@/firebase";
import { doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";

function FullRecipePage({ params }: { params: { id: string } }) {
  const [recipeSnapshot, recipeLoading, recipeError] = useDocument(
    doc(db, "recipes", params.id)
  );

  const recipe = recipeSnapshot?.data();

  if (recipeLoading) {
    return (
      <>
        <Header />
        <main className="flex-1 mt-20 overflow-scroll bg-floral-500">
          <div className="max-w-7xl mx-auto p-5">
            <h1 className="text-3xl font-bold mb-5">Loading recipe...</h1>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1 mt-20 overflow-scroll bg-floral-500">
        <AdUnit />
        <div className="max-w-7xl mx-auto p-5">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1 p-4 bg-mango-100 rounded-xl">
              <h2 className="text-2xl font-bold mb-4">Recipe Details</h2>
              <div className="space-y-4"></div>
            </aside>
          </div>
        </div>
        <AdUnit />
      </main>
    </>
  );
}
export default FullRecipePage;
