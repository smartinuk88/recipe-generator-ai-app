"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "./ui/button";
import { CheckIcon } from "lucide-react";
import useSubscription from "@/hooks/useSubscription";
import getStripe from "@/lib/stripe-js";
import { createCheckoutSession } from "@/actions/createCheckoutSession";
import { createStripePortal } from "@/actions/createStripePortal";

export type UserDetails = {
  email: string;
  name: string;
};

function Pricing() {
  const { user } = useUser();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { hasActiveMembership, loading } = useSubscription();

  const handleUpgrade = () => {
    if (!user) return;

    const userDetails: UserDetails = {
      email: user.primaryEmailAddress?.toString()!,
      name: user.fullName!,
    };

    startTransition(async () => {
      const stripe = await getStripe();

      if (hasActiveMembership) {
        // create stripe portal...
        const stripePortalUrl = await createStripePortal();
        return router.push(stripePortalUrl);
      }

      const sessionId = await createCheckoutSession(userDetails);

      await stripe?.redirectToCheckout({
        sessionId,
      });
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 md:max-w-2xl gap-8 lg:max-w-4xl">
      {/* Free */}
      <div className="ring-1 ring-gray-200 p-8 h-fit pb-12 rounded-3xl">
        <h3 className="text-lg font-semibold leading-8 text-gray-900">
          Starter Plan
        </h3>
        <p className="mt-4 text-sm leading-6 text-gray-600">
          Explore core features at no cost
        </p>
        <p className="mt-6 flex items-baseline gap-x-1">
          <span className="text-4xl font-bold tracking-tight text-gray-900">
            Free
          </span>
        </p>

        <ul
          role="list"
          className="mt-8 space-y-3 text-sm leading-6 text-gray-600"
        >
          <li className="flex gap-x-3">
            <CheckIcon className="h-6 w-5 flex-none text-mango-600" />
            Example 1
          </li>
          <li className="flex gap-x-3">
            <CheckIcon className="h-6 w-5 flex-none text-mango-600" />
            Example 2
          </li>
          <li className="flex gap-x-3">
            <CheckIcon className="h-6 w-5 flex-none text-mango-600" />
            Example 3
          </li>
        </ul>
      </div>

      {/* PRO */}
      <div className="ring-2 ring-mango-600 rounded-3xl p-8">
        <h3 className="text-lg font-semibold leading-8 text-mango-600">
          Premium Plan
        </h3>
        <p className="mt-4 text-sm leading-6 text-gray-600">
          Be the star of the kitchen with PREMIUM Features
        </p>
        <p className="mt-6 flex items-baseline gap-x-1">
          <span className="text-4xl font-bold tracking-tight text-gray-900">
            €5.99
          </span>
          <span className="text-sm font-semibold leading-6 text-gray-600">
            / month
          </span>
        </p>

        <Button
          className="bg-mango-600 w-full text-white shadow-sm hover:bg-mango-500 mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mango-600"
          disabled={loading || isPending}
          onClick={handleUpgrade}
        >
          {isPending || loading
            ? "Loading..."
            : hasActiveMembership
            ? "Manage Subscription"
            : "Upgrade to Premium"}
        </Button>

        <ul
          role="list"
          className="mt-8 space-y-3 text-sm leading-6 text-gray-600"
        >
          <li className="flex gap-x-3">
            <CheckIcon className="h-6 w-5 flex-none text-mango-600" />
            Example 1
          </li>
          <li className="flex gap-x-3">
            <CheckIcon className="h-6 w-5 flex-none text-mango-600" />
            Example 2
          </li>
          <li className="flex gap-x-3">
            <CheckIcon className="h-6 w-5 flex-none text-mango-600" />
            Example 3
          </li>
          <li className="flex gap-x-3">
            <CheckIcon className="h-6 w-5 flex-none text-mango-600" />
            Example 4
          </li>
          <li className="flex gap-x-3">
            <CheckIcon className="h-6 w-5 flex-none text-mango-600" />
            Example 5
          </li>
          <li className="flex gap-x-3">
            <CheckIcon className="h-6 w-5 flex-none text-mango-600" />
            Example 6
          </li>
        </ul>
      </div>
    </div>
  );
}
export default Pricing;
