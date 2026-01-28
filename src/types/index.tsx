export type UserRole = "SELLER" | "COLLECTOR" | "ADMIN";
export type WasteType = "PLASTIC" | "METAL" | "PAPER" | "E_WASTE" | "MIXED";
export type ListingStatus = "ACTIVE" | "RESERVED" | "COLLECTED" | "CANCELLED";

// Matches the Prisma 'Profile' model
export interface Profile {
  id: string;
  email: string;
  fullName: string | null; // Changed from full_name
  role: UserRole;
  phone: string | null;
  avatarUrl: string | null; // Changed from avatar_url
  vehicleType: string | null; // Changed from vehicle_type
  plateNumber: string | null; // Changed from license_plate
  operatingRadius: number | null; // Changed from operating_radius

  // These might not be returned by Prisma unless you select them specifically,
  // but good to have optional just in case.
  currentLatitude?: number | null;
  currentLongitude?: number | null;

  createdAt: Date | string; // Prisma returns Date objects
  updatedAt: Date | string;
}

// Matches the Prisma 'ScrapItem' model
export interface ScrapItem {
  id: string;
  title: string;
  description: string | null;
  wasteType: WasteType; // Changed from waste_type
  estimatedWeight: number; // Changed from estimated_weight
  imageUrl: string | null; // Changed from image_url
  address: string;
  latitude: number;
  longitude: number;
  status: ListingStatus;

  sellerId: string; // Changed from seller_id
  collectorId: string | null; // Changed from collector_id

  pickupTime: Date | string | null; // Changed from pickup_time
  completedAt: Date | string | null; // Changed from completed_at

  // Note: These fields are not in your Prisma schema yet,
  // but if you want them, we can keep them optional.
  etaMinutes?: number | null;
  disputedAt?: Date | string | null;

  createdAt: Date | string;
  updatedAt: Date | string;

  // Relations (Optional because they aren't always fetched)
  seller?: Profile;
  collector?: Profile;
}

// Config Helpers
export const WASTE_TYPE_CONFIG: Record<
  WasteType,
  { label: string; color: string; bgColor: string }
> = {
  PLASTIC: { label: "Plastic", color: "text-blue-600", bgColor: "bg-blue-100" },
  METAL: { label: "Metal", color: "text-red-600", bgColor: "bg-red-100" },
  PAPER: { label: "Paper", color: "text-yellow-600", bgColor: "bg-yellow-100" },
  E_WASTE: {
    label: "E-Waste",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  MIXED: { label: "Mixed", color: "text-gray-600", bgColor: "bg-gray-100" },
};

export const STATUS_CONFIG: Record<
  ListingStatus,
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
