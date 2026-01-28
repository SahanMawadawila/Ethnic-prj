"use client";

import { APIProvider } from "@vis.gl/react-google-maps";
import { ReactNode } from "react";

export function GoogleMapsProvider({ children }: { children: ReactNode }) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "";

  if (!apiKey) {
    // Return children without provider if no key, but maybe show a warning in dev
    console.warn("Google Maps API Key is missing. Maps will not load correctly.");
    return <>{children}</>;
  }

  return (
    <APIProvider apiKey={apiKey}>
      {children}
    </APIProvider>
  );
}
