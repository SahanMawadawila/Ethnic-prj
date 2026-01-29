"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrapItem, WASTE_TYPE_CONFIG } from "@/types";
import { Loader2, Navigation, Clock, Package, Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { format, addHours, startOfHour } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface ListingSheetProps {
  listing: ScrapItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept: (time: Date) => void;
  isLoading: boolean;
}

export function ListingSheet({
  listing,
  open,
  onOpenChange,
  onAccept,
  isLoading,
}: ListingSheetProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string>("12:00");

  if (!listing) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-[2.5rem] border-none bg-white/95 backdrop-blur-xl p-0 overflow-hidden sm:max-w-xl mx-auto shadow-2xl">
        <div className="bg-gradient-to-b from-primary/5 to-transparent p-6 pb-2">
          <SheetHeader className="text-left space-y-3">
            <div className="flex justify-between items-start">
              <SheetTitle className="text-2xl font-bold text-slate-900 tracking-tight">
                {listing.title}
              </SheetTitle>
              <Badge className={`${WASTE_TYPE_CONFIG[listing.wasteType].bgColor} ${WASTE_TYPE_CONFIG[listing.wasteType].color} border-none px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider`}>
                {WASTE_TYPE_CONFIG[listing.wasteType].label}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-sm italic">
              <Navigation className="h-3.5 w-3.5" />
              <SheetDescription className="text-slate-500 font-medium">{listing.address}</SheetDescription>
            </div>
          </SheetHeader>
        </div>

        <div className="p-6 pt-2 space-y-6">
          {/* Image Area */}
          <div className="aspect-[21/9] bg-slate-100 rounded-3xl relative overflow-hidden shadow-inner border border-slate-200/50 group">
            {listing.imageUrl ? (
              <img
                src={listing.imageUrl}
                alt="Scrap Material"
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-2">
                <Package className="h-8 w-8 opacity-20" />
                <span className="text-xs font-semibold uppercase tracking-widest opacity-40">No preview</span>
              </div>
            )}
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-2xl p-3 flex items-center gap-3 border border-slate-100">
              <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-primary">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Estimated Weight</p>
                <p className="text-sm font-bold text-slate-700">{listing.estimatedWeight} <span className="text-[10px] ml-0.5">kg</span></p>
              </div>
            </div>
            <div className="bg-slate-50 rounded-2xl p-3 flex items-center gap-3 border border-slate-100">
              <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-primary">
                <Navigation className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Distance Check</p>
                <p className="text-sm font-bold text-slate-700">Near you</p>
              </div>
            </div>
          </div>

          {/* Time Picker */}
          {/* Precise Time Picker */}
          <div className="space-y-4 pt-2">
            <p className="text-sm font-bold text-slate-800 tracking-tight">Schedule Collection</p>
            <div className="flex flex-col gap-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal rounded-2xl h-12 border-slate-200 bg-slate-50",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 rounded-3xl overflow-hidden shadow-2xl border-none">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                  />
                </PopoverContent>
              </Popover>

              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl p-1 px-3 h-12">
                <Clock className="h-4 w-4 text-primary" />
                <input 
                  type="time" 
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="bg-transparent border-none outline-none text-sm font-medium w-full"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2 pb-2">
            <Button
              variant="outline"
              size="lg"
              className="px-6 rounded-2xl border-slate-200 text-slate-600 hover:bg-slate-50 h-14"
              onClick={() =>
                window.open(
                  `https://maps.google.com/?q=${listing.latitude},${listing.longitude}`,
                  "_blank",
                )
              }
            >
              <Navigation className="h-5 w-5" />
            </Button>

            <Button
              size="lg"
              className="flex-1 rounded-2xl h-14 text-base font-bold shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90"
              disabled={!date || !time || isLoading}
              onClick={() => {
                if (date) {
                  const [hours, minutes] = time.split(':').map(Number);
                  const pickupDateTime = new Date(date);
                  pickupDateTime.setHours(hours, minutes, 0, 0);
                  onAccept(pickupDateTime);
                }
              }}
            >
              {isLoading ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                "Schedule Pickup"
              )}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
