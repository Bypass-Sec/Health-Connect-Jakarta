import { Button } from "@/components/ui/button"
import { MapPin, MessageCircle, Heart } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-teal-50 to-white py-12 px-4 sm:py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
            HealthConnect
            <span className="text-teal-400 block">Jakarta</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Menghubungkan warga berpenghasilan rendah dengan layanan kesehatan gratis melalui AI dan kemitraan NGO
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/clinic-locator">
              <Button size="lg" className="bg-teal-400 hover:bg-teal-500 text-white w-full sm:w-auto">
                <MapPin className="mr-2 h-5 w-5" />
                Cari Klinik Terdekat
              </Button>
            </Link>
            <Link href="/chat">
              <Button
                variant="outline"
                size="lg"
                className="border-teal-400 text-teal-600 hover:bg-teal-50 w-full sm:w-auto bg-transparent"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Konsultasi AI
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-8 w-8 text-teal-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Lokasi Klinik</h3>
            <p className="text-gray-600">Temukan klinik dan NGO terdekat dengan layanan kesehatan gratis</p>
          </div>

          <div className="text-center">
            <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-8 w-8 text-teal-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Triage</h3>
            <p className="text-gray-600">Chatbot AI untuk pemeriksaan gejala dan rekomendasi tingkat urgensi</p>
          </div>

          <div className="text-center">
            <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-teal-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Donasi Transparan</h3>
            <p className="text-gray-600">Donasi langsung untuk kampanye kesehatan dengan transparansi penuh</p>
          </div>
        </div>
      </div>
    </section>
  )
}
