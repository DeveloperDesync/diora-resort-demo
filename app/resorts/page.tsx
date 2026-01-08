"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MOCK_RESORTS } from "@/lib/mock-data"
import { motion, AnimatePresence } from "framer-motion"
import { Filter, Search, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function ResortsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterMunicipality, setFilterMunicipality] = useState<string | null>(null)

  const municipalities = Array.from(new Set(MOCK_RESORTS.map((r) => r.municipality)))

  const filteredResorts = MOCK_RESORTS.filter((resort) => {
    const matchesSearch =
      resort.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resort.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resort.municipality.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesMunicipality = filterMunicipality ? resort.municipality === filterMunicipality : true
    return matchesSearch && matchesMunicipality
  })

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background z-10" />
        <Image
          src="/cliffside-modern-villa-ocean-panorama.jpg"
          alt="Resorts in Antique"
          fill
          className="object-cover"
          priority
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 text-center px-4 max-w-3xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance"
          >
            Explore Antique Resorts
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed"
          >
            Discover paradise across pristine islands, waterfalls, and beaches
          </motion.p>
        </motion.div>
      </section>

      {/* Filters Section */}
      <section className="container mx-auto px-4 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row gap-4 mb-12"
        >
          <motion.div className="relative flex-1" whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search resorts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            />
          </motion.div>
          <div className="flex gap-2 flex-wrap">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant={filterMunicipality === null ? "default" : "outline"}
                onClick={() => setFilterMunicipality(null)}
                size="sm"
                className="transition-all duration-300"
              >
                <Filter className="h-4 w-4 mr-2" />
                All
              </Button>
            </motion.div>
            {municipalities.map((municipality) => (
              <motion.div key={municipality} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant={filterMunicipality === municipality ? "default" : "outline"}
                  onClick={() => setFilterMunicipality(municipality)}
                  size="sm"
                  className="transition-all duration-300"
                >
                  {municipality}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Resorts Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResorts.map((resort, index) => (
              <motion.div
                key={resort.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link href={`/resorts/${resort.slug}`}>
                  <Card className="group overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    <motion.div
                      className="relative h-80 overflow-hidden"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Image
                        src={resort.images[0] || "/placeholder.svg"}
                        alt={resort.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full"
                      >
                        <p className="text-sm font-semibold">₱{resort.pricePerNight}/night</p>
                      </motion.div>
                      <div className="absolute top-4 left-4">
                        {resort.availability === "reserved" && (
                          <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-destructive/90 backdrop-blur-sm text-destructive-foreground px-3 py-1 rounded-full text-xs font-medium"
                          >
                            Reserved
                          </motion.span>
                        )}
                        {resort.availability === "blocked" && (
                          <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-muted/90 backdrop-blur-sm text-muted-foreground px-3 py-1 rounded-full text-xs font-medium"
                          >
                            Unavailable
                          </motion.span>
                        )}
                      </div>
                    </motion.div>
                    <CardContent className="p-6">
                      <motion.h3
                        className="font-serif text-2xl font-semibold mb-2 group-hover:text-primary transition-colors"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {resort.name}
                      </motion.h3>
                      <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {resort.municipality}
                      </p>
                      <p className="text-muted-foreground mb-4 line-clamp-2 leading-relaxed">{resort.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <span>{resort.rooms} Rooms</span>
                        <span>•</span>
                        <span>{resort.capacity} Capacity</span>
                      </div>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          variant="outline"
                          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 bg-transparent"
                        >
                          View Details
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {filteredResorts.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-16"
            >
              <motion.p initial={{ y: 20 }} animate={{ y: 0 }} className="text-lg text-muted-foreground">
                No resorts found matching your criteria.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <Footer />
    </div>
  )
}
