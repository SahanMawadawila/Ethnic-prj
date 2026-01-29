"use client";

import { useEffect, useState, useCallback } from "react";
import {
  getScrapItems,
  getCollectorJobs,
  acceptPickup,
  markAsCollected,
} from "@/app/actions";
import { ScrapItem, WASTE_TYPE_CONFIG } from "@/types";
import { useMapStore } from "@/store/mapStore";
import { AppLayout } from "@/components/layout/AppLayout";
import { MapView } from "@/components/map/MapView";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Truck,
  CheckCircle,
  Loader2,
  Navigation,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

export default function CollectorDashboard() {
  // --- State ---
  const [activeListings, setActiveListings] = useState<ScrapItem[]>([]);
  const [myJobs, setMyJobs] = useState<ScrapItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState<string | null>(null);

  // --- Store & Geo ---
  const {
    currentLatitude,
    currentLongitude,
    setCurrentLocation,
    radiusFilterEnabled,
    setRadiusFilterEnabled,
  } = useMapStore();

  const operatingRadius = 15; // Default radius (km)

  // --- 1. Data Fetching ---
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      // Parallel fetching for speed
      const [mapData, jobsData] = await Promise.all([
        getScrapItems(),
        getCollectorJobs(),
      ]);

      setActiveListings(mapData);
      setMyJobs(jobsData);
    } catch (error) {
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial Load
  useEffect(() => {
    loadData();
  }, [loadData]);

  // --- 2. Geolocation Setup ---
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation(latitude, longitude);
        setLocationError(null);

        // Optional: Update server with my live location for sellers to see
        // updateLocation(latitude, longitude);
      },
      (error) => {
        console.error("Geo Error:", error);
        setLocationError("Location access denied. Please enable GPS.");
      },
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 },
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [setCurrentLocation]);

  // --- 3. Filters & Computed Data ---
  const reservedJobs = myJobs.filter((j) => j.status === "RESERVED");
  const completedJobs = myJobs.filter((j) => j.status === "COLLECTED");

  // Filter map items by radius (if enabled and we have location)
  const mapDisplayItems = activeListings.filter((item) => {
    if (!radiusFilterEnabled || !currentLatitude || !currentLongitude)
      return true;

    // Haversine Distance Calculation
    const R = 6371; // km
    const dLat = ((item.latitude - currentLatitude) * Math.PI) / 180;
    const dLon = ((item.longitude - currentLongitude) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((currentLatitude * Math.PI) / 180) *
        Math.cos((item.latitude * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance <= operatingRadius;
  });

  // --- 4. Actions ---
  const handleAcceptPickup = async (id: string, eta: number) => {
    toast.promise(acceptPickup(id, eta), {
      loading: "Accepting job...",
      success: () => {
        loadData(); // Refresh all lists
        return "Job Accepted! Navigate to the location.";
      },
      error: "Failed to accept job.",
    });
  };

  const handleMarkCollected = async (id: string) => {
    toast.promise(markAsCollected(id), {
      loading: "Finalizing...",
      success: () => {
        loadData();
        return "Collection Recorded!";
      },
      error: "Error updating status.",
    });
  };

  return (
    <AppLayout>
      <div className="flex h-[calc(100vh-4rem)] flex-col">
        {/* --- Header --- */}
        <div className="border-b bg-card p-4 shadow-sm z-10">
          <div className="container mx-auto flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Truck className="h-6 w-6 text-primary" /> Collector Dashboard
              </h1>
              <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                {currentLatitude ? (
                  <span className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                    <Navigation className="h-3 w-3" /> GPS Active
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
                    <Loader2 className="h-3 w-3 animate-spin" /> Locating...
                  </span>
                )}
                {locationError && (
                  <span className="flex items-center gap-1 text-destructive font-medium">
                    <AlertCircle className="h-3 w-3" /> {locationError}
                  </span>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex gap-4">
              <StatBadge
                icon={MapPin}
                label="Map"
                value={mapDisplayItems.length}
              />
              <StatBadge
                icon={Truck}
                label="Jobs"
                value={reservedJobs.length}
                active
              />
              <StatBadge
                icon={CheckCircle}
                label="Done"
                value={completedJobs.length}
              />
            </div>
          </div>
        </div>

        {/* --- Main Tabs --- */}
        <Tabs
          defaultValue="map"
          className="flex flex-1 flex-col overflow-hidden"
        >
          <div className="border-b bg-background">
            <div className="container mx-auto">
              <TabsList className="h-12 w-full justify-start rounded-none bg-transparent p-0">
                <TabsTrigger
                  value="map"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6"
                >
                  <MapPin className="h-4 w-4 mr-2" /> Live Map
                </TabsTrigger>
                <TabsTrigger
                  value="jobs"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6"
                >
                  <Truck className="h-4 w-4 mr-2" /> My Jobs
                  {reservedJobs.length > 0 && (
                    <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                      {reservedJobs.length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger
                  value="history"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6"
                >
                  <CheckCircle className="h-4 w-4 mr-2" /> History
                </TabsTrigger>

                <div className="ml-auto pr-4 flex items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={loadData}
                    disabled={loading}
                  >
                    <RefreshCw
                      className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
                    />
                  </Button>
                </div>
              </TabsList>
            </div>
          </div>

          {/* TAB 1: MAP VIEW */}
          <TabsContent value="map" className="mt-0 flex-1 relative">
            <div className="absolute inset-0">
              <MapView
                listings={mapDisplayItems}
                // We pass the function to "accept" that wraps our Server Action
                // Note: MapView expects (id, eta) -> void
                onAcceptPickup={(id, eta) => handleAcceptPickup(id, eta)}
              />
            </div>
            {/* Map Overlay Controls */}
            <div className="absolute top-4 right-4 z-10 bg-white/90 p-2 rounded-lg shadow-md backdrop-blur-sm">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={radiusFilterEnabled}
                  onChange={(e) => setRadiusFilterEnabled(e.target.checked)}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span>Limit to {operatingRadius}km</span>
              </label>
            </div>
          </TabsContent>

          {/* TAB 2: ACTIVE JOBS */}
          <TabsContent
            value="jobs"
            className="mt-0 flex-1 overflow-y-auto bg-slate-50 p-4"
          >
            <div className="container mx-auto max-w-4xl space-y-4">
              {loading && (
                <div className="text-center py-10">
                  <Loader2 className="animate-spin h-8 w-8 mx-auto text-primary" />
                </div>
              )}

              {!loading && reservedJobs.length === 0 && (
                <EmptyState
                  icon={Truck}
                  title="No Active Jobs"
                  desc="Go to the Map tab to find and accept new pickups nearby."
                />
              )}

              {reservedJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onComplete={handleMarkCollected}
                />
              ))}
            </div>
          </TabsContent>

          {/* TAB 3: HISTORY */}
          <TabsContent
            value="history"
            className="mt-0 flex-1 overflow-y-auto bg-slate-50 p-4"
          >
            <div className="container mx-auto max-w-4xl space-y-4">
              {!loading && completedJobs.length === 0 && (
                <EmptyState
                  icon={CheckCircle}
                  title="No History Yet"
                  desc="Completed jobs will appear here."
                />
              )}

              {completedJobs.map((job) => (
                <HistoryCard key={job.id} job={job} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}

// --- Helper Components ---

function StatBadge({ icon: Icon, label, value, active }: any) {
  return (
    <div
      className={`flex items-center gap-2 px-3 py-1 rounded-lg border ${active ? "bg-primary/10 border-primary/20 text-primary" : "bg-background border-border"}`}
    >
      <Icon className="h-4 w-4" />
      <span className="font-bold">{value}</span>
      <span className="hidden sm:inline text-xs text-muted-foreground uppercase">
        {label}
      </span>
    </div>
  );
}

function EmptyState({ icon: Icon, title, desc }: any) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-slate-200 rounded-xl bg-white">
      <div className="bg-slate-100 p-4 rounded-full mb-4">
        <Icon className="h-8 w-8 text-slate-400" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="text-slate-500 max-w-xs">{desc}</p>
    </div>
  );
}

function JobCard({
  job,
  onComplete,
}: {
  job: ScrapItem;
  onComplete: (id: string) => void;
}) {
  const openMaps = () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${job.latitude},${job.longitude}`,
      "_blank",
    );
  };

  return (
    <Card className="overflow-hidden border-l-4 border-l-primary shadow-sm hover:shadow-md transition-all">
      <div className="flex flex-col sm:flex-row">
        {/* Image Section */}
        <div className="sm:w-48 h-48 sm:h-auto relative bg-slate-200">
          {job.imageUrl ? (
            <Image
              src={job.imageUrl}
              alt={job.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400">
              <MapPin className="h-8 w-8" />
            </div>
          )}
          <Badge
            className={`absolute top-2 left-2 ${WASTE_TYPE_CONFIG[job.wasteType].color} text-white`}
          >
            {WASTE_TYPE_CONFIG[job.wasteType].label}
          </Badge>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-xl text-slate-900">{job.title}</h3>
              <Badge
                variant="outline"
                className="border-orange-200 text-orange-700 bg-orange-50"
              >
                {job.estimatedWeight} KG
              </Badge>
            </div>
            <p className="text-slate-500 text-sm mb-4 line-clamp-2">
              {job.address}
            </p>

            {job.pickupTime && (
              <div className="inline-flex items-center gap-2 text-xs font-medium bg-blue-50 text-blue-700 px-2 py-1 rounded">
                <Truck className="h-3 w-3" />
                Expected:{" "}
                {new Date(job.pickupTime as string).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            )}
          </div>

          <div className="flex gap-3 mt-6">
            <Button variant="outline" className="flex-1" onClick={openMaps}>
              <Navigation className="h-4 w-4 mr-2" /> Navigate
            </Button>
            <Button
              className="flex-1 bg-green-600 hover:bg-green-700"
              onClick={() => onComplete(job.id)}
            >
              <CheckCircle className="h-4 w-4 mr-2" /> Mark Collected
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

function HistoryCard({ job }: { job: ScrapItem }) {
  return (
    <Card className="opacity-80 hover:opacity-100 transition-opacity">
      <CardContent className="p-4 flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
          <CheckCircle className="h-6 w-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold truncate">{job.title}</h4>
          <p className="text-sm text-slate-500">{job.address}</p>
        </div>
        <div className="text-right">
          <div className="font-bold text-slate-900">
            {job.estimatedWeight} kg
          </div>
          <div className="text-xs text-slate-400">
            {job.completedAt
              ? new Date(job.completedAt as string).toLocaleDateString()
              : "Done"}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
