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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrapItem, WASTE_TYPE_CONFIG } from "@/types";
import { Loader2, Navigation, Clock } from "lucide-react";
import { useState } from "react";

interface ListingSheetProps {
  listing: ScrapItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept: (pickupTimeISO: string) => void;
  isLoading: boolean;
}

export function ListingSheet({
  listing,
  open,
  onOpenChange,
  onAccept,
  isLoading,
}: ListingSheetProps) {
  const [pickupTime, setPickupTime] = useState<string>("");

  if (!listing) return null;

  // Get minimum time (now + 5 minutes)
  const now = new Date();
  now.setMinutes(now.getMinutes() + 5);
  const minTime = now.toTimeString().slice(0, 5);

  const handleAccept = () => {
    if (!pickupTime) return;
    // Create a date for today with the selected time
    const today = new Date();
    const [hours, minutes] = pickupTime.split(':').map(Number);
    today.setHours(hours, minutes, 0, 0);
    onAccept(today.toISOString());
  };

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
          {/* Image */}
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

          {/* Seller Contact Info */}
          {(listing as any).seller && (
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
              <p className="text-sm font-medium text-blue-900 mb-1">Seller Contact</p>
              <p className="text-sm text-blue-800">
                <strong>{(listing as any).seller.fullName}</strong>
              </p>
              {(listing as any).seller.phone && (
                <p className="text-sm text-blue-700">
                  📞 <a href={`tel:${(listing as any).seller.phone}`} className="underline">{(listing as any).seller.phone}</a>
                </p>
              )}
            </div>
          )}

          {/* Time Picker */}
          <div className="bg-slate-50 p-3 rounded-lg border">
            <Label htmlFor="pickupTime" className="text-sm font-medium mb-2 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Select Pickup Time
            </Label>
            <Input
              id="pickupTime"
              type="time"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              min={minTime}
              className="mt-2"
            />
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
              disabled={!pickupTime || isLoading}
              onClick={handleAccept}
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

