import { useState, useMemo } from "react";
import { ScrapItem } from "@/types";
import { ListingSheet } from "./ListingSheet";
import { Navigation } from "lucide-react";
import { useMapStore } from "@/store/mapStore";
import dynamic from "next/dynamic";

// Dynamically import MapInner to avoid SSR issues with Leaflet
const MapInner = dynamic(() => import("./MapInner"), { 
  ssr: false, 
  loading: () => (
    <div className="w-full h-full bg-slate-100 animate-pulse flex items-center justify-center text-slate-400">
      Loading Map...
    </div>
  )
});

interface MapViewProps {
  listings: ScrapItem[];
  onAcceptPickup: (id: string, time: Date) => Promise<void>;
}

export function MapView({ listings, onAcceptPickup }: MapViewProps) {
  const [selectedListing, setSelectedListing] = useState<ScrapItem | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const { currentLatitude, currentLongitude } = useMapStore();

  const handleMarkerClick = (listing: ScrapItem) => {
    setSelectedListing(listing);
  };

  const handleAccept = async (time: Date) => {
    if (!selectedListing) return;

    setIsUpdating(true);
    try {
      await onAcceptPickup(selectedListing.id, time);
      setSelectedListing(null);
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  // Memoize center to prevent unnecessary re-renders
  const center = useMemo(() => {
    if (selectedListing) {
      return { lat: selectedListing.latitude, lng: selectedListing.longitude };
    }
    if (currentLatitude && currentLongitude) {
      return { lat: currentLatitude, lng: currentLongitude };
    }
    return { lat: 20.5937, lng: 78.9629 }; // Default to India center
  }, [selectedListing, currentLatitude, currentLongitude]);

  const currentLocation = currentLatitude && currentLongitude 
    ? { lat: currentLatitude, lng: currentLongitude } 
    : null;

  return (
    <div className="relative w-full h-full bg-slate-100 overflow-hidden rounded-xl border shadow-inner">
      <MapInner
        listings={listings}
        center={center}
        currentLocation={currentLocation}
        onMarkerClick={handleMarkerClick}
        selectedListing={selectedListing}
      />

      {/* Floating Controls Overlay */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
         {currentLatitude && currentLongitude && (
            <button 
              onClick={() => setSelectedListing(null)} // Reset to current location
              className="bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg border border-slate-200 text-primary hover:bg-slate-50 transition-all"
              title="Center on My Location"
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
