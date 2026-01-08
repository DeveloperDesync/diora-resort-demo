"use client"

import { Suspense, useState } from "react"
import { motion } from "framer-motion"
import { useSearchParams, useRouter } from "next/navigation"
import { MapPin, Users, Star } from "lucide-react"
import { MOCK_RESORTS } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

function VillasContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const municipality = searchParams.get("location")
  const [selectedMunicipality, setSelectedMunicipality] = useState(municipality || "all")

  const municipalities = ["all", ...Array.from(new Set(MOCK_RESORTS.map((r) => r.municipality)))]

  const filteredResorts =
    selectedMunicipality === "all" ? MOCK_RESORTS : MOCK_RESORTS.filter((r) => r.municipality === selectedMunicipality)

  const handleLocationChange = (location: string) => {
    setSelectedMunicipality(location)
    if (location === "all") {
      router.push("/villas")
    } else {
      router.push(`/villas?location=${location}`)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-4 text-balance">
            Discover Resorts in Antique
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Choose from our collection of premium resorts across the beautiful province of Antique, Philippines
          </p>
        </motion.div>
      </section>

      {/* Filter Section */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {municipalities.map((location, index) => (
              <motion.div
                key={location}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Button
                  variant={selectedMunicipality === location ? "default" : "outline"}
                  onClick={() => handleLocationChange(location)}
                  className="capitalize transition-all duration-300 hover:scale-105"
                >
                  {location === "all" ? "All Locations" : location}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resorts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResorts.map((resort, index) => (
              <motion.div
                key={resort.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <Card
                  className="overflow-hidden group cursor-pointer"
                  onClick={() => router.push(`/villas/${resort.slug}`)}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={resort.images[0] || "/placeholder.svg"}
                      alt={resort.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {resort.featured && (
                      <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        Featured
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-serif font-bold text-foreground mb-2">{resort.name}</h3>
                    <div className="flex items-center gap-2 text-muted-foreground mb-3">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{resort.location}</span>
                    </div>
                    <p className="text-muted-foreground mb-4 line-clamp-2">{resort.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">{resort.villaCount} Villas</span>
                      </div>
                      <Button
                        variant="ghost"
                        className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      >
                        View Villas →
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default function VillasPage() {
  return (
    <Suspense fallback={null}>
      <VillasContent />
    </Suspense>
  )
}
