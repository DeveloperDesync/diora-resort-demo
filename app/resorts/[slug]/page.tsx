"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ImageCarousel } from "@/components/image-carousel"
import { MOCK_RESORTS } from "@/lib/mock-data"
import { motion } from "framer-motion"
import { Check, Users, MapPin, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { notFound } from "next/navigation"

export default function ResortDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const router = useRouter()
  const resort = MOCK_RESORTS.find((r) => r.slug === slug)

  if (!resort) {
    notFound()
  }

  const handleReserve = () => {
    router.push(`/booking?resort=${resort.id}`)
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 lg:px-8 pt-24 pb-16">
        <Link
          href="/resorts"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Resorts
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <ImageCarousel images={resort.images} alt={resort.name} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">{resort.name}</h1>
              <p className="text-lg text-muted-foreground mb-2 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                {resort.location}
              </p>
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">{resort.description}</p>

              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-sm">Up to {resort.capacity} guests</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="text-sm">{resort.rooms} rooms</span>
                </div>
              </div>

              <div className="prose prose-lg max-w-none">
                <h2 className="font-serif text-2xl font-semibold mb-4">About This Resort</h2>
                <p className="text-muted-foreground leading-relaxed">{resort.longDescription}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="font-serif text-2xl font-semibold mb-6">Amenities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resort.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{amenity}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar - Booking Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="sticky top-24"
            >
              <Card className="shadow-lg">
                <CardContent className="p-6 space-y-6">
                  <div>
                    <p className="text-3xl font-bold mb-1">
                      ₱{resort.pricePerNight}
                      <span className="text-base font-normal text-muted-foreground"> / night</span>
                    </p>
                    {resort.availability !== "available" && (
                      <p className="text-sm text-destructive mt-2">
                        {resort.availability === "reserved" ? "Currently reserved" : "Currently unavailable"}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3 pt-4 border-t border-border">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Capacity</span>
                      <span className="font-medium">Up to {resort.capacity} guests</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Rooms</span>
                      <span className="font-medium">{resort.rooms}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Location</span>
                      <span className="font-medium">{resort.municipality}</span>
                    </div>
                  </div>

                  <Button
                    onClick={handleReserve}
                    disabled={resort.availability !== "available"}
                    size="lg"
                    className="w-full"
                  >
                    {resort.availability === "available" ? "Reserve Now" : "Unavailable"}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Demo only - No actual booking will be made
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
