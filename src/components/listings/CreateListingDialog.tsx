import { useState, useCallback } from "react";
import { createScrapItem } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Loader2, MapPin } from "lucide-react";
import { toast } from "sonner";

interface CreateListingDialogProps {
  onSuccess?: () => void;
}

export function CreateListingDialog({ onSuccess }: CreateListingDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");

  const handleOpen = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  const detectLocation = useCallback(() => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    toast.info("Getting current location...");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLatitude(pos.coords.latitude.toFixed(6));
        setLongitude(pos.coords.longitude.toFixed(6));
        toast.success("Location acquired!");
      },
      () => toast.error("Could not get location. Please enable GPS.")
    );
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!latitude || !longitude) {
      toast.error("Location coordinates are required.");
      return;
    }

    setLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);

    const result = await createScrapItem(formData);

    if (result.success) {
      toast.success("Scrap listed successfully!");
      if (onSuccess) onSuccess();
      setOpen(false);
      setLatitude("");
      setLongitude("");
    } else {
      toast.error(result.error || "Failed to create listing");
    }
    setLoading(false);
  };

  const inputClasses = "bg-slate-50 border-slate-200 focus-visible:ring-primary h-11";
  const labelClasses = "text-sm font-semibold text-slate-700 mb-1.5 inline-block";

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 rounded-xl h-11 px-6 shadow-md shadow-primary/20">
          <Plus className="h-5 w-5" /> Sell Scrap
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] rounded-3xl p-6 overflow-y-auto max-h-[90vh]">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-2xl font-bold tracking-tight">Create New Listing</DialogTitle>
          <DialogDescription className="text-slate-500 text-sm">
            List your scrap materials for pickup by collectors in your area.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 pt-4">
          {/* Title Output */}
          <div className="space-y-0.5">
            <Label htmlFor="title" className={labelClasses}>Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="e.g., Old electronics for recycling"
              required
              className={`${inputClasses} border-primary/40 focus-visible:border-primary ring-offset-0`}
            />
          </div>

          {/* Description */}
          <div className="space-y-0.5">
            <Label htmlFor="description" className={labelClasses}>Description (Optional)</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe your scrap materials..."
              className="bg-slate-50 border-slate-200 focus-visible:ring-primary min-h-[100px] resize-none"
            />
          </div>

          {/* Type & Weight Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-0.5">
              <Label htmlFor="wasteType" className={labelClasses}>Waste Type</Label>
              <Select name="wasteType" required defaultValue="MIXED">
                <SelectTrigger className={inputClasses}>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="MIXED">Mixed</SelectItem>
                  <SelectItem value="METAL">Metal</SelectItem>
                  <SelectItem value="PLASTIC">Plastic</SelectItem>
                  <SelectItem value="PAPER">Paper</SelectItem>
                  <SelectItem value="E_WASTE">E-Waste</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-0.5">
              <Label htmlFor="estimatedWeight" className={labelClasses}>Weight (kg)</Label>
              <Input
                id="estimatedWeight"
                name="estimatedWeight"
                type="number"
                placeholder="1"
                required
                className={inputClasses}
              />
            </div>
          </div>

          {/* Image URL */}
          <div className="space-y-0.5">
            <Label htmlFor="imageUrl" className={labelClasses}>Image URL</Label>
            <Input 
              id="imageUrl" 
              name="imageUrl" 
              placeholder="https://example.com/image.jpg" 
              className={inputClasses}
            />
          </div>

          {/* Address */}
          <div className="space-y-0.5">
            <Label htmlFor="address" className={labelClasses}>Pickup Address</Label>
            <Input 
              id="address" 
              name="address" 
              placeholder="Enter your address" 
              required
              className={inputClasses}
            />
          </div>

          {/* Coordinates Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-0.5">
              <Label htmlFor="latitude" className={labelClasses}>Latitude</Label>
              <Input
                id="latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                placeholder="6.9271"
                required
                className={inputClasses}
              />
            </div>
            <div className="space-y-0.5">
              <Label htmlFor="longitude" className={labelClasses}>Longitude</Label>
              <Input
                id="longitude"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                placeholder="79.8612"
                required
                className={inputClasses}
              />
            </div>
          </div>

          {/* Use Location Button */}
          <Button 
            type="button" 
            variant="outline" 
            className="w-full gap-2 rounded-xl h-11 border-slate-200 text-slate-600 hover:bg-slate-50"
            onClick={detectLocation}
          >
            <MapPin className="h-4 w-4" /> Use Current Location
          </Button>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full h-12 rounded-xl text-base font-semibold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all mt-4" 
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              "Create Listing"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
