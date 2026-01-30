"use client";

import { useEffect, useState, useCallback } from "react";
import {
  getScrapItems,
  getCollectorJobs,
  acceptPickup,
  markAsCollected,
  releasePickup,
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
  RefreshCw,
  Filter,
  Package,
  XCircle,
  Clock,
  Navigation,
  AlertCircle,
  Calendar as CalendarIcon,
} from "lucide-react";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { format } from "date-fns";
import { FinalizeCollectionDialog } from "@/components/map/FinalizeCollectionDialog";

export default function CollectorDashboard() {
  // --- State ---
  const [activeListings, setActiveListings] = useState<ScrapItem[]>([]);
  const [myJobs, setMyJobs] = useState<ScrapItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [finalizeItem, setFinalizeItem] = useState<ScrapItem | null>(null);
  const [isFinalizing, setIsFinalizing] = useState(false);

  // --- Store & Geo ---
  const {
    currentLatitude,
    currentLongitude,
    setCurrentLocation,
    radiusFilterEnabled,
    setRadiusFilterEnabled,
    customRadius,
    setCustomRadius,
  } = useMapStore();

  const operatingRadius = customRadius || 15;

  // --- 1. Data Fetching ---
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [mapData, jobsData] = await Promise.all([
        getScrapItems(),
        getCollectorJobs(),
      ]);

      setActiveListings(mapData as any);
      setMyJobs(jobsData as any);
    } catch (error) {
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  }, []);

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
      },
      (error) => {
        console.error("Geo Error Details:", {
          code: error.code,
          message: error.message,
          PERMISSION_DENIED: error.PERMISSION_DENIED,
          POSITION_UNAVAILABLE: error.POSITION_UNAVAILABLE,
          TIMEOUT: error.TIMEOUT
        });
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError("Location access denied. Please enable GPS.");
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            setLocationError("Location request timed out.");
            break;
          default:
            setLocationError(`Location error: ${error.message || "Unknown error"}`);
            break;
        }
      },
      { 
        enableHighAccuracy: true, // Keep true for better tracking, but...
        maximumAge: 10000, 
        timeout: 20000 // ...increase timeout significantly to avoiding "Timeout" errors on slow fix
      },
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [setCurrentLocation]);

  // --- 3. Filters & Computed Data ---
  const reservedJobs = myJobs.filter((j) => j.status === "RESERVED");
  const completedJobs = myJobs.filter((j) => j.status === "COLLECTED");

  const mapDisplayItems = activeListings.filter((item) => {
    if (selectedTypes.length > 0 && !selectedTypes.includes(item.wasteType)) {
      return false;
    }

    if (!radiusFilterEnabled || !currentLatitude || !currentLongitude)
      return true;

    const R = 6371;
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

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  // --- 4. Actions ---
  const handleAcceptPickup = async (id: string, time: Date) => {
    toast.promise(acceptPickup(id, time), {
      loading: "Scheduling pickup...",
      success: () => {
        loadData();
        return "Pickup Scheduled! Ready for collection.";
      },
      error: "Failed to schedule pickup.",
    });
  };

  const handleReleasePickup = async (id: string) => {
    if (!confirm("Are you sure you want to release this job? It will be available for others again.")) return;
    
    toast.promise(releasePickup(id), {
      loading: "Releasing job...",
      success: () => {
        loadData();
        return "Job released successfully.";
      },
      error: "Failed to release job.",
    });
  };

  const handleMarkCollected = async (unitPrice: number, totalAmount: number) => {
    if (!finalizeItem) return;
    
    setIsFinalizing(true);
    toast.promise(markAsCollected(finalizeItem.id, unitPrice, totalAmount), {
      loading: "Finalizing...",
      success: () => {
        loadData();
        setFinalizeItem(null);
        return "Collection Recorded!";
      },
      error: "Error updating status.",
      finally: () => setIsFinalizing(false)
    });
  };

  return (
    <AppLayout>
      <div className="flex h-[calc(100vh-4rem)] flex-col">
        {/* --- Header --- */}
        <div className="border-b bg-card p-4 shadow-sm z-10">
          <div className="container mx-auto flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2 text-slate-800">
                <Truck className="h-6 w-6 text-primary" /> Collector Dashboard
              </h1>
              <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                {currentLatitude ? (
                  <span className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-medium">
                    <Navigation className="h-3 w-3" /> GPS Active
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-red-500 bg-red-50 px-2 py-0.5 rounded-full font-medium">
                    <Loader2 className="h-3 w-3 animate-spin" /> Locating...
                  </span>
                )}
                {locationError && (
                  <span className="flex items-center gap-1 text-destructive font-bold">
                    <AlertCircle className="h-3 w-3" /> {locationError}
                  </span>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex gap-4">
              <StatBadge icon={MapPin} label="Map" value={mapDisplayItems.length} />
              <StatBadge icon={Truck} label="Jobs" value={reservedJobs.length} active />
              <StatBadge icon={CheckCircle} label="Done" value={completedJobs.length} />
            </div>
          </div>
        </div>

        {/* --- Main Tabs --- */}
        <Tabs defaultValue="map" className="flex flex-1 flex-col overflow-hidden">
          <div className="border-b bg-background">
            <div className="container mx-auto">
              <TabsList className="h-14 w-full justify-start rounded-none bg-transparent p-0">
                <TabsTrigger
                  value="map"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none px-6 font-bold h-full"
                >
                  <MapPin className="h-4 w-4 mr-2" /> Live Map
                </TabsTrigger>
                <TabsTrigger
                  value="jobs"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none px-6 font-bold h-full"
                >
                  <Truck className="h-4 w-4 mr-2" /> My Jobs
                  {reservedJobs.length > 0 && (
                    <Badge className="ml-2 h-5 min-w-[20px] rounded-full p-0 flex items-center justify-center bg-primary text-white text-[10px]">
                      {reservedJobs.length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger
                  value="history"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none px-6 font-bold h-full"
                >
                  <CheckCircle className="h-4 w-4 mr-2" /> History
                </TabsTrigger>

                <div className="ml-auto pr-4 flex items-center">
                  <Button variant="ghost" size="sm" onClick={loadData} disabled={loading} className="rounded-full">
                    <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
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
              onAcceptPickup={handleAcceptPickup}
              radius={operatingRadius}
              showGeofence={radiusFilterEnabled}
            />
            </div>
            
            <div className="absolute top-4 right-4 z-10">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="secondary" size="icon" className="h-10 w-10 rounded-full shadow-lg backdrop-blur-sm bg-white/90">
                    <Filter className="h-5 w-5" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 rounded-3xl p-5 shadow-2xl border-none bg-white/95 backdrop-blur-md" align="end" sideOffset={8}>
                  <div className="space-y-6">
                    {/* ... filters ... */}
                     <div className="flex items-center gap-2 border-b pb-3">
                      <div className="p-2 bg-primary/10 rounded-xl text-primary">
                        <Filter className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-base leading-none">Map Filters</h4>
                        <p className="text-[12px] text-muted-foreground mt-1">Refine your search results</p>
                      </div>
                    </div>
                    <div className="space-y-5">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="radius-filter" className="flex flex-col gap-0.5 cursor-pointer">
                            <span className="font-semibold text-sm">Proximity Filter</span>
                            <span className="text-[11px] font-normal text-muted-foreground">Show items near you</span>
                          </Label>
                          <Switch id="radius-filter" checked={radiusFilterEnabled} onCheckedChange={setRadiusFilterEnabled} />
                        </div>
                        {radiusFilterEnabled && (
                          <div className="space-y-4 rounded-2xl bg-slate-50 p-3.5 border border-slate-100">
                            <div className="flex justify-between items-end">
                              <span className="text-[12px] text-muted-foreground font-medium uppercase tracking-wider">Search Distance</span>
                              <span className="font-bold text-lg text-primary leading-none">{operatingRadius}<span className="text-xs ml-1 text-primary/70">km</span></span>
                            </div>
                            <Slider defaultValue={[operatingRadius]} max={50} min={1} step={1} onValueChange={(vals) => setCustomRadius(vals[0])} />
                          </div>
                        )}
                      </div>
                      <div className="space-y-3">
                        <Label className="text-sm font-semibold flex items-center gap-2 text-slate-700">
                          <Package className="h-4 w-4 text-slate-400" /> Waste Categories
                        </Label>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(WASTE_TYPE_CONFIG).map(([type, config]) => {
                            const isSelected = selectedTypes.includes(type);
                            return (
                              <button
                                key={type}
                                onClick={() => toggleType(type)}
                                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                                  isSelected 
                                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-[1.02]" 
                                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-100"
                                }`}
                              >
                                {config.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </TabsContent>

          {/* TAB 2: ACTIVE JOBS */}
          <TabsContent value="jobs" className="mt-0 flex-1 overflow-y-auto bg-slate-50 p-4">
            <div className="container mx-auto max-w-4xl space-y-4">
              {!loading && reservedJobs.length === 0 && (
                <EmptyState icon={Truck} title="No Active Jobs" desc="Go to the Map tab to find and accept new pickups nearby." />
              )}
              <div className="grid gap-6">
                {reservedJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onComplete={() => setFinalizeItem(job)}
                    onRelease={handleReleasePickup}
                    onNavigate={(lat, lng) => window.open(`https://maps.google.com/?q=${lat},${lng}`, "_blank")}
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          {/* TAB 3: HISTORY */}
          <TabsContent value="history" className="mt-0 flex-1 overflow-y-auto bg-slate-50 p-4">
             <div className="container mx-auto max-w-4xl space-y-4">
               {!loading && completedJobs.length === 0 && (
                 <EmptyState icon={CheckCircle} title="No History Yet" desc="Completed jobs will appear here." />
               )}
               {completedJobs.map((job) => (
                 <HistoryCard key={job.id} job={job} />
               ))}
             </div>
          </TabsContent>
        </Tabs>

        <FinalizeCollectionDialog 
          item={finalizeItem}
          open={!!finalizeItem}
          onOpenChange={(open) => !open && setFinalizeItem(null)}
          onConfirm={handleMarkCollected}
          isLoading={isFinalizing}
        />
      </div>
    </AppLayout>
  );
}

// --- Helper Components ---

function JobCard({ job, onComplete, onRelease, onNavigate }: { 
  job: ScrapItem, 
  onComplete: () => void, 
  onRelease: (id: string) => void,
  onNavigate: (lat: number, lng: number) => void
}) {
  return (
    <Card className="overflow-hidden border-none shadow-md bg-white/80 backdrop-blur-sm group">
      <div className="flex flex-col md:flex-row">
        <div className="relative w-full md:w-64 aspect-video md:aspect-auto bg-slate-100">
          {job.imageUrl ? (
            <img src={job.imageUrl} alt={job.title} className="object-cover w-full h-full" />
          ) : (
            <div className="flex h-full items-center justify-center text-slate-300">
              <Package className="h-10 w-10 opacity-20" />
            </div>
          )}
          <Badge className="absolute top-3 right-3 bg-white/90 text-slate-900 border-none shadow-sm">{job.wasteType}</Badge>
        </div>
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
               <h3 className="text-xl font-bold text-slate-800 tracking-tight">{job.title}</h3>
               <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-widest border-primary/20 text-primary">Reserved</Badge>
            </div>
            <p className="text-sm text-slate-500 mb-4 line-clamp-2">{job.address}</p>
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Scheduled Time</p>
                  <p className="text-sm font-bold text-slate-700">{job.pickupTime ? format(new Date(job.pickupTime), "h:mm a") : "Soon"}</p>
                </div>
              </div>
              <div className="h-10 w-[1px] bg-primary/10 hidden sm:block"></div>
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm">
                  <CalendarIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Pickup Date</p>
                  <p className="text-sm font-bold text-slate-700">{job.pickupTime ? format(new Date(job.pickupTime), "MMM do, yyyy") : "TBD"}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button onClick={onComplete} className="flex-1 h-12 rounded-xl font-bold">
              <CheckCircle className="mr-2 h-4 w-4" /> Finalize Collection
            </Button>
            <Button variant="outline" className="px-5 h-12 rounded-xl" onClick={() => onNavigate(job.latitude, job.longitude)}>
               <Navigation className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl text-red-500 hover:bg-red-50" title="Release Job" onClick={() => onRelease(job.id)}>
              <XCircle className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

function HistoryCard({ job }: { job: ScrapItem }) {
  return (
    <Card className="opacity-80 hover:opacity-100 transition-opacity border-none shadow-sm">
      <CardContent className="p-4 flex items-center gap-4">
        <div className="h-12 w-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600 shrink-0">
          <CheckCircle className="h-6 w-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-slate-800 truncate">{job.title}</h4>
          <p className="text-xs text-slate-500 truncate">{job.address}</p>
        </div>
        <div className="text-right">
          <div className="font-bold text-slate-700">{job.estimatedWeight} kg</div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
            {job.completedAt ? format(new Date(job.completedAt), "MMM d, yyyy") : "Done"}
          </div>
          {job.totalAmount && (
            <div className="text-sm font-black text-primary transition-all">
              ${job.totalAmount.toFixed(2)}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function StatBadge({ icon: Icon, label, value, active }: any) {
  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border border-transparent transition-all ${active ? "bg-primary text-primary-foreground shadow-md" : "bg-white border-slate-100 text-slate-600 font-bold"}`}>
      <Icon className="h-4 w-4" />
      <span className="font-black text-sm">{value}</span>
      <span className="hidden sm:inline text-[10px] uppercase tracking-widest opacity-70 italic">{label}</span>
    </div>
  );
}

function EmptyState({ icon: Icon, title, desc }: any) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-slate-200 rounded-3xl bg-white/50 backdrop-blur-sm">
      <div className="bg-slate-100 p-5 rounded-full mb-4">
        <Icon className="h-9 w-9 text-slate-400" />
      </div>
      <h3 className="text-xl font-bold text-slate-900">{title}</h3>
      <p className="text-slate-500 max-w-xs text-sm mt-1">{desc}</p>
    </div>
  );
}
