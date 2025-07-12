"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Heart, MapPin, MessageCircle, User, Settings } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navigation = [
    { name: "Home", href: "/", icon: Heart },
    { name: "Find Clinics", href: "/clinic-locator", icon: MapPin },
    { name: "AI Chat", href: "/chat", icon: MessageCircle },
    { name: "Dashboard", href: "/dashboard", icon: User },
    { name: "Admin", href: "/admin", icon: Settings },
  ]

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-teal-400 rounded-lg flex items-center justify-center">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">HealthConnect</span>
            <span className="text-sm text-teal-600 font-medium">Jakarta</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Button>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm">
              Login
            </Button>
            <Button size="sm" className="bg-teal-400 hover:bg-teal-500">
              Donate Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <Button variant="ghost" className="w-full justify-start">
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Button>
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <Button variant="outline" className="w-full bg-transparent">
                  Login
                </Button>
                <Button className="w-full bg-teal-400 hover:bg-teal-500">Donate Now</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
