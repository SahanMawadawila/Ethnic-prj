export type UserRole = "SELLER" | "COLLECTOR" | "ADMIN";
export type WasteType = "PLASTIC" | "METAL" | "PAPER" | "E_WASTE" | "MIXED";
export type ItemStatus = "ACTIVE" | "RESERVED" | "COLLECTED" | "CANCELLED";

// Matches the Prisma 'Profile' model
export interface Profile {
  id: string;
  email: string;
  fullName: string; 
  role: UserRole;
  phone: string | null;
  avatarUrl: string | null;
  vehicleType: string | null;
  licensePlate: string | null;
  operatingRadius: number | null;

  createdAt: Date | string;
  updatedAt: Date | string;
  
  // Relations
  itemsToSell?: ScrapItem[];
  itemsToCollect?: ScrapItem[];
}

// Matches the Prisma 'ScrapItem' model
export interface ScrapItem {
  id: string;
  title: string;
  description: string | null;
  wasteType: WasteType;
  estimatedWeight: number;
  imageUrl: string | null;
  address: string;
  latitude: number;
  longitude: number;
  status: ItemStatus;

  sellerId: string;
  collectorId: string | null;

  pickupTime: Date | string | null;
  completedAt: Date | string | null;
  unitPrice: number | null;
  totalAmount: number | null;

  createdAt: Date | string;
  updatedAt: Date | string;

  // Relations
  seller?: Profile;
  collector?: Profile;
}

// Config Helpers
export const WASTE_TYPE_CONFIG: Record<
  WasteType,
  { label: string; color: string; bgColor: string; mapColor: string }
> = {
  PLASTIC: { 
    label: "Plastic", 
    color: "text-blue-600", 
    bgColor: "bg-blue-100",
    mapColor: "bg-blue-500" 
  },
  METAL: { 
    label: "Metal", 
    color: "text-red-600", 
    bgColor: "bg-red-100",
    mapColor: "bg-red-500"
  },
  PAPER: { 
    label: "Paper", 
    color: "text-yellow-600", 
    bgColor: "bg-yellow-100",
    mapColor: "bg-yellow-400"
  },
  E_WASTE: {
    label: "E-Waste",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    mapColor: "bg-purple-500"
  },
  MIXED: { 
    label: "Mixed", 
    color: "text-gray-600", 
    bgColor: "bg-gray-100",
    mapColor: "bg-slate-500"
  },
};

export const STATUS_CONFIG: Record<
  ItemStatus,
  {
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline";
  }
> = {
  ACTIVE: { label: "Active", variant: "default" },
  RESERVED: { label: "Reserved", variant: "secondary" },
  COLLECTED: { label: "Collected", variant: "outline" },
  CANCELLED: { label: "Cancelled", variant: "destructive" },
};
