"use client"

import { useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getMockReservations, cancelMockReservation } from "@/lib/mock-data"
import { useAuth } from "@/lib/auth-context"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Users, X, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { useState } from "react"

export default function DashboardPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [reservations, setReservations] = useState<any[]>([])

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login?redirect=/dashboard")
    } else {
      setReservations(getMockReservations())
    }
  }, [isAuthenticated, router])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && isAuthenticated) {
        setReservations(getMockReservations())
      }
    }
    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange)
  }, [isAuthenticated])

  const handleCancelReservation = (id: string) => {
    if (confirm("Are you sure you want to cancel this reservation?")) {
      cancelMockReservation(id)
      setReservations(getMockReservations())
    }
  }

  if (!isAuthenticated) {
    return null
  }

  const userReservations = reservations.filter((r) => r.guestEmail === user?.email)
  const upcomingReservations = userReservations.filter((r) => r.status === "upcoming")
  const pastReservations = userReservations.filter((r) => r.status === "completed")

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 lg:px-8 pt-24 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1 className="font-serif text-4xl font-bold mb-2">Welcome back, {user?.name}</h1>
            <p className="text-muted-foreground">Manage your reservations and profile</p>
          </motion.div>

          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="mb-8 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="font-serif text-2xl flex items-center gap-2">
                  Your Profile
                  <Sparkles className="h-5 w-5 text-primary" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: "Name", value: user?.name },
                    { label: "Email", value: user?.email },
                    { label: "Account Type", value: user?.role, capitalize: true },
                    { label: "Total Reservations", value: userReservations.length },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    >
                      <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                      <p className={`font-medium ${item.capitalize ? "capitalize" : ""}`}>{item.value}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Upcoming Reservations */}
          <div className="mb-8">
            <motion.h2
              className="font-serif text-2xl font-semibold mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Upcoming Reservations
            </motion.h2>
            <AnimatePresence mode="wait">
              {upcomingReservations.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-12 text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      </motion.div>
                      <p className="text-muted-foreground mb-6">You don't have any upcoming reservations.</p>
                      <Button onClick={() => router.push("/villas")} className="group">
                        Browse Villas
                        <motion.span
                          className="inline-block ml-2"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                        >
                          →
                        </motion.span>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {upcomingReservations.map((reservation, index) => (
                    <motion.div
                      key={reservation.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      layout
                    >
                      <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="font-serif text-xl font-semibold mb-1 group-hover:text-primary transition-colors">
                                {reservation.villaName}
                              </h3>
                              <p className="text-sm text-muted-foreground">Confirmation: {reservation.id}</p>
                            </div>
                            <Button
                              onClick={() => handleCancelReservation(reservation.id)}
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive hover:bg-destructive/10 transition-all duration-200 hover:scale-110"
                            >
                              <X className="h-5 w-5" />
                            </Button>
                          </div>
                          <div className="space-y-3">
                            <motion.div
                              className="flex items-center gap-2 text-sm"
                              whileHover={{ x: 5 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>
                                {format(new Date(reservation.checkIn), "MMM d, yyyy")} -{" "}
                                {format(new Date(reservation.checkOut), "MMM d, yyyy")}
                              </span>
                            </motion.div>
                            <motion.div
                              className="flex items-center gap-2 text-sm"
                              whileHover={{ x: 5 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>{reservation.guests} guests</span>
                            </motion.div>
                            <div className="pt-3 border-t border-border flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">Total</span>
                              <motion.span
                                className="text-lg font-semibold"
                                initial={{ scale: 1 }}
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.2 }}
                              >
                                ${reservation.totalPrice}
                              </motion.span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Past Reservations */}
          <AnimatePresence>
            {pastReservations.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="font-serif text-2xl font-semibold mb-6">Past Reservations</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pastReservations.map((reservation, index) => (
                    <motion.div
                      key={reservation.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Card className="opacity-75 hover:opacity-100 transition-all duration-300 hover:shadow-md">
                        <CardContent className="p-6">
                          <h3 className="font-serif text-xl font-semibold mb-1">{reservation.villaName}</h3>
                          <p className="text-sm text-muted-foreground mb-4">Confirmation: {reservation.id}</p>
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>
                                {format(new Date(reservation.checkIn), "MMM d, yyyy")} -{" "}
                                {format(new Date(reservation.checkOut), "MMM d, yyyy")}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>{reservation.guests} guests</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
