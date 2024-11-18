import Header from "@/components/Header";

function FullRecipePage({ params }: { params: { id: string } }) {
  return (
    <>
      <Header />
      <main className="flex-1 mt-20 overflow-scroll bg-floral-500">
        {/* Ad unit component */}
        <div className="max-w-7xl mx-auto p-5">
          <h1 className="text-3xl font-bold mb-5">Loading recipe...</h1>
        </div>
      </main>
    </>
  );
}
export default FullRecipePage;
