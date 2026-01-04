export interface Lead {
  id: string
  fullName: string
  phoneNumber: string
  propertyType: string
  budget: string
  city: string
  preference: string
  submittedAt: string
}

// Store leads in localStorage
const LEADS_KEY = "royal_safa_leads"

// Migration: Clear old data format if it exists
const migrateLeads = () => {
  if (typeof window === "undefined") return
  try {
    const stored = localStorage.getItem(LEADS_KEY)
    if (stored) {
      const data = JSON.parse(stored)
      // Check if it has old field names (name, eventDate, eventCity, etc.)
      if (Array.isArray(data) && data.length > 0 && data[0].name && !data[0].fullName) {
        // Old format detected, clear it
        localStorage.removeItem(LEADS_KEY)
      }
    }
  } catch (error) {
    console.error("Migration error:", error)
  }
}

export const getLeads = (): Lead[] => {
  if (typeof window === "undefined") return []
  try {
    migrateLeads() // Run migration on each read
    const stored = localStorage.getItem(LEADS_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error("Error reading leads:", error)
    return []
  }
}

export const addLead = (lead: Omit<Lead, "id" | "submittedAt">): Lead => {
  const newLead: Lead = {
    ...lead,
    id: Date.now().toString(),
    submittedAt: new Date().toISOString(),
  }

  if (typeof window !== "undefined") {
    const leads = getLeads()
    leads.push(newLead)
    localStorage.setItem(LEADS_KEY, JSON.stringify(leads))
  }

  return newLead
}

export const getLeadsByMonth = (month: number, year: number) => {
  const leads = getLeads()
  return leads.filter((lead) => {
    const date = new Date(lead.submittedAt)
    return date.getMonth() === month && date.getFullYear() === year
  })
}

export const getLeadsStats = () => {
  const leads = getLeads()
  const stats: { [key: string]: number } = {}

  leads.forEach((lead) => {
    const date = new Date(lead.submittedAt)
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
    stats[monthKey] = (stats[monthKey] || 0) + 1
  })

  return stats
}
