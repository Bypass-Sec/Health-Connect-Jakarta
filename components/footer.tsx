import Link from "next/link"
import { Heart, MapPin, Phone, Mail, Facebook, Twitter, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-teal-400 rounded-lg flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">HealthConnect Jakarta</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Menghubungkan warga Jakarta dengan layanan kesehatan gratis melalui teknologi AI dan kemitraan NGO.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-teal-400 cursor-pointer" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-teal-400 cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-teal-400 cursor-pointer" />
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Layanan</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/clinic-locator" className="hover:text-teal-400">
                  Cari Klinik
                </Link>
              </li>
              <li>
                <Link href="/chat" className="hover:text-teal-400">
                  AI Konsultasi
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-teal-400">
                  Dashboard Pasien
                </Link>
              </li>
              <li>
                <Link href="/donate" className="hover:text-teal-400">
                  Donasi
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">NGO Partners</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Yayasan Kesehatan Indonesia</li>
              <li>Doctors Without Borders</li>
              <li>Save the Children</li>
              <li>Indonesian Red Cross</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Kontak</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                Jakarta, Indonesia
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                Hotline: 119
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                info@healthconnect-jakarta.org
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 HealthConnect Jakarta. All rights reserved. Built with ❤️ for Jakarta's health.</p>
        </div>
      </div>
    </footer>
  )
}
