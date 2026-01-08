"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MOCK_RESORTS } from "@/lib/mock-data"
import { motion } from "framer-motion"
import { ArrowRight, Leaf, Users, Sparkles, MapPin, Palmtree } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  const featuredResorts = MOCK_RESORTS.filter((resort) => resort.featured).slice(0, 3)

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background z-10" />
        <Image
          src="/luxury-beach-villa-sunset-ocean-view.jpg"
          alt="Antique, Philippines"
          fill
          className="object-cover"
          priority
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-20 text-center px-4 max-w-4xl mx-auto"
        >
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-balance text-foreground">
            Discover Antique, Philippines
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Experience the beauty of Antique's pristine islands, waterfalls, and beaches. Book your perfect resort
            getaway today.
          </p>
          <Link href="/resorts">
            <Button size="lg" className="text-base px-8 py-6">
              Explore Resorts
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="container mx-auto px-4 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-balance">About Diora Booking</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Diora Booking is your gateway to Antique's most stunning destinations. From secluded island paradises to
            adventure-filled mountain resorts, we connect you with the best accommodations across this beautiful
            province. Experience authentic Filipino hospitality and natural wonders like nowhere else.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {[
            {
              icon: Palmtree,
              title: "Island Paradise",
              description:
                "Discover pristine white-sand beaches, crystal-clear waters, and vibrant marine life on Antique's stunning islands.",
            },
            {
              icon: Users,
              title: "Authentic Experience",
              description:
                "Immerse yourself in local culture with warm Filipino hospitality and genuine connections with island communities.",
            },
            {
              icon: Sparkles,
              title: "Diverse Destinations",
              description:
                "From beach resorts to mountain retreats, explore a variety of unique accommodations across Antique's municipalities.",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-none bg-transparent">
                <CardContent className="pt-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section className="bg-muted py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Explore Antique</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Antique is a hidden gem in the Philippines, offering unspoiled natural beauty and adventures for every
                type of traveler. From the famous Malumpati Cold Spring to the secluded islands of Nogas and Seco, every
                destination tells a unique story.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Whether you're seeking island-hopping adventures, waterfall trekking, diving in marine sanctuaries, or
                simply relaxing on pristine beaches, Antique has it all.
              </p>
              <Link href="/resorts">
                <Button variant="outline" size="lg">
                  Browse Resorts
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-[500px] rounded-lg overflow-hidden"
            >
              <Image
                src="/tropical-garden-villa-lush-greenery.jpg"
                alt="Antique Nature"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Resorts */}
      <section className="container mx-auto px-4 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Featured Resorts</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover handpicked resorts across Antique, each offering unique experiences and authentic Filipino
            hospitality.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredResorts.map((resort, index) => (
            <motion.div
              key={resort.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/resorts/${resort.slug}`}>
                <Card className="group overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-500">
                  <div className="relative h-72 overflow-hidden">
                    <Image
                      src={resort.images[0] || "/placeholder.svg"}
                      alt={resort.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <p className="text-sm font-semibold">₱{resort.pricePerNight}/night</p>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-serif text-2xl font-semibold mb-2">{resort.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {resort.municipality}
                    </p>
                    <p className="text-muted-foreground mb-4 line-clamp-2 leading-relaxed">{resort.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{resort.rooms} Rooms</span>
                      <span>•</span>
                      <span>{resort.capacity} Capacity</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/resorts">
            <Button variant="outline" size="lg">
              View All Resorts
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Sustainability Section */}
      <section id="sustainability" className="bg-primary text-primary-foreground py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-foreground/10 mb-8">
              <Leaf className="h-10 w-10" />
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-balance">Eco-Tourism & Community</h2>
            <p className="text-lg leading-relaxed mb-8 opacity-90">
              We partner with resorts committed to sustainable tourism and supporting local communities. By choosing
              Diora Booking, you contribute to preserving Antique's natural beauty and empowering local families.
            </p>
            <div className="flex flex-wrap gap-8 justify-center text-center">
              <div>
                <p className="text-3xl font-bold mb-2">5+</p>
                <p className="text-sm opacity-90">Partner Resorts</p>
              </div>
              <div>
                <p className="text-3xl font-bold mb-2">Local</p>
                <p className="text-sm opacity-90">Community Focus</p>
              </div>
              <div>
                <p className="text-3xl font-bold mb-2">Eco</p>
                <p className="text-sm opacity-90">Conscious Travel</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <MapPin className="h-12 w-12 text-primary mx-auto mb-6" />
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Start Your Antique Adventure</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            From pristine beaches to mountain waterfalls, Antique awaits. Book your dream resort today and discover why
            this hidden paradise is the Philippines' best-kept secret.
          </p>
          <Link href="/resorts">
            <Button size="lg" className="text-base px-8 py-6">
              Explore Resorts
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
