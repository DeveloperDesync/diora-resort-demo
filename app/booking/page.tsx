"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MOCK_RESORTS, addMockReservation } from "@/lib/mock-data"
import { useAuth } from "@/lib/auth-context"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, User, FileText, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { format, addDays, differenceInDays } from "date-fns"
import Image from "next/image"

type BookingStep = "dates" | "guests" | "details" | "review" | "confirmation"

export default function BookingPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [currentStep, setCurrentStep] = useState<BookingStep>("dates")
  const [selectedResortId, setSelectedResortId] = useState<string | null>(null)
  const [confirmationId, setConfirmationId] = useState<string>("")

  const [checkIn, setCheckIn] = useState<string>(format(addDays(new Date(), 1), "yyyy-MM-dd"))
  const [checkOut, setCheckOut] = useState<string>(format(addDays(new Date(), 4), "yyyy-MM-dd"))
  const [numberOfGuests, setNumberOfGuests] = useState(2)
  const [guestName, setGuestName] = useState("")
  const [guestEmail, setGuestEmail] = useState("")
  const [guestPhone, setGuestPhone] = useState("")
  const [specialRequests, setSpecialRequests] = useState("")

  useEffect(() => {
    const resortId = searchParams.get("resort") || searchParams.get("villa") // Support both for backwards compatibility
    if (resortId) {
      setSelectedResortId(resortId)
    }
    if (user) {
      setGuestName(user.name)
      setGuestEmail(user.email)
    }
  }, [searchParams, user])

  const selectedResort = selectedResortId ? MOCK_RESORTS.find((r) => r.id === selectedResortId) : null
  const nights = differenceInDays(new Date(checkOut), new Date(checkIn))
  const totalPrice = selectedResort ? selectedResort.pricePerNight * nights : 0

  const handleNext = () => {
    if (!isAuthenticated && currentStep === "dates") {
      router.push("/login?redirect=/booking" + (selectedResortId ? `?resort=${selectedResortId}` : ""))
      return
    }

    const steps: BookingStep[] = ["dates", "guests", "details", "review", "confirmation"]
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1])
    }
  }

  const handleBack = () => {
    const steps: BookingStep[] = ["dates", "guests", "details", "review", "confirmation"]
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1])
    }
  }

  const handleConfirmBooking = () => {
    if (!selectedResort || !user) return

    const reservation = addMockReservation({
      resortId: selectedResort.id,
      resortName: selectedResort.name,
      guestName,
      guestEmail,
      checkIn,
      checkOut,
      guests: numberOfGuests,
      totalPrice,
      status: "upcoming",
    })

    setConfirmationId(reservation.id)
    handleNext()
  }

  const canProceed = () => {
    switch (currentStep) {
      case "dates":
        return selectedResort && checkIn && checkOut && new Date(checkOut) > new Date(checkIn)
      case "guests":
        return numberOfGuests > 0 && (!selectedResort || numberOfGuests <= selectedResort.capacity)
      case "details":
        return guestName && guestEmail && guestPhone
      case "review":
        return true
      default:
        return false
    }
  }

  if (!selectedResort) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 lg:px-8 pt-24 pb-16">
          <Card>
            <CardContent className="p-12 text-center">
              <h2 className="font-serif text-2xl font-semibold mb-4">No Resort Selected</h2>
              <p className="text-muted-foreground mb-6">Please select a resort to continue with your booking.</p>
              <Button onClick={() => router.push("/resorts")}>Browse Resorts</Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 lg:px-8 pt-24 pb-16">
        {/* Progress Indicator */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            {[
              { key: "dates", label: "Dates", icon: Calendar },
              { key: "guests", label: "Guests", icon: User },
              { key: "details", label: "Details", icon: FileText },
              { key: "review", label: "Review", icon: CheckCircle },
            ].map((step, index, array) => (
              <div key={step.key} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                      currentStep === step.key
                        ? "border-primary bg-primary text-primary-foreground"
                        : ["dates", "guests", "details", "review"].indexOf(currentStep) >
                            ["dates", "guests", "details", "review"].indexOf(step.key)
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background text-muted-foreground"
                    }`}
                  >
                    <step.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs mt-2 hidden sm:block">{step.label}</span>
                </div>
                {index < array.length - 1 && (
                  <div className="flex-1 h-0.5 bg-border mx-2 relative top-[-16px]">
                    <div
                      className={`h-full transition-all ${
                        ["dates", "guests", "details", "review"].indexOf(currentStep) > index ? "bg-primary" : ""
                      }`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {currentStep === "dates" && (
                <motion.div
                  key="dates"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-serif text-2xl">Select Your Dates</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Check-in Date</label>
                        <input
                          type="date"
                          value={checkIn}
                          onChange={(e) => setCheckIn(e.target.value)}
                          min={format(new Date(), "yyyy-MM-dd")}
                          className="w-full px-4 py-3 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Check-out Date</label>
                        <input
                          type="date"
                          value={checkOut}
                          onChange={(e) => setCheckOut(e.target.value)}
                          min={checkIn}
                          className="w-full px-4 py-3 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>
                      {nights > 0 && (
                        <div className="bg-muted p-4 rounded-lg">
                          <p className="text-sm text-muted-foreground">
                            Total: <span className="font-semibold text-foreground">{nights} nights</span>
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {currentStep === "guests" && (
                <motion.div
                  key="guests"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-serif text-2xl">Number of Guests</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Guests (Maximum: {selectedResort.capacity})
                        </label>
                        <input
                          type="number"
                          value={numberOfGuests}
                          onChange={(e) => setNumberOfGuests(Number.parseInt(e.target.value) || 1)}
                          min={1}
                          max={selectedResort.capacity}
                          className="w-full px-4 py-3 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>
                      {numberOfGuests > selectedResort.capacity && (
                        <p className="text-sm text-destructive">
                          This resort can accommodate up to {selectedResort.capacity} guests.
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {currentStep === "details" && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-serif text-2xl">Guest Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Full Name</label>
                        <input
                          type="text"
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          placeholder="John Doe"
                          className="w-full px-4 py-3 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                          type="email"
                          value={guestEmail}
                          onChange={(e) => setGuestEmail(e.target.value)}
                          placeholder="john@example.com"
                          className="w-full px-4 py-3 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone Number</label>
                        <input
                          type="tel"
                          value={guestPhone}
                          onChange={(e) => setGuestPhone(e.target.value)}
                          placeholder="+1 (555) 123-4567"
                          className="w-full px-4 py-3 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Special Requests (Optional)</label>
                        <textarea
                          value={specialRequests}
                          onChange={(e) => setSpecialRequests(e.target.value)}
                          placeholder="Any special requirements or requests..."
                          rows={4}
                          className="w-full px-4 py-3 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {currentStep === "review" && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-serif text-2xl">Review Your Booking</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold mb-2">Dates</h3>
                          <p className="text-muted-foreground">
                            {format(new Date(checkIn), "MMMM d, yyyy")} - {format(new Date(checkOut), "MMMM d, yyyy")}
                          </p>
                          <p className="text-sm text-muted-foreground">{nights} nights</p>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">Guests</h3>
                          <p className="text-muted-foreground">{numberOfGuests} guests</p>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">Guest Information</h3>
                          <p className="text-muted-foreground">{guestName}</p>
                          <p className="text-muted-foreground">{guestEmail}</p>
                          <p className="text-muted-foreground">{guestPhone}</p>
                        </div>
                        {specialRequests && (
                          <div>
                            <h3 className="font-semibold mb-2">Special Requests</h3>
                            <p className="text-muted-foreground">{specialRequests}</p>
                          </div>
                        )}
                      </div>
                      <div className="bg-muted p-4 rounded-lg space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            ₱{selectedResort.pricePerNight.toLocaleString()} × {nights} nights
                          </span>
                          <span>₱{(selectedResort.pricePerNight * nights).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between font-semibold text-lg pt-2 border-t border-border">
                          <span>Total</span>
                          <span>₱{totalPrice.toLocaleString()}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        This is a demo booking system. No actual reservation or payment will be processed.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {currentStep === "confirmation" && (
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="text-center">
                    <CardContent className="p-12">
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
                        <CheckCircle className="h-10 w-10 text-primary" />
                      </div>
                      <h2 className="font-serif text-3xl font-bold mb-4">Reservation Confirmed!</h2>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        Your reservation has been confirmed. You will receive a confirmation email shortly.
                      </p>
                      <div className="bg-muted p-6 rounded-lg mb-8 text-left">
                        <p className="text-sm text-muted-foreground mb-2">Confirmation Number</p>
                        <p className="font-mono text-xl font-semibold">{confirmationId}</p>
                      </div>
                      <p className="text-sm text-muted-foreground mb-8">
                        <strong>Note:</strong> This is a demo only. No real booking has been created.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button onClick={() => router.push("/dashboard")} size="lg">
                          View My Reservations
                        </Button>
                        <Button onClick={() => router.push("/")} variant="outline" size="lg">
                          Return Home
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            {currentStep !== "confirmation" && (
              <div className="flex gap-4 mt-8">
                {currentStep !== "dates" && (
                  <Button onClick={handleBack} variant="outline" size="lg">
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Back
                  </Button>
                )}
                <Button
                  onClick={currentStep === "review" ? handleConfirmBooking : handleNext}
                  disabled={!canProceed()}
                  size="lg"
                  className="flex-1"
                >
                  {currentStep === "review" ? "Confirm Booking" : "Continue"}
                  {currentStep !== "review" && <ArrowRight className="ml-2 h-5 w-5" />}
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar - Resort Summary */}
          {currentStep !== "confirmation" && (
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card>
                  <div className="relative h-48 w-full">
                    <Image
                      src={selectedResort.images[0] || "/placeholder.svg"}
                      alt={selectedResort.name}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-serif text-xl font-semibold">{selectedResort.name}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Price per night</span>
                        <span className="font-medium">₱{selectedResort.pricePerNight.toLocaleString()}</span>
                      </div>
                      {nights > 0 && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Nights</span>
                            <span className="font-medium">{nights}</span>
                          </div>
                          <div className="flex justify-between pt-2 border-t border-border font-semibold">
                            <span>Total</span>
                            <span>₱{totalPrice.toLocaleString()}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
