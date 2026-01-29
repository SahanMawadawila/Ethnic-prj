import { useState } from "react";
import { updateScrapItem } from "@/app/actions";
import { ScrapItem } from "@/types";
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
import { Edit2, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface EditListingDialogProps {
  item: ScrapItem;
  onSuccess?: () => void;
}

export function EditListingDialog({ item, onSuccess }: EditListingDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const result = await updateScrapItem(item.id, formData);

    if (result.success) {
      toast.success("Listing updated successfully!");
      if (onSuccess) onSuccess();
      setOpen(false);
    } else {
      toast.error(result.error || "Failed to update listing");
    }
    setLoading(false);
  };

  const inputClasses = "bg-slate-50 border-slate-200 focus-visible:ring-primary h-11";
  const labelClasses = "text-sm font-semibold text-slate-700 mb-1.5 inline-block";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 rounded-lg h-9">
          <Edit2 className="h-3.5 w-3.5" /> Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] rounded-3xl p-6 overflow-y-auto max-h-[90vh]">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-2xl font-bold tracking-tight">Edit Listing</DialogTitle>
          <DialogDescription className="text-slate-500 text-sm">
            Modify the details of your scrap listing.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 pt-4">
          <div className="space-y-0.5">
            <Label htmlFor="title" className={labelClasses}>Title</Label>
            <Input
              id="title"
              name="title"
              defaultValue={item.title}
              required
              className={inputClasses}
            />
          </div>

          <div className="space-y-0.5">
            <Label htmlFor="description" className={labelClasses}>Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={item.description || ""}
              className="bg-slate-50 border-slate-200 focus-visible:ring-primary min-h-[100px] resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-0.5">
              <Label htmlFor="wasteType" className={labelClasses}>Waste Type</Label>
              <Select name="wasteType" required defaultValue={item.wasteType}>
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
                step="0.1"
                defaultValue={item.estimatedWeight}
                required
                className={inputClasses}
              />
            </div>
          </div>

          <div className="space-y-0.5">
            <Label htmlFor="imageUrl" className={labelClasses}>Image URL</Label>
            <Input 
              id="imageUrl" 
              name="imageUrl" 
              defaultValue={item.imageUrl || ""}
              className={inputClasses}
            />
          </div>

          <div className="space-y-0.5">
            <Label htmlFor="address" className={labelClasses}>Pickup Address</Label>
            <Input 
              id="address" 
              name="address" 
              defaultValue={item.address}
              required
              className={inputClasses}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 rounded-xl text-base font-semibold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all mt-4" 
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
