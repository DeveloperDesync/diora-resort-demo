"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MOCK_VILLAS } from "@/lib/mock-data"
import { motion } from "framer-motion"
import { ArrowRight, Leaf, Users, Sparkles, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  const featuredVillas = MOCK_VILLAS.filter((villa) => villa.featured).slice(0, 3)

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background z-10" />
        <Image
          src="/luxury-beach-villa-sunset-ocean-view.jpg"
          alt="Diora Resort"
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
            Where Luxury Meets Nature
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Experience unparalleled luxury in our eco-conscious retreat, where every detail is crafted for your ultimate
            comfort and peace.
          </p>
          <Link href="/villas">
            <Button size="lg" className="text-base px-8 py-6">
              Reserve Your Stay
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
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-balance">About Diora Resort</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Nestled on a pristine coastline, Diora Resort represents the pinnacle of sustainable luxury. Our collection
            of exclusive villas combines contemporary design with deep respect for the natural environment, creating an
            unforgettable sanctuary for discerning travelers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {[
            {
              icon: Leaf,
              title: "Sustainability",
              description:
                "Every aspect of our resort is designed with environmental consciousness, from renewable energy to locally sourced materials.",
            },
            {
              icon: Users,
              title: "Personalized Service",
              description:
                "Our dedicated team ensures every moment of your stay exceeds expectations with bespoke concierge services.",
            },
            {
              icon: Sparkles,
              title: "Exceptional Design",
              description:
                "Award-winning architecture seamlessly blends modern luxury with the raw beauty of our natural surroundings.",
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
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">The Resort Experience</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                At Diora Resort, we believe true luxury lies in the details. From the moment you arrive, you'll be
                immersed in an environment where every element has been thoughtfully curated to create harmony between
                comfort and nature.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Whether you're seeking adventure, relaxation, or meaningful connection, our resort offers endless
                possibilities for discovery and renewal.
              </p>
              <Link href="/villas">
                <Button variant="outline" size="lg">
                  Explore Our Villas
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
                alt="Resort Experience"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Villas */}
      <section className="container mx-auto px-4 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Featured Villas</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover our curated selection of extraordinary residences, each offering a unique perspective on luxury
            living.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredVillas.map((villa, index) => (
            <motion.div
              key={villa.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/villas/${villa.slug}`}>
                <Card className="group overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-500">
                  <div className="relative h-72 overflow-hidden">
                    <Image
                      src={villa.images[0] || "/placeholder.svg"}
                      alt={villa.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <p className="text-sm font-semibold">${villa.pricePerNight}/night</p>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-serif text-2xl font-semibold mb-2">{villa.name}</h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2 leading-relaxed">{villa.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{villa.bedrooms} Beds</span>
                      <span>•</span>
                      <span>{villa.bathrooms} Baths</span>
                      <span>•</span>
                      <span>{villa.capacity} Guests</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/villas">
            <Button variant="outline" size="lg">
              View All Villas
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
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-balance">Sustainability & Community</h2>
            <p className="text-lg leading-relaxed mb-8 opacity-90">
              We are committed to operating in harmony with our environment and supporting local communities. From
              solar-powered facilities to partnering with local artisans and suppliers, every decision we make considers
              our impact on the planet and its people.
            </p>
            <div className="flex flex-wrap gap-8 justify-center text-center">
              <div>
                <p className="text-3xl font-bold mb-2">100%</p>
                <p className="text-sm opacity-90">Renewable Energy</p>
              </div>
              <div>
                <p className="text-3xl font-bold mb-2">Zero</p>
                <p className="text-sm opacity-90">Single-Use Plastics</p>
              </div>
              <div>
                <p className="text-3xl font-bold mb-2">Local</p>
                <p className="text-sm opacity-90">Sourcing Priority</p>
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
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Begin Your Journey</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Discover a new definition of luxury at Diora Resort. Reserve your villa today and experience the perfect
            balance of sophistication and serenity.
          </p>
          <Link href="/villas">
            <Button size="lg" className="text-base px-8 py-6">
              Explore Available Villas
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
