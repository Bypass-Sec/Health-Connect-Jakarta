"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

export function TransparencyCounter() {
  const [stats, setStats] = useState({
    totalDonations: 0,
    vaccinesProvided: 0,
    patientsHelped: 0,
    activeClinics: 0,
  })

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setStats((prev) => ({
        totalDonations: prev.totalDonations + Math.floor(Math.random() * 100),
        vaccinesProvided: prev.vaccinesProvided + Math.floor(Math.random() * 5),
        patientsHelped: prev.patientsHelped + Math.floor(Math.random() * 3),
        activeClinics: 47 + Math.floor(Math.random() * 3),
      }))
    }, 5000)

    // Initial values
    setStats({
      totalDonations: 125000,
      vaccinesProvided: 2500,
      patientsHelped: 1200,
      activeClinics: 47,
    })

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-12 px-4 bg-teal-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Dampak Real-Time</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-2xl sm:text-3xl font-bold text-teal-600 mb-2">
                ${stats.totalDonations.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Donasi</div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-2xl sm:text-3xl font-bold text-teal-600 mb-2">
                {stats.vaccinesProvided.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Vaksin Disediakan</div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-2xl sm:text-3xl font-bold text-teal-600 mb-2">
                {stats.patientsHelped.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Pasien Dibantu</div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-2xl sm:text-3xl font-bold text-teal-600 mb-2">{stats.activeClinics}</div>
              <div className="text-sm text-gray-600">Klinik Aktif</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
