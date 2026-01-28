import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type DirectionsMode = 'DRIVING' | 'WALKING' | 'BICYCLING';

interface MapState {
  // Current collector location
  currentLatitude: number | null;
  currentLongitude: number | null;
  locationTimestamp: number | null;
  
  // Directions settings
  directionsMode: DirectionsMode;
  showDirections: boolean;
  selectedListingId: string | null;
  
  // Filter settings
  radiusFilterEnabled: boolean;
  customRadius: number | null; // Override for operating radius
  
  // Map view settings
  mapCenter: { lat: number; lng: number } | null;
  mapZoom: number;
  
  // Actions
  setCurrentLocation: (lat: number, lng: number) => void;
  setDirectionsMode: (mode: DirectionsMode) => void;
  setShowDirections: (show: boolean) => void;
  setSelectedListingId: (id: string | null) => void;
  setRadiusFilterEnabled: (enabled: boolean) => void;
  setCustomRadius: (radius: number | null) => void;
  setMapCenter: (center: { lat: number; lng: number } | null) => void;
  setMapZoom: (zoom: number) => void;
  resetMap: () => void;
}

const initialState = {
  currentLatitude: null,
  currentLongitude: null,
  locationTimestamp: null,
  directionsMode: 'DRIVING' as DirectionsMode,
  showDirections: false,
  selectedListingId: null,
  radiusFilterEnabled: true,
  customRadius: null,
  mapCenter: null,
  mapZoom: 12,
};

export const useMapStore = create<MapState>()(
  persist(
    (set) => ({
      ...initialState,
      
      setCurrentLocation: (lat, lng) =>
        set({
          currentLatitude: lat,
          currentLongitude: lng,
          locationTimestamp: Date.now(),
        }),
      
      setDirectionsMode: (mode) =>
        set({ directionsMode: mode }),
      
      setShowDirections: (show) =>
        set({ showDirections: show }),
      
      setSelectedListingId: (id) =>
        set({ selectedListingId: id }),
      
      setRadiusFilterEnabled: (enabled) =>
        set({ radiusFilterEnabled: enabled }),
      
      setCustomRadius: (radius) =>
        set({ customRadius: radius }),
      
      setMapCenter: (center) =>
        set({ mapCenter: center }),
      
      setMapZoom: (zoom) =>
        set({ mapZoom: zoom }),
      
      resetMap: () =>
        set({
          showDirections: false,
          selectedListingId: null,
        }),
    }),
    {
      name: 'ecocycle-map-store',
      partialize: (state) => ({
        directionsMode: state.directionsMode,
        radiusFilterEnabled: state.radiusFilterEnabled,
        customRadius: state.customRadius,
        mapZoom: state.mapZoom,
      }),
    }
  )
);