"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getMockReservations, MOCK_VILLAS, updateVillaAvailability, addMockReservation } from "@/lib/mock-data"
import { useAuth } from "@/lib/auth-context"
import { motion } from "framer-motion"
import { Calendar, Home, Plus, Lock, Unlock, Ban } from "lucide-react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"

export default function AdminPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [reservations, setReservations] = useState<any[]>([])
  const [villas, setVillas] = useState(MOCK_VILLAS)
  const [showCreateForm, setShowCreateForm] = useState(false)

  // Create reservation form state
  const [selectedVillaId, setSelectedVillaId] = useState("")
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guestName, setGuestName] = useState("")
  const [guestEmail, setGuestEmail] = useState("")
  const [guests, setGuests] = useState(2)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login?redirect=/admin")
    } else if (user?.role !== "admin") {
      router.push("/dashboard")
    } else {
      setReservations(getMockReservations())
    }
  }, [isAuthenticated, user, router])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && user?.role === "admin") {
        setReservations(getMockReservations())
      }
    }
    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange)
  }, [user])

  const handleVillaStatusChange = (villaId: string, status: "available" | "reserved" | "blocked") => {
    updateVillaAvailability(villaId, status)
    setVillas([...MOCK_VILLAS])
  }

  const handleCreateReservation = () => {
    if (!selectedVillaId || !checkIn || !checkOut || !guestName || !guestEmail) {
      alert("Please fill in all fields")
      return
    }

    const villa = MOCK_VILLAS.find((v) => v.id === selectedVillaId)
    if (!villa) return

    const nights = Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))
    const totalPrice = villa.pricePerNight * nights

    addMockReservation({
      villaId: villa.id,
      villaName: villa.name,
      resortName: villa.resortName,
      guestName,
      guestEmail,
      checkIn,
      checkOut,
      guests,
      totalPrice,
      status: "upcoming",
    })

    setReservations(getMockReservations())
    setShowCreateForm(false)

    setSelectedVillaId("")
    setCheckIn("")
    setCheckOut("")
    setGuestName("")
    setGuestEmail("")
    setGuests(2)
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return null
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 lg:px-8 pt-24 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="mb-8">
            <h1 className="font-serif text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage reservations, villas, and availability</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              { label: "Total Reservations", value: reservations.length, icon: Calendar },
              {
                label: "Available Villas",
                value: villas.filter((v) => v.availability === "available").length,
                icon: Home,
              },
              { label: "Reserved", value: villas.filter((v) => v.availability === "reserved").length, icon: Lock },
              { label: "Blocked", value: villas.filter((v) => v.availability === "blocked").length, icon: Ban },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                        <motion.p
                          className="text-3xl font-bold"
                          initial={{ scale: 0.5 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.1 + 0.2, type: "spring" }}
                        >
                          {stat.value}
                        </motion.p>
                      </div>
                      <stat.icon className="h-10 w-10 text-primary opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <Tabs defaultValue="reservations" className="space-y-6">
            <TabsList>
              <TabsTrigger value="reservations">Reservations</TabsTrigger>
              <TabsTrigger value="villas">Villa Management</TabsTrigger>
            </TabsList>

            <TabsContent value="reservations" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="font-serif text-2xl font-semibold">All Reservations</h2>
                <Button onClick={() => setShowCreateForm(!showCreateForm)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Reservation
                </Button>
              </div>

              {showCreateForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-serif text-xl">Create Manual Reservation</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Villa</label>
                          <select
                            value={selectedVillaId}
                            onChange={(e) => setSelectedVillaId(e.target.value)}
                            className="w-full px-4 py-3 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                          >
                            <option value="">Select a villa</option>
                            {villas.map((villa) => (
                              <option key={villa.id} value={villa.id}>
                                {villa.name} - {villa.resortName} (₱{villa.pricePerNight.toLocaleString()}/night)
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Number of Guests</label>
                          <input
                            type="number"
                            value={guests}
                            onChange={(e) => setGuests(Number.parseInt(e.target.value) || 1)}
                            min={1}
                            className="w-full px-4 py-3 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Check-in Date</label>
                          <input
                            type="date"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            className="w-full px-4 py-3 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Check-out Date</label>
                          <input
                            type="date"
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            className="w-full px-4 py-3 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Guest Name</label>
                          <input
                            type="text"
                            value={guestName}
                            onChange={(e) => setGuestName(e.target.value)}
                            placeholder="John Doe"
                            className="w-full px-4 py-3 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Guest Email</label>
                          <input
                            type="email"
                            value={guestEmail}
                            onChange={(e) => setGuestEmail(e.target.value)}
                            placeholder="john@example.com"
                            className="w-full px-4 py-3 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                          />
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <Button onClick={handleCreateReservation}>Create Reservation</Button>
                        <Button onClick={() => setShowCreateForm(false)} variant="outline">
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {reservations.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card>
                    <CardContent className="p-12 text-center">
                      <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No reservations yet.</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  {reservations.map((reservation, index) => (
                    <motion.div
                      key={reservation.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <Card className="hover:shadow-md transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Confirmation</p>
                              <p className="font-mono text-sm font-semibold">{reservation.id}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Villa</p>
                              <p className="font-medium">{reservation.villaName || reservation.resortName}</p>
                              {reservation.villaName && (
                                <p className="text-xs text-muted-foreground">{reservation.resortName}</p>
                              )}
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Guest</p>
                              <p className="font-medium">{reservation.guestName}</p>
                              <p className="text-xs text-muted-foreground">{reservation.guestEmail}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Dates</p>
                              <p className="text-sm">
                                {format(new Date(reservation.checkIn), "MMM d")} -{" "}
                                {format(new Date(reservation.checkOut), "MMM d, yyyy")}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Guests</p>
                              <p className="font-medium">{reservation.guests}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground mb-1">Total</p>
                              <p className="text-lg font-semibold">₱{reservation.totalPrice.toLocaleString()}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="villas" className="space-y-6">
              <h2 className="font-serif text-2xl font-semibold">Villa Availability Management</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {villas.map((villa, index) => (
                  <motion.div
                    key={villa.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <h3 className="font-serif text-xl font-semibold mb-1">{villa.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{villa.resortName}</p>
                        <div className="space-y-3 mb-6">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Price</span>
                            <span className="font-medium">₱{villa.pricePerNight.toLocaleString()}/night</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Capacity</span>
                            <span className="font-medium">{villa.capacity} guests</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Status</span>
                            <span
                              className={`font-medium capitalize ${
                                villa.availability === "available"
                                  ? "text-primary"
                                  : villa.availability === "reserved"
                                    ? "text-destructive"
                                    : "text-muted-foreground"
                              }`}
                            >
                              {villa.availability}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium mb-2">Change Status:</p>
                          <div className="flex gap-2 flex-wrap">
                            <Button
                              onClick={() => handleVillaStatusChange(villa.id, "available")}
                              variant={villa.availability === "available" ? "default" : "outline"}
                              size="sm"
                              className="flex-1"
                            >
                              <Unlock className="h-4 w-4 mr-1" />
                              Available
                            </Button>
                            <Button
                              onClick={() => handleVillaStatusChange(villa.id, "reserved")}
                              variant={villa.availability === "reserved" ? "default" : "outline"}
                              size="sm"
                              className="flex-1"
                            >
                              <Lock className="h-4 w-4 mr-1" />
                              Reserved
                            </Button>
                            <Button
                              onClick={() => handleVillaStatusChange(villa.id, "blocked")}
                              variant={villa.availability === "blocked" ? "default" : "outline"}
                              size="sm"
                              className="flex-1"
                            >
                              <Ban className="h-4 w-4 mr-1" />
                              Blocked
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
