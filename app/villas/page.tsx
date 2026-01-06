"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MOCK_VILLAS } from "@/lib/mock-data"
import { motion, AnimatePresence } from "framer-motion"
import { Filter, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function VillasPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCapacity, setFilterCapacity] = useState<number | null>(null)

  const filteredVillas = MOCK_VILLAS.filter((villa) => {
    const matchesSearch =
      villa.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      villa.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCapacity = filterCapacity ? villa.capacity >= filterCapacity : true
    return matchesSearch && matchesCapacity
  })

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background z-10" />
        <Image
          src="/cliffside-modern-villa-ocean-panorama.jpg"
          alt="Our Villas"
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
            Our Villas
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed"
          >
            Discover your perfect sanctuary from our collection of exceptional residences
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
              placeholder="Search villas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            />
          </motion.div>
          <div className="flex gap-2 flex-wrap">
            {[
              { label: "All", value: null, icon: Filter },
              { label: "2+ Guests", value: 2 },
              { label: "4+ Guests", value: 4 },
              { label: "8+ Guests", value: 8 },
            ].map((filter) => (
              <motion.div key={filter.label} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant={filterCapacity === filter.value ? "default" : "outline"}
                  onClick={() => setFilterCapacity(filter.value)}
                  size="sm"
                  className="transition-all duration-300"
                >
                  {filter.icon && <filter.icon className="h-4 w-4 mr-2" />}
                  {filter.label}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Villas Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVillas.map((villa, index) => (
              <motion.div
                key={villa.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link href={`/villas/${villa.slug}`}>
                  <Card className="group overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    <motion.div
                      className="relative h-80 overflow-hidden"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Image
                        src={villa.images[0] || "/placeholder.svg"}
                        alt={villa.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full"
                      >
                        <p className="text-sm font-semibold">${villa.pricePerNight}/night</p>
                      </motion.div>
                      <div className="absolute top-4 left-4">
                        {villa.availability === "reserved" && (
                          <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-destructive/90 backdrop-blur-sm text-destructive-foreground px-3 py-1 rounded-full text-xs font-medium"
                          >
                            Reserved
                          </motion.span>
                        )}
                        {villa.availability === "blocked" && (
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
                        {villa.name}
                      </motion.h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2 leading-relaxed">{villa.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <span>{villa.bedrooms} Beds</span>
                        <span>•</span>
                        <span>{villa.bathrooms} Baths</span>
                        <span>•</span>
                        <span>{villa.capacity} Guests</span>
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
          {filteredVillas.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-16"
            >
              <motion.p initial={{ y: 20 }} animate={{ y: 0 }} className="text-lg text-muted-foreground">
                No villas found matching your criteria.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <Footer />
    </div>
  )
}
