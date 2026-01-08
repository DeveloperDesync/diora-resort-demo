"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MOCK_RESORTS, MOCK_VILLAS } from "@/lib/mock-data"
import { motion } from "framer-motion"
import { Check, MapPin, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { notFound } from "next/navigation"
import Image from "next/image"

export default function ResortDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const router = useRouter()
  const resort = MOCK_RESORTS.find((r) => r.slug === slug)

  if (!resort) {
    notFound()
  }

  const resortVillas = MOCK_VILLAS.filter((v) => v.resortId === resort.id)

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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="relative h-[400px] rounded-2xl overflow-hidden mb-8">
            <Image src={resort.images[0] || "/placeholder.svg"} alt={resort.name} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h1 className="font-serif text-5xl font-bold mb-4 text-balance">{resort.name}</h1>
              <p className="text-lg text-muted-foreground mb-2 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                {resort.location}
              </p>
              <p className="text-lg leading-relaxed max-w-3xl">{resort.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-3xl font-bold text-primary mb-2">{resortVillas.length}</p>
                <p className="text-sm text-muted-foreground">Villas Available</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-3xl font-bold text-primary mb-2">{resort.capacity}</p>
                <p className="text-sm text-muted-foreground">Total Capacity</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-3xl font-bold text-primary mb-2">{resort.rooms}</p>
                <p className="text-sm text-muted-foreground">Total Rooms</p>
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-semibold mb-4">About {resort.name}</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">{resort.longDescription}</p>

            <h3 className="font-serif text-xl font-semibold mb-4">Resort Amenities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
              {resort.amenities.map((amenity) => (
                <div key={amenity} className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                  <span className="text-sm text-muted-foreground">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="font-serif text-3xl font-bold mb-8">Choose Your Villa</h2>

          {resortVillas.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">No villas available at this resort yet.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {resortVillas.map((villa, index) => (
                <motion.div
                  key={villa.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Card className="group overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={villa.images[0] || "/placeholder.svg"}
                        alt={villa.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        <p className="text-sm font-semibold">₱{villa.pricePerNight.toLocaleString()}/night</p>
                      </div>
                      {villa.availability !== "available" && (
                        <div className="absolute top-4 left-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                              villa.availability === "reserved"
                                ? "bg-destructive/90 text-destructive-foreground"
                                : "bg-muted/90 text-muted-foreground"
                            }`}
                          >
                            {villa.availability === "reserved" ? "Reserved" : "Unavailable"}
                          </span>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-serif text-xl font-semibold mb-2">{villa.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                        {villa.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <span>{villa.bedrooms} Bedrooms</span>
                        <span>•</span>
                        <span>Up to {villa.capacity} Guests</span>
                      </div>
                      <Button
                        onClick={() => router.push(`/booking?villa=${villa.id}`)}
                        disabled={villa.availability !== "available"}
                        className="w-full"
                      >
                        {villa.availability === "available" ? "Book Now" : "Unavailable"}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
