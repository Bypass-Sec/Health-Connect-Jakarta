"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Clock, Filter, Navigation } from "lucide-react"

interface Clinic {
  id: string
  name: string
  address: string
  phone: string
  services: string[]
  hours: string
  distance: number
  coordinates: { lat: number; lng: number }
  ngoPartner: string
  availability: "open" | "busy" | "closed"
}

const mockClinics: Clinic[] = [
  {
    id: "1",
    name: "Puskesmas Cempaka Putih",
    address: "Jl. Cempaka Putih Tengah No. 1, Jakarta Pusat",
    phone: "021-4254321",
    services: ["Vaksin", "Prenatal", "Pemeriksaan Umum"],
    hours: "08:00 - 16:00",
    distance: 0.8,
    coordinates: { lat: -6.1751, lng: 106.865 },
    ngoPartner: "Yayasan Kesehatan Indonesia",
    availability: "open",
  },
  {
    id: "2",
    name: "Klinik Sehat Bersama",
    address: "Jl. Kemayoran No. 45, Jakarta Pusat",
    phone: "021-4567890",
    services: ["Vaksin", "TB Treatment", "Dental"],
    hours: "09:00 - 17:00",
    distance: 1.2,
    coordinates: { lat: -6.1701, lng: 106.86 },
    ngoPartner: "Doctors Without Borders",
    availability: "busy",
  },
  {
    id: "3",
    name: "Puskesmas Kelapa Gading",
    address: "Jl. Kelapa Gading Raya No. 88, Jakarta Utara",
    phone: "021-4512345",
    services: ["Prenatal", "Child Health", "Vaccination"],
    hours: "07:00 - 15:00",
    distance: 2.1,
    coordinates: { lat: -6.1501, lng: 106.91 },
    ngoPartner: "Save the Children",
    availability: "open",
  },
]

export default function ClinicLocatorPage() {
  const [clinics, setClinics] = useState<Clinic[]>(mockClinics)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedService, setSelectedService] = useState<string>("")
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.error("Error getting location:", error)
          // Default to Jakarta center
          setUserLocation({ lat: -6.2088, lng: 106.8456 })
        },
      )
    }
  }, [])

  const services = ["Vaksin", "Prenatal", "TB Treatment", "Dental", "Child Health", "Pemeriksaan Umum"]

  const filteredClinics = clinics.filter((clinic) => {
    const matchesSearch =
      clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clinic.address.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesService = !selectedService || clinic.services.includes(selectedService)
    return matchesSearch && matchesService
  })

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "open":
        return "bg-green-100 text-green-800"
      case "busy":
        return "bg-yellow-100 text-yellow-800"
      case "closed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case "open":
        return "Tersedia"
      case "busy":
        return "Sibuk"
      case "closed":
        return "Tutup"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-teal-400 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Lokasi Klinik & NGO</h1>
          <p className="text-teal-100">Temukan layanan kesehatan gratis terdekat dengan Anda</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Filters */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filter Pencarian
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Cari Klinik</label>
                  <Input
                    placeholder="Nama klinik atau alamat..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Layanan</label>
                  <div className="space-y-2">
                    <Button
                      variant={selectedService === "" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedService("")}
                      className="w-full justify-start"
                    >
                      Semua Layanan
                    </Button>
                    {services.map((service) => (
                      <Button
                        key={service}
                        variant={selectedService === service ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedService(service)}
                        className="w-full justify-start"
                      >
                        {service}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-teal-400 hover:bg-teal-500">
                  <Navigation className="h-4 w-4 mr-2" />
                  Gunakan Lokasi Saya
                </Button>
              </CardContent>
            </Card>

            {/* Map placeholder */}
            <Card>
              <CardHeader>
                <CardTitle>Peta Interaktif</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPin className="h-12 w-12 mx-auto mb-2" />
                    <p>Google Maps Integration</p>
                    <p className="text-sm">Menampilkan {filteredClinics.length} klinik</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Clinic List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">{filteredClinics.length} Klinik Ditemukan</h2>
              <Badge variant="outline" className="text-teal-600 border-teal-200">
                Diurutkan berdasarkan jarak
              </Badge>
            </div>

            {filteredClinics.map((clinic) => (
              <Card key={clinic.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{clinic.name}</h3>
                      <p className="text-sm text-gray-600 mb-1">{clinic.ngoPartner}</p>
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        {clinic.address} • {clinic.distance} km
                      </div>
                    </div>
                    <Badge className={getAvailabilityColor(clinic.availability)}>
                      {getAvailabilityText(clinic.availability)}
                    </Badge>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      {clinic.phone}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      {clinic.hours}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Layanan Tersedia:</p>
                    <div className="flex flex-wrap gap-2">
                      {clinic.services.map((service) => (
                        <Badge key={service} variant="secondary" className="bg-teal-100 text-teal-800">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-teal-400 hover:bg-teal-500">Book Appointment</Button>
                    <Button variant="outline" className="border-teal-200 text-teal-600 bg-transparent">
                      Directions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
