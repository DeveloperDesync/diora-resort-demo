export interface Villa {
  id: string
  resortId: string
  name: string
  slug: string
  description: string
  capacity: number
  bedrooms: number
  pricePerNight: number
  images: string[]
  amenities: string[]
  availability: "available" | "reserved" | "blocked"
}

export interface Resort {
  id: string
  name: string
  slug: string
  location: string
  municipality: string
  description: string
  longDescription: string
  images: string[]
  amenities: string[]
  featured: boolean
  villaCount: number
}

export interface Reservation {
  id: string
  villaId: string
  villaName: string
  resortId: string
  resortName: string
  guestName: string
  guestEmail: string
  checkIn: string
  checkOut: string
  guests: number
  totalPrice: number
  status: "upcoming" | "completed" | "cancelled"
  createdAt: string
}

export interface AdminUser {
  id: string
  email: string
  name: string
  role: "admin"
  resortIds: string[]
  createdAt: string
}

export const MOCK_RESORTS: Resort[] = [
  {
    id: "1",
    name: "Diora Resort",
    slug: "diora-resort",
    location: "Tibiao Riverview, Tibiao",
    municipality: "Tibiao",
    description: "Our flagship luxury resort offering world-class amenities and service",
    longDescription:
      "Diora Resort is our premier destination, combining contemporary luxury with authentic Filipino hospitality. Nestled along the scenic Tibiao River, this flagship property features state-of-the-art facilities, gourmet dining, infinity pools, and spacious villas designed for the discerning traveler.",
    images: [
      "/luxury-beach-villa-sunset-ocean-view.jpg",
      "/infinity-pool-cliff-ocean-view.jpg",
      "/luxury-villa-living-room-nature.jpg",
      "/modern-villa-bedroom-ocean-view.jpg",
    ],
    amenities: [
      "Infinity pool",
      "Fine dining restaurant",
      "Spa & wellness center",
      "Fitness center",
      "Business center",
      "Free high-speed WiFi",
      "Concierge service",
      "Airport transfers",
    ],
    featured: true,
    villaCount: 6,
  },
  {
    id: "2",
    name: "Malumpati Eco Resort",
    slug: "malumpati-eco-resort",
    location: "Malumpati Cold Spring, Pandan",
    municipality: "Pandan",
    description: "Nestled by crystal-clear spring waters in the heart of nature",
    longDescription:
      "Experience eco-luxury at its finest at Malumpati Eco Resort, located beside the famous cold spring. This sustainable paradise offers modern amenities while preserving the natural beauty of Antique.",
    images: [
      "/luxury-outdoor-pool-tropical.jpg",
      "/tropical-garden-villa-lush-greenery.jpg",
      "/modern-villa-bedroom-ocean-view.jpg",
      "/elegant-bathroom-spa-luxury.jpg",
    ],
    amenities: [
      "Spring water pool",
      "Nature trails",
      "Restaurant & bar",
      "Free WiFi",
      "Kayaking",
      "Guided tours",
      "Organic garden",
    ],
    featured: true,
    villaCount: 4,
  },
  {
    id: "3",
    name: "Seco Island Beach Resort",
    slug: "seco-island-beach-resort",
    location: "Seco Island, Tibiao",
    municipality: "Tibiao",
    description: "Private island paradise with pristine white sand beaches",
    longDescription:
      "Escape to Seco Island Beach Resort, an exclusive island getaway with powdery white sand and crystal-clear turquoise waters. Perfect for romantic getaways, family vacations, or peaceful retreats.",
    images: [
      "/luxury-beach-villa-sunset-ocean-view.jpg",
      "/outdoor-dining-pavilion-tropical.jpg",
      "/cozy-bedroom-beach-view.jpg",
      "/outdoor-deck-beachfront.jpg",
    ],
    amenities: [
      "Private beach",
      "Island hopping tours",
      "Snorkeling equipment",
      "Beachfront dining",
      "Water sports",
      "Spa services",
    ],
    featured: true,
    villaCount: 5,
  },
  {
    id: "4",
    name: "Nogas Island Resort",
    slug: "nogas-island-resort",
    location: "Nogas Island, Anini-y",
    municipality: "Anini-y",
    description: "Secluded island sanctuary with breathtaking marine biodiversity",
    longDescription:
      "Discover Nogas Island Resort, a hidden gem surrounded by vibrant coral reefs and teeming marine life. This eco-conscious resort combines rustic charm with modern comfort.",
    images: [
      "/beach-bungalow-tropical-sand.jpg",
      "/infinity-pool-cliff-ocean-view.jpg",
      "/luxury-villa-living-room-nature.jpg",
      "/master-bedroom-garden-view.jpg",
    ],
    amenities: [
      "Diving center",
      "Marine sanctuary access",
      "Native cottages",
      "Fresh seafood restaurant",
      "Fishing trips",
      "Stargazing deck",
    ],
    featured: true,
    villaCount: 3,
  },
  {
    id: "5",
    name: "Bugtong Bato Falls Resort",
    slug: "bugtong-bato-falls-resort",
    location: "Bugtong Bato Falls, Tibiao",
    municipality: "Tibiao",
    description: "Adventure resort nestled by majestic seven-tiered waterfalls",
    longDescription:
      "Bugtong Bato Falls Resort offers an exhilarating mountain escape beside the spectacular seven-tiered waterfalls. Perfect for thrill-seekers, featuring zip-lining, river trekking, and bamboo rafting.",
    images: [
      "/cliffside-modern-villa-ocean-panorama.jpg",
      "/contemporary-living-space-ocean.jpg",
      "/luxury-terrace-sunset-ocean.jpg",
      "/tropical-garden-villa-lush-greenery.jpg",
    ],
    amenities: [
      "Waterfall access",
      "Zip line",
      "River tubing",
      "Trekking trails",
      "Native restaurant",
      "Adventure guides",
    ],
    featured: false,
    villaCount: 5,
  },
  {
    id: "6",
    name: "Mararison Island Resort",
    slug: "mararison-island-resort",
    location: "Mararison Island, Culasi",
    municipality: "Culasi",
    description: "Rustic beach resort on the 'Little Boracay' of Antique",
    longDescription:
      "Mararison Island Resort brings you back to basics with its laid-back island vibe and stunning sunsets. Known as the 'Little Boracay,' this island offers pristine beaches and peaceful atmosphere.",
    images: [
      "/luxury-beach-villa-sunset-ocean-view.jpg",
      "/beach-bungalow-tropical-sand.jpg",
      "/outdoor-deck-beachfront.jpg",
      "/cozy-bedroom-beach-view.jpg",
    ],
    amenities: [
      "Beachfront location",
      "Local cuisine",
      "Sunset viewpoint",
      "Island tour guides",
      "Hammocks",
      "Volleyball court",
    ],
    featured: false,
    villaCount: 4,
  },
]

