import { MapPin, Landmark, Globe, Shield, Trophy, Star, LucideIcon } from "lucide-react";
import { DropCategory } from "../types/drop.types";

// Maps the strict backend category to a frontend Lucide Icon
export const getCategoryIcon = (category: string): LucideIcon => {
  switch (category) {
    case DropCategory.HOST_CITY: return MapPin;
    case DropCategory.STADIUM: return Landmark;
    case DropCategory.COUNTRY: return Globe;
    case DropCategory.EVENT_BADGE: return Shield;
    case DropCategory.TROPHY: return Trophy;
    case DropCategory.SPECIAL: return Star;
    default: return Star;
  }
};

// Maps categories to display labels
export const getCategoryLabel = (category: string): string => {
  return category.replace("_", " ");
};