import { useState, useCallback } from "react";
import { ScrapItem, WASTE_TYPE_CONFIG } from "@/types";
import { ListingSheet } from "./ListingSheet";
import { MapPin, Navigation } from "lucide-react";
import { Map, AdvancedMarker, Pin, useMap } from "@vis.gl/react-google-maps";
import { useMapStore } from "@/store/mapStore";

interface MapViewProps {
  listings: ScrapItem[];
  onAcceptPickup: (id: string, eta: number) => Promise<void>;
}

export function MapView({ listings, onAcceptPickup }: MapViewProps) {
  const [selectedListing, setSelectedListing] = useState<ScrapItem | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const map = useMap();
  
  const { currentLatitude, currentLongitude } = useMapStore();

  const handleMarkerClick = (listing: ScrapItem) => {
    setSelectedListing(listing);
    if (map) {
      map.panTo({ lat: listing.latitude, lng: listing.longitude });
    }
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

  const center = currentLatitude && currentLongitude 
    ? { lat: currentLatitude, lng: currentLongitude }
    : { lat: 20.5937, lng: 78.9629 }; // Default to India center if no location

  return (
    <div className="relative w-full h-full bg-slate-100 overflow-hidden rounded-xl border shadow-inner">
      <Map
        defaultCenter={center}
        defaultZoom={13}
        mapId="SCRAP_SYNC_MAP" // In real apps, set this in Google Cloud Console
        disableDefaultUI={true}
        className="w-full h-full"
      >
        {/* User Location Marker */}
        {currentLatitude && currentLongitude && (
          <AdvancedMarker
            position={{ lat: currentLatitude, lng: currentLongitude }}
            title="Your Location"
          >
            <div className="relative flex h-6 w-6 items-center justify-center">
              <div className="absolute h-full w-full animate-ping rounded-full bg-primary opacity-40"></div>
              <div className="relative h-3 w-3 rounded-full bg-primary border-2 border-white"></div>
            </div>
          </AdvancedMarker>
        )}

        {/* Listing Markers */}
        {listings.map((listing) => (
          <AdvancedMarker
            key={listing.id}
            position={{ lat: listing.latitude, lng: listing.longitude }}
            onClick={() => handleMarkerClick(listing)}
          >
            <div className={`p-1.5 rounded-full border-2 border-white shadow-md transition-transform hover:scale-110 ${WASTE_TYPE_CONFIG[listing.wasteType].color}`}>
               <MapPin className="h-4 w-4 text-white" />
            </div>
          </AdvancedMarker>
        ))}
      </Map>

      {/* Floating Controls Overlay */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
         {currentLatitude && currentLongitude && (
            <button 
              onClick={() => map?.panTo({ lat: currentLatitude!, lng: currentLongitude! })}
              className="bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg border border-slate-200 text-primary hover:bg-slate-50 transition-all"
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
