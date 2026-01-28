"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrapItem, WASTE_TYPE_CONFIG } from "@/types";
import { Loader2, Navigation, Clock } from "lucide-react";
import { useState } from "react";

interface ListingSheetProps {
  listing: ScrapItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept: (eta: number) => void;
  isLoading: boolean;
}

export function ListingSheet({
  listing,
  open,
  onOpenChange,
  onAccept,
  isLoading,
}: ListingSheetProps) {
  const [eta, setEta] = useState<number | null>(null);

  if (!listing) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-xl sm:max-w-md mx-auto">
        <SheetHeader className="text-left">
          <SheetTitle className="flex justify-between items-center">
            {listing.title}
            <Badge className={WASTE_TYPE_CONFIG[listing.wasteType].color}>
              {WASTE_TYPE_CONFIG[listing.wasteType].label}
            </Badge>
          </SheetTitle>
          <SheetDescription>{listing.address}</SheetDescription>
        </SheetHeader>

        <div className="grid gap-4 py-4">
          {/* Image Placeholder */}
          <div className="aspect-video bg-muted rounded-md relative overflow-hidden">
            {listing.imageUrl ? (
              <img
                src={listing.imageUrl}
                alt="Scrap"
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                No Image Provided
              </div>
            )}
          </div>

          <div className="flex justify-between text-sm">
            <span>
              <strong>Weight:</strong> {listing.estimatedWeight} kg
            </span>
            <span>
              <strong>Posted:</strong>{" "}
              {new Date(listing.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="bg-slate-50 p-3 rounded-lg border">
            <p className="text-sm font-medium mb-2">Select Arrival Time:</p>
            <div className="flex gap-2">
              {[15, 30, 60].map((mins) => (
                <Button
                  key={mins}
                  variant={eta === mins ? "default" : "outline"}
                  size="sm"
                  onClick={() => setEta(mins)}
                  className="flex-1"
                >
                  {mins}m
                </Button>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() =>
                window.open(
                  `https://maps.google.com/?q=${listing.latitude},${listing.longitude}`,
                  "_blank",
                )
              }
            >
              <Navigation className="h-4 w-4 mr-2" /> Navigate
            </Button>

            <Button
              className="flex-[2]"
              disabled={!eta || isLoading}
              onClick={() => eta && onAccept(eta)}
            >
              {isLoading ? (
                <Loader2 className="animate-spin h-4 w-4" />
              ) : (
                "Accept Job"
              )}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
