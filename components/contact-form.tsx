"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, MessageCircle } from "lucide-react"
import { addLead } from "@/lib/leads"

export function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    propertyType: "",
    budget: "",
    city: "",
    preference: "",
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
      preference: formData.preference,
    })

    // Construct WhatsApp message
    const message = `
🏠 *INTERIOR DESIGN ENQUIRY* 🏠

👤 *Full Name:* ${formData.fullName}
📱 *Phone Number:* ${formData.phoneNumber}
🏢 *Property Type:* ${formData.propertyType}
� *City:* ${formData.city}
💰 *Budget:* ${formData.budget || 'Not specified'}

---
📱 *Sent via Interior Design Website*
    `.trim()

    // Replace with your WhatsApp number (include country code without + sign)
    const whatsappNumber = "916353583148"
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

    // Open WhatsApp
    window.open(whatsappURL, "_blank")
  }

  return (
    <section
      id="contact"
      className="py-12 md:py-32 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground"
    >
      <div className="container mx-auto px-3 sm:px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <p className="text-accent font-mono uppercase tracking-wider mb-2 md:mb-4 text-xs sm:text-sm">Get Your Interior Design Consultation</p>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-balance">Transform Your Space With Professional Design</h2>
            <p className="text-sm sm:text-base md:text-xl text-primary-foreground/90 font-mono leading-relaxed max-w-2xl mx-auto">
              {"Our expert interior designers will create stunning spaces tailored to your style. Fill the form below and we'll connect with you on WhatsApp instantly"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-start">
            {/* Contact Form */}
            <div className="bg-card rounded-lg p-4 sm:p-6 md:p-8 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-3 md:space-y-6">
                <div>
                  <label htmlFor="fullName" className="block text-xs sm:text-sm font-mono text-card-foreground mb-2">
                    1. Full Name <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                    className="bg-background border-border text-foreground text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block text-xs sm:text-sm font-mono text-card-foreground mb-2">
                    2. Phone Number <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    required
                    className="bg-background border-border text-foreground text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="propertyType" className="block text-sm font-mono text-card-foreground mb-2">
                    3. Property Type <span className="text-destructive">*</span>
                  </label>
                  <select
                    id="propertyType"
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    required
                    className="w-full bg-background border border-border text-foreground rounded-md px-3 py-2 text-sm"
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
                  <label htmlFor="city" className="block text-sm font-mono text-card-foreground mb-2">
                    4. City <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="city"
                    type="text"
                    placeholder="Enter your city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    required
                    className="bg-background border-border text-foreground"
                  />
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-mono text-card-foreground mb-2">
                    5. Budget (Optional)
                  </label>
                  <Input
                    id="budget"
                    type="text"
                    placeholder="e.g., 5 Lakhs, 10-20 Lakhs"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="bg-background border-border text-foreground"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full bg-primary hover:bg-accent text-white font-semibold">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Send Enquiry via WhatsApp
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-8 border border-primary-foreground/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Call Us</h3>
                    <p className="text-primary-foreground/80 font-mono mb-2">Available 9 AM - 9 PM</p>
                    <a
                      href="tel:+919876543210"
                      className="text-lg font-mono text-accent hover:text-secondary transition-colors"
                    >
                      +91 98765 43210
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-8 border border-primary-foreground/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">WhatsApp</h3>
                    <p className="text-primary-foreground/80 font-mono mb-2">Quick response guaranteed</p>
                    <a
                      href="https://wa.me/919876543210"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-mono text-accent hover:text-secondary transition-colors"
                    >
                      Chat Now
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-8 border border-primary-foreground/20">
                <h3 className="text-xl font-bold mb-4">Why Contact Us?</h3>
                <ul className="space-y-3">
                  {[
                    "Free consultation and design guidance",
                    "Instant quotes on WhatsApp",
                    "Same-day response to all queries",
                    "Flexible appointment scheduling",
                    "On-site service available across Vadodara",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <span className="text-primary-foreground/90 font-mono">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
