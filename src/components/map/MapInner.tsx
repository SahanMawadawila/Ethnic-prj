"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Circle, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ScrapItem, WASTE_TYPE_CONFIG, WasteType } from "@/types";
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
  radius?: number; // in km
  showGeofence?: boolean;
}

// Component to handle map centering and panning
function MapController({ center }: { center: { lat: number; lng: number } }) {
  const map = useMap();
  useEffect(() => {
    // Only update if map is ready
    if (map && center.lat && center.lng) {
      try {
        map.setView([center.lat, center.lng], map.getZoom(), { animate: true });
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
  selectedListing,
  radius,
  showGeofence
}: MapInnerProps) {

  // Custom icon for listings
  const createListingIcon = (listing: ScrapItem) => {
    const { wasteType, estimatedWeight } = listing;

    // Solid colors for the marker background
    const getColors = (type: string) => {
      const config = WASTE_TYPE_CONFIG[type as WasteType];
      if (config) {
        // Construct border class by replacing 'bg-' with 'border-' and incrementing shade? 
        // Or just hardcode the mapping logic here for now but use config.mapColor for the bg.
        // Actually, let's keep it simple and consistent:
        const bg = config.mapColor;
        const border = bg.replace('bg-', 'border-').replace('500', '600').replace('400', '600');
        return `${bg} ${border}`;
      }
      return "bg-emerald-500 border-emerald-600";
    };
    
    // Scale size slightly based on weight
    // Base size 36px, max +14px based on weight
    const sizeOffset = Math.min(Math.max(estimatedWeight / 5, 0), 14); 
    const size = 36 + sizeOffset;
    
    const colors = getColors(wasteType);
    const textColor = wasteType === 'PAPER' ? 'text-yellow-950' : 'text-white';

    const html = renderToStaticMarkup(
      <div 
        className={`
          ${colors} ${textColor}
          rounded-full border-2 shadow-lg flex items-center justify-center
          font-bold text-[10px] leading-none transition-transform hover:scale-110
        `}
        style={{ 
          width: `${size}px`, 
          height: `${size}px`,
        }}
      >
        {estimatedWeight}kg
      </div>
    );

    return L.divIcon({
      html,
      className: "custom-div-icon bg-transparent border-none", // Remove default leaflet styles
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2], // Center the icon
    });
  };

  // Custom icon for user location (pulsing)
  const userLocationIcon = L.divIcon({
    html: renderToStaticMarkup(
      <div className="relative flex h-6 w-6 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500 border-2 border-white"></span>
      </div>
    ),
    className: "user-location-icon focus:outline-none",
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={13}
      scrollWheelZoom={true}
      className="w-full h-full z-0 font-sans"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" // Use a cleaner, lighter map style (CartoDB Voyager)
      />

      <MapController center={center} />

      {/* Geofence Circle */}
      {showGeofence && currentLocation && radius && (
        <Circle 
          center={[currentLocation.lat, currentLocation.lng]}
          radius={radius * 1000} // radius in meters
          pathOptions={{ 
            color: '#10b981', // Emerald-500
            fillColor: '#10b981', 
            fillOpacity: 0.1, 
            weight: 1,
            dashArray: '5, 10'
          }} 
        />
      )}

      {/* User Location Marker */}
      {currentLocation && (
        <Marker
          position={[currentLocation.lat, currentLocation.lng]}
          icon={userLocationIcon}
          zIndexOffset={1000}
        />
      )}

      {/* Listing Markers */}
      {listings.map((listing) => (
        <Marker
          key={listing.id}
          position={[listing.latitude, listing.longitude]}
          icon={createListingIcon(listing)}
          eventHandlers={{
            click: () => onMarkerClick(listing),
          }}
        />
      ))}
    </MapContainer>
  );
}
