"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ImageCarousel } from "@/components/image-carousel"
import { MOCK_VILLAS } from "@/lib/mock-data"
import { motion } from "framer-motion"
import { Check, Users, Bed, Bath, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { notFound } from "next/navigation"
import { use } from "react"

export default function VillaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const router = useRouter()
  const villa = MOCK_VILLAS.find((v) => v.slug === slug)

  if (!villa) {
    notFound()
  }

  const handleReserve = () => {
    router.push(`/booking?villa=${villa.id}`)
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 lg:px-8 pt-24 pb-16">
        <Link
          href="/villas"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Villas
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <ImageCarousel images={villa.images} alt={villa.name} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">{villa.name}</h1>
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">{villa.description}</p>

              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-sm">Up to {villa.capacity} guests</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bed className="h-5 w-5 text-primary" />
                  <span className="text-sm">{villa.bedrooms} bedrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="h-5 w-5 text-primary" />
                  <span className="text-sm">{villa.bathrooms} bathrooms</span>
                </div>
              </div>

              <div className="prose prose-lg max-w-none">
                <h2 className="font-serif text-2xl font-semibold mb-4">About This Villa</h2>
                <p className="text-muted-foreground leading-relaxed">{villa.longDescription}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="font-serif text-2xl font-semibold mb-6">Amenities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {villa.amenities.map((amenity) => (
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
                      ${villa.pricePerNight}
                      <span className="text-base font-normal text-muted-foreground"> / night</span>
                    </p>
                    {villa.availability !== "available" && (
                      <p className="text-sm text-destructive mt-2">
                        {villa.availability === "reserved" ? "Currently reserved" : "Currently unavailable"}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3 pt-4 border-t border-border">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Capacity</span>
                      <span className="font-medium">Up to {villa.capacity} guests</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Bedrooms</span>
                      <span className="font-medium">{villa.bedrooms}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Bathrooms</span>
                      <span className="font-medium">{villa.bathrooms}</span>
                    </div>
                  </div>

                  <Button
                    onClick={handleReserve}
                    disabled={villa.availability !== "available"}
                    size="lg"
                    className="w-full"
                  >
                    {villa.availability === "available" ? "Reserve Now" : "Unavailable"}
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