export const MOCK_VILLAS: Villa[] = [
  // Diora Resort Villas
  {
    id: "v1",
    resortId: "1",
    name: "Sunset Villa",
    slug: "sunset-villa",
    description: "Luxury beachfront villa with panoramic sunset views",
    capacity: 4,
    bedrooms: 2,
    pricePerNight: 6500,
    images: [
      "/luxury-beach-villa-sunset-ocean-view.jpg",
      "/modern-villa-bedroom-ocean-view.jpg",
      "/luxury-villa-living-room-nature.jpg",
    ],
    amenities: ["Ocean view", "Private pool", "King bed", "Full kitchen", "WiFi", "Air conditioning"],
    availability: "available",
  },
  {
    id: "v2",
    resortId: "1",
    name: "River View Villa",
    slug: "river-view-villa",
    description: "Elegant riverside villa with private deck and infinity pool",
    capacity: 6,
    bedrooms: 3,
    pricePerNight: 8500,
    images: [
      "/infinity-pool-cliff-ocean-view.jpg",
      "/contemporary-living-space-ocean.jpg",
      "/master-bedroom-garden-view.jpg",
    ],
    amenities: ["River view", "Infinity pool", "3 King beds", "Butler service", "WiFi", "Smart TV"],
    availability: "available",
  },
  {
    id: "v3",
    resortId: "1",
    name: "Garden Suite",
    slug: "garden-suite",
    description: "Intimate garden villa perfect for couples",
    capacity: 2,
    bedrooms: 1,
    pricePerNight: 4500,
    images: ["/tropical-garden-villa-lush-greenery.jpg", "/cozy-bedroom-beach-view.jpg"],
    amenities: ["Garden view", "Jacuzzi", "King bed", "Kitchenette", "WiFi"],
    availability: "available",
  },
  {
    id: "v4",
    resortId: "1",
    name: "Presidential Villa",
    slug: "presidential-villa",
    description: "Ultimate luxury with private chef and concierge",
    capacity: 8,
    bedrooms: 4,
    pricePerNight: 15000,
    images: [
      "/luxury-terrace-sunset-ocean.jpg",
      "/luxury-villa-living-room-nature.jpg",
      "/elegant-bathroom-spa-luxury.jpg",
    ],
    amenities: ["Panoramic view", "Private pool", "4 King beds", "Private chef", "Butler", "Home theater", "Gym"],
    availability: "available",
  },
  {
    id: "v5",
    resortId: "1",
    name: "Family Villa",
    slug: "family-villa",
    description: "Spacious villa perfect for families with children",
    capacity: 6,
    bedrooms: 3,
    pricePerNight: 7500,
    images: ["/outdoor-dining-pavilion-tropical.jpg", "/modern-villa-bedroom-ocean-view.jpg"],
    amenities: ["Pool access", "Kids room", "2 King beds", "Twin beds", "Full kitchen", "Playground view"],
    availability: "available",
  },
  {
    id: "v6",
    resortId: "1",
    name: "Spa Villa",
    slug: "spa-villa",
    description: "Wellness-focused villa with private spa facilities",
    capacity: 4,
    bedrooms: 2,
    pricePerNight: 9500,
    images: ["/elegant-bathroom-spa-luxury.jpg", "/luxury-outdoor-pool-tropical.jpg"],
    amenities: ["Spa room", "Sauna", "Steam room", "2 King beds", "Meditation deck", "Yoga mats"],
    availability: "available",
  },

  // Malumpati Eco Resort Villas
  {
    id: "v7",
    resortId: "2",
    name: "Spring View Cottage",
    slug: "spring-view-cottage",
    description: "Eco-friendly cottage overlooking the crystal spring",
    capacity: 4,
    bedrooms: 2,
    pricePerNight: 3800,
    images: ["/luxury-outdoor-pool-tropical.jpg", "/tropical-garden-villa-lush-greenery.jpg"],
    amenities: ["Spring view", "Bamboo design", "Queen beds", "Eco toiletries", "Fan cooling"],
    availability: "available",
  },
  {
    id: "v8",
    resortId: "2",
    name: "Forest Villa",
    slug: "forest-villa",
    description: "Immersive nature experience in the tropical forest",
    capacity: 6,
    bedrooms: 3,
    pricePerNight: 4500,
    images: ["/tropical-garden-villa-lush-greenery.jpg", "/master-bedroom-garden-view.jpg"],
    amenities: ["Forest view", "Natural ventilation", "Mosquito nets", "3 Queen beds", "Hiking access"],
    availability: "available",
  },
  {
    id: "v9",
    resortId: "2",
    name: "Honeymoon Cottage",
    slug: "honeymoon-cottage",
    description: "Romantic cottage with private garden",
    capacity: 2,
    bedrooms: 1,
    pricePerNight: 3200,
    images: ["/cozy-bedroom-beach-view.jpg", "/outdoor-deck-beachfront.jpg"],
    amenities: ["Garden view", "Outdoor shower", "King bed", "Hammock", "Romantic setup"],
    availability: "available",
  },
  {
    id: "v10",
    resortId: "2",
    name: "Eco Family House",
    slug: "eco-family-house",
    description: "Sustainable family accommodation with modern comfort",
    capacity: 6,
    bedrooms: 3,
    pricePerNight: 5000,
    images: ["/contemporary-living-space-ocean.jpg", "/modern-villa-bedroom-ocean-view.jpg"],
    amenities: ["Spring access", "Solar power", "3 Queen beds", "Full kitchen", "Educational tours"],
    availability: "available",
  },

  // Seco Island Beach Resort Villas
  {
    id: "v11",
    resortId: "3",
    name: "Beachfront Bungalow",
    slug: "beachfront-bungalow",
    description: "Steps from the white sand beach",
    capacity: 4,
    bedrooms: 2,
    pricePerNight: 4500,
    images: ["/beach-bungalow-tropical-sand.jpg", "/outdoor-deck-beachfront.jpg"],
    amenities: ["Beach access", "Ocean view", "2 Queen beds", "Outdoor shower", "Beach chairs"],
    availability: "available",
  },
  {
    id: "v12",
    resortId: "3",
    name: "Ocean View Suite",
    slug: "ocean-view-suite",
    description: "Elevated suite with panoramic ocean vistas",
    capacity: 4,
    bedrooms: 2,
    pricePerNight: 5200,
    images: ["/luxury-beach-villa-sunset-ocean-view.jpg", "/cozy-bedroom-beach-view.jpg"],
    amenities: ["Ocean view", "Private balcony", "2 King beds", "Minibar", "Snorkeling gear"],
    availability: "available",
  },
  {
    id: "v13",
    resortId: "3",
    name: "Island Villa",
    slug: "island-villa",
    description: "Luxury villa with private beach access",
    capacity: 6,
    bedrooms: 3,
    pricePerNight: 7500,
    images: ["/outdoor-dining-pavilion-tropical.jpg", "/infinity-pool-cliff-ocean-view.jpg"],
    amenities: ["Private beach", "Plunge pool", "3 King beds", "Butler", "Island tours included"],
    availability: "available",
  },
  {
    id: "v14",
    resortId: "3",
    name: "Sunset Pavilion",
    slug: "sunset-pavilion",
    description: "Open-air pavilion with stunning sunset views",
    capacity: 4,
    bedrooms: 2,
    pricePerNight: 4800,
    images: ["/luxury-terrace-sunset-ocean.jpg", "/outdoor-deck-beachfront.jpg"],
    amenities: ["Sunset view", "Open design", "2 Queen beds", "Outdoor dining", "Hammocks"],
    availability: "available",
  },
  {
    id: "v15",
    resortId: "3",
    name: "Romantic Hideaway",
    slug: "romantic-hideaway",
    description: "Secluded cottage perfect for couples",
    capacity: 2,
    bedrooms: 1,
    pricePerNight: 3800,
    images: ["/cozy-bedroom-beach-view.jpg", "/beach-bungalow-tropical-sand.jpg"],
    amenities: ["Privacy", "Beach view", "King bed", "Outdoor bath", "Champagne setup"],
    availability: "available",
  },

  // Nogas Island Resort Villas
  {
    id: "v16",
    resortId: "4",
    name: "Diver's Cottage",
    slug: "divers-cottage",
    description: "Rustic cottage near the diving center",
    capacity: 4,
    bedrooms: 2,
    pricePerNight: 3500,
    images: ["/beach-bungalow-tropical-sand.jpg", "/master-bedroom-garden-view.jpg"],
    amenities: ["Marine view", "Dive gear storage", "2 Queen beds", "Fan", "Outdoor shower"],
    availability: "available",
  },
  {
    id: "v17",
    resortId: "4",
    name: "Marine Villa",
    slug: "marine-villa",
    description: "Oceanfront villa with coral reef access",
    capacity: 6,
    bedrooms: 3,
    pricePerNight: 5500,
    images: ["/infinity-pool-cliff-ocean-view.jpg", "/luxury-villa-living-room-nature.jpg"],
    amenities: ["Reef access", "Snorkel gear", "3 Queen beds", "Kitchen", "Dive packages"],
    availability: "available",
  },
  {
    id: "v18",
    resortId: "4",
    name: "Starlight Bungalow",
    slug: "starlight-bungalow",
    description: "Perfect for stargazing and nature lovers",
    capacity: 2,
    bedrooms: 1,
    pricePerNight: 2800,
    images: ["/outdoor-deck-beachfront.jpg", "/cozy-bedroom-beach-view.jpg"],
    amenities: ["Sky view", "Hammock", "Queen bed", "Telescope", "Solar lighting"],
    availability: "available",
  },

  // Bugtong Bato Falls Resort Villas
  {
    id: "v19",
    resortId: "5",
    name: "Waterfall View Lodge",
    slug: "waterfall-view-lodge",
    description: "Wake up to the sound of cascading waterfalls",
    capacity: 4,
    bedrooms: 2,
    pricePerNight: 3200,
    images: ["/cliffside-modern-villa-ocean-panorama.jpg", "/contemporary-living-space-ocean.jpg"],
    amenities: ["Waterfall view", "Balcony", "2 Queen beds", "Adventure gear", "Trekking maps"],
    availability: "available",
  },
  {
    id: "v20",
    resortId: "5",
    name: "Adventure Villa",
    slug: "adventure-villa",
    description: "Base camp for thrill-seekers",
    capacity: 6,
    bedrooms: 3,
    pricePerNight: 4000,
    images: ["/luxury-terrace-sunset-ocean.jpg", "/tropical-garden-villa-lush-greenery.jpg"],
    amenities: ["Mountain view", "Gear storage", "3 Queen beds", "Zip line access", "Guide services"],
    availability: "available",
  },
  {
    id: "v21",
    resortId: "5",
    name: "River Cottage",
    slug: "river-cottage",
    description: "Peaceful retreat by the mountain river",
    capacity: 4,
    bedrooms: 2,
    pricePerNight: 2800,
    images: ["/tropical-garden-villa-lush-greenery.jpg", "/master-bedroom-garden-view.jpg"],
    amenities: ["River view", "Natural pool", "2 Queen beds", "BBQ area", "Fishing gear"],
    availability: "available",
  },
  {
    id: "v22",
    resortId: "5",
    name: "Explorer's Den",
    slug: "explorers-den",
    description: "Cozy space for solo adventurers or couples",
    capacity: 2,
    bedrooms: 1,
    pricePerNight: 2200,
    images: ["/cozy-bedroom-beach-view.jpg", "/outdoor-deck-beachfront.jpg"],
    amenities: ["Forest view", "Compact", "Queen bed", "Adventure packages", "Trail maps"],
    availability: "available",
  },
  {
    id: "v23",
    resortId: "5",
    name: "Family Lodge",
    slug: "family-lodge",
    description: "Spacious lodge for family adventures",
    capacity: 8,
    bedrooms: 4,
    pricePerNight: 5500,
    images: ["/contemporary-living-space-ocean.jpg", "/modern-villa-bedroom-ocean-view.jpg"],
    amenities: ["Valley view", "4 bedrooms", "Full kitchen", "Play area", "Family activities"],
    availability: "available",
  },

  // Mararison Island Resort Villas
  {
    id: "v24",
    resortId: "6",
    name: "Island Hut",
    slug: "island-hut",
    description: "Budget-friendly beachfront accommodation",
    capacity: 4,
    bedrooms: 2,
    pricePerNight: 2200,
    images: ["/beach-bungalow-tropical-sand.jpg", "/outdoor-deck-beachfront.jpg"],
    amenities: ["Beach view", "Fan", "2 Double beds", "Shared bath", "Basic WiFi"],
    availability: "available",
  },
  {
    id: "v25",
    resortId: "6",
    name: "Sunset Cottage",
    slug: "sunset-cottage",
    description: "Prime sunset viewing location",
    capacity: 4,
    bedrooms: 2,
    pricePerNight: 2800,
    images: ["/luxury-beach-villa-sunset-ocean-view.jpg", "/cozy-bedroom-beach-view.jpg"],
    amenities: ["Sunset view", "Private bath", "2 Queen beds", "Hammock", "Sunset deck"],
    availability: "available",
  },
  {
    id: "v26",
    resortId: "6",
    name: "Backpacker's Bungalow",
    slug: "backpackers-bungalow",
    description: "Affordable option for budget travelers",
    capacity: 2,
    bedrooms: 1,
    pricePerNight: 1500,
    images: ["/beach-bungalow-tropical-sand.jpg"],
    amenities: ["Basic", "Fan", "Double bed", "Shared facilities", "Lockers"],
    availability: "available",
  },
  {
    id: "v27",
    resortId: "6",
    name: "Beach House",
    slug: "beach-house",
    description: "Larger house for groups and families",
    capacity: 8,
    bedrooms: 4,
    pricePerNight: 4500,
    images: ["/outdoor-dining-pavilion-tropical.jpg", "/contemporary-living-space-ocean.jpg"],
    amenities: ["Beachfront", "Kitchen", "4 bedrooms", "Large deck", "Group activities"],
    availability: "available",
  },
]

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

