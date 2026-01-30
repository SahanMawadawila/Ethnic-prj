import { useState, useMemo } from "react";
import { ScrapItem, WASTE_TYPE_CONFIG } from "@/types";
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
  radius?: number;
  showGeofence?: boolean;
}

export function MapView({ listings, onAcceptPickup, radius, showGeofence }: MapViewProps) {
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
        radius={radius}
        showGeofence={showGeofence}
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

      {/* Waste Type Legend */}
      <div className="absolute bottom-10 left-4 z-[400] flex flex-wrap bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl shadow-lg border border-slate-200 gap-x-6 gap-y-2 max-w-[90%]">
        {Object.values(WASTE_TYPE_CONFIG).map((config) => (
          <div key={config.label} className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full ring-2 ring-white shadow-sm ${config.mapColor}`} />
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-widest leading-none">{config.label}</span>
          </div>
        ))}
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
