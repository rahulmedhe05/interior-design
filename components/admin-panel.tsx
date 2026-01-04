"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getLeads, getLeadsStats } from "@/lib/leads"
import { logout, getSession } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Download, LogOut } from "lucide-react"

export function AdminPanel() {
  const router = useRouter()
  const [leads, setLeads] = useState<any[]>([])
  const [stats, setStats] = useState<any>({})
  const [selectedMonth, setSelectedMonth] = useState<string>("")
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    const currentSession = getSession()
    if (!currentSession) {
      router.push("/admin/login")
    }
    setSession(currentSession)

    const allLeads = getLeads()
    setLeads(allLeads)

    const leadsStats = getLeadsStats()
    setStats(leadsStats)

    const now = new Date()
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`
    setSelectedMonth(currentMonth)
  }, [router])

  const handleLogout = () => {
    logout()
    router.push("/admin/login")
  }

  const filteredLeads = selectedMonth
    ? leads.filter((lead) => {
        const date = new Date(lead.submittedAt)
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
        return monthKey === selectedMonth
      })
    : leads

  const exportToCSV = () => {
    const headers = ["Name", "Phone Number", "Property Type", "City", "Budget", "Preference", "Submitted At"]
    const csvContent = [
      headers.join(","),
      ...filteredLeads.map((lead) =>
        [
          `"${lead.fullName}"`,
          lead.phoneNumber,
          `"${lead.propertyType}"`,
          `"${lead.city}"`,
          `"${lead.budget}"`,
          `"${lead.preference}"`,
          new Date(lead.submittedAt).toLocaleString(),
        ].join(",")
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `leads-${selectedMonth || "all"}.csv`
    a.click()
  }

  const chartData = Object.entries(stats).map(([month, count]) => ({
    month,
    leads: count,
  }))

  if (!session) {
    return <div className="text-center py-8">Loading...</div>
  }

  const totalLeads = leads.length
  const currentMonthLeads = filteredLeads.length

  return (
    <div className="space-y-6">
      {/* Header with Logout */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Panel</h1>
          <p className="text-sm text-muted-foreground">Manage and track all enquiry leads</p>
          {session && <p className="text-xs text-muted-foreground mt-1">Logged in as: {session.email}</p>}
        </div>
        <Button onClick={handleLogout} variant="outline" className="gap-2">
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalLeads}</div>
            <p className="text-xs text-muted-foreground mt-1">All time enquiries</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{currentMonthLeads}</div>
            <p className="text-xs text-muted-foreground mt-1">{selectedMonth}</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Leads by Month</CardTitle>
          <CardDescription>Monthly enquiry statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="leads" fill="#8B4513" name="Leads" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Month Filter and Export */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <label className="text-sm font-medium">Filter by Month:</label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="mt-2 px-3 py-2 border border-border rounded-md text-sm"
          >
            <option value="">All Time</option>
            {Object.keys(stats).sort().reverse().map((month) => (
              <option key={month} value={month}>
                {month} ({stats[month]} leads)
              </option>
            ))}
          </select>
        </div>
        <Button onClick={exportToCSV} className="gap-2">
          <Download className="w-4 h-4" />
          Export to CSV
        </Button>
      </div>

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle>Leads List</CardTitle>
          <CardDescription>
            Showing {filteredLeads.length} lead{filteredLeads.length !== 1 ? "s" : ""} {selectedMonth ? `for ${selectedMonth}` : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">Name</th>
                  <th className="text-left py-3 px-4 font-semibold">Phone Number</th>
                  <th className="text-left py-3 px-4 font-semibold">Property Type</th>
                  <th className="text-left py-3 px-4 font-semibold">City</th>
                  <th className="text-left py-3 px-4 font-semibold">Budget</th>
                  <th className="text-left py-3 px-4 font-semibold">Preference</th>
                  <th className="text-left py-3 px-4 font-semibold">Submitted</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.length > 0 ? (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">{lead.fullName}</td>
                      <td className="py-3 px-4">{lead.phoneNumber}</td>
                      <td className="py-3 px-4">{lead.propertyType}</td>
                      <td className="py-3 px-4">{lead.city}</td>
                      <td className="py-3 px-4">{lead.budget || "—"}</td>
                      <td className="py-3 px-4 truncate max-w-xs">{lead.preference || "—"}</td>
                      <td className="py-3 px-4 text-xs text-muted-foreground">
                        {new Date(lead.submittedAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-muted-foreground">
                      No leads found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