export function getMockAdmins(): AdminUser[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem("diora_admins")
  return stored ? JSON.parse(stored) : []
}

export function addMockAdmin(admin: Omit<AdminUser, "id" | "createdAt">): AdminUser {
  const newAdmin: AdminUser = {
    ...admin,
    id: `ADM-${Date.now()}`,
    createdAt: new Date().toISOString(),
  }

  const existing = getMockAdmins()
  existing.push(newAdmin)
  if (typeof window !== "undefined") {
    localStorage.setItem("diora_admins", JSON.stringify(existing))
  }

  return newAdmin
}

export function updateMockAdmin(id: string, updates: Partial<Omit<AdminUser, "id" | "createdAt">>): boolean {
  const admins = getMockAdmins()
  const index = admins.findIndex((a) => a.id === id)
  if (index !== -1) {
    admins[index] = { ...admins[index], ...updates }
    if (typeof window !== "undefined") {
      localStorage.setItem("diora_admins", JSON.stringify(admins))
    }
    return true
  }
  return false
}

export function deleteMockAdmin(id: string): boolean {
  const admins = getMockAdmins()
  const filtered = admins.filter((a) => a.id !== id)
  if (filtered.length !== admins.length) {
    if (typeof window !== "undefined") {
      localStorage.setItem("diora_admins", JSON.stringify(filtered))
    }
    return true
  }
  return false
}

// Helper to get villas for a specific resort
export function getVillasByResort(resortId: string): Villa[] {
  return MOCK_VILLAS.filter((v) => v.resortId === resortId)
}

// Backwards compatibility
export const updateResortAvailability = updateVillaAvailability
