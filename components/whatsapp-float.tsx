"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { addLead } from "@/lib/leads"

export function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false)
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

    // Construct WhatsApp message
    const message = `
� *INTERIOR DESIGN ENQUIRY* 🏠

👤 *Full Name:* ${formData.fullName}
📱 *Phone Number:* ${formData.phoneNumber}
🏢 *Property Type:* ${formData.propertyType}
📍 *City:* ${formData.city}
💰 *Budget:* ${formData.budget || 'Not specified'}

---
📱 *Sent via Interior Design Website*
    `.trim()

    // Replace with your actual WhatsApp number (with country code, no + or spaces)
    const whatsappNumber = "916353583148"
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

    // Open WhatsApp
    window.open(whatsappUrl, "_blank")

    // Reset form and close dialog
    setFormData({
      fullName: "",
      phoneNumber: "",
      propertyType: "",
      budget: "",
      city: "",
    })
    setIsOpen(false)
  }

  return (
    <>
      {/* Floating WhatsApp Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full bg-[#25D366] shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center group"
        aria-label="WhatsApp Enquiry"
      >
        <svg viewBox="0 0 24 24" className="h-9 w-9 fill-white" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
        <span className="absolute -top-1 -right-1 h-4 w-4 bg-accent rounded-full animate-ping" />
      </button>

      {/* Enquiry Form Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif text-primary">Quick Enquiry</DialogTitle>
            <DialogDescription className="font-mono">
              Fill in your details and we'll connect with you on WhatsApp instantly
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="font-mono">
                1. Full Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
                className="font-mono"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="font-mono">
                2. Phone Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                required
                className="font-mono"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="propertyType" className="font-mono">
                3. Property Type <span className="text-destructive">*</span>
              </Label>
              <select
                id="propertyType"
                value={formData.propertyType}
                onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                required
                className="w-full bg-white border border-gray-300 text-foreground rounded-md px-3 py-2 text-sm font-mono"
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

            <div className="space-y-2">
              <Label htmlFor="city" className="font-mono">
                4. City <span className="text-destructive">*</span>
              </Label>
              <Input
                id="city"
                placeholder="Enter your city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                required
                className="font-mono"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget" className="font-mono">
                5. Budget (Optional)
              </Label>
              <Input
                id="budget"
                placeholder="e.g., 5 Lakhs, 10-20 Lakhs"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="font-mono"
              />
            </div>

            <Button type="submit" className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-mono text-base">
              <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2 fill-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Send Enquiry via WhatsApp
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
