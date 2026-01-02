"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles, MessageCircle } from "lucide-react"
import { addLead } from "@/lib/leads"

const slides = [
  {
    id: 1,
    title: "Transform Your Living Space",
    subtitle: "Premium Interior Design Services",
    description: "Elegant interior design solutions for homes, offices, and commercial spaces across Vadodara",
    image: "/1.png",
  },
  {
    id: 2,
    title: "Luxury Home Interiors",
    subtitle: "Your Dream Home Awaits",
    description: "Bespoke interior design with modern aesthetics, comfort, and sophisticated style",
    image: "/2.png",
  },
  {
    id: 3,
    title: "Complete Design Solutions",
    subtitle: "From Concept to Reality",
    description: "Full-service interior design from space planning to furniture selection and execution",
    image: "/3.png",
  },
]

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    propertyType: "",
    budget: "",
    city: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Save lead to localStorage
    addLead({
      fullName: formData.fullName,
      phoneNumber: formData.phoneNumber,
      propertyType: formData.propertyType,
      budget: formData.budget,
      city: formData.city,
    })

    const message = `
🏠 *INTERIOR DESIGN ENQUIRY* 🏠

👤 *Full Name:* ${formData.fullName}
📱 *Phone Number:* ${formData.phoneNumber}
🏢 *Property Type:* ${formData.propertyType}
📍 *City:* ${formData.city}
💰 *Budget:* ${formData.budget || 'Not specified'}

---
📱 *Sent via Interior Design Studio Website*
    `.trim()

    const whatsappNumber = "919725295692"
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappURL, "_blank")
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section id="home" className="relative w-full min-h-screen md:h-screen sm:h-[600px] xs:h-screen overflow-hidden pt-16 sm:pt-20">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/50 to-primary/30 z-10" />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/30 via-slate-800/20 to-slate-900/30 z-0" />
          <div className="absolute inset-0 z-20 flex items-center px-3 sm:px-4 md:px-0">
            <div className="container mx-auto px-3 sm:px-4 py-4 md:py-0">
              <div className="grid md:grid-cols-5 gap-3 md:gap-6 items-start">
                {/* Left Side - Text Content */}
                <div className="md:col-span-3 max-w-2xl space-y-2 md:space-y-6">
                  <div className="flex items-center gap-2 text-accent">
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                    <span className="text-xs font-mono uppercase tracking-wider">{slide.subtitle}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-6xl font-bold text-primary-foreground leading-tight text-balance">
                    {slide.title}
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-primary-foreground/90 font-mono leading-relaxed">
                    {slide.description}
                  </p>
                </div>

                {/* Right Side - Form */}
                <div className="md:col-span-2 bg-card rounded-lg p-3 md:p-5 shadow-2xl h-fit">
                  <div className="mb-2 md:mb-3 pb-2 md:pb-3 border-b border-border">
                    <p className="text-xs text-accent font-mono uppercase tracking-wider mb-1">Quick Response</p>
                    <h3 className="text-xs sm:text-sm md:text-base font-bold text-card-foreground">
                      Professional Interior Design Services
                      <br />
                      <em className="text-xs not-italic">— Free Consultation & 3D Visualization</em>
                    </h3>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-2">
                    <div>
                      <label htmlFor="fullName" className="block text-xs font-mono text-card-foreground mb-1">
                        1. Full Name <span className="text-destructive">*</span>
                      </label>
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        required
                        className="bg-background border-border text-foreground text-xs h-8"
                      />
                    </div>

                    <div>
                      <label htmlFor="phoneNumber" className="block text-xs font-mono text-card-foreground mb-1">
                        2. Phone Number <span className="text-destructive">*</span>
                      </label>
                      <Input
                        id="phoneNumber"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        required
                        className="bg-background border-border text-foreground text-xs h-8"
                      />
                    </div>

                    <div>
                      <label htmlFor="propertyType" className="block text-xs font-mono text-card-foreground mb-1">
                        3. Property Type <span className="text-destructive">*</span>
                      </label>
                      <select
                        id="propertyType"
                        value={formData.propertyType}
                        onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                        required
                        className="w-full bg-background border border-border text-foreground rounded-md px-2 py-1 text-xs h-8"
                      >
                        <option value="">Select Property Type</option>
                        <option value="1BHK">1BHK</option>
                        <option value="2BHK">2BHK</option>
                        <option value="3BHK">3BHK</option>
                        <option value="Villa">Villa</option>
                        <option value="Bungalow">Bungalow</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Office">Office</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="city" className="block text-xs font-mono text-card-foreground mb-1">
                        4. City <span className="text-destructive">*</span>
                      </label>
                      <Input
                        id="city"
                        type="text"
                        placeholder="Enter your city"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        required
                        className="bg-background border-border text-foreground text-xs h-8"
                      />
                    </div>

                    <div>
                      <label htmlFor="budget" className="block text-xs font-mono text-card-foreground mb-1">
                        5. Budget (Optional)
                      </label>
                      <Input
                        id="budget"
                        type="text"
                        placeholder="e.g., 5 Lakhs, 10-20 Lakhs"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="bg-background border-border text-foreground text-xs h-8"
                      />
                    </div>

                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white text-xs h-8">
                      <MessageCircle className="w-3 h-3 mr-1" />
                      Send via WhatsApp
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? "w-8 bg-accent" : "w-2 bg-primary-foreground/50 hover:bg-primary-foreground/75"
            }`}
          />
        ))}
      </div>
    </section>
  )
}
