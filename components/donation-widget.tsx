"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Heart, DollarSign } from "lucide-react"

const presetAmounts = [5, 20, 50, 100]

const impactExamples = {
  5: "1 vaksin dengue",
  20: "4 pemeriksaan kesehatan",
  50: "10 vaksin dengue",
  100: "1 paket obat TB lengkap",
}

export function DonationWidget() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(20)
  const [customAmount, setCustomAmount] = useState("")
  const [isRecurring, setIsRecurring] = useState(false)

  const handleDonate = async () => {
    const amount = selectedAmount || Number.parseFloat(customAmount)
    if (!amount || amount < 1) return

    // Integrate with Stripe here
    console.log("Processing donation:", { amount, isRecurring })

    // Simulate payment processing
    alert(`Terima kasih! Donasi $${amount} ${isRecurring ? "bulanan" : ""} sedang diproses.`)
  }

  const currentAmount = selectedAmount || Number.parseFloat(customAmount) || 0

  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="border-teal-200">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl sm:text-3xl text-gray-900 flex items-center justify-center gap-2">
              <Heart className="h-8 w-8 text-teal-400" />
              Donasi Sekarang
            </CardTitle>
            <p className="text-gray-600">Setiap donasi langsung membantu warga Jakarta yang membutuhkan</p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-3 block">Pilih Jumlah Donasi</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                {presetAmounts.map((amount) => (
                  <Button
                    key={amount}
                    variant={selectedAmount === amount ? "default" : "outline"}
                    className={`h-16 flex flex-col ${
                      selectedAmount === amount
                        ? "bg-teal-400 hover:bg-teal-500 text-white"
                        : "border-teal-200 hover:bg-teal-50"
                    }`}
                    onClick={() => {
                      setSelectedAmount(amount)
                      setCustomAmount("")
                    }}
                  >
                    <span className="text-lg font-bold">${amount}</span>
                    <span className="text-xs opacity-80">{impactExamples[amount as keyof typeof impactExamples]}</span>
                  </Button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-gray-400" />
                <Input
                  type="number"
                  placeholder="Jumlah custom"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value)
                    setSelectedAmount(null)
                  }}
                  className="border-teal-200 focus:border-teal-400"
                />
              </div>
            </div>

            {currentAmount > 0 && (
              <div className="bg-teal-50 p-4 rounded-lg">
                <p className="text-sm text-teal-800">
                  <strong>Dampak donasi Anda:</strong> ${currentAmount} ={" "}
                  {currentAmount >= 100
                    ? `${Math.floor(currentAmount / 100)} paket obat TB`
                    : currentAmount >= 50
                      ? `${Math.floor(currentAmount / 5)} vaksin dengue`
                      : currentAmount >= 20
                        ? `${Math.floor(currentAmount / 5)} pemeriksaan kesehatan`
                        : `${Math.floor(currentAmount / 5)} vaksin dengue`}
                </p>
              </div>
            )}

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="recurring"
                checked={isRecurring}
                onChange={(e) => setIsRecurring(e.target.checked)}
                className="rounded border-teal-300 text-teal-600 focus:ring-teal-500"
              />
              <label htmlFor="recurring" className="text-sm text-gray-700">
                Jadikan donasi bulanan
              </label>
              <Badge variant="secondary" className="bg-teal-100 text-teal-800">
                Dampak 12x lebih besar
              </Badge>
            </div>

            <Button
              onClick={handleDonate}
              disabled={!currentAmount || currentAmount < 1}
              className="w-full bg-teal-400 hover:bg-teal-500 text-white h-12 text-lg"
            >
              Donasi ${currentAmount || 0} {isRecurring ? "per Bulan" : "Sekarang"}
            </Button>

            <p className="text-xs text-gray-500 text-center">
              Pembayaran aman melalui Stripe. 100% donasi langsung untuk program kesehatan.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
