import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, MessageCircle, Calendar, Bell, Users, BarChart3 } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: MapPin,
    title: "Lokasi Klinik & NGO",
    description: "Peta interaktif dengan filter layanan (vaksin, prenatal, dll)",
    href: "/clinic-locator",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: MessageCircle,
    title: "AI Triage Chatbot",
    description: "Pemeriksaan gejala AI dalam Bahasa Indonesia & English",
    href: "/chat",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Calendar,
    title: "Booking Appointment",
    description: "Jadwalkan janji temu dengan sinkronisasi kalender",
    href: "/dashboard",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: Bell,
    title: "Pengingat Obat",
    description: "Notifikasi push & SMS untuk jadwal minum obat",
    href: "/dashboard",
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: Users,
    title: "Panel NGO",
    description: "Manajemen layanan dan permintaan dana untuk NGO",
    href: "/admin",
    color: "bg-teal-100 text-teal-600",
  },
  {
    icon: BarChart3,
    title: "Analytics & Prediksi",
    description: "Heatmap demand dan prediksi kekurangan AI",
    href: "/admin/analytics",
    color: "bg-red-100 text-red-600",
  },
]

export function FeatureCards() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Fitur Lengkap untuk Kesehatan Jakarta</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow border-gray-200">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <Link href={feature.href}>
                  <Button
                    variant="outline"
                    className="w-full border-teal-200 text-teal-600 hover:bg-teal-50 bg-transparent"
                  >
                    Akses Fitur
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
