"use client";

import { useEffect, useState } from "react";
import { getMyListings, disputePickup, markAsCollected, deleteScrapItem } from "@/app/actions";
import { ScrapItem } from "@/types";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  Clock,
  CheckCircle,
  AlertTriangle,
  Loader2,
  Plus,
  Trash2,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { CreateListingDialog } from "@/components/listings/CreateListingDialog";

// Validate image URLs - accepts both HTTP URLs and local upload paths
function isValidImageUrl(url: unknown): url is string {
  if (typeof url !== "string" || url.length === 0) return false;
  // Accept local uploads path
  if (url.startsWith("/uploads/")) return true;
  // Accept HTTP/HTTPS URLs
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

export default function SellerDashboard() {
  const [listings, setListings] = useState<ScrapItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data on mount
  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const data = await getMyListings();
    setListings(data as any);
    setLoading(false);
  }

  // Handle Dispute
  const handleDispute = async (id: string) => {
    toast.promise(disputePickup(id), {
      loading: "Cancelling pickup...",
      success: () => {
        loadData(); // Refresh data
        return "Pickup cancelled. Item is back on the map.";
      },
      error: "Failed to cancel.",
    });
  };

  // Handle Delete
  const handleDelete = async (id: string) => {
    toast.promise(deleteScrapItem(id), {
      loading: "Deleting listing...",
      success: () => {
        loadData(); // Refresh data
        return "Listing deleted successfully.";
      },
      error: "Failed to delete.",
    });
  };

  const active = listings.filter((l) => l.status === "ACTIVE");
  const reserved = listings.filter((l) => l.status === "RESERVED");
  const collected = listings.filter((l) => l.status === "COLLECTED");

  return (
    <AppLayout>
      <div className="container py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-primary">
              My Scrap
            </h1>
            <p className="text-muted-foreground">
              Manage your listings and track pickups.
            </p>
          </div>
          <CreateListingDialog onSuccess={loadData} />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <StatCard
            icon={Package}
            label="Active"
            value={active.length}
            color="text-blue-500"
            bg="bg-blue-500/10"
          />
          <StatCard
            icon={Clock}
            label="Pending"
            value={reserved.length}
            color="text-orange-500"
            bg="bg-orange-500/10"
          />
          <StatCard
            icon={CheckCircle}
            label="Sold"
            value={collected.length}
            color="text-green-500"
            bg="bg-green-500/10"
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="reserved">Pending Pickup</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          {loading ? (
            <div className="py-20 flex justify-center">
              <Loader2 className="animate-spin text-primary" />
            </div>
          ) : (
            <>
              <TabsContent value="active" className="mt-6">
                <ListingGrid items={active} type="ACTIVE" onDelete={handleDelete} />
              </TabsContent>
              <TabsContent value="reserved" className="mt-6">
                <ListingGrid
                  items={reserved}
                  type="RESERVED"
                  onDispute={handleDispute}
                />
              </TabsContent>
              <TabsContent value="history" className="mt-6">
                <ListingGrid items={collected} type="COLLECTED" />
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </AppLayout>
  );
}

// --- Sub Components ---

function StatCard({ icon: Icon, label, value, color, bg }: any) {
  return (
    <Card className="glass transition-all hover:scale-105 border-none">
      <CardContent className="p-6 flex items-center gap-4">
        <div className={`p-4 rounded-2xl ${bg} ${color} bg-opacity-20`}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <div className="text-3xl font-bold tracking-tight">{value}</div>
          <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider">
            {label}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ListingGrid({ items, type, onDispute, onDelete }: any) {
  if (items.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed rounded-lg">
        <Package className="h-12 w-12 mx-auto text-muted-foreground/30 mb-3" />
        <p className="text-muted-foreground">No listings found.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item: any) => (
        <Card
          key={item.id}
          className="overflow-hidden hover:shadow-lg transition-all"
        >
          <div className="relative aspect-video bg-muted">
            {isValidImageUrl(item.imageUrl) ? (
              <Image
                src={item.imageUrl}
                alt={item.title ?? "listing image"}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                No Image
              </div>
            )}
            <Badge className="absolute top-2 right-2">{item.wasteType}</Badge>
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg line-clamp-1">{item.title}</CardTitle>
            <div className="text-sm text-muted-foreground">
              {item.estimatedWeight} kg • {item.address}
            </div>
          </CardHeader>
          <CardContent>
            {type === "RESERVED" && (
              <div className="space-y-3">
                {/* Collector Contact Info */}
                {item.collector && (
                  <div className="bg-green-50 p-2 rounded border border-green-100">
                    <p className="text-xs font-medium text-green-900 mb-1">Collector</p>
                    <p className="text-sm text-green-800 font-medium">{item.collector.fullName}</p>
                    {item.collector.phone && (
                      <p className="text-xs text-green-700">
                        📞 <a href={`tel:${item.collector.phone}`} className="underline">{item.collector.phone}</a>
                      </p>
                    )}
                  </div>
                )}
                <div className="bg-orange-50 text-orange-700 text-xs p-2 rounded flex items-center gap-2">
                  <Clock className="h-3 w-3" />
                  Pickup:{" "}
                  {item.pickupTime
                    ? formatDistanceToNow(new Date(item.pickupTime), {
                      addSuffix: true,
                    })
                    : "Soon"}
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  className="w-full"
                  onClick={() => onDispute(item.id)}
                >
                  <AlertTriangle className="h-3 w-3 mr-2" /> Report Issue
                </Button>
              </div>
            )}
            {type === "ACTIVE" && (
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground italic">
                  Waiting for collector...
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => onDelete(item.id)}
                >
                  <Trash2 className="h-3 w-3 mr-2" /> Delete Listing
                </Button>
              </div>
            )}
            {type === "COLLECTED" && (
              <div className="space-y-2">
                {/* Collector Contact Info */}
                {item.collector && (
                  <div className="bg-green-50 p-2 rounded border border-green-100">
                    <p className="text-xs font-medium text-green-900 mb-1">Collected by</p>
                    <p className="text-sm text-green-800 font-medium">{item.collector.fullName}</p>
                    {item.collector.phone && (
                      <p className="text-xs text-green-700">
                        📞 <a href={`tel:${item.collector.phone}`} className="underline">{item.collector.phone}</a>
                      </p>
                    )}
                  </div>
                )}
                <div className="text-xs text-green-600 font-medium flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" /> Transaction Complete
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
