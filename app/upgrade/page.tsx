import Header from "@/components/Header";
import Pricing from "@/components/Pricing";

function PricingPage() {
  return (
    <>
      <Header />
      <main className="flex-1 mt-20 overflow-scroll bg-floral-500 py-24 sm:py-32">
        <div>
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-mango-500 font-semibold leading-7 text-base mb-2">
              Pricing
            </h2>
            <p className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Supercharge your Cooking Companion
            </p>
          </div>
          <p className="mx-auto mt-6 max-w-2xl px-10 text-center text-lg leading-8 text-gray-600">
            Whether you're a busy parent, a health-conscious foodie, or someone
            looking to reduce food waste, we've got the right plan for you.
            Choose the plan that fits your lifestyle and start cooking smarter
            today!
          </p>
          <Pricing />
        </div>
      </main>
    </>
  );
}
export default PricingPage;
