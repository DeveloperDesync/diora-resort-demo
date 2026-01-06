export interface Villa {
  id: string
  name: string
  slug: string
  description: string
  longDescription: string
  capacity: number
  bedrooms: number
  bathrooms: number
  pricePerNight: number
  images: string[]
  amenities: string[]
  featured: boolean
  availability: "available" | "reserved" | "blocked"
}

export interface Reservation {
  id: string
  villaId: string
  villaName: string
  guestName: string
  guestEmail: string
  checkIn: string
  checkOut: string
  guests: number
  totalPrice: number
  status: "upcoming" | "completed" | "cancelled"
  createdAt: string
}

export const MOCK_VILLAS: Villa[] = [
  {
    id: "1",
    name: "Sunset Villa",
    slug: "sunset-villa",
    description: "A serene oceanfront retreat with panoramic sunset views",
    longDescription:
      "Experience the ultimate in luxury living with our signature Sunset Villa. This stunning retreat features floor-to-ceiling windows that frame breathtaking ocean views, a private infinity pool, and direct beach access. The interior blends contemporary design with natural materials, creating a harmonious space that celebrates both comfort and style.",
    capacity: 4,
    bedrooms: 2,
    bathrooms: 2,
    pricePerNight: 850,
    images: [
      "/luxury-beach-villa-sunset-ocean-view.jpg",
      "/modern-villa-bedroom-ocean-view.jpg",
      "/luxury-outdoor-pool-tropical.jpg",
      "/elegant-bathroom-spa-luxury.jpg",
    ],
    amenities: [
      "Private infinity pool",
      "Ocean view terrace",
      "Outdoor shower",
      "Smart home system",
      "High-speed WiFi",
      "Espresso machine",
      "Beach access",
      "Daily housekeeping",
    ],
    featured: true,
    availability: "available",
  },
  {
    id: "2",
    name: "Garden House",
    slug: "garden-house",
    description: "Nestled in lush tropical gardens with ultimate privacy",
    longDescription:
      "Surrounded by verdant tropical gardens, the Garden House offers a peaceful sanctuary where nature and luxury intertwine. This spacious residence features an open-plan living area, a gourmet kitchen, and a private garden with an outdoor pavilion perfect for alfresco dining.",
    capacity: 6,
    bedrooms: 3,
    bathrooms: 3,
    pricePerNight: 1200,
    images: [
      "/tropical-garden-villa-lush-greenery.jpg",
      "/luxury-villa-living-room-nature.jpg",
      "/outdoor-dining-pavilion-tropical.jpg",
      "/master-bedroom-garden-view.jpg",
    ],
    amenities: [
      "Private garden",
      "Outdoor pavilion",
      "Gourmet kitchen",
      "Wine cellar",
      "Library",
      "Yoga deck",
      "BBQ area",
      "Concierge service",
    ],
    featured: true,
    availability: "available",
  },
  {
    id: "3",
    name: "Cliff Residence",
    slug: "cliff-residence",
    description: "Dramatic cliffside location with unobstructed ocean panoramas",
    longDescription:
      "Perched on a dramatic clifftop, this architectural masterpiece offers unparalleled views of the endless ocean horizon. The Cliff Residence combines bold contemporary design with sustainable materials, featuring expansive terraces, a heated infinity pool, and interiors that blur the boundaries between indoor and outdoor living.",
    capacity: 8,
    bedrooms: 4,
    bathrooms: 4,
    pricePerNight: 1800,
    images: [
      "/cliffside-modern-villa-ocean-panorama.jpg",
      "/infinity-pool-cliff-ocean-view.jpg",
      "/contemporary-living-space-ocean.jpg",
      "/luxury-terrace-sunset-ocean.jpg",
    ],
    amenities: [
      "Heated infinity pool",
      "Private gym",
      "Home theater",
      "Wine bar",
      "Multiple terraces",
      "Butler service",
      "Private chef available",
      "Helipad access",
    ],
    featured: true,
    availability: "available",
  },
  {
    id: "4",
    name: "Beach Bungalow",
    slug: "beach-bungalow",
    description: "Intimate beachfront escape steps from the shore",
    longDescription:
      "Experience barefoot luxury in our charming Beach Bungalow, located just steps from pristine white sands. This intimate retreat features natural wood finishes, ocean-inspired decor, and a private deck perfect for morning coffee or sunset cocktails.",
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    pricePerNight: 550,
    images: [
      "/beach-bungalow-tropical-sand.jpg",
      "/cozy-bedroom-beach-view.jpg",
      "/outdoor-deck-beachfront.jpg",
      "/placeholder.svg?height=800&width=1200",
    ],
    amenities: [
      "Direct beach access",
      "Private deck",
      "Outdoor shower",
      "Hammock",
      "Kitchenette",
      "Beach equipment",
      "Daily breakfast",
      "Bicycle rental",
    ],
    featured: false,
    availability: "available",
  },
  {
    id: "5",
    name: "Forest Retreat",
    slug: "forest-retreat",
    description: "Secluded rainforest hideaway with natural pool",
    longDescription:
      "Immerse yourself in nature at the Forest Retreat, a secluded haven tucked into lush rainforest. This eco-luxury residence features sustainable design, a natural spring-fed pool, and expansive windows that invite the forest inside.",
    capacity: 4,
    bedrooms: 2,
    bathrooms: 2,
    pricePerNight: 950,
    images: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    amenities: [
      "Natural pool",
      "Forest trails",
      "Outdoor bath",
      "Fireplace",
      "Meditation space",
      "Organic minibar",
      "Bird watching deck",
      "Spa treatments",
    ],
    featured: false,
    availability: "reserved",
  },
  {
    id: "6",
    name: "Hilltop Haven",
    slug: "hilltop-haven",
    description: "Elevated sanctuary with 360-degree island views",
    longDescription:
      "Crown jewel of Diora Resort, the Hilltop Haven sits at the highest point of the property, offering breathtaking 360-degree views. This luxurious estate features multiple living areas, a spectacular infinity pool, and wraparound terraces perfect for entertaining.",
    capacity: 10,
    bedrooms: 5,
    bathrooms: 5,
    pricePerNight: 2500,
    images: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    amenities: [
      "Multiple infinity pools",
      "Private spa",
      "Professional kitchen",
      "Wine cellar",
      "Game room",
      "Office space",
      "Staff quarters",
      "Full concierge team",
    ],
    featured: true,
    availability: "available",
  },
]

// Initialize with empty reservations array
// const mockReservations: Reservation[] = []

export function getMockReservations(): Reservation[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem("diora_reservations")
  return stored ? JSON.parse(stored) : []
}

export function addMockReservation(reservation: Omit<Reservation, "id" | "createdAt">): Reservation {
  const newReservation: Reservation = {
    ...reservation,
    id: `RES-${Date.now()}`,
    createdAt: new Date().toISOString(),
  }

  const existing = getMockReservations()
  existing.push(newReservation)
  if (typeof window !== "undefined") {
    localStorage.setItem("diora_reservations", JSON.stringify(existing))
  }

  return newReservation
}

export function cancelMockReservation(id: string): boolean {
  const reservations = getMockReservations()
  const reservation = reservations.find((r) => r.id === id)
  if (reservation) {
    reservation.status = "cancelled"
    if (typeof window !== "undefined") {
      localStorage.setItem("diora_reservations", JSON.stringify(reservations))
    }
    return true
  }
  return false
}

export function updateVillaAvailability(villaId: string, status: "available" | "reserved" | "blocked"): boolean {
  const villa = MOCK_VILLAS.find((v) => v.id === villaId)
  if (villa) {
    villa.availability = status
    return true
  }
  return false
}
