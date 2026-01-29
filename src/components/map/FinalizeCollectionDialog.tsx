import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrapItem, WASTE_TYPE_CONFIG } from "@/types";
import { CheckCircle, Info } from "lucide-react";

interface FinalizeCollectionDialogProps {
  item: ScrapItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (unitPrice: number, totalAmount: number) => Promise<void>;
  isLoading: boolean;
}

export function FinalizeCollectionDialog({
  item,
  open,
  onOpenChange,
  onConfirm,
  isLoading,
}: FinalizeCollectionDialogProps) {
  const [unitPrice, setUnitPrice] = useState<string>("");
  const [actualWeight, setActualWeight] = useState<string>("");
  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    if (item) {
      setActualWeight(item.estimatedWeight.toString());
    }
  }, [item]);

  useEffect(() => {
    const price = parseFloat(unitPrice) || 0;
    const weight = parseFloat(actualWeight) || 0;
    setTotalAmount(price * weight);
  }, [unitPrice, actualWeight]);

  const handleConfirm = () => {
    const price = parseFloat(unitPrice);
    if (isNaN(price) || price <= 0) return;
    onConfirm(price, totalAmount);
  };

  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] rounded-3xl p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Finalize Collection</DialogTitle>
          <DialogDescription>
            Enter the weight and unit price to calculate the total payment for {item.title}.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          <div className="bg-primary/5 rounded-2xl p-4 flex items-center gap-3 border border-primary/10">
             <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Info className="h-5 w-5" />
             </div>
             <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Estimated Weight</p>
                <p className="text-sm font-bold text-slate-700">{item.estimatedWeight} kg</p>
             </div>
          </div>

          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="actualWeight" className="text-sm font-semibold">Actual Weight (kg)</Label>
              <Input
                id="actualWeight"
                type="number"
                step="0.01"
                value={actualWeight}
                onChange={(e) => setActualWeight(e.target.value)}
                placeholder="0.00"
                className="h-11 rounded-xl bg-slate-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unitPrice" className="text-sm font-semibold">Unit Price (Rs. per kg)</Label>
              <Input
                id="unitPrice"
                type="number"
                step="0.01"
                value={unitPrice}
                onChange={(e) => setUnitPrice(e.target.value)}
                placeholder="0.00"
                className="h-11 rounded-xl bg-slate-50"
              />
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl p-5 text-white flex justify-between items-center shadow-lg shadow-slate-200">
             <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total to Pay</p>
                <p className="text-2xl font-black">Rs.{totalAmount.toFixed(2)}</p>
             </div>
             <div className="text-right opacity-60">
                <p className="text-[10px] font-bold uppercase tracking-widest">{WASTE_TYPE_CONFIG[item.wasteType].label}</p>
                <p className="text-xs font-medium">Market Rate Applied</p>
             </div>
          </div>

          <Button
            className="w-full h-12 rounded-xl text-base font-bold shadow-lg shadow-primary/20"
            onClick={handleConfirm}
            disabled={isLoading || !unitPrice || parseFloat(unitPrice) <= 0}
          >
            {isLoading ? "Recording..." : "Confirm Collection"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
