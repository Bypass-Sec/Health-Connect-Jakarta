"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Bell, MapPin, Clock, Pill, User, Phone } from "lucide-react"

interface Appointment {
  id: string
  clinic: string
  date: string
  time: string
  service: string
  status: "confirmed" | "pending" | "completed"
}

interface Medication {
  id: string
  name: string
  dosage: string
  frequency: string
  nextDose: string
  remaining: number
}

const mockAppointments: Appointment[] = [
  {
    id: "1",
    clinic: "Puskesmas Cempaka Putih",
    date: "2024-01-15",
    time: "10:00",
    service: "Vaksin Hepatitis B",
    status: "confirmed",
  },
  {
    id: "2",
    clinic: "Klinik Sehat Bersama",
    date: "2024-01-20",
    time: "14:30",
    service: "Pemeriksaan Prenatal",
    status: "pending",
  },
]

const mockMedications: Medication[] = [
  {
    id: "1",
    name: "Vitamin D",
    dosage: "1000 IU",
    frequency: "1x sehari",
    nextDose: "2024-01-12 08:00",
    remaining: 28,
  },
  {
    id: "2",
    name: "Iron Supplement",
    dosage: "65mg",
    frequency: "2x sehari",
    nextDose: "2024-01-12 20:00",
    remaining: 15,
  },
]

export default function DashboardPage() {
  const [appointments] = useState<Appointment[]>(mockAppointments)
  const [medications] = useState<Medication[]>(mockMedications)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Dikonfirmasi"
      case "pending":
        return "Menunggu"
      case "completed":
        return "Selesai"
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-teal-400 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Dashboard Pasien</h1>
          <p className="text-teal-100">Kelola janji temu dan pengingat obat Anda</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Summary */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profil Saya
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <User className="h-10 w-10 text-teal-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Sari Dewi</h3>
                  <p className="text-sm text-gray-600">ID: HC-2024-001</p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Umur:</span>
                    <span>28 tahun</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Telepon:</span>
                    <span>+62 812-3456-7890</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Alamat:</span>
                    <span>Jakarta Pusat</span>
                  </div>
                </div>

                <Button className="w-full mt-4 bg-teal-400 hover:bg-teal-500">Edit Profil</Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Aksi Cepat</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Calendar className="h-4 w-4 mr-2" />
                  Buat Janji Temu Baru
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <MapPin className="h-4 w-4 mr-2" />
                  Cari Klinik Terdekat
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Phone className="h-4 w-4 mr-2" />
                  Hubungi Hotline 119
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Appointments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Janji Temu Mendatang
                </CardTitle>
              </CardHeader>
              <CardContent>
                {appointments.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Belum ada janji temu</p>
                    <Button className="mt-4 bg-teal-400 hover:bg-teal-500">Buat Janji Temu</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <div key={appointment.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold text-gray-900">{appointment.clinic}</h4>
                            <p className="text-sm text-gray-600">{appointment.service}</p>
                          </div>
                          <Badge className={getStatusColor(appointment.status)}>
                            {getStatusText(appointment.status)}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(appointment.date).toLocaleDateString("id-ID")}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {appointment.time}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Reschedule
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 border-red-200 bg-transparent">
                            Cancel
                          </Button>
                          <Button size="sm" className="bg-teal-400 hover:bg-teal-500">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Medication Reminders */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Pill className="h-5 w-5" />
                  Pengingat Obat
                </CardTitle>
              </CardHeader>
              <CardContent>
                {medications.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Pill className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Belum ada pengingat obat</p>
                    <Button className="mt-4 bg-teal-400 hover:bg-teal-500">Tambah Obat</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {medications.map((medication) => (
                      <div key={medication.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold text-gray-900">{medication.name}</h4>
                            <p className="text-sm text-gray-600">
                              {medication.dosage} • {medication.frequency}
                            </p>
                          </div>
                          <Badge variant="outline" className="text-teal-600 border-teal-200">
                            {medication.remaining} tersisa
                          </Badge>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                          <Bell className="h-4 w-4" />
                          <span>Dosis berikutnya: {new Date(medication.nextDose).toLocaleString("id-ID")}</span>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" className="bg-teal-400 hover:bg-teal-500">
                            Tandai Sudah Minum
                          </Button>
                          <Button size="sm" variant="outline">
                            Edit Pengingat
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Health Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Tips Kesehatan Hari Ini</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-teal-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-teal-800 mb-2">Pencegahan Demam Berdarah</h4>
                  <p className="text-sm text-teal-700">
                    Musim hujan telah tiba. Pastikan untuk menguras bak mandi seminggu sekali, menutup tempat
                    penampungan air, dan menggunakan lotion anti nyamuk.
                  </p>
                  <Button size="sm" variant="outline" className="mt-3 border-teal-200 text-teal-600 bg-transparent">
                    Baca Selengkapnya
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
