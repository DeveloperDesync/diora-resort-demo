export interface Resort {
  id: string
  name: string
  slug: string
  location: string
  municipality: string
  description: string
  longDescription: string
  capacity: number
  rooms: number
  pricePerNight: number
  images: string[]
  amenities: string[]
  featured: boolean
  availability: "available" | "reserved" | "blocked"
}

export interface Reservation {
  id: string
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
      "Diora Resort is our premier destination, combining contemporary luxury with authentic Filipino hospitality. Nestled along the scenic Tibiao River, this flagship property features state-of-the-art facilities, gourmet dining, infinity pools, and spacious villas designed for the discerning traveler. Experience the pinnacle of resort excellence in the heart of Antique.",
    capacity: 80,
    rooms: 25,
    pricePerNight: 5500,
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
      "River activities",
      "Conference facilities",
    ],
    featured: true,
    availability: "available",
  },
  {
    id: "2",
    name: "Malumpati Eco Resort",
    slug: "malumpati-eco-resort",
    location: "Malumpati Cold Spring, Pandan",
    municipality: "Pandan",
    description: "Nestled by crystal-clear spring waters in the heart of nature",
    longDescription:
      "Experience eco-luxury at its finest at Malumpati Eco Resort, located beside the famous cold spring. This sustainable paradise offers modern amenities while preserving the natural beauty of Antique. Perfect for nature lovers and adventure seekers who appreciate pristine waters and lush tropical surroundings.",
    capacity: 50,
    rooms: 15,
    pricePerNight: 3500,
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
      "Conference room",
      "Free WiFi",
      "Kayaking",
      "Guided tours",
      "Organic garden",
    ],
    featured: true,
    availability: "available",
  },
  {
    id: "3",
    name: "Seco Island Beach Resort",
    slug: "seco-island-beach-resort",
    location: "Seco Island, Tibiao",
    municipality: "Tibiao",
    description: "Private island paradise with pristine white sand beaches",
    longDescription:
      "Escape to Seco Island Beach Resort, an exclusive island getaway with powdery white sand and crystal-clear turquoise waters. This boutique resort offers luxury accommodations with stunning ocean views, perfect for romantic getaways, family vacations, or peaceful retreats from the modern world.",
    capacity: 40,
    rooms: 12,
    pricePerNight: 4200,
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
      "Sunset bar",
      "Water sports",
      "Spa services",
      "Bonfire nights",
    ],
    featured: true,
    availability: "available",
  },
  {
    id: "4",
    name: "Nogas Island Resort",
    slug: "nogas-island-resort",
    location: "Nogas Island, Anini-y",
    municipality: "Anini-y",
    description: "Secluded island sanctuary with breathtaking marine biodiversity",
    longDescription:
      "Discover Nogas Island Resort, a hidden gem surrounded by vibrant coral reefs and teeming marine life. This eco-conscious resort combines rustic charm with modern comfort, offering an authentic island experience. Ideal for divers, snorkelers, and those seeking tranquility away from crowds.",
    capacity: 30,
    rooms: 10,
    pricePerNight: 3800,
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
      "Generator power",
      "Solar lighting",
      "Fishing trips",
      "Stargazing deck",
    ],
    featured: true,
    availability: "available",
  },
  {
    id: "5",
    name: "Bugtong Bato Falls Resort",
    slug: "bugtong-bato-falls-resort",
    location: "Bugtong Bato Falls, Tibiao",
    municipality: "Tibiao",
    description: "Adventure resort nestled by majestic seven-tiered waterfalls",
    longDescription:
      "Bugtong Bato Falls Resort offers an exhilarating mountain escape beside the spectacular seven-tiered waterfalls. This adventure-focused resort is perfect for thrill-seekers, featuring zip-lining, river trekking, and bamboo rafting, while providing comfortable accommodations surrounded by lush rainforest.",
    capacity: 60,
    rooms: 20,
    pricePerNight: 2800,
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
      "Camp fire area",
      "Adventure guides",
      "Photography tours",
    ],
    featured: false,
    availability: "available",
  },
  {
    id: "6",
    name: "Mararison Island Resort",
    slug: "mararison-island-resort",
    location: "Mararison Island, Culasi",
    municipality: "Culasi",
    description: "Rustic beach resort on the 'Little Boracay' of Antique",
    longDescription:
      "Mararison Island Resort brings you back to basics with its laid-back island vibe and stunning sunsets. Known as the 'Little Boracay,' this island offers pristine beaches, gentle waves, and a peaceful atmosphere. Perfect for budget-conscious travelers seeking authentic island life without sacrificing comfort.",
    capacity: 35,
    rooms: 12,
    pricePerNight: 2200,
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
      "Basic WiFi",
      "Fishing equipment",
    ],
    featured: false,
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

export function updateResortAvailability(resortId: string, status: "available" | "reserved" | "blocked"): boolean {
  const resort = MOCK_RESORTS.find((r) => r.id === resortId)
  if (resort) {
    resort.availability = status
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

export const MOCK_VILLAS = MOCK_RESORTS
export const updateVillaAvailability = updateResortAvailability
