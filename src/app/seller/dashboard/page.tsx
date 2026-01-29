"use client";

import { useEffect, useState } from "react";
import {
  getMyListings,
  disputePickup,
  deleteScrapItem,
} from "@/app/actions";
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
  Trash2,
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { toast } from "sonner";
import { CreateListingDialog } from "@/components/listings/CreateListingDialog";
import { EditListingDialog } from "@/components/listings/EditListingDialog";
import { Calendar } from "lucide-react";

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

  // Handle Delete
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to unlist this item?")) return;
    
    toast.promise(deleteScrapItem(id), {
      loading: "Unlisting...",
      success: () => {
        loadData();
        return "Item unlisted successfully.";
      },
      error: "Failed to delete.",
    });
  };

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
                <ListingGrid 
                  items={active} 
                  type="ACTIVE" 
                  onDelete={handleDelete} 
                  onRefresh={loadData} 
                />
              </TabsContent>
              <TabsContent value="reserved" className="mt-6">
                <ListingGrid
                  items={reserved}
                  type="RESERVED"
                  onDispute={handleDispute}
                  onRefresh={loadData}
                />
              </TabsContent>
              <TabsContent value="history" className="mt-6">
                <ListingGrid items={collected} type="COLLECTED" onRefresh={loadData} />
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
          <div className="text-xs text-muted-foreground uppercase font-medium tracking-wider">
            {label}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ListingGrid({ items, type, onDispute, onDelete, onRefresh }: any) {
  if (items.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed rounded-2xl bg-white/50 border-slate-200">
        <Package className="h-12 w-12 mx-auto text-slate-300 mb-3" />
        <p className="text-slate-500 font-medium">No listings found in this category.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item: any) => (
        <Card
          key={item.id}
          className="overflow-hidden hover:shadow-xl transition-all border-none bg-white/80 backdrop-blur-sm shadow-sm flex flex-col group"
        >
          <div className="relative aspect-video bg-muted overflow-hidden">
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.title}
                className="object-cover w-full h-full transition-transform group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-slate-300">
                <Package className="h-8 w-8 opacity-20" />
              </div>
            )}
            <Badge className="absolute top-3 right-3 bg-white/90 text-slate-900 border-none hover:bg-white shadow-sm font-bold text-[10px] tracking-wider uppercase">
              {item.wasteType}
            </Badge>
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold text-slate-800 line-clamp-1 group-hover:text-primary transition-colors">
              {item.title}
            </CardTitle>
            <div className="text-xs text-slate-500 font-medium flex items-center gap-1">
              <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 font-bold">{item.estimatedWeight} kg</span>
              <span className="opacity-30">•</span>
              <span className="line-clamp-1">{item.address}</span>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            {type === "RESERVED" && (
              <div className="space-y-3 pt-2">
                <div className="bg-orange-50/50 border border-orange-100 text-orange-700 text-[11px] font-semibold p-2.5 rounded-xl flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5" />
                  Pickup: {item.pickupTime ? format(new Date(item.pickupTime), "MMM d, h:mm a") : "Scheduled Soon"}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-xs text-orange-600 hover:bg-orange-50 hover:text-orange-700 rounded-lg h-9 font-bold"
                  onClick={() => onDispute(item.id)}
                >
                  <AlertTriangle className="h-3.5 w-3.5 mr-2" /> Report Issue
                </Button>
              </div>
            )}
            {type === "ACTIVE" && (
              <div className="space-y-3 pt-2">
                <div className="text-[11px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-lg w-fit flex items-center gap-1.5 grayscale opacity-60">
                   <Loader2 className="h-3 w-3 animate-spin" /> Waiting for collector
                </div>
                <div className="flex gap-2 pt-1 opacity-0 group-hover:opacity-100 transition-all">
                  <EditListingDialog item={item} onSuccess={onRefresh} />
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-2 rounded-lg h-9 border-red-100 text-red-500 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                    onClick={() => onDelete(item.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Unlist
                  </Button>
                </div>
              </div>
            )}
            {type === "COLLECTED" && (
              <div className="pt-2 space-y-3">
                <div className="text-xs text-green-600 bg-green-50 px-3 py-1.5 rounded-xl font-bold flex items-center gap-2 border border-green-100">
                  <CheckCircle className="h-3.5 w-3.5" /> Collection Completed
                </div>
                {item.totalAmount && (
                  <div className="bg-slate-900 rounded-xl p-3 text-white flex justify-between items-center">
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Total Earned</p>
                      <p className="text-lg font-black">${item.totalAmount.toFixed(2)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] font-bold text-white/60 uppercase tracking-widest">Unit Price</p>
                      <p className="text-xs font-bold text-white">${item.unitPrice?.toFixed(2)}/kg</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
