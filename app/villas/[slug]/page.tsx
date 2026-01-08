"use client"

import { use } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { MapPin, Users, Bed, ArrowLeft } from "lucide-react"
import { MOCK_RESORTS, getVillasByResort } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ResortDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const router = useRouter()
  const resort = MOCK_RESORTS.find((r) => r.slug === slug)
  const villas = resort ? getVillasByResort(resort.id) : []

  if (!resort) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Resort Not Found</h1>
          <Button onClick={() => router.push("/villas")}>Back to Resorts</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <img src={resort.images[0] || "/placeholder.svg"} alt={resort.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute bottom-0 left-0 right-0 p-8 md:p-12"
        >
          <div className="container mx-auto">
            <Button variant="ghost" onClick={() => router.push("/villas")} className="mb-6 hover:bg-background/80">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Resorts
            </Button>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-4">{resort.name}</h1>
            <div className="flex items-center gap-2 text-lg text-muted-foreground">
              <MapPin className="w-5 h-5" />
              <span>{resort.location}</span>
            </div>
          </div>
        </motion.div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Resort Description */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <p className="text-lg text-muted-foreground mb-6 max-w-4xl">{resort.longDescription}</p>
          <div className="flex flex-wrap gap-2">
            {resort.amenities.map((amenity) => (
              <Badge key={amenity} variant="secondary" className="px-3 py-1">
                {amenity}
              </Badge>
            ))}
          </div>
        </motion.section>

        {/* Villas Section */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h2 className="text-3xl font-serif font-bold text-foreground mb-8">Available Villas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {villas.map((villa, index) => (
              <motion.div
                key={villa.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <Card
                  className="overflow-hidden group cursor-pointer"
                  onClick={() => router.push(`/booking?villa=${villa.id}`)}
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={villa.images[0] || "/placeholder.svg"}
                      alt={villa.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div
                      className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${
                        villa.availability === "available"
                          ? "bg-green-500 text-white"
                          : villa.availability === "reserved"
                            ? "bg-red-500 text-white"
                            : "bg-gray-500 text-white"
                      }`}
                    >
                      {villa.availability}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-serif font-bold text-foreground mb-2">{villa.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{villa.description}</p>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Bed className="w-4 h-4" />
                        <span>{villa.bedrooms} Bedrooms</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>Up to {villa.capacity}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <span className="text-2xl font-bold text-foreground">
                          ₱{villa.pricePerNight.toLocaleString()}
                        </span>
                        <span className="text-sm text-muted-foreground"> / night</span>
                      </div>
                      <Button
                        disabled={villa.availability !== "available"}
                        className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      >
                        {villa.availability === "available" ? "Book Now" : "Unavailable"}
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  )
}
