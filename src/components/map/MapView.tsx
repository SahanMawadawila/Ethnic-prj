"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { ScrapItem } from "@/types";
import { ListingSheet } from "./ListingSheet";
import { Navigation } from "lucide-react";
import { useMapStore } from "@/store/mapStore";

// Dynamically import Leaflet component to avoid SSR issues
const MapInner = dynamic(() => import("./MapInner"), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-slate-100 animate-pulse flex items-center justify-center">
      <p className="text-slate-400">Loading map...</p>
    </div>
  )
});

interface MapViewProps {
  listings: ScrapItem[];
  onAcceptPickup: (id: string, eta: number) => Promise<void>;
}

export function MapView({ listings, onAcceptPickup }: MapViewProps) {
  const [selectedListing, setSelectedListing] = useState<ScrapItem | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  
  const { currentLatitude, currentLongitude } = useMapStore();

  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>(() => {
    return currentLatitude && currentLongitude 
      ? { lat: currentLatitude, lng: currentLongitude }
      : { lat: 20.5937, lng: 78.9629 };
  });

  const handleMarkerClick = (listing: ScrapItem) => {
    setSelectedListing(listing);
    setMapCenter({ lat: listing.latitude, lng: listing.longitude });
  };

  const handleAccept = async (etaMinutes: number) => {
    if (!selectedListing) return;

    setIsUpdating(true);
    try {
      await onAcceptPickup(selectedListing.id, etaMinutes);
      setSelectedListing(null);
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  const recenterToUser = () => {
    if (currentLatitude && currentLongitude) {
      setMapCenter({ lat: currentLatitude, lng: currentLongitude });
    }
  };

  return (
    <div className="relative w-full h-full bg-slate-100 overflow-hidden rounded-xl border shadow-inner">
      <MapInner 
        listings={listings}
        center={mapCenter}
        currentLocation={currentLatitude && currentLongitude ? { lat: currentLatitude, lng: currentLongitude } : null}
        onMarkerClick={handleMarkerClick}
        selectedListing={selectedListing}
      />

      {/* Floating Controls Overlay */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-[1000]">
         {currentLatitude && currentLongitude && (
            <button 
              onClick={recenterToUser}
              className="bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg border border-slate-200 text-primary hover:bg-slate-50 transition-all pointer-events-auto"
            >
               <Navigation className="h-5 w-5" />
            </button>
         )}
      </div>

      {/* Slide-up Sheet */}
      <ListingSheet
        listing={selectedListing}
        open={!!selectedListing}
        onOpenChange={(open) => !open && setSelectedListing(null)}
        onAccept={handleAccept}
        isLoading={isUpdating}
      />
    </div>
  );
}
