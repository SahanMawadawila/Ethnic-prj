"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { toast } from "sonner";
import { createScrapItem, getScrapItems } from "@/app/actions";

export function useListings() {
  const queryClient = useQueryClient();
  const { user, profile } = useAuth();

  // Fetch active listings using Server Action
  const activeListingsQuery = useQuery({
    queryKey: ["listings", "active"],
    queryFn: async () => {
      // This calls the Prisma function on the server
      const data = await getScrapItems();
      return data;
    },
    // Only fetch if user is a collector or generally browsing
    enabled: true,
  });

  // Create listing mutation
  const createListingMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      // Calls the Server Action defined in actions.ts
      const result = await createScrapItem(formData);
      if (!result.success) throw new Error("Failed to create");
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listings"] });
      toast.success("Listing created successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to create listing: ${error.message}`);
    },
  });

  // Example: You would create similar Server Actions for 'updateStatus'
  // and call them here in a Mutation.

  return {
    activeListings: activeListingsQuery.data ?? [],
    isLoading: activeListingsQuery.isLoading,
    createListing: createListingMutation.mutateAsync,
    isCreating: createListingMutation.isPending,
  };
}
