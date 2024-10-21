"use client";

import useSubscription from "@/hooks/useSubscription";
import { Button } from "./ui/button";
import Link from "next/link";
import { Loader2Icon, StarIcon } from "lucide-react";
import { createStripePortal } from "@/actions/createStripePortal";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

function UpgradeButton() {
  const { hasActiveMembership, loading } = useSubscription();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleAccount = () => {
    startTransition(async () => {
      const stripePortalUrl = await createStripePortal();
      router.push(stripePortalUrl);
    });
  };

  if (!hasActiveMembership && !loading)
    return (
      <Button
        asChild
        variant="default"
        className="border-mango-600 hover:bg-mango-700"
      >
        <Link href="/dashboard/upgrade">
          Upgrade <StarIcon className="ml-3 fill-mango-600 text-white" />
        </Link>
      </Button>
    );

  if (loading)
    return (
      <Button variant="default" className="border-mango-600 hover:bg-mango-700">
        <Loader2Icon className="animate-spin" />
      </Button>
    );

  return (
    <Button
      onClick={handleAccount}
      disabled={isPending}
      variant="default"
      className="border-mango-600 bg-mango-600 hover:bg-mango-700"
    >
      {isPending ? (
        <Loader2Icon className="animate-spin" />
      ) : (
        <p className="font-bold">Premium Plan</p>
      )}
    </Button>
  );
}
export default UpgradeButton;
