"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ScrapItem, WASTE_TYPE_CONFIG, WasteType } from "@/types";
import { 
  MapPin, 
  Package, 
  Hammer, 
  FileText, 
  Cpu, 
  Trash2,
  Recycle
} from "lucide-react";
import { renderToStaticMarkup } from "react-dom/server";

// Fix for default Leaflet icon issues
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface MapInnerProps {
  listings: ScrapItem[];
  center: { lat: number; lng: number };
  currentLocation?: { lat: number; lng: number } | null;
  onMarkerClick: (listing: ScrapItem) => void;
  selectedListing: ScrapItem | null;
}

// Component to handle map centering and panning
function MapController({ center }: { center: { lat: number; lng: number } }) {
  const map = useMap();
  useEffect(() => {
    // Only update if map is ready
    if (map && center.lat && center.lng) {
      try {
        map.setView([center.lat, center.lng], map.getZoom(), { animate: false });
      } catch (e) {
        console.error("Map setView error:", e);
      }
    }
  }, [center, map]);
  return null;
}

export default function MapInner({
  listings,
  center,
  currentLocation,
  onMarkerClick,
  selectedListing
}: MapInnerProps) {

  // Custom icon for listings using Lucide
  const createListingIcon = (wasteType: string) => {
    const config = WASTE_TYPE_CONFIG[wasteType as WasteType];
    const colorClass = config?.color || "text-primary";

    // Select icon based on waste type
    const getIcon = () => {
      switch (wasteType as WasteType) {
        case "PLASTIC":
          return <Package className="h-4 w-4" />;
        case "METAL":
          return <Hammer className="h-4 w-4" />;
        case "PAPER":
          return <FileText className="h-4 w-4" />;
        case "E_WASTE":
          return <Cpu className="h-4 w-4" />;
        case "MIXED":
          return <Trash2 className="h-4 w-4" />;
        default:
          return <Recycle className="h-4 w-4" />;
      }
    };

    const html = renderToStaticMarkup(
      <div className={`p-1.5 rounded-full border-2 border-white shadow-md bg-white ${colorClass} hover:scale-110 transition-transform`}>
        {getIcon()}
      </div>
    );

    return L.divIcon({
      html,
      className: "custom-div-icon",
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });
  };

  // Custom icon for user location (pulsing)
  const userLocationIcon = L.divIcon({
    html: renderToStaticMarkup(
      <div className="relative flex h-6 w-6 items-center justify-center">
        <div className="absolute h-full w-full animate-ping rounded-full bg-blue-500 opacity-40"></div>
        <div className="relative h-3 w-3 rounded-full bg-blue-600 border-2 border-white"></div>
      </div>
    ),
    className: "user-location-icon",
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={13}
      scrollWheelZoom={true}
      className="w-full h-full z-0"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapController center={center} />

      {/* User Location Marker */}
      {currentLocation && (
        <Marker
          position={[currentLocation.lat, currentLocation.lng]}
          icon={userLocationIcon}
        />
      )}

      {/* Listing Markers */}
      {listings.map((listing) => (
        <Marker
          key={listing.id}
          position={[listing.latitude, listing.longitude]}
          icon={createListingIcon(listing.wasteType)}
          eventHandlers={{
            click: () => onMarkerClick(listing),
          }}
        />
      ))}
    </MapContainer>
  );
}
