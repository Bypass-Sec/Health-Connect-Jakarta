"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Send, Bot, User, MapPin, Phone } from "lucide-react"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  urgency?: "low" | "medium" | "high"
  recommendations?: string[]
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Halo! Saya asisten kesehatan AI HealthConnect Jakarta. Saya bisa membantu Anda dalam Bahasa Indonesia atau English. Ceritakan gejala yang Anda alami.",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [language, setLanguage] = useState<"id" | "en">("id")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const systemPrompt =
        language === "id"
          ? `Anda adalah asisten kesehatan AI untuk HealthConnect Jakarta. Berikan respons dalam Bahasa Indonesia yang ramah dan profesional. 
           Analisis gejala yang disebutkan dan berikan:
           1. Tingkat urgensi (rendah/sedang/tinggi)
           2. Rekomendasi tindakan
           3. Saran klinik terdekat jika perlu
           Selalu ingatkan untuk konsultasi dengan dokter untuk diagnosis yang akurat.`
          : `You are an AI health assistant for HealthConnect Jakarta. Provide friendly and professional responses in English.
           Analyze mentioned symptoms and provide:
           1. Urgency level (low/medium/high)
           2. Action recommendations
           3. Nearby clinic suggestions if needed
           Always remind to consult with a doctor for accurate diagnosis.`

      const { text } = await generateText({
        model: openai("gpt-4o"),
        system: systemPrompt,
        prompt: input,
      })

      // Simple urgency detection based on keywords
      const urgencyKeywords = {
        high: [
          "chest pain",
          "difficulty breathing",
          "severe",
          "emergency",
          "nyeri dada",
          "sesak napas",
          "parah",
          "darurat",
        ],
        medium: ["fever", "pain", "headache", "demam", "sakit", "pusing"],
        low: ["mild", "slight", "ringan", "sedikit"],
      }

      let urgency: "low" | "medium" | "high" = "low"
      const lowerInput = input.toLowerCase()

      if (urgencyKeywords.high.some((keyword) => lowerInput.includes(keyword))) {
        urgency = "high"
      } else if (urgencyKeywords.medium.some((keyword) => lowerInput.includes(keyword))) {
        urgency = "medium"
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: text,
        timestamp: new Date(),
        urgency,
        recommendations:
          urgency === "high"
            ? ["Segera ke UGD terdekat", "Hubungi 119"]
            : ["Kunjungi klinik terdekat", "Monitor gejala"],
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error generating response:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          language === "id"
            ? "Maaf, terjadi kesalahan. Silakan coba lagi atau hubungi hotline kesehatan 119."
            : "Sorry, an error occurred. Please try again or call health hotline 119.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const getUrgencyColor = (urgency?: string) => {
    switch (urgency) {
      case "high":
        return "bg-red-100 border-red-300 text-red-800"
      case "medium":
        return "bg-yellow-100 border-yellow-300 text-yellow-800"
      case "low":
        return "bg-green-100 border-green-300 text-green-800"
      default:
        return ""
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex gap-2 p-4 border-b">
        <Button
          variant={language === "id" ? "default" : "outline"}
          size="sm"
          onClick={() => setLanguage("id")}
          className={language === "id" ? "bg-teal-400 hover:bg-teal-500" : ""}
        >
          Bahasa
        </Button>
        <Button
          variant={language === "en" ? "default" : "outline"}
          size="sm"
          onClick={() => setLanguage("en")}
          className={language === "en" ? "bg-teal-400 hover:bg-teal-500" : ""}
        >
          English
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`flex gap-2 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.role === "user" ? "bg-teal-400" : "bg-gray-200"
                }`}
              >
                {message.role === "user" ? (
                  <User className="h-4 w-4 text-white" />
                ) : (
                  <Bot className="h-4 w-4 text-gray-600" />
                )}
              </div>

              <div className="space-y-2">
                <Card className={`p-3 ${message.role === "user" ? "bg-teal-400 text-white" : "bg-gray-50"}`}>
                  <p className="text-sm">{message.content}</p>
                </Card>

                {message.urgency && (
                  <div className={`text-xs px-2 py-1 rounded border ${getUrgencyColor(message.urgency)}`}>
                    Tingkat Urgensi:{" "}
                    {message.urgency === "high" ? "Tinggi" : message.urgency === "medium" ? "Sedang" : "Rendah"}
                  </div>
                )}

                {message.recommendations && (
                  <div className="space-y-1">
                    {message.recommendations.map((rec, index) => (
                      <div key={index} className="text-xs bg-blue-50 text-blue-800 px-2 py-1 rounded">
                        {rec}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <Bot className="h-4 w-4 text-gray-600" />
              </div>
              <Card className="p-3 bg-gray-50">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t">
        <div className="flex gap-2 mb-2">
          <Button variant="outline" size="sm" className="text-xs bg-transparent">
            <MapPin className="h-3 w-3 mr-1" />
            Klinik Terdekat
          </Button>
          <Button variant="outline" size="sm" className="text-xs bg-transparent">
            <Phone className="h-3 w-3 mr-1" />
            Hotline 119
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={language === "id" ? "Ceritakan gejala Anda..." : "Describe your symptoms..."}
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !input.trim()} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
