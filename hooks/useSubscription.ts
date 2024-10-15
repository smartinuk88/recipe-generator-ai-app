"use client";

import { db } from "@/firebase";
import { useUser } from "@clerk/nextjs";
import { collection, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";

// Number of recipes the user is allowed to save
const PRO_LIMIT = 1000000;
const FREE_LIMIT = 2;

function useSubscription() {
  const [hasActiveMembership, setHasActiveMembership] = useState(null);
  const [isOverRecipeLimit, setIsOverRecipeLimit] = useState(false);
  const { user } = useUser();

  //   Listen to the User document
  const [snapshot, loading, error] = useDocument(
    user && doc(db, "users", user.id),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  //   Listen to the users recipes collection
  const [recipesSnapshot, recipesLoading] = useCollection(
    user && collection(db, "users", user?.id, "recipes")
  );

  useEffect(() => {
    if (!snapshot) return;

    const data = snapshot.data();

    if (!data) return;

    setHasActiveMembership(data.hasActiveMembership);
  }, [snapshot]);

  useEffect(() => {
    if (!recipesSnapshot || hasActiveMembership === null) return;

    const recipes = recipesSnapshot.docs;
    const usersLimit = hasActiveMembership ? PRO_LIMIT : FREE_LIMIT;

    console.log(
      "Checking if user is over recipe limit",
      recipes.length,
      usersLimit
    );

    setIsOverRecipeLimit(recipes.length >= usersLimit);
  }, [recipesSnapshot, hasActiveMembership, PRO_LIMIT, FREE_LIMIT]);

  return {
    hasActiveMembership,
    loading,
    error,
    isOverRecipeLimit,
    recipesLoading,
  };
}

export default useSubscription;
